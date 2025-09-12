export const ARTIST_STEP = {
  Basic: "Basic",
  RegionCategory: "RegionCategory",
  Portfolio: "Portfolio",
  Pay: "Pay",
} as const;
export type ArtistStep = (typeof ARTIST_STEP)[keyof typeof ARTIST_STEP];

export const SPACE_STEP = {
  Business: "Business",
  AddressCapacity: "AddressCapacity",
  VenueBasic: "VenueBasic",
  Category: "Category",
} as const;
export type SpaceStep = (typeof SPACE_STEP)[keyof typeof SPACE_STEP];

/** 순서 */
export const ARTIST_STEP_ORDER = [
  ARTIST_STEP.Basic,
  ARTIST_STEP.RegionCategory,
  ARTIST_STEP.Portfolio,
  ARTIST_STEP.Pay,
] as const satisfies readonly ArtistStep[];

export const SPACE_STEP_ORDER = [
  SPACE_STEP.Business,
  SPACE_STEP.AddressCapacity,
  SPACE_STEP.VenueBasic,
  SPACE_STEP.Category,
] as const satisfies readonly SpaceStep[];

/** 라벨 */
export const ARTIST_STEP_LABEL: Record<ArtistStep, string> = {
  [ARTIST_STEP.Basic]: "정보 입력",
  [ARTIST_STEP.RegionCategory]: "지역 입력",
  [ARTIST_STEP.Portfolio]: "포트폴리오 입력",
  [ARTIST_STEP.Pay]: "희망 페이 입력",
};
export const SPACE_STEP_LABEL: Record<SpaceStep, string> = {
  [SPACE_STEP.Business]: "사업자 인증",
  [SPACE_STEP.AddressCapacity]: "공간 등록",
  [SPACE_STEP.VenueBasic]: "공간 기본 정보 입력",
  [SPACE_STEP.Category]: "공간 형태 선택",
};
