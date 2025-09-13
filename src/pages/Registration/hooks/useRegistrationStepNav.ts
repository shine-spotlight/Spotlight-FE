import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useRegistrationDraftStore } from "@stores/registrationStore";
import type { ArtistStep, SpaceStep } from "../types/steps";
import type { ArtistStepData, SpaceStepData } from "../types/payloads";
import { useUserStore } from "@stores/userStore";
import { mockArtists, mockSpaces } from "@stores/data";

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
    async (submitFn: (d: NonNullable<typeof draft>) => Promise<unknown>) => {
      const cur = useRegistrationDraftStore.getState().draft;
      if (!cur) return;

      await submitFn(cur); // 서버에서 받아온 유저 데이터를 저장하기

      if (cur.role == "artist") {
        useUserStore.getState().setProfileForRole(cur.role, mockArtists[0]);
      } else {
        useUserStore.getState().setProfileForRole(cur.role, mockSpaces[0]);
      }
      useUserStore.getState().setOnboardedForRole(cur.role, true);

      console.log(useUserStore.getState().profilesByRole);
      navigate("/home", { replace: true });

      setTimeout(() => {
        clearDraft();
      }, 0);
    },
    [clearDraft, navigate]
  );

  return {
    saveAndGoNext,
    saveAndGoPrev,
    saveCurrent,
    submitAll,
  };
}
