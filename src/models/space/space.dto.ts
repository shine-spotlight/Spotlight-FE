// SpaceProfile 요청 DTO
export type SpaceProfileDTO = {
  place_name: string;
  categories: string[];
  categories_display?: string[];
  place_image: File[] | null;
  equipments: string[];
  equipments_display?: string[];
  address: string;
  postal_code?: string;
  kakao_map_link?: string;
  preferred_categories: string[];
  preferred_categories_display?: string[];
  custom_category?: string;
  description?: string;
  capacity_seated: number;
  capacity_standing: number;
  business_registration_number: string;
  atmosphere: string[];
  place_image_url?: string[] | null;
  phone_number: string;
  place_region?: string;
  is_liked?: boolean;
};

// Space Request 타입
export type SpacePOSTRequest = SpaceProfileDTO;

// Space Response 타입
export type SpaceResponse = SpaceProfileDTO & { id: number; user?: number };
export type SpaceListResponse = SpaceResponse[];
export type SpaceDetailResponse = SpaceResponse;
