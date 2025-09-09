import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserWithProfile, ArtistUser, SpaceUser } from "@/types";
import { isArtistUser, isSpaceUser } from "@/types";
import { mockArtistUser } from "./data";

interface UserState {
  user: UserWithProfile | null;
  accessToken: string | null;
  refreshToken: string | null;
  setTokens: (tokens: {
    accessToken?: string | null;
    refreshToken?: string | null;
  }) => void;
  updateArtist: (patch: Partial<ArtistUser>) => void;
  updateSpace: (patch: Partial<SpaceUser>) => void;
  setUser: (user: UserWithProfile | null) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: mockArtistUser,
      accessToken: "accessToken",
      refreshToken: "refreshToken",

      setTokens: ({ accessToken, refreshToken }) =>
        set((state) => ({
          accessToken: accessToken ?? state.accessToken,
          refreshToken: refreshToken ?? state.refreshToken,
        })),

      setUser: (user) => set({ user }),

      updateArtist: (patch) =>
        set((s) => {
          if (!s.user || !isArtistUser(s.user)) return s;
          return { user: { ...s.user, ...patch } as ArtistUser };
        }),

      updateSpace: (patch) =>
        set((s) => {
          if (!s.user || !isSpaceUser(s.user)) return s;
          return { user: { ...s.user, ...patch } as SpaceUser };
        }),

      logout: () => set({ user: null, accessToken: null, refreshToken: null }),
    }),
    {
      name: "user-storage",
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
      }),
    }
  )
);
