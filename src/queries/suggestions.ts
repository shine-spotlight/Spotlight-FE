import { useQueries, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getSentSuggestionList,
  getReceivedSuggestionList,
  postSuggestion,
} from "@apis/suggestions";
import type {
  SuggestionListResponse,
  SuggestionPostRequest,
} from "@models/suggestion/suggestion.dto";
import type { Suggestion } from "@models/suggestion/suggestion.type";
import { toCamelCase } from "@utils/caseConvert";
import { pointsKeys } from "./points";
import { useUserStore } from "@stores/userStore";

export const suggestionsKeys = {
  sent: ["suggestions", "sent"] as const,
  received: ["suggestions", "received"] as const,
};

export function useSuggestionsOverview() {
  const results = useQueries({
    queries: [
      {
        queryKey: suggestionsKeys.sent,
        queryFn: async (): Promise<Suggestion[]> => {
          const res = await getSentSuggestionList();
          return toCamelCase<SuggestionListResponse, Suggestion[]>(res);
        },
        staleTime: 60_000,
      },
      {
        queryKey: suggestionsKeys.received,
        queryFn: async (): Promise<Suggestion[]> => {
          const res = await getReceivedSuggestionList();
          return toCamelCase<SuggestionListResponse, Suggestion[]>(res);
        },
        staleTime: 60_000,
      },
    ],
    // 탭 전환 때 재요청되지 않도록 함
    combine: (results) => {
      const [sentQ, receivedQ] = results;
      return {
        sent: sentQ.data ?? [],
        received: receivedQ.data ?? [],
        isLoading: sentQ.isLoading || receivedQ.isLoading,
        isError: sentQ.isError || receivedQ.isError,
        error: sentQ.error ?? receivedQ.error ?? null,
        refetchAll: async () => {
          await Promise.all([sentQ.refetch(), receivedQ.refetch()]);
        },
      };
    },
  });

  return results;
}

export function usePostSuggestionMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload: SuggestionPostRequest) => postSuggestion(payload),
    onSuccess: () => {
      // 보낸 목록 최신화
      qc.invalidateQueries({ queryKey: suggestionsKeys.sent });
    },
  });
}

// 아티스트에게 제안 보내기 편의 훅
// artistId는 필수
export function useSuggestToArtistMutation(artistId: number) {
  const base = usePostSuggestionMutation();

  const suggest = (
    message: string,
    opts?: { isFreeAllowed?: boolean; spaceId?: number | null }
  ) => {
    return base.mutateAsync({
      artist: artistId,
      space: opts?.spaceId ?? null,
      message,
      is_free_allowed: opts?.isFreeAllowed,
    });
  };

  return { ...base, suggest };
}

// 공간에게 제안 보내기 편의 훅
// spaceId 필수
export function useSuggestToSpaceMutation(spaceId: number) {
  const base = usePostSuggestionMutation();
  const qc = useQueryClient();
  const currentRole = useUserStore((s) => s.currentRole);

  const suggest = async (
    message: string,
    opts?: { isFreeAllowed?: boolean; artistId?: number | null }
  ) => {
    const res = await base.mutateAsync({
      artist: opts?.artistId ?? null,
      space: spaceId,
      message,
      is_free_allowed: opts?.isFreeAllowed,
    });

    if (currentRole) {
      qc.invalidateQueries({ queryKey: pointsKeys.balance(currentRole) });
    }
    return res;
  };

  return { ...base, suggest };
}
