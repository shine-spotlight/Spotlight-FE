import { sendRequest } from "@apis/api";
import { artistInstance } from "@apis/instance";
import type {
  ArtistDetailResponse,
  ArtistPOSTRequest,
  ArtistListResponse,
} from "@models/artist/artist.dto";

// artist 정보 저장
export function setArtistInfo(artist: ArtistPOSTRequest) {
  return sendRequest<ArtistDetailResponse>(artistInstance, "POST", "/", artist);
}

// artist 상세 조회
export function getArtistDetail(id: string) {
  return sendRequest<ArtistDetailResponse>(artistInstance, "GET", `/${id}/`);
}

// artist 목록 조회
export function getArtistList() {
  return sendRequest<ArtistListResponse>(artistInstance, "GET", "/");
}
