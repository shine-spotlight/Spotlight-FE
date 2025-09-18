import { usePointBalanceQuery } from "./points";
import { useUserProfileQuery } from "./users";

export function useUserOverview() {
  const profileQ = useUserProfileQuery();
  const pointQ = usePointBalanceQuery();

  const profile = profileQ.data;
  const point = pointQ.data;

  return {
    data: profile ? { ...profile, point: point } : undefined,
    profileQ,
    pointQ,
    isLoading: profileQ.isLoading || pointQ.isLoading,
    isError: profileQ.isError || pointQ.isError,
  };
}
