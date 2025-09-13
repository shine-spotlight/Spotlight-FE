import { Navigate } from "react-router-dom";
import { useRegistrationDraftStore } from "@stores/registrationStore";
import { useAuthStore } from "@stores/authStore";
import {
  ARTIST_STEP,
  SPACE_STEP,
  ARTIST_STEP_ORDER,
  SPACE_STEP_ORDER,
  type ArtistStep,
  type SpaceStep,
} from "@pages/Registration/types/steps";
import type {
  ArtistBasicPayload,
  ArtistRegionCategoryPayload,
  //   ArtistPortfolioPayload,
  ArtistPayPayload,
  SpaceBusinessPayload,
  SpaceAddressCapacityPayload,
  SpaceVenueBasicPayload,
  SpaceCategoryPayload,
} from "@pages/Registration/types/payloads";
import type {
  SpaceStepData,
  ArtistStepData,
} from "@pages/Registration/types/payloads";

function hasArtistStepCompleted(
  draftData: Partial<ArtistStepData>,
  step: ArtistStep
) {
  const d = draftData?.[step];
  switch (step) {
    case ARTIST_STEP.Basic: {
      const v = d as ArtistBasicPayload | undefined;
      return !!v?.name && typeof v?.members === "number";
    }
    case ARTIST_STEP.RegionCategory: {
      const v = d as ArtistRegionCategoryPayload | undefined;
      return Array.isArray(v?.regions) && v.regions.length > 0;
    }
    case ARTIST_STEP.Portfolio: {
      // const _v = d as ArtistPortfolioPayload | undefined;
      // 선택적이면 true
      return true;
    }
    case ARTIST_STEP.Pay: {
      const v = d as ArtistPayPayload | undefined;
      return typeof v?.desiredPay === "number" || v?.isFreeAllowed === true;
    }
    default:
      return false;
  }
}

function hasSpaceStepCompleted(
  draftData: Partial<SpaceStepData>,
  step: SpaceStep
) {
  const d = draftData?.[step];
  switch (step) {
    case SPACE_STEP.Business: {
      const v = d as SpaceBusinessPayload | undefined;
      return !!v?.businessNumber;
    }
    case SPACE_STEP.AddressCapacity: {
      const v = d as SpaceAddressCapacityPayload | undefined;
      return !!v?.placeName && !!v?.address;
    }
    case SPACE_STEP.VenueBasic: {
      const v = d as SpaceVenueBasicPayload | undefined;
      return !!v?.description;
    }
    case SPACE_STEP.Category: {
      const v = d as SpaceCategoryPayload | undefined;
      return Array.isArray(v?.preferredCategories);
    }
    default:
      return false;
  }
}

function firstIncompleteArtistStep(data: Partial<ArtistStepData>): ArtistStep {
  for (const s of ARTIST_STEP_ORDER) {
    if (!hasArtistStepCompleted(data, s)) return s;
  }
  return ARTIST_STEP_ORDER[ARTIST_STEP_ORDER.length - 1];
}
function firstIncompleteSpaceStep(data: Partial<SpaceStepData>): SpaceStep {
  for (const s of SPACE_STEP_ORDER) {
    if (!hasSpaceStepCompleted(data, s)) return s;
  }
  return SPACE_STEP_ORDER[SPACE_STEP_ORDER.length - 1];
}

const pathOfArtistStep: Record<ArtistStep, string> = {
  Basic: "/register/artist/basic",
  RegionCategory: "/register/artist/region",
  Portfolio: "/register/artist/portfolio",
  Pay: "/register/artist/pay",
};

const pathOfSpaceStep: Record<SpaceStep, string> = {
  Business: "/register/space/business",
  AddressCapacity: "/register/space/address",
  VenueBasic: "/register/space/venue",
  Category: "/register/space/category",
};

type Props =
  | { role: "artist"; step: ArtistStep; children: React.ReactNode }
  | { role: "space"; step: SpaceStep; children: React.ReactNode };

export function StepGuard(props: Props) {
  const draft = useRegistrationDraftStore((s) => s.draft);
  const verified = useAuthStore((s) => s.socialVerified);

  if (!draft) {
    return <Navigate to="/" replace />;
  }

  if (!verified) {
    return <Navigate to="/register/verify" replace />;
  }

  // 역할 가드
  if (draft.role !== props.role) {
    return <Navigate to="/" replace />;
  }

  // 허용 가능한 최대 단계 계산 + 비교
  if (draft.role === "artist" && props.role === "artist") {
    if (!verified) {
      return <Navigate to="/register/verify" replace />;
    }

    const firstIncomplete = firstIncompleteArtistStep(draft.data);
    const allowedIndex = ARTIST_STEP_ORDER.indexOf(firstIncomplete);
    const currentIndex = ARTIST_STEP_ORDER.indexOf(props.step);

    if (currentIndex > allowedIndex) {
      // 뒤 단계로 점프 → 허용 첫 단계로 돌려보냄
      return <Navigate to={pathOfArtistStep[firstIncomplete]} replace />;
    }
  }

  if (draft.role === "space" && props.role === "space") {
    const firstIncomplete = firstIncompleteSpaceStep(draft.data);
    const allowedIndex = SPACE_STEP_ORDER.indexOf(firstIncomplete);
    const currentIndex = SPACE_STEP_ORDER.indexOf(props.step);

    if (currentIndex > allowedIndex) {
      return <Navigate to={pathOfSpaceStep[firstIncomplete]} replace />;
    }
  }

  return <>{props.children}</>;
}
