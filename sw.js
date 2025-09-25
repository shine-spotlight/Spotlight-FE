const CACHE_VERSION = "v2";
const PRECACHE = `precache-${CACHE_VERSION}`;
const RUNTIME = `runtime-${CACHE_VERSION}`;

const OFFLINE_URL = "/offline.html";
const PRECACHE_URLS = [OFFLINE_URL, "/", "/index.html"];

const isDevLike = self.location.hostname === "localhost";

const RUNTIME_MAX_ENTRIES = 200;

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(PRECACHE).then((cache) => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      // 네비게이션 프리로드 켜기(지원 브라우저)
      if ("navigationPreload" in self.registration) {
        try {
          await self.registration.navigationPreload.enable();
        } catch {}
      }

      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((k) => k !== PRECACHE && k !== RUNTIME)
          .map((k) => caches.delete(k))
      );
    })()
  );
  self.clients.claim();
});

const isHTMLRequest = (req) =>
  req.mode === "navigate" ||
  req.destination === "document" ||
  (req.headers.get("accept") || "").includes("text/html");

const shouldBypassForDev = (url) => {
  if (!isDevLike) return false;
  if (url.origin !== self.location.origin) return false;
  return (
    url.pathname.startsWith("/@vite") ||
    url.pathname.startsWith("/@react-refresh") ||
    url.pathname.startsWith("/src/") ||
    url.pathname.endsWith("/vite.svg")
  );
};

async function trimRuntimeCache() {
  const cache = await caches.open(RUNTIME);
  const keys = await cache.keys();
  if (keys.length > RUNTIME_MAX_ENTRIES) {
    await cache.delete(keys[0]);
  }
}

async function networkFirstWithOffline(event) {
  // navigation preload가 있으면 먼저 사용
  try {
    if (event.preloadResponse) {
      const preloaded = await event.preloadResponse;
      if (preloaded) return preloaded;
    }
  } catch {}

  const request = event.request;
  const cache = await caches.open(RUNTIME);
  try {
    const fresh = await fetch(request);
    // opaque(크로스오리진)도 캐싱 가능하나 상황에 따라 제외 가능
    cache.put(request, fresh.clone());
    await trimRuntimeCache();
    return fresh;
  } catch {
    const cached = await caches.match(request, { ignoreSearch: true });
    if (cached) return cached;

    // 문서 요청이면 오프라인 페이지 대체
    const offline = await caches.match(OFFLINE_URL);
    if (offline) return offline;

    // 최종 안전장치
    return new Response("오프라인 상태입니다.", {
      status: 503,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
}

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET") return;

  const url = new URL(request.url);
  const sameOrigin = url.origin === self.location.origin;

  if (isHTMLRequest(request)) {
    event.respondWith(networkFirstWithOffline(event));

    return;
  }

  if (request.destination === "image") {
    event.respondWith(cacheFirst(request));
    return;
  }

  if (sameOrigin) {
    event.respondWith(staleWhileRevalidate(request));
    return;
  }

  event.respondWith(fetch(request).catch(() => caches.match(request)));
});

async function networkFirst(request) {
  const cache = await caches.open(RUNTIME);
  try {
    const fresh = await fetch(request);
    cache.put(request, fresh.clone());
    return fresh;
  } catch (err) {
    const cached = await caches.match(request);
    if (cached) return cached;

    return new Response("오프라인 상태입니다.", {
      status: 503,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
}

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  const cache = await caches.open(RUNTIME);
  const res = await fetch(request);
  if (res && res.ok) cache.put(request, res.clone());
  return res;
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(RUNTIME);
  const cached = await caches.match(request);
  const networkPromise = fetch(request)
    .then((res) => {
      if (res && res.ok) cache.put(request, res.clone());
      return res;
    })
    .catch(() => undefined);

  return cached || networkPromise || fetch(request).catch(() => cached);
}
