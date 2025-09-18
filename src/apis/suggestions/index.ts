import { sendRequest } from "@apis/api";
import { suggestingInstance } from "@apis/instance";
import type {
  SuggestionPostRequest,
  SuggestionDetailResponse,
  SuggestionListResponse,
  SuggestionPhoneNumberResponse,
} from "@models/suggestion/suggestion.dto";

// suggestion 생성
export function postSuggestion(suggestion: SuggestionPostRequest) {
  return sendRequest<SuggestionDetailResponse>(
    suggestingInstance,
    "POST",
    "/",
    suggestion
  );
}

// 받은 suggestion 목록 조회
export function getReceivedSuggestionList() {
  return sendRequest<SuggestionListResponse>(
    suggestingInstance,
    "GET",
    "/received/"
  );
}

// 보낸 suggestion 목록 조회
export function getSentSuggestionList() {
  return sendRequest<SuggestionListResponse>(
    suggestingInstance,
    "GET",
    "/sent/"
  );
}

// 제안 수락
export function acceptSuggestion(id: number) {
  return sendRequest<SuggestionDetailResponse>(
    suggestingInstance,
    "PATCH",
    `/${id}/accept/`
  );
}

// 제안 거절
export function rejectSuggestion(id: number) {
  return sendRequest<SuggestionDetailResponse>(
    suggestingInstance,
    "PATCH",
    `/${id}/reject/`
  );
}

// 제안 수락 이후 휴대폰 번호 받아오기
export function getPhoneNumber(id: number) {
  return sendRequest<SuggestionPhoneNumberResponse>(
    suggestingInstance,
    "GET",
    `/${id}/share-phone/`
  );
}
