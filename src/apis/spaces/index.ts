import { sendRequest } from "@apis/api";
import { spaceInstance } from "@apis/instance";
import type {
  SpacePOSTRequest,
  SpaceListResponse,
  SpaceDetailResponse,
} from "@models/space/space.dto";

// space 정보 저장 (FormData)
export function setSpaceInfo(space: SpacePOSTRequest) {
  const formData = new FormData();

  // 기본 정보 추가
  formData.append("place_name", space.place_name);
  formData.append("address", space.address);
  formData.append("capacity_seated", space.capacity_seated.toString());
  formData.append("capacity_standing", space.capacity_standing.toString());
  formData.append(
    "business_registration_number",
    space.business_registration_number
  );
  formData.append("phone_number", space.phone_number);

  formData.append("atmosphere", JSON.stringify(space.atmosphere ?? []));
  formData.append("equipments", JSON.stringify(space.equipments ?? []));
  formData.append(
    "preferred_categories",
    JSON.stringify(space.preferred_categories ?? [])
  );
  formData.append("categories", JSON.stringify(space.categories ?? []));
  // 선택적 필드 추가
  if (space.postal_code) formData.append("postal_code", space.postal_code);

  if (space.kakao_map_link)
    formData.append("kakao_map_link", space.kakao_map_link);

  if (space.custom_category)
    formData.append("custom_category", space.custom_category);

  if (space.description) formData.append("description", space.description);

  if (space.place_region) formData.append("place_region", space.place_region);

  if (Array.isArray(space.place_image)) {
    space.place_image.forEach((file) => {
      if (file instanceof File) {
        formData.append("place_image", file); // 서버에서 여러 파일을 받도록
      }
    });
  }

  return sendRequest<SpaceDetailResponse>(
    spaceInstance,
    "POST",
    "/",
    formData,
    {
      "Content-Type": "multipart/form-data",
    }
  );
}

// space 목록 조회
export function getSpaceList() {
  return sendRequest<SpaceListResponse>(spaceInstance, "GET", "/");
}

// space 상세 조회
export function getSpaceDetail(id: string) {
  return sendRequest<SpaceDetailResponse>(spaceInstance, "GET", `/${id}/`);
}

// space - 내 프로필 조회
export function getMySpace() {
  return sendRequest<SpaceDetailResponse>(spaceInstance, "GET", "/me/");
}
