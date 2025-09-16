import { useQueries } from "@tanstack/react-query";
import {
  getSentSuggestionList,
  getReceivedSuggestionList,
} from "@apis/suggestions";
import type { SuggestionListResponse } from "@models/suggestion/suggestion.dto";
import type { Suggestion } from "@models/suggestion/suggestion.type";
import { toCamelCase } from "@utils/caseConvert";

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
