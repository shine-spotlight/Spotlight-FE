import { useQuery } from "@tanstack/react-query";
import type { UseQueryOptions, QueryKey } from "@tanstack/react-query";
import {
  getSpaceList,
  getSpaceDetail,
  getFilteredSpaceList,
} from "@apis/spaces";
import type {
  SpaceListResponse,
  SpaceDetailResponse,
} from "@models/space/space.dto";
import type { SpaceFilter } from "@models/space/space.type";
import type { SpaceProfile } from "@models/space/space.type";
import { toCamelCase } from "@utils/caseConvert";
import { isSpaceFilterActive } from "@utils/isFilterActive";

export const spacesKeys = {
  list: ["space-list"] as const,
  detail: (id: number) => ["space-detail", id] as const,
  profile: ["space-profile"] as const,
  filtered: (filter: SpaceFilter) => ["spaces", "filtered", filter] as const,
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
    placeholderData: (prev) => prev,
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

export function useFilteredSpacesQuery(
  filter: SpaceFilter,
  options?: Omit<
    UseQueryOptions<
      SpaceProfile[],
      Error,
      SpaceProfile[],
      ReturnType<typeof spacesKeys.filtered>
    >,
    "queryKey" | "queryFn"
  >
) {
  const key = spacesKeys.filtered(filter);

  return useQuery<SpaceProfile[], Error, SpaceProfile[], typeof key>({
    queryKey: key,
    queryFn: async () => {
      const res = await getFilteredSpaceList(filter);
      return toCamelCase<SpaceListResponse, SpaceProfile[]>(res);
    },
    enabled: isSpaceFilterActive(filter),
    staleTime: 60_000,
    placeholderData: (prev) => prev,
    ...options,
  });
}
