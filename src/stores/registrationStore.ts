import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";
import type { RegistrationDraft } from "@pages/Registration/types/draft";
import type { ArtistStep, SpaceStep } from "@pages/Registration/types/steps";
import { ARTIST_STEP, SPACE_STEP } from "@pages/Registration/types/steps";
import type {
  ArtistStepData,
  SpaceStepData,
} from "@pages/Registration/types/payloads";
import {
  SPACE_STEP_ORDER,
  ARTIST_STEP_ORDER,
} from "@pages/Registration/types/steps";
import type { UserRoleType } from "@types";
import type { SpaceVenueBasicPayload } from "@pages/Registration/types/payloads";
import type { ArtistPortfolioPayload } from "@pages/Registration/types/payloads";
import type { ArtistDraft, SpaceDraft } from "@pages/Registration/types/draft";

const nextOf = <S extends ArtistStep | SpaceStep>(
  order: readonly S[],
  cur: S
): S | null => {
  const i = order.indexOf(cur);
  return i >= 0 && i < order.length - 1 ? order[i + 1] : null;
};
const prevOf = <S extends ArtistStep | SpaceStep>(
  order: readonly S[],
  cur: S
): S | null => {
  const i = order.indexOf(cur);
  return i > 0 ? order[i - 1] : null;
};

const looksLikeDataUrl = (v?: string | null) =>
  !!v && typeof v === "string" && v.startsWith("data:");

function pruneDraft(draft: RegistrationDraft | null): RegistrationDraft | null {
  if (!draft) return null;

  if (draft.role === "artist") {
    const data = { ...draft.data };

    const port = data[ARTIST_STEP.Portfolio] as
      | ArtistPortfolioPayload
      | undefined;
    if (port) {
      if (looksLikeDataUrl(port.profileImageUrl)) {
        // data URL은 저장하지 않음 (미리보기 전용은 컴포넌트 state로만)
        port.profileImageUrl = "";
      }
      // 링크가 과도하게 많으면 절단 (선택)
      if (
        Array.isArray(port.portfolioLinks) &&
        port.portfolioLinks.length > 30
      ) {
        port.portfolioLinks = port.portfolioLinks.slice(0, 30);
      }
      data[ARTIST_STEP.Portfolio] = port;
    }

    return { ...draft, data };
  }

  if (draft.role === "space") {
    const data = { ...draft.data };

    const venue = data[SPACE_STEP.VenueBasic] as
      | SpaceVenueBasicPayload
      | undefined;
    if (venue) {
      // 예: 공간 이미지도 data URL이면 제거
      // (필드명이 placeImageUrl 등이라면 여기에 맞춰 제거)
      // if (looksLikeDataUrl(venue.placeImageUrl)) venue.placeImageUrl = undefined;
      data[SPACE_STEP.VenueBasic] = venue;
    }

    return { ...draft, data };
  }

  return draft;
}

function sanitizePayload(
  role: UserRoleType,
  step: ArtistStep | SpaceStep,
  payload: unknown
) {
  if (role === "artist" && step === ARTIST_STEP.Portfolio) {
    const p = payload as ArtistPortfolioPayload;
    if (looksLikeDataUrl(p?.profileImageUrl)) {
      return { ...p, profileImageUrl: "" } as ArtistPortfolioPayload;
    }
    return p;
  }
  //TODO: 공간 쪽도 필요시 동일하게 처리
  return payload;
}

type RegistrationDraftState = {
  draft: RegistrationDraft | null;

  chooseRole: (role: UserRoleType) => void;
  updateCurrentStepData: (
    data: ArtistStepData[ArtistStep] | SpaceStepData[SpaceStep]
  ) => void;
  nextStep: () => void;
  prevStep: () => void;
  clear: () => void;
};

export const useRegistrationDraftStore = create<RegistrationDraftState>()(
  devtools(
    persist(
      (set) => ({
        draft: null,
        chooseRole: (role) =>
          set(() => {
            const updatedAt = new Date().toISOString();
            if (role === "artist") {
              return {
                draft: {
                  role: "artist",
                  currentStep: ARTIST_STEP.Basic,
                  data: {},
                  updatedAt,
                } as ArtistDraft,
              };
            }
            return {
              draft: {
                role: "space",
                currentStep: SPACE_STEP.Business,
                data: {},
                updatedAt,
              } as SpaceDraft,
            };
          }),

        updateCurrentStepData: (data) =>
          set((state) => {
            const d = state.draft;
            if (!d) return state;
            const updatedAt = new Date().toISOString();

            if (d.role === "artist") {
              const step = d.currentStep as ArtistStep;
              const safe = sanitizePayload(
                "artist",
                step,
                data
              ) as ArtistStepData[ArtistStep];
              return {
                draft: {
                  ...d,
                  data: { ...d.data, [step]: safe },
                  updatedAt,
                } as ArtistDraft,
              };
            } else {
              const step = d.currentStep as SpaceStep;
              const safe = sanitizePayload(
                "space",
                step,
                data
              ) as SpaceStepData[SpaceStep];
              return {
                draft: {
                  ...d,
                  data: { ...d.data, [step]: safe },
                  updatedAt,
                } as SpaceDraft,
              };
            }
          }),

        nextStep: () =>
          set((state) => {
            const d = state.draft;
            if (!d) return state;

            const updatedAt = new Date().toISOString();

            if (d.role === "artist") {
              const next = nextOf(
                ARTIST_STEP_ORDER,
                d.currentStep as ArtistStep
              );
              return next
                ? ({ draft: { ...d, currentStep: next, updatedAt } } as const)
                : state; // 마지막이면 그대로
            } else {
              const next = nextOf(SPACE_STEP_ORDER, d.currentStep as SpaceStep);
              return next
                ? ({ draft: { ...d, currentStep: next, updatedAt } } as const)
                : state;
            }
          }),
        prevStep: () =>
          set((state) => {
            const d = state.draft;
            if (!d) return state;

            const updatedAt = new Date().toISOString();

            if (d.role === "artist") {
              const prev = prevOf(
                ARTIST_STEP_ORDER,
                d.currentStep as ArtistStep
              );
              return prev
                ? ({ draft: { ...d, currentStep: prev, updatedAt } } as const)
                : state;
            } else {
              const prev = prevOf(SPACE_STEP_ORDER, d.currentStep as SpaceStep);
              return prev
                ? ({ draft: { ...d, currentStep: prev, updatedAt } } as const)
                : state;
            }
          }),
        clear: () => set({ draft: null }),
      }),
      {
        name: "registration-draft",
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          draft: pruneDraft(state.draft),
        }),
      }
    )
  )
);
