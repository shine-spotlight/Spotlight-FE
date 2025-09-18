import { Outlet } from "react-router-dom";
import * as S from "./index.styles";
import { useEffect } from "react";
import { useRegistrationDraftStore } from "@stores/registrationStore";
import { useAuthStore } from "@stores/authStore";
import {
  ARTIST_STEP_ORDER,
  SPACE_STEP_ORDER,
  ARTIST_STEP_LABEL,
  SPACE_STEP_LABEL,
} from "../../types/steps";
import { USER_ROLE_TYPE_LABELS } from "@constants/user";
import { Topbar } from "@components/Topbar";
import { useNavigate } from "react-router-dom";

export default function ProtectedRegistrationLayout() {
  const navigate = useNavigate();
  const draft = useRegistrationDraftStore((s) => s.draft);
  const verified = useAuthStore((s) => s.socialVerified);
  const isArtist = draft?.role === "artist";
  const steps = isArtist ? ARTIST_STEP_ORDER : SPACE_STEP_ORDER;

  useEffect(() => {
    if (!verified) {
      navigate("/register/verify", { replace: true });
      return;
    }
    // draft가 없을 때는 RegisterIndexRedirect에서 처리하도록 제거
  }, [verified, navigate]);

  // 리다이렉트 중일 때 깜빡임 방지용 최소 UI
  if (!verified || !draft) return null;

  return (
    <S.Container>
      <Topbar
        title={`${USER_ROLE_TYPE_LABELS[draft.role]} 회원가입`}
        goBack={() => navigate("/register/verify")}
      />
      <S.ContentContainer>
        <S.Stepper>
          {steps.map((s, idx) => {
            const active = s === draft.currentStep;
            const num = String(idx + 1).padStart(2, "0");

            return (
              <S.Step key={s} data-active={active ? "true" : "false"}>
                {active ? (
                  <>
                    <S.StepNum>{num}</S.StepNum>
                    <S.StepLabel>
                      {draft.role === "artist"
                        ? ARTIST_STEP_LABEL[s as keyof typeof ARTIST_STEP_LABEL]
                        : SPACE_STEP_LABEL[s as keyof typeof SPACE_STEP_LABEL]}
                    </S.StepLabel>
                  </>
                ) : (
                  <S.StepNumOnly>{num}</S.StepNumOnly>
                )}
              </S.Step>
            );
          })}
        </S.Stepper>
        <Outlet />
      </S.ContentContainer>
    </S.Container>
  );
}
