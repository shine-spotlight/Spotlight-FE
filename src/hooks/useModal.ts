import { useCallback } from "react";
import { useErrorStore } from "@stores/useErrorStore";
import type { ApiFailure } from "@apis/api";
import type { ReactNode } from "react";

export const useModal = () => {
  const { setErrorTitle, setErrorMessage, setButtonLabel, resetError } =
    useErrorStore();

  const showError = useCallback(
    (title: ReactNode, message: ReactNode, buttonLabel: string = "확인") => {
      setErrorTitle(title);
      setErrorMessage(message);
      setButtonLabel(buttonLabel);
    },
    [setErrorTitle, setErrorMessage, setButtonLabel]
  );

  const showApiError = useCallback(
    (
      error: unknown,
      defaultTitle: string = "요청 실패",
      defaultMessage: string = "요청 처리 중 오류가 발생했습니다."
    ) => {
      const err = error as ApiFailure;
      const title = defaultTitle;
      const message = err?.detail || defaultMessage;

      showError(title, message);
    },
    [showError]
  );

  const hideModal = useCallback(() => {
    resetError();
  }, [resetError]);

  return {
    showError,
    showApiError,
    hideModal,
  };
};
