import {
  ARTIST_STEP_ORDER,
  SPACE_STEP_ORDER,
  type ArtistStep,
  type SpaceStep,
} from "../types/steps";
import type { UserRoleType } from "@types";
import type {
  ArtistStepData,
  ArtistBasicPayload,
  ArtistRegionCategoryPayload,
  ArtistPortfolioPayload,
  ArtistPayPayload,
} from "@pages/Registration/types/payloads";
import type { RegistrationDraft } from "../types/draft";
import type { ArtistInfoRequest } from "@apis/artists";

export const createInitialDraft = (role: UserRoleType): RegistrationDraft => {
  const now = new Date().toISOString();
  if (role === "artist") {
    const first: ArtistStep = ARTIST_STEP_ORDER[0];
    return { role: "artist", currentStep: first, data: {}, updatedAt: now };
  }
  const first: SpaceStep = SPACE_STEP_ORDER[0];
  return { role: "space", currentStep: first, data: {}, updatedAt: now };
};

/** 라벨 -> 카테고리ID 매핑 (백엔드와 동일한 ID 테이블로 맞춰주세요) */
const ARTIST_CATEGORY_LABEL_TO_ID: Record<string, number> = {
  밴드: 1,
  싱어송라이터: 2,
  재즈: 3,
  악기연주: 4,
};

function resolveCategoryId(categories: string[]): number {
  const label = categories?.[0];
  if (!label) throw new Error("카테고리를 1개 선택해주세요.");
  const id = ARTIST_CATEGORY_LABEL_TO_ID[label];
  if (!id) throw new Error(`'${label}' 카테고리 ID 매핑이 없습니다.`);
  return id;
}

function toRegionPayload(
  regions: NonNullable<ArtistRegionCategoryPayload["regions"]>
): ArtistInfoRequest["region"] {
  const r = regions?.[0];
  if (!r) throw new Error("활동 지역을 1개 이상 선택해주세요.");
  return { sido: r.sido, sigungu: r.sigungu ?? null };
}

/** Step 데이터들을 하나의 서버 DTO로 병합 */
export function buildArtistInfoFromSteps(
  data: Partial<ArtistStepData>
): ArtistInfoRequest {
  const basic = data.Basic as ArtistBasicPayload | undefined;
  const region = data.RegionCategory as ArtistRegionCategoryPayload | undefined;
  const pf = data.Portfolio as ArtistPortfolioPayload | undefined;
  const pay = data.Pay as ArtistPayPayload | undefined;

  if (!basic) throw new Error("기본 정보가 없습니다.");
  if (!region) throw new Error("지역 정보가 없습니다.");
  if (!pay) throw new Error("페이 정보가 없습니다.");

  const category_id = resolveCategoryId(basic.categories);
  const regionPayload = toRegionPayload(region.regions ?? []);

  return {
    user: 1,
    name: basic.name,
    bio: basic.description || null,
    number_of_members: basic.members,
    category_id,
    // custom_category: 필요 시만 셋
    portfolio_links: pf?.portfolioLinks?.length ? pf.portfolioLinks : undefined,
    profile_image_url: pf?.profileImageUrl || null,
    region: regionPayload,
    desired_pay: pay.isFreeAllowed ? null : pay.desiredPay || null,
    is_free_allowed: !!pay.isFreeAllowed,
  };
}
