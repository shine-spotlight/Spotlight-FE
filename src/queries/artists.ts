import { useQuery } from "@tanstack/react-query";
import type { UseQueryOptions, QueryKey } from "@tanstack/react-query";
import { getArtistList, getArtistDetail } from "@apis/artists";
import type {
  ArtistListResponse,
  ArtistDetailResponse,
} from "@models/artist/artist.dto";
import type { ArtistProfile } from "@models/artist/artist.type";
import { toCamelCase } from "@utils/caseConvert";

export const artistsKeys = {
  list: ["artist-list"] as const,
  detail: (id: number) => ["artist-detail", id] as const,
  profile: ["artist-profile"] as const,
};

export function useArtistsQuery(
  options?: Omit<
    UseQueryOptions<ArtistProfile[], Error, ArtistProfile[], QueryKey>,
    "queryKey" | "queryFn"
  >
) {
  return useQuery<ArtistProfile[], Error>({
    queryKey: artistsKeys.list,
    queryFn: async () => {
      const res = await getArtistList();
      return toCamelCase<ArtistListResponse, ArtistProfile[]>(res);
    },
    staleTime: 60_000,
    ...options,
  });
}

export function useArtistDetailQuery(
  id: number,
  options?: Omit<
    UseQueryOptions<ArtistProfile, Error, ArtistProfile, QueryKey>,
    "queryKey" | "queryFn"
  >
) {
  return useQuery<ArtistProfile, Error>({
    queryKey: artistsKeys.detail(id),
    queryFn: async () => {
      const res = await getArtistDetail(String(id));

      return toCamelCase<ArtistDetailResponse, ArtistProfile>(res);
    },
    enabled: !!id,
    staleTime: 60_000,
    ...options,
  });
}
