import { sendRequest } from "@apis/api";
import { suggestingInstance } from "@apis/instance";
import type {
  SuggestionPostRequest,
  SuggestionDetailResponse,
  SuggestionListResponse,
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
