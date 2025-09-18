import { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPointBalance, chargePoint, deductPoint } from "@apis/points";
import { useUserStore } from "@stores/userStore";
import { toCamelCase } from "@utils/caseConvert";
import type { PointTransaction } from "@models/point/point.type";
import type { PointTransactionResponse } from "@models/point/point.dto";

export const pointsKeys = {
  balance: (role: string) => ["point-balance", role] as const,
  history: (role: string) => ["point-history", role] as const,
};

export function usePointBalanceQuery() {
  const currentRole = useUserStore((s) => s.currentRole);
  const setPointForRole = useUserStore((s) => s.setPointForRole);

  const query = useQuery<number, Error>({
    queryKey: pointsKeys.balance(currentRole || ""),
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
          queryKey: pointsKeys.balance(currentRole),
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
          queryKey: pointsKeys.balance(currentRole),
        });
      }
    },
  });
}
