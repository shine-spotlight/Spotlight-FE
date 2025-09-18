type ArtistRef = { id: number; name: string };
type SpaceRef = { id: number; place_name: string };

// Suggestion 생성 요청 DTO
export type SuggestionPostRequest = {
  artist?: number | null;
  space?: number | null;
  message: string;
  is_free_allowed?: boolean;
};

// Suggestion Response 타입
export type SuggestionDTO = {
  id: number;
  artist: number | null;
  space: number | null;
  artist_categories?: string[];
  space_categories?: string[];
  space_address?: string;
  artist_obj: ArtistRef | null;
  space_obj: SpaceRef | null;
  posting?: number;
  message: string;
  is_free_allowed: boolean;
  is_accepted: boolean;
  is_read: boolean;
  receiver_phone?: string;
  opponent_image_url?: string;
  created_at: string;
  updated_at: string;
};

// Suggestion List Response 타입
export type SuggestionResponse = SuggestionDTO;
export type SuggestionDetailResponse = SuggestionResponse;
export type SuggestionListResponse = SuggestionResponse[];

export type SuggestionPhoneNumberResponse = {
  artist_phone: string;
  space_phone: string;
};
