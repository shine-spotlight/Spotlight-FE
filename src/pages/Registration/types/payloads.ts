import type { RegionValue } from "@components/RegionPicker";

export type ArtistBasicPayload = {
  name: string;
  description: string;
  members: number;
  categories: string[];
  equipments: string[];
};
export type ArtistRegionCategoryPayload = { regions: RegionValue[] };

export type ArtistPortfolioPayload = {
  profileImageUrl: string;
  portfolioLinks: string[];
};
export type ArtistPayPayload = { desiredPay: number; isFreeAllowed: boolean };

export type ArtistStepData = {
  Basic?: ArtistBasicPayload;
  RegionCategory?: ArtistRegionCategoryPayload;
  Portfolio?: ArtistPortfolioPayload;
  Pay?: ArtistPayPayload;
};

/** 공간 payload들 */
export type SpaceBusinessPayload = { businessNumber: number };

export type SpaceAddressCapacityPayload = {
  placeName: string;
  address: string;
  kakaoMapLink?: string;
};
export type SpaceVenueBasicPayload = {
  placeImage: string;
  description: string;
  categories: string[];
  isOkayNoise: boolean;
  atmosphere: string[];
  capacitySeated: number;
  capacityStanding: number;
  equipments: string[];
};

export type SpaceCategoryPayload = { preferredCategories: string[] };

export type SpaceStepData = {
  Business?: SpaceBusinessPayload;
  AddressCapacity?: SpaceAddressCapacityPayload;
  VenueBasic?: SpaceVenueBasicPayload;
  Category?: SpaceCategoryPayload;
};
