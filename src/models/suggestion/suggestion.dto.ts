// Suggestion 생성 요청 DTO
export type SuggestionPostRequest = {
  artist?: number | null;
  space?: number | null;
  message: string;
  is_free_allowed: boolean;
};

// Suggestion Response 타입
export type SuggestionDTO = {
  id: number;
  sender_type: "artist" | "space";
  artist: number | null;
  space: number | null;
  artist_obj: string;
  space_obj: string;
  posting: number;
  message: string;
  is_free_allowed: boolean;
  is_accepted: boolean;
  is_read: boolean;
  receiver_phone: string;
  opponent_image: string;
  created_at: string;
  updated_at: string;
};

// Suggestion List Response 타입
export type SuggestionResponse = SuggestionDTO;
export type SuggestionDetailResponse = SuggestionResponse;
export type SuggestionListResponse = SuggestionResponse[];
