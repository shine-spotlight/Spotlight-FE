import { sendRequest } from "@apis/api";
import { artistInstance } from "@apis/instance";
import type { UserRoleType } from "@types";

export type KakaoLoginResponse = {
  accessToken: string;
  user: {
    id: number;
    kakao_id: string;
    role: UserRoleType | null;
    phone_number: string | null;
    created_at: string;
  };
};

export type ArtistInfoRequest = {
  user: number;
  name: string;
  bio?: string | null;
  number_of_members: number;
  category_id: number;
  custom_category?: string | null;
  portfolio_links?: string[];
  profile_image_url?: string | null;
  region: {
    sido: string;
    sigungu?: string | null;
  };
  desired_pay?: number | null;
  is_free_allowed: boolean;
};

// artist 정보 저장
export function setArtistInfo(artist: ArtistInfoRequest) {
  return sendRequest(artistInstance, "POST", "/", {
    artist,
  });
}
