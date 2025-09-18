import { sendRequest } from "@apis/api";
import { likeInstance } from "@apis/instance";
import type { LikeListResponse } from "@models/like/like.dto";

// 찜한 목록 조회
export function getLikeList() {
  return sendRequest<LikeListResponse>(likeInstance, "GET", `/`);
}

// 아티스트 찜 토글
export function toggleLikeArtist(artist_id: number) {
  return sendRequest<void>(likeInstance, "POST", `/artists/`, {
    artist_id,
  });
}

// 공간 찜 토글
export function toggleLikeSpace(space_id: number) {
  return sendRequest<void>(likeInstance, "POST", `/spaces/`, {
    space_id,
  });
}
