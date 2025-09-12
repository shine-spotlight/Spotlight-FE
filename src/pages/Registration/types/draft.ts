import type { ArtistStep, SpaceStep } from "./steps";
import type { ArtistStepData, SpaceStepData } from "./payloads";

export type ArtistDraft = {
  role: "artist";
  currentStep: ArtistStep;
  data: Partial<ArtistStepData>;
  updatedAt: string;
};

export type SpaceDraft = {
  role: "space";
  currentStep: SpaceStep;
  data: Partial<SpaceStepData>;
  updatedAt: string;
};

export type RegistrationDraft = ArtistDraft | SpaceDraft;
