import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserProfile } from "@/types";
import { mockArtists } from "./data";

type UserState = {
  profile: UserProfile | null;
  onboarded: boolean;
  setProfile: (p: UserProfile | null) => void;
  setOnboarded: (ok: boolean) => void;
  clear: () => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      profile: mockArtists[0],
      onboarded: false,
      setProfile: (p) => set({ profile: p }),
      setOnboarded: (ok) => set({ onboarded: ok }),
      clear: () => set({ profile: null }),
    }),
    {
      name: "profile-storage",
    }
  )
);
