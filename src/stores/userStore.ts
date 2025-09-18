import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import type { UserProfile, UserRoleType } from "@models/user/user.type";

type UserState = {
  currentRole: UserRoleType | null;
  profilesByRole: Partial<Record<UserRoleType, UserProfile>>;
  pointByRole: Partial<Record<UserRoleType, number>>;
  onboardedByRole: Record<UserRoleType, boolean>;
  setCurrentRole: (r: UserRoleType | null) => void;
  setPointForRole: (r: UserRoleType, point: number | null) => void;
  setProfileForRole: (r: UserRoleType, p: UserProfile | null) => void;
  setOnboardedForRole: (r: UserRoleType, ok: boolean) => void;
  clear: () => void;
};

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set, get) => ({
        currentRole: null,
        profilesByRole: {},
        pointByRole: {},
        onboardedByRole: { artist: false, space: false },
        setCurrentRole: (r) => set({ currentRole: r }),
        setProfileForRole: (r, p) =>
          set((s) => {
            // 프로필 데이터가 유효한지 검증
            if (p && typeof p === "object" && "role" in p && "id" in p) {
              return {
                profilesByRole: { ...s.profilesByRole, [r]: p },
              };
            } else if (p === null) {
              const next = { ...s.profilesByRole };
              delete next[r];
              return { profilesByRole: next };
            }
            // 유효하지 않은 데이터는 무시
            return s;
          }),
        setPointForRole: (r, point) =>
          set((s) => {
            if (typeof point === "number" && Number.isFinite(point)) {
              return { pointByRole: { ...s.pointByRole, [r]: point } };
            }
            // null/invalid → 삭제
            const next = { ...s.pointByRole };
            delete next[r];
            return { pointByRole: next };
          }),
        setOnboardedForRole: (r, ok) =>
          set((s) => ({
            onboardedByRole: { ...s.onboardedByRole, [r]: ok },
          })),
        clear: () =>
          set({
            currentRole: null,
            profilesByRole: {},
            pointByRole: {},
            onboardedByRole: { artist: false, space: false },
          }),
        // 앱 시작 시 잘못된 데이터 정리
        cleanupInvalidData: () => {
          const state = get();

          const cleanedProfiles: Partial<Record<UserRoleType, UserProfile>> =
            {};
          Object.entries(state.profilesByRole).forEach(([role, profile]) => {
            if (
              profile &&
              typeof profile === "object" &&
              "role" in profile &&
              "id" in profile
            ) {
              cleanedProfiles[role as UserRoleType] = profile;
            }
          });

          const cleanedPoints: Partial<Record<UserRoleType, number>> = {};
          Object.entries(state.pointByRole).forEach(([role, point]) => {
            if (typeof point === "number" && Number.isFinite(point)) {
              cleanedPoints[role as UserRoleType] = point;
            }
          });

          set({ profilesByRole: cleanedProfiles, pointByRole: cleanedPoints });
        },
      }),

      {
        name: "profile-storage",
        partialize: (state) => ({
          currentRole: state.currentRole,
          profilesByRole: state.profilesByRole,
          pointByRole: state.pointByRole,
          onboardedByRole: state.onboardedByRole,
        }),
      }
    )
  )
);
