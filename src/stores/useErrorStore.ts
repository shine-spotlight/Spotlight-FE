import { create } from "zustand";
import type { ReactNode } from "react";

interface ErrorState {
  errorTitle: ReactNode | null; // string → ReactNode
  errorMessage: ReactNode | null; // string → ReactNode
  buttonLabel: string | null;
  setErrorTitle: (title: ReactNode | null) => void;
  setErrorMessage: (msg: ReactNode | null) => void;
  setButtonLabel: (label: string | null) => void;
  resetError: () => void;
}

export const useErrorStore = create<ErrorState>((set) => ({
  errorTitle: null,
  errorMessage: null,
  buttonLabel: null,
  setErrorTitle: (title) => set({ errorTitle: title }),
  setErrorMessage: (msg) => set({ errorMessage: msg }),
  setButtonLabel: (label) => set({ buttonLabel: label }),
  resetError: () =>
    set({
      errorTitle: null,
      errorMessage: null,
      buttonLabel: null,
    }),
}));
