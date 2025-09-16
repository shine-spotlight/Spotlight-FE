import { useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { LogoIcon } from "@assets/svg/common";
import { useKakaoExchange } from "../../hooks/useKakaoExchange";
import { useUserStore } from "@stores/userStore";
import * as S from "./index.styles";

export default function KakaoBridge() {
  const navigate = useNavigate();
  const currentRole = useUserStore((s) => s.currentRole);
  const qs = useMemo(() => new URLSearchParams(window.location.search), []);
  const code = qs.get("code");
  const state = qs.get("state");

  const { status, progress, token, nextPath } = useKakaoExchange(code, state);

  const jumpedRef = useRef(false);

  useEffect(() => {
    if (!nextPath || jumpedRef.current) return;
    jumpedRef.current = true;

    (async () => {
      if (status !== "role_mismatch") {
        window.history.replaceState(null, "", location.pathname);
        navigate(nextPath, { replace: true });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nextPath, status, token, currentRole]);

  // role 불일치 시 자동으로 메인 페이지로 이동
  useEffect(() => {
    if (status === "role_mismatch" && !jumpedRef.current) {
      jumpedRef.current = true;
      const timer = setTimeout(() => {
        window.history.replaceState(null, "", location.pathname);
        navigate("/", { replace: true });
      }, 3000); // 3초 후 자동 이동

      return () => clearTimeout(timer);
    }
  }, [status, navigate]);

  const isError = status === "error";
  const isRoleMismatch = status === "role_mismatch";

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
            : isRoleMismatch
            ? "이미 다른 역할로 가입된 계정입니다"
            : "카카오 로그인 처리 중…"}
        </S.Title>
        <S.Hint>
          {isRoleMismatch
            ? "이미 다른 역할로 회원가입이 되어있습니다. 시작 페이지로 이동합니다."
            : "창을 닫지 말고 잠시만 기다려주세요."}
        </S.Hint>

        <S.GhostButton onClick={() => navigate("/", { replace: true })}>
          {isRoleMismatch ? "시작 페이지로" : "홈으로"}
        </S.GhostButton>
      </S.Card>
    </S.Wrap>
  );
}
