import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getLikeList, toggleLikeArtist, toggleLikeSpace } from "@apis/likes";
import type { LikeListResponse } from "@models/like/like.dto";
import type { Like } from "@models/like/like.type";
import { toCamelCase } from "@utils/caseConvert";
import { artistsKeys } from "@queries/artists";
import { spacesKeys } from "@queries/spaces";
import type { ArtistProfile } from "@models/artist/artist.type";
import type { SpaceProfile } from "@models/space/space.type";
export const likesKeys = {
  list: ["likes", "list"] as const,
};

// 찜 목록 조회
export function useLikesQuery() {
  return useQuery<Like[], Error>({
    queryKey: likesKeys.list,
    queryFn: async () => {
      const res = await getLikeList();
      return toCamelCase<LikeListResponse, Like[]>(res);
    },
    staleTime: 60_000,
  });
}

// 아티스트 찜 토글 전용
export function useToggleLikeArtistMutation(artistId: number) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: () => toggleLikeArtist(artistId),
    onSuccess: () => {
      // 좋아요 목록 무효화
      qc.invalidateQueries({ queryKey: likesKeys.list });
      if (artistsKeys) {
        qc.invalidateQueries({ queryKey: artistsKeys.list });
        qc.invalidateQueries({ queryKey: artistsKeys.detail(artistId) });
      }
    },
  });
}

// 공간 찜 토글 전용
export function useToggleLikeSpaceMutation(spaceId: number) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: () => toggleLikeSpace(spaceId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: likesKeys.list });
      if (spacesKeys) {
        qc.invalidateQueries({ queryKey: spacesKeys.list });
        qc.invalidateQueries({ queryKey: spacesKeys.detail(spaceId) });
      }
    },
  });
}

// 하나의 훅으로 아티스트/공간 둘 다 처리
export function useToggleLikeMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (args: { artistId?: number; spaceId?: number }) => {
      const { artistId, spaceId } = args;

      if ((!!artistId && !!spaceId) || (!artistId && !spaceId)) {
        throw new Error("artistId 또는 spaceId 중 하나만 전달하세요.");
      }

      if (artistId) {
        await toggleLikeArtist(artistId);
      } else if (spaceId) {
        await toggleLikeSpace(spaceId);
      }
    },
    onSuccess: (_d, variables) => {
      const { artistId, spaceId } = variables || {};

      if (artistId) {
        qc.setQueryData(artistsKeys.list, (prev?: ArtistProfile[]) => {
          if (!prev) return prev;
          return prev.map((it) =>
            it.id === artistId ? { ...it, isLiked: !it.isLiked } : it
          );
        });
        qc.setQueryData(
          artistsKeys.detail(artistId),
          (prev?: ArtistProfile) => {
            if (!prev) return prev;
            return { ...prev, isLiked: !prev.isLiked };
          }
        );
        qc.invalidateQueries({ queryKey: artistsKeys.list });
        qc.invalidateQueries({ queryKey: artistsKeys.detail(artistId) });
      }

      if (spaceId) {
        qc.setQueryData(spacesKeys.list, (prev?: SpaceProfile[]) => {
          if (!prev) return prev;
          return prev.map((it) =>
            it.id === spaceId ? { ...it, isLiked: !it.isLiked } : it
          );
        });
        qc.setQueryData(spacesKeys.detail(spaceId), (prev?: SpaceProfile) => {
          if (!prev) return prev;
          return { ...prev, isLiked: !prev.isLiked };
        });
        qc.invalidateQueries({ queryKey: spacesKeys.list });
        qc.invalidateQueries({ queryKey: spacesKeys.detail(spaceId) });
      }
      qc.invalidateQueries({ queryKey: likesKeys.list });
    },
  });
}
