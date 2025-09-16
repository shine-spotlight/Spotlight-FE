import { useEffect, useRef, useState } from "react";
import { exchangeCode, validateState } from "@apis/users";
import { useAuthStore } from "@stores/authStore";
import { useUserStore } from "@stores/userStore";

export type BridgeStatus =
  | "idle"
  | "validating"
  | "exchanging"
  | "success"
  | "error";

type NextRoute = "/register" | "/home" | "/";

export function useKakaoExchange(code: string | null, state: string | null) {
  const [status, setStatus] = useState<BridgeStatus>("idle");
  const [progress, setProgress] = useState(20);
  const [token, setToken] = useState<string | null>(null);
  const [nextPath, setNextPath] = useState<NextRoute | null>(null);

  const setTokens = useAuthStore((s) => s.setTokens);
  const setSocialVerified = useAuthStore((s) => s.setSocialVerified);
  const currentRole = useUserStore((s) => s.currentRole);
  const setOnboardedForRole = useUserStore((s) => s.setOnboardedForRole);
  const ranRef = useRef(false);

  // 가짜 진행률
  useEffect(() => {
    const id = setInterval(() => setProgress((p) => (p < 85 ? p + 3 : p)), 250);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (ranRef.current) return;
    ranRef.current = true;

    (async () => {
      try {
        setStatus("validating");

        if (!currentRole) {
          throw new Error("역할 정보가 없습니다. 처음부터 다시 시도해 주세요.");
        }

        if (!code) {
          throw new Error("인증 코드가 없습니다.");
        }

        if (!validateState(state)) {
          throw new Error("잘못된 접근입니다. 다시 시도해 주세요.");
        }

        setStatus("exchanging");
        const res = await exchangeCode(code);

        if (!res) {
          throw new Error("카카오 코드 교환 실패");
        }
        setProgress(95);

        const accessToken: string | undefined = res.accessToken;
        const isOnboarding: boolean = !!res.isOnboarding;

        if (!accessToken) {
          throw new Error("로그인 토큰이 응답에 없습니다.");
        }

        setTokens({ accessToken });
        setToken(accessToken);
        setSocialVerified(true);

        if (isOnboarding) {
          setNextPath("/register");
        } else {
          setOnboardedForRole(currentRole, true);
          setNextPath("/home");
        }

        setProgress(100);
        setStatus("success");
      } catch {
        setProgress(100);
        setStatus("error");
        setSocialVerified(false);
        setNextPath((p) => p ?? "/");
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, state, currentRole, setTokens, setSocialVerified]);

  return { status, progress, token, nextPath };
}
