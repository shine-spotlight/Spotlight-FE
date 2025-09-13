export type UserRoleType = "artist" | "space";

export type NavMenuItem = {
  id: string;
  label: string;
  path: string;
  roles: UserRoleType[];
};

export type ArtistProfile = {
  role: "artist";
  id: number;
  userId: number;
  name: string;
  bio: string;
  numberOfMembers: number;
  categoryId: number;
  categoryName?: string;
  customCategory?: string;
  equipments: string[];
  portfolioLinks: string[];
  profileImageUrl?: string;
  region: string[];
  desiredPay: number;
  isFreeAllowed: boolean;
  phoneNumber: string;
  createdAt: string;
};

// 내부 모델 — 공간
export type SpaceProfile = {
  role: "space";
  id: number;
  userId: number;
  placeName: string;
  address: string;
  postalCode?: string;
  kakaoMapLink?: string;
  category: string;
  description: string;
  capacitySeated: number;
  capacityStanding: number;
  preferredCategories: number[];
  businessNumber: string;
  atmosphere: string[];
  placeRegion?: string;
  placeImageUrl?: string;
  equipments: string[];
  phoneNumber: string;
  createdAt: Date;
};

export type UserProfile = ArtistProfile | SpaceProfile;

// 타입가드
export const isArtistProfile = (p: UserProfile): p is ArtistProfile =>
  p.role === "artist";
export const isSpaceProfile = (p: UserProfile): p is SpaceProfile =>
  p.role === "space";
