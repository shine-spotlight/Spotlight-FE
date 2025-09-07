import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserWithProfile } from "@/types";

interface UserState {
  user: UserWithProfile | null;
  accessToken: string | null;
  refreshToken: string | null;
  setTokens: (tokens: {
    accessToken?: string | null;
    refreshToken?: string | null;
  }) => void;
  updateUser: (patch: Partial<UserWithProfile>) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: "mock",
      refreshToken: null,
      setTokens: ({ accessToken, refreshToken }) =>
        set((state) => ({
          accessToken: accessToken ?? state.accessToken,
          refreshToken: refreshToken ?? state.refreshToken,
        })),

      updateUser: (patch) =>
        set((state) =>
          state.user ? { user: { ...state.user, ...patch } } : state
        ),

      logout: () => set({ user: null, accessToken: null, refreshToken: null }),
    }),
    {
      name: "user-storage",
    }
  )
);
