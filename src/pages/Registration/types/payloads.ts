import type { RegionValue } from "@components/RegionPicker";

export type ArtistBasicPayload = {
  name: string;
  description: string;
  members: number;
  phoneNumber: string;
  categories: string[];
  customCategory?: string;
  equipments: string[];
};
export type ArtistRegionCategoryPayload = { regions: RegionValue[] };

export type ArtistPortfolioPayload = {
  profileImage: File | null;
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
export type SpaceBusinessPayload = {
  businessNumber: string;
  phoneNumber: string;
};

export type SpaceAddressCapacityPayload = {
  placeName: string;
  address: string;
  kakaoMapLink?: string;
  postalCode: string;
};

export type SpaceVenueBasicPayload = {
  placeImage: File | null;
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
