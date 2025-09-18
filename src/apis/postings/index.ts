import { sendRequest } from "@apis/api";
import { postingInstance } from "@apis/instance";
import type {
  PostingDetailResponse,
  PostingPOSTRequest,
  PostingListResponse,
} from "@models/posting/posting.dto";

// 공연 공고 전체 조회
export function getPostingList() {
  return sendRequest<PostingListResponse>(postingInstance, "GET", `/`);
}

// 공연 공고 전체 조회
export function getPostingDetail(id: number) {
  return sendRequest<PostingDetailResponse>(postingInstance, "GET", `/${id}/`);
}

// 공연 공고 작성
export function postPosting(post: PostingPOSTRequest) {
  return sendRequest<PostingDetailResponse>(postingInstance, "POST", `/`, post);
}
