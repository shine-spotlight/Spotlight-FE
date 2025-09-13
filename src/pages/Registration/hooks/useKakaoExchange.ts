import { useEffect, useRef, useState } from "react";
import { exchangeCode, validateState } from "@apis/users";
import { useAuthStore } from "@stores/authStore";

export type BridgeStatus =
  | "idle"
  | "validating"
  | "exchanging"
  | "success"
  | "error";

export function useKakaoExchange(code: string | null, state: string | null) {
  const [status, setStatus] = useState<BridgeStatus>("idle");
  const [progress, setProgress] = useState(20);
  const [token, setToken] = useState<string | null>(null);

  const setTokens = useAuthStore((s) => s.setTokens);
  const setSocialVerified = useAuthStore((s) => s.setSocialVerified);
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
        if (!code) throw new Error("인증 코드가 없습니다.");
        if (!validateState(state)) throw new Error("state 검증 실패");

        setStatus("exchanging");
        const res = await exchangeCode(code);

        if (!res.status) {
          throw new Error("카카오 코드 교환 실패");
        }
        setProgress(95);

        const token = res.data?.accessToken;
        if (!token) throw new Error("토큰이 응답에 없습니다.");

        setTokens({ accessToken: token });
        setSocialVerified(true);
        setToken(token);

        setProgress(100);
        setStatus("success");
      } catch {
        setProgress(100);
        setStatus("error");
      }
    })();
  }, [code, state, setTokens, setSocialVerified]);

  return { status, progress, token };
}
