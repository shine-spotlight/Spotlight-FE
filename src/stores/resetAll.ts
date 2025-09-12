import { useAuthStore } from "./authStore";
import { useUserStore } from "./userStore";
import { useRegistrationDraftStore } from "./registrationStore";

export function resetAllStores() {
  useAuthStore.getState().clear();
  useUserStore.getState().clear();
  useRegistrationDraftStore.getState().clear();
}
