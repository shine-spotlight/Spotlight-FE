import { sendRequest } from "@apis/api";
import { spaceInstance } from "@apis/instance";
import type {
  SpacePOSTRequest,
  SpaceListResponse,
  SpaceDetailResponse,
} from "@models/space/space.dto";

// space 정보 저장
export function setSpaceInfo(space: SpacePOSTRequest) {
  return sendRequest<SpaceDetailResponse>(spaceInstance, "POST", "/", space);
}

// space 목록 조회
export function getSpaceList() {
  return sendRequest<SpaceListResponse>(spaceInstance, "GET", "/");
}

// space 상세 조회
export function getSpaceDetail(id: string) {
  return sendRequest<SpaceDetailResponse>(spaceInstance, "GET", `/${id}/`);
}
