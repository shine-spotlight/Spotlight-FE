import { sendRequest, createUrl } from "@apis/api";
import { artistInstance } from "@apis/instance";
import type {
  ArtistDetailResponse,
  ArtistPOSTRequest,
  ArtistListResponse,
} from "@models/artist/artist.dto";
import type { ArtistFilter } from "@models/artist/artist.type";

// artist 정보 저장 (FormData)
export function setArtistInfo(artist: ArtistPOSTRequest) {
  const formData = new FormData();

  // 기본 정보 추가
  formData.append("name", artist.name);
  formData.append("bio", artist.bio);
  formData.append("number_of_members", artist.number_of_members.toString());
  formData.append("phone_number", artist.phone_number);
  formData.append("desired_pay", artist.desired_pay.toString());
  formData.append("is_free_allowed", artist.is_free_allowed.toString());

  formData.append(
    "portfolio_links",
    JSON.stringify(artist.portfolio_links ?? [])
  );
  formData.append("equipments", JSON.stringify(artist.equipments ?? []));
  formData.append("region", JSON.stringify(artist.region ?? []));
  formData.append("categories", JSON.stringify(artist.categories ?? []));

  // 선택적 필드 추가
  if (artist.custom_category) {
    formData.append("custom_category", artist.custom_category);
  }

  if (artist.profile_image) {
    formData.append("profile_image", artist.profile_image);
  }

  return sendRequest<ArtistDetailResponse>(
    artistInstance,
    "POST",
    "/",
    formData,
    {
      "Content-Type": "multipart/form-data",
    }
  );
}

// artist 상세 조회
export function getArtistDetail(id: string) {
  return sendRequest<ArtistDetailResponse>(artistInstance, "GET", `/${id}/`);
}

// artist 목록 조회
export function getArtistList() {
  return sendRequest<ArtistListResponse>(artistInstance, "GET", "/");
}

// artist 필터링 목록 조회
export function getFilteredArtistList(filter: ArtistFilter) {
  const url = createUrl("/filter/", {
    region: filter.region && filter.region.length ? filter.region : undefined,
    categories:
      filter.categories && filter.categories.length
        ? filter.categories
        : undefined,
    pay_min: typeof filter.payMin === "number" ? filter.payMin : undefined,
    pay_max: typeof filter.payMax === "number" ? filter.payMax : undefined,
  });
  return sendRequest<ArtistListResponse>(artistInstance, "GET", url);
}

// artist - 내 프로필 조회
export function getMyArtist() {
  return sendRequest<ArtistDetailResponse>(artistInstance, "GET", "/me/");
}
