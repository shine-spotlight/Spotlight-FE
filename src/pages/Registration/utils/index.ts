import {
  ARTIST_STEP_ORDER,
  SPACE_STEP_ORDER,
  type ArtistStep,
  type SpaceStep,
} from "../types/steps";
import type { UserRoleType } from "@types";
import type { RegistrationDraft } from "../types/draft";

export const createInitialDraft = (role: UserRoleType): RegistrationDraft => {
  const now = new Date().toISOString();
  if (role === "artist") {
    const first: ArtistStep = ARTIST_STEP_ORDER[0];
    return { role: "artist", currentStep: first, data: {}, updatedAt: now };
  }
  const first: SpaceStep = SPACE_STEP_ORDER[0];
  return { role: "space", currentStep: first, data: {}, updatedAt: now };
};
