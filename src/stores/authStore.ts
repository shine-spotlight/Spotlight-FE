import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  socialVerified: boolean;
  setTokens: (t: {
    accessToken?: string | null;
    refreshToken?: string | null;
  }) => void;
  setSocialVerified: (ok: boolean) => void;
  clear: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      socialVerified: false,
      setTokens: ({ accessToken, refreshToken }) =>
        set((s) => ({
          accessToken: accessToken ?? s.accessToken,
          refreshToken: refreshToken ?? s.refreshToken,
        })),
      setSocialVerified: (ok) => set({ socialVerified: ok }),

      clear: () =>
        set({ accessToken: null, refreshToken: null, socialVerified: false }),
    }),
    { name: "auth-storage" }
  )
);
