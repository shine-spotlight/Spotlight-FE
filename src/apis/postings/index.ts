import { sendRequest } from "@apis/api";
import { postingInstance } from "@apis/instance";
import type {
  PostingDetailResponse,
  PostingListResponse,
} from "@models/posting/posting.dto";
import { formatDateYMD } from "@utils/formatDate";
import type { PostingPost } from "@models/posting/posting.type";

// 공연 공고 전체 조회
export function getPostingList() {
  return sendRequest<PostingListResponse>(postingInstance, "GET", `/`);
}

// 공연 공고 전체 조회
export function getPostingDetail(id: number) {
  return sendRequest<PostingDetailResponse>(postingInstance, "GET", `/${id}/`);
}

// 공연 공고 작성
export function postPosting(payload: PostingPost) {
  const fd = new FormData();

  fd.append("title", payload.title);
  fd.append("description", payload.description);
  fd.append("categories", JSON.stringify(payload.categories));
  fd.append("price_type", payload.priceType);

  if (payload.priceType === "paid" && payload.priceAmount != null) {
    fd.append("price_amount", String(payload.priceAmount));
  }

  // 날짜는 YYYY-MM-DD 문자열
  fd.append("date", formatDateYMD(payload.date));

  if (payload.postingImage) {
    fd.append("posting_image", payload.postingImage);
  }
  return sendRequest<PostingDetailResponse>(postingInstance, "POST", "/", fd, {
    "Content-Type": "multipart/form-data",
  });
}

// 공연 공고 제안 보내기
export function postPostingSuggestion(id: number, message: string) {
  return sendRequest<void>(postingInstance, "POST", `/${id}/suggestion/`, {
    message,
  });
}
