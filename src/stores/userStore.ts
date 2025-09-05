import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserWithProfile, UserRole } from "@/types";

interface UserState {
  user: UserWithProfile | null;
  isAuthenticated: boolean;
  setUser: (user: UserWithProfile) => void;
  clearUser: () => void;
  updateUserRole: (role: UserRole) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user: UserWithProfile) => set({ user, isAuthenticated: true }),
      clearUser: () => set({ user: null, isAuthenticated: false }),
      updateUserRole: (role: UserRole) =>
        set((state) => ({
          user: state.user ? { ...state.user, role } : null,
        })),
    }),
    {
      name: "user-storage",
    }
  )
);
