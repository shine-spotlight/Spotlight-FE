// 내부 모델 — space
export type SpaceProfile = {
  id: number;
  role: "space";
  placeName: string;
  address: string;
  postalCode?: string;
  kakaoMapLink?: string;
  // categories: string[];
  categoriesDisplay: string[];
  // preferredCategories: string[];
  preferredCategoriesDisplay: string[];
  customCategory?: string;
  description?: string;
  capacitySeated: number;
  capacityStanding: number;
  businessRegistrationNumber: string;
  atmosphere: string[];
  placeImageUrl?: string[];
  // equipments: string[];
  equipmentsDisplay: string[];
  phoneNumber?: string;
  isLiked?: boolean;
};
