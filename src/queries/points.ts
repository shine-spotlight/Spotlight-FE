import { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { UseQueryOptions, QueryKey } from "@tanstack/react-query";

import {
  getPointBalance,
  chargePoint,
  deductPoint,
  getPointHistory,
} from "@apis/points";
import { useUserStore } from "@stores/userStore";
import { toCamelCase } from "@utils/caseConvert";
import type { PointTransaction, PointHistory } from "@models/point/point.type";
import type {
  PointTransactionResponse,
  PointHistoryResponse,
} from "@models/point/point.dto";

export const pointsKeys = {
  balance: ["point-balance"] as const,
  history: ["point-history"] as const,
};

export function usePointBalanceQuery() {
  const currentRole = useUserStore((s) => s.currentRole);
  const setPointForRole = useUserStore((s) => s.setPointForRole);

  const query = useQuery<number, Error>({
    queryKey: pointsKeys.balance,
    queryFn: async () => {
      const res = await getPointBalance();
      return res.balance ?? 0;
    },
    enabled: !!currentRole,
  });

  useEffect(() => {
    if (query.data && currentRole) {
      setPointForRole(currentRole, query.data);
    }
  }, [query.data, currentRole, setPointForRole]);
  return query;
}

export function usePointHistoryQuery(
  options?: Omit<
    UseQueryOptions<PointHistory, Error, PointHistory, QueryKey>,
    "queryKey" | "queryFn"
  >
) {
  const currentRole = useUserStore((s) => s.currentRole);

  return useQuery<PointHistory, Error>({
    queryKey: pointsKeys.history,
    queryFn: async () => {
      const res = await getPointHistory();
      return toCamelCase<PointHistoryResponse, PointHistory>(res);
    },
    enabled: !!currentRole,
    staleTime: 60_000,
    placeholderData: (prev) => prev,
    ...options,
  });
}

export function useChargePointMutation() {
  const queryClient = useQueryClient();
  const currentRole = useUserStore((s) => s.currentRole);

  return useMutation<PointTransaction, Error, number>({
    mutationFn: async (amount: number) => {
      const res = await chargePoint(amount);
      return toCamelCase<PointTransactionResponse, PointTransaction>(res);
    },
    onSuccess: () => {
      if (currentRole) {
        queryClient.invalidateQueries({
          queryKey: pointsKeys.balance,
        });
      }
    },
  });
}

export function useDeductPointMutation() {
  const queryClient = useQueryClient();
  const currentRole = useUserStore((s) => s.currentRole);

  return useMutation<PointTransaction, Error, number>({
    mutationFn: async (amount: number) => {
      const res = await deductPoint(amount);
      return toCamelCase<PointTransactionResponse, PointTransaction>(res);
    },
    onSuccess: () => {
      if (currentRole) {
        queryClient.invalidateQueries({
          queryKey: pointsKeys.balance,
        });
      }
    },
  });
}
