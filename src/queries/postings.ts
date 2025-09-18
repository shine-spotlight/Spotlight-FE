import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { UseQueryOptions, QueryKey } from "@tanstack/react-query";
import { getPostingDetail, getPostingList, postPosting } from "@apis/postings";
import type {
  PostingDetailResponse,
  PostingListResponse,
} from "@models/posting/posting.dto";
import type { Posting, PostingForm } from "@models/posting/posting.type";
import { toCamelCase, toSnakeCase } from "@utils/caseConvert";

export const postingsKeys = {
  list: ["posting-list"] as const,
  detail: (id: number) => ["posting-detail", id] as const,
};

// 목록
export function usePostingListQuery(
  options?: Omit<
    UseQueryOptions<Posting[], Error, Posting[], QueryKey>,
    "queryKey" | "queryFn"
  >
) {
  return useQuery<Posting[], Error>({
    queryKey: postingsKeys.list,
    queryFn: async () => {
      const res = await getPostingList();
      return toCamelCase<PostingListResponse, Posting[]>(res);
    },
    staleTime: 60_000,
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

export function usePostPostingMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload: PostingForm) => postPosting(toSnakeCase(payload)),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: postingsKeys.list });
    },
  });
}
