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

        if (!accessToken) {
          throw new Error("로그인 토큰이 응답에 없습니다.");
        }

        setTokens({ accessToken });
        setToken(accessToken);
        setSocialVerified(true);

        const userRole = res.user?.role;

        // true/null => 회원가입 로직 미완료, false => 회원가입 로직 완료
        const artistFlag = res.is_artistonboarding;
        const spaceFlag = res.is_spaceonboarding;

        const needs = (flag: boolean | null | undefined) => !(flag === false);
        const artistNeeds = needs(artistFlag);
        const spaceNeeds = needs(spaceFlag);

        // ---------- 미스매치 판단 이전에 온보딩 상태로 예외 처리 ----------
        // 두 롤 모두 미완료이면 어떤 롤에도 고정되지 않은 상태로 판단한다.
        // currentRole로 role 설정 후 /register 진행
        const bothNotFinished = artistNeeds && spaceNeeds;

        if (userRole !== null && userRole !== currentRole) {
          if (bothNotFinished) {
            // 서버에 role이 기록되어 있지만 아직 양쪽 모두 온보딩 미완료라면
            // -> currentRole로 덮어써서 온보딩 시작 허용
            try {
              await setUserRole(currentRole);
            } catch {
              /* empty */
            }
            setOnboardedForRole(currentRole, false);
            setNextPath("/register");
            setProgress(100);
            setStatus("success");
            return;
          } else {
            // 한쪽이라도 완료(false) 상태가 있고, 서버 role과 currentRole이 다르면 진짜 미스매치
            setProgress(100);
            setStatus("role_mismatch");
            setCurrentRole(null);
            setNextPath("/");
            return;
          }
        }

        if (userRole === null) {
          // 서버 role이 없다면 현재 선택한 role을 서버에 기록
          try {
            await setUserRole(currentRole);
          } catch {
            /* empty */
          }
        }

        // 현재 role에 맞는 온보딩 플래그만 선택
        const roleFlag = currentRole === "artist" ? artistFlag : spaceFlag;
        const needsOnboarding = needs(roleFlag);
        setOnboardedForRole(currentRole, !needsOnboarding);

        if (needsOnboarding) {
          setOnboardedForRole(currentRole, false);
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
