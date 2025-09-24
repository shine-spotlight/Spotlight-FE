import type { RegionValue } from "@types";
// Artist 내부 모델
export type ArtistProfile = {
  id: number;
  role: "artist";
  name: string;
  bio?: string;
  numberOfMembers: number;
  // categories: string[];
  categoriesDisplay: string[];
  customCategory?: string;
  // equipments: string[];
  equipmentsDisplay: string[];
  portfolioLinks: string[];
  portfolioLinksDisplay: string[];
  profileImageUrl?: string;
  region: string[];
  regionDisplay: string[];
  desiredPay: number;
  isFreeAllowed: boolean;
  phoneNumber?: string;
  isLiked?: boolean;
};

export type ArtistFilter = {
  region?: string[];
  categories?: string[];
  payMin?: number;
  payMax?: number;
  regions?: RegionValue[];
};
