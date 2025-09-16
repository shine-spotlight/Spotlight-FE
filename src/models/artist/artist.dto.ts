// ArtistProfile 요청 DTO
export type ArtistProfileDTO = {
  name: string;
  bio: string;
  number_of_members: number;
  categories: string[];
  custom_category?: string | null;
  equipments: string[];
  portfolio_links: string[];
  profile_image_url?: string | null;
  region: string[];
  desired_pay: number;
  is_free_allowed: boolean;
  phone_number: string;
};

// Artist Request 타입
export type ArtistPOSTRequest = ArtistProfileDTO;

// Artist Response 타입
export type ArtistResponse = ArtistProfileDTO & { id: number };
export type ArtistDetailResponse = ArtistResponse;
export type ArtistListResponse = ArtistResponse[];
