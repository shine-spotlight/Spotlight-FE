import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { getMyArtist } from "@apis/artists";
import { getMySpace } from "@apis/spaces";
import type { SpaceDetailResponse } from "@models/space/space.dto";
import type { ArtistDetailResponse } from "@models/artist/artist.dto";
import type { UserProfile } from "@models/user/user.type";
import { toCamelCase } from "@utils/caseConvert";
import { useUserStore } from "@stores/userStore";

export const usersKeys = {
  profile: (role: string) => ["user-profile", role] as const,
};

export function useUserProfileQuery() {
  const currentRole = useUserStore((s) => s.currentRole);
  const setProfileForRole = useUserStore((s) => s.setProfileForRole);

  const query = useQuery<UserProfile, Error, UserProfile>({
    queryKey: usersKeys.profile(currentRole || ""),
    queryFn: async () => {
      if (currentRole === "artist") {
        const res = await getMyArtist();
        const camel = toCamelCase<ArtistDetailResponse, UserProfile>(res);
        return { ...camel, role: currentRole } as UserProfile;
      } else if (currentRole === "space") {
        const res = await getMySpace();
        const camel = toCamelCase<SpaceDetailResponse, UserProfile>(res);
        return { ...camel, role: currentRole } as UserProfile;
      }
      throw new Error(`Unsupported role: ${currentRole}`);
    },
    enabled: !!currentRole,
    staleTime: 60_000,
  });

  useEffect(() => {
    if (query.data && currentRole) {
      setProfileForRole(currentRole, query.data);
    }
  }, [query.data, currentRole, setProfileForRole]);

  return query;
}
