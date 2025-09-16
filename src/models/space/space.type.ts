// 내부 모델 — space
export type SpaceProfile = {
  id: number;
  role: "space";
  placeName: string;
  address: string;
  postalCode?: string;
  kakaoMapLink?: string;
  categoriesDisplay: string[];
  preferredCategoriesDisplay: string[];
  customCategory?: string;
  description?: string;
  capacitySeated: number;
  capacityStanding: number;
  businessRegistrationNumber: string;
  atmosphere: string[];
  placeImageUrl?: string;
  equipmentsDisplay: string[];
  phoneNumber?: string;
};
