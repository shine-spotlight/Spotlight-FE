import {
  ARTIST_STEP_ORDER,
  SPACE_STEP_ORDER,
  type ArtistStep,
  type SpaceStep,
} from "../types/steps";
import type { UserRoleType } from "@models/user/user.type";
import type {
  ArtistStepData,
  ArtistBasicPayload,
  ArtistRegionCategoryPayload,
  ArtistPortfolioPayload,
  ArtistPayPayload,
} from "@pages/Registration/types/payloads";
import type {
  SpaceStepData,
  SpaceBusinessPayload,
  SpaceVenueBasicPayload,
  SpaceAddressCapacityPayload,
  SpaceCategoryPayload,
} from "@pages/Registration/types/payloads";
import type { RegistrationDraft } from "../types/draft";
import type { ArtistPOSTRequest } from "@models/artist/artist.dto";
import type { SpacePOSTRequest } from "@models/space/space.dto";

export const createInitialDraft = (role: UserRoleType): RegistrationDraft => {
  const now = new Date().toISOString();
  if (role === "artist") {
    const first: ArtistStep = ARTIST_STEP_ORDER[0];
    return { role: "artist", currentStep: first, data: {}, updatedAt: now };
  }
  const first: SpaceStep = SPACE_STEP_ORDER[0];
  return { role: "space", currentStep: first, data: {}, updatedAt: now };
};

function toRegionPayload(
  regions: NonNullable<ArtistRegionCategoryPayload["regions"]>
): string[] {
  if (!Array.isArray(regions) || regions.length === 0) {
    throw new Error("활동 지역을 1개 이상 선택해주세요.");
  }
  // "시/도 + 시군구"를 공백으로 이어붙임, sigungu 없으면 시/도만
  const list = regions
    .map((r) => [r.sido, r.sigungu ?? ""].join(" ").trim())
    .filter(Boolean);

  if (list.length === 0) {
    throw new Error("활동 지역을 1개 이상 선택해주세요.");
  }
  return Array.from(new Set(list));
}

// Artist의 Step 데이터들을 하나의 서버 DTO로 병합
export function buildArtistInfoFromSteps(
  data: Partial<ArtistStepData>
): ArtistPOSTRequest {
  const basic = data.Basic as ArtistBasicPayload;
  const region = data.RegionCategory as ArtistRegionCategoryPayload;
  const pf = data.Portfolio as ArtistPortfolioPayload;
  const pay = data.Pay as ArtistPayPayload;

  if (!basic) throw new Error("기본 정보가 없습니다.");
  if (!region) throw new Error("지역 정보가 없습니다.");
  if (!pay) throw new Error("페이 정보가 없습니다.");

  const regionPayload = toRegionPayload(region.regions ?? []);

  return {
    name: basic.name,
    bio: basic.description,
    number_of_members: basic.members,
    phone_number: basic.phoneNumber,
    categories: basic.categories,
    custom_category: basic.customCategory,
    equipments: basic.equipments,
    portfolio_links: pf?.portfolioLinks?.length ? pf.portfolioLinks : [],
    profile_image: pf?.profileImage,
    region: regionPayload,
    desired_pay: pay.desiredPay,
    is_free_allowed: !!pay.isFreeAllowed,
  };
}

// Space의 Step 데이터들을 하나의 서버 DTO로 병합
export function buildSpaceInfoFromSteps(
  data: Partial<SpaceStepData>
): SpacePOSTRequest {
  const business = data.Business as SpaceBusinessPayload;
  const address = data.AddressCapacity as
    | SpaceAddressCapacityPayload
    | undefined;
  const basic = data.VenueBasic as SpaceVenueBasicPayload;
  const category = data.Category as SpaceCategoryPayload;

  if (!business) throw new Error("사업자등록번호가 없습니다.");
  if (!address) throw new Error("장소 주소가 없습니다.");
  if (!basic) throw new Error("기본 정보가 없습니다.");
  if (!category) throw new Error("희망 공연 카테고리가 없습니다.");

  return {
    place_name: address.placeName,
    address: address.address,
    postal_code: address.postalCode,
    kakao_map_link: address.kakaoMapLink,
    categories: basic.categories,
    preferred_categories: category.preferredCategories,
    description: basic.description,
    capacity_seated: basic.capacitySeated,
    capacity_standing: basic.capacityStanding,
    business_registration_number: business.businessNumber,
    atmosphere: basic.atmosphere,
    place_image: basic.placeImage ? [basic.placeImage] : [],
    equipments: basic.equipments,
    phone_number: business.phoneNumber,
  };
}
