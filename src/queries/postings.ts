import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { UseQueryOptions, QueryKey } from "@tanstack/react-query";
import { suggestionsKeys } from "./suggestions";
import {
  getPostingDetail,
  getPostingList,
  postPostingSuggestion,
  postPosting,
} from "@apis/postings";
import type {
  PostingDetailResponse,
  PostingListResponse,
} from "@models/posting/posting.dto";
import type { Posting, PostingPost } from "@models/posting/posting.type";
import { toCamelCase } from "@utils/caseConvert";
import type { PostingFilter } from "@models/posting/posting.type";

export const postingsKeys = {
  list: (filter?: PostingFilter) => ["posting-list", filter ?? "all"] as const,
  detail: (id: number) => ["posting-detail", id] as const,
  suggestionSent: (id: number) => ["posting-suggestion-sent", id] as const, // 선택 키
};

// 목록
export function usePostingListQuery(
  filter?: PostingFilter,
  options?: Omit<
    UseQueryOptions<Posting[], Error, Posting[], QueryKey>,
    "queryKey" | "queryFn"
  >
) {
  const key = postingsKeys.list(filter);

  return useQuery<Posting[], Error>({
    queryKey: key,
    queryFn: async () => {
      const res = await getPostingList(filter);
      return toCamelCase<PostingListResponse, Posting[]>(res);
    },
    staleTime: 60_000,
    placeholderData: (prev) => prev,
    ...options,
  });
}

// 상세
export function usePostingDetailQuery(
  id: number,
  options?: Omit<
    UseQueryOptions<Posting, Error, Posting, QueryKey>,
    "queryKey" | "queryFn"
  >
) {
  return useQuery<Posting, Error>({
    queryKey: postingsKeys.detail(id),
    queryFn: async () => {
      const res = await getPostingDetail(id);
      return toCamelCase<PostingDetailResponse, Posting>(res);
    },
    enabled: !!id,
    staleTime: 60_000,
    ...options,
  });
}

export function usePostPostingSuggestionMutation(postingId: number) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (message: string) => postPostingSuggestion(postingId, message),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: postingsKeys.detail(postingId) });
      qc.invalidateQueries({ queryKey: suggestionsKeys.sent });
      qc.invalidateQueries({ queryKey: suggestionsKeys.received });
    },
  });
}

export function usePostPostingMutation() {
  const qc = useQueryClient();

  return useMutation<Posting, Error, PostingPost>({
    mutationFn: async (payload: PostingPost) => {
      const res = await postPosting(payload);
      return toCamelCase<PostingDetailResponse, Posting>(res);
    },
    onSuccess: (created) => {
      qc.invalidateQueries({ queryKey: postingsKeys.list() });
      if (created?.id) {
        qc.setQueryData(postingsKeys.detail(created.id), created);
      }
    },
  });
}
