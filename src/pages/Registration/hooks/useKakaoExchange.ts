import { useEffect, useRef, useState } from "react";
import { exchangeCode, validateState } from "@apis/users";
import { useAuthStore } from "@stores/authStore";
import { useUserStore } from "@stores/userStore";
import { setUserRole } from "@apis/users";

export type BridgeStatus =
  | "idle"
  | "validating"
  | "exchanging"
  | "success"
  | "error"
  | "role_mismatch";

type NextRoute = "/register" | "/home" | "/";

export function useKakaoExchange(code: string | null, state: string | null) {
  const [status, setStatus] = useState<BridgeStatus>("idle");
  const [progress, setProgress] = useState(20);
  const [token, setToken] = useState<string | null>(null);
  const [nextPath, setNextPath] = useState<NextRoute | null>(null);

  const setTokens = useAuthStore((s) => s.setTokens);
  const setSocialVerified = useAuthStore((s) => s.setSocialVerified);
  const currentRole = useUserStore((s) => s.currentRole);
  const setCurrentRole = useUserStore((s) => s.setCurrentRole);
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
        const userRole = res.user?.role;

        if (!accessToken) {
          throw new Error("로그인 토큰이 응답에 없습니다.");
        }

        setTokens({ accessToken });
        setToken(accessToken);
        setSocialVerified(true);

        // role 검증 로직
        if (userRole !== null) {
          // 이미 role이 있는 경우
          if (userRole === currentRole) {
            // 동일한 role이면 그대로 진행
            if (isOnboarding) {
              setNextPath("/register");
            } else {
              setOnboardedForRole(currentRole, true);
              setNextPath("/home");
            }
          } else {
            // 다른 role로 이미 회원가입되어 있음
            setProgress(100);
            setStatus("role_mismatch");
            setCurrentRole(null);
            setNextPath("/");
            return;
          }
        } else {
          setUserRole(currentRole).catch(() => {});

          // role이 null인 경우 - KakaoBridge에서 setUserRole 호출
          if (isOnboarding) {
            setNextPath("/register");
          } else {
            setOnboardedForRole(currentRole, true);
            setNextPath("/home");
          }
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
