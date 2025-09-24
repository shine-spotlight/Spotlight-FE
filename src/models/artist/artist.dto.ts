// ArtistProfile 요청 DTO
export type ArtistProfileDTO = {
  name: string;
  bio: string;
  number_of_members: number;
  categories: string[];
  categories_display?: string[];
  custom_category?: string | null;
  equipments: string[];
  equipments_display?: string[];
  portfolio_links: string[];
  portfolio_links_display?: string[];
  profile_image_url?: string | null;
  profile_image: File | null;
  region: string[];
  region_display?: string[];
  desired_pay: number;
  is_free_allowed: boolean;
  phone_number: string;
  is_liked?: boolean;
};

// Artist Request 타입
export type ArtistPOSTRequest = ArtistProfileDTO;

// Artist Response 타입
export type ArtistResponse = ArtistProfileDTO & { id: number };
export type ArtistDetailResponse = ArtistResponse;
export type ArtistListResponse = ArtistResponse[];
