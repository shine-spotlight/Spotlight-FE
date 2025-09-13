import { useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { LogoIcon } from "@assets/svg/common";
import { useKakaoExchange } from "../../hooks/useKakaoExchange";
import { setUserRole } from "@apis/users";
import { useUserStore } from "@stores/userStore";
import * as S from "./index.styles";

export default function KakaoBridge() {
  const navigate = useNavigate();
  const currentRole = useUserStore((s) => s.currentRole);

  const qs = useMemo(() => new URLSearchParams(window.location.search), []);
  const code = qs.get("code");
  const state = qs.get("state");

  const { status, progress, token } = useKakaoExchange(code, state);

  const doneRef = useRef(false);

  useEffect(() => {
    if (status !== "success") return;
    if (!token) return;
    if (doneRef.current) return;
    doneRef.current = true;

    (async () => {
      try {
        if (currentRole) {
          await setUserRole(currentRole);
        }
      } catch (e) {
        console.error("setUserRole 실패(진행 계속):", e);
      } finally {
        window.history.replaceState(null, "", location.pathname);
        navigate("/register", { replace: true });
      }
    })();
  }, [status, token, currentRole, navigate]);

  const isError = status === "error";

  return (
    <S.Wrap role="status" aria-live="polite">
      <S.Card>
        <S.Brand>
          <LogoIcon width={150} height={50} />
        </S.Brand>
        <S.Progress aria-hidden>
          <S.Bar style={{ width: `${progress}%` }} />
        </S.Progress>
        <S.Title>
          {isError
            ? "로그인 처리 중 문제가 발생했어요"
            : "카카오 로그인 처리 중…"}
        </S.Title>
        <S.Hint>창을 닫지 말고 잠시만 기다려주세요.</S.Hint>
        <S.Row>
          <S.GhostButton onClick={() => navigate("/", { replace: true })}>
            홈으로
          </S.GhostButton>
          <S.PrimaryButton
            disabled={!isError && status !== "success"}
            onClick={() => (window.location.href = "/register")}
          >
            회원가입 계속
          </S.PrimaryButton>
        </S.Row>
      </S.Card>
    </S.Wrap>
  );
}
