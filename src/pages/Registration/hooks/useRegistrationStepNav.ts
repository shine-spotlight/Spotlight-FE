import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useRegistrationDraftStore } from "@stores/registrationStore";
import type { ArtistStep, SpaceStep } from "../types/steps";
import type { ArtistStepData, SpaceStepData } from "../types/payloads";
import { useUserStore } from "@stores/userStore";
import type { UserProfile } from "@models/user/user.type";

type StepPayload = ArtistStepData[ArtistStep] | SpaceStepData[SpaceStep];

export function useRegistrationStepNav() {
  const navigate = useNavigate();
  const draft = useRegistrationDraftStore((s) => s.draft);
  const updateCurrentStepData = useRegistrationDraftStore(
    (s) => s.updateCurrentStepData
  );
  const nextStep = useRegistrationDraftStore((s) => s.nextStep);
  const prevStep = useRegistrationDraftStore((s) => s.prevStep);
  const clearDraft = useRegistrationDraftStore((s) => s.clear);
  const setOnboardedForRole = useUserStore((s) => s.setOnboardedForRole);
  const setProfileForRole = useUserStore((s) => s.setProfileForRole);

  // 현재 draft 반영 후 목표 경로로 이동
  const redirectToCurrent = useCallback(() => {
    const cur = useRegistrationDraftStore.getState().draft;
    if (!cur) return;
    navigate("/register", { replace: true });
  }, [navigate]);

  // 다음 스탭으로 이동
  const saveAndGoNext = useCallback(
    (payload: StepPayload) => {
      if (!draft) return;
      updateCurrentStepData(payload);
      nextStep();
      redirectToCurrent();
    },
    [draft, updateCurrentStepData, nextStep, redirectToCurrent]
  );

  // 이전 스탭으로 이동
  const saveAndGoPrev = useCallback(
    (payload: StepPayload) => {
      if (!draft) return;
      updateCurrentStepData(payload);
      prevStep();
      redirectToCurrent();
    },
    [draft, updateCurrentStepData, prevStep, redirectToCurrent]
  );

  const saveCurrent = useCallback(
    (payload: StepPayload) => {
      updateCurrentStepData(payload);
    },
    [updateCurrentStepData]
  );

  const submitAll = useCallback(
    async (
      submitFn: (d: NonNullable<typeof draft>) => Promise<UserProfile>
    ) => {
      const cur = useRegistrationDraftStore.getState().draft;
      if (!cur) return;

      try {
        const profile = await submitFn(cur); // 서버에서 받아온 유저 데이터를 저장하기
        setProfileForRole(cur.role, profile);

        console.log(useUserStore.getState().profilesByRole);

        // 성공 시에만 draft를 정리하고 home으로 이동
        clearDraft();
        setOnboardedForRole(cur.role, true);

        navigate("/home", { replace: true });
      } catch (error) {
        navigate("/", { replace: true });
        throw error;
      }
    },
    [clearDraft, navigate, setOnboardedForRole, setProfileForRole]
  );

  return {
    saveAndGoNext,
    saveAndGoPrev,
    saveCurrent,
    submitAll,
  };
}
