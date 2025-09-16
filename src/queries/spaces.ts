import { useQuery } from "@tanstack/react-query";
import type { UseQueryOptions, QueryKey } from "@tanstack/react-query";
import { getSpaceList, getSpaceDetail } from "@apis/spaces";
import type {
  SpaceListResponse,
  SpaceDetailResponse,
} from "@models/space/space.dto";
import type { SpaceProfile } from "@models/space/space.type";
import { toCamelCase } from "@utils/caseConvert";

export const spacesKeys = {
  list: ["space-list"] as const,
  detail: (id: number) => ["space-detail", id] as const,
  profile: ["space-profile"] as const,
};

export function useSpacesQuery(
  options?: Omit<
    UseQueryOptions<SpaceProfile[], Error, SpaceProfile[], QueryKey>,
    "queryKey" | "queryFn"
  >
) {
  return useQuery<SpaceProfile[], Error>({
    queryKey: spacesKeys.list,
    queryFn: async () => {
      const res = await getSpaceList();
      return toCamelCase<SpaceListResponse, SpaceProfile[]>(res);
    },
    staleTime: 60_000,
    ...options,
  });
}

export function useSpaceDetailQuery(
  id: number,
  options?: Omit<
    UseQueryOptions<SpaceProfile, Error, SpaceProfile, QueryKey>,
    "queryKey" | "queryFn"
  >
) {
  return useQuery<SpaceProfile, Error>({
    queryKey: spacesKeys.detail(id),
    queryFn: async () => {
      const res = await getSpaceDetail(String(id));
      return toCamelCase<SpaceDetailResponse, SpaceProfile>(res);
    },
    enabled: !!id,
    staleTime: 60_000,
    ...options,
  });
}
