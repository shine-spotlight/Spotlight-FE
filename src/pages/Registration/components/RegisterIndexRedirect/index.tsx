import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRegistrationDraftStore } from "@stores/registrationStore";
import { ARTIST_STEP, SPACE_STEP } from "@pages/Registration/types/steps";
import { useAuthStore } from "@stores/authStore";

const ARTIST_PATH = {
  [ARTIST_STEP.Basic]: "artist/basic",
  [ARTIST_STEP.RegionCategory]: "artist/region",
  [ARTIST_STEP.Portfolio]: "artist/portfolio",
  [ARTIST_STEP.Pay]: "artist/pay",
} as const;

const SPACE_PATH = {
  [SPACE_STEP.Business]: "space/business",
  [SPACE_STEP.AddressCapacity]: "space/address",
  [SPACE_STEP.VenueBasic]: "space/venue",
  [SPACE_STEP.Category]: "space/category",
} as const;

export default function RegisterIndexRedirect() {
  const draft = useRegistrationDraftStore((s) => s.draft);
  const verified = useAuthStore((s) => s.socialVerified);
  const nav = useNavigate();

  useEffect(() => {
    if (!draft) {
      nav("/home", { replace: true });
      return;
    }

    if (!verified) {
      nav("/register/verify", { replace: true });
      return;
    }

    const path =
      draft.role === "artist"
        ? ARTIST_PATH[draft.currentStep]
        : SPACE_PATH[draft.currentStep];

    nav(`/register/${path}`, { replace: true });
  }, [draft, nav, verified]);

  return null;
}
