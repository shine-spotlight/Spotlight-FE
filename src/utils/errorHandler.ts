import type { NavigateFunction } from "react-router-dom";
import type { ApiFailure } from "@apis/api";

/**
 * API 에러를 처리하고 적절한 액션을 수행합니다.
 * @param error - API 에러 객체
 * @param navigate - React Router의 navigate 함수
 * @param fallbackPath - 404 에러 시 이동할 기본 경로 (기본값: "/404")
 */
export const handleApiError = (
  error: unknown,
  navigate: NavigateFunction,
  fallbackPath: string = "/404"
) => {
  if (isApiError(error) && error.code === "NOT_FOUND") {
    // 404 에러는 404 페이지로 리다이렉트
    navigate(fallbackPath, { replace: true });
    return;
  }

  // 다른 에러들은 그대로 throw (팝업으로 처리됨)
  throw error;
};

// 에러가 API 에러인지 확인
export const isApiError = (error: unknown): error is ApiFailure => {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    "detail" in error &&
    "field" in error
  );
};

// 404 에러인지 확인
export const isNotFoundError = (error: unknown): boolean => {
  return isApiError(error) && error.code === "NOT_FOUND";
};
