import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import type { UserProfile, UserRoleType } from "@/types";

type UserState = {
  currentRole: UserRoleType | null;
  profilesByRole: Partial<Record<UserRoleType, UserProfile>>;
  onboardedByRole: Record<UserRoleType, boolean>;
  setCurrentRole: (r: UserRoleType | null) => void;
  setProfileForRole: (r: UserRoleType, p: UserProfile | null) => void;
  setOnboardedForRole: (r: UserRoleType, ok: boolean) => void;
  clear: () => void;
};

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        currentRole: null,
        profilesByRole: {},
        onboardedByRole: { artist: false, space: false },
        setCurrentRole: (r) => set({ currentRole: r }),
        setProfileForRole: (r, p) =>
          set((s) => ({
            profilesByRole: p
              ? { ...s.profilesByRole, [r]: p }
              : (() => {
                  const next = { ...s.profilesByRole };
                  delete next[r];
                  return next;
                })(),
          })),
        setOnboardedForRole: (r, ok) =>
          set((s) => ({
            onboardedByRole: { ...s.onboardedByRole, [r]: ok },
          })),
        clear: () =>
          set({
            currentRole: null,
            profilesByRole: {},
            onboardedByRole: { artist: false, space: false },
          }),
      }),
      {
        name: "profile-storage",
      }
    )
  )
);
