import { useAuthStore } from "@stores/authStore";
import { useErrorStore } from "@stores/useErrorStore";
import axios from "axios";
import type {
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  Method,
} from "axios";

export interface ApiFailure {
  detail: string;
  code: string;
  field: string;
}

export type ApiSuccess<T = Record<string, unknown>> = T;

export type ApiResponse<T = Record<string, unknown>> =
  | { status: true; data: ApiSuccess<T> }
  | { status: false; error: ApiFailure };

export const sendRequest = async <T = unknown, D = unknown>(
  instance: AxiosInstance,
  method: Method,
  url: string,
  data?: D,
  headers?: Record<string, string>
): Promise<T> => {
  try {
    const config: AxiosRequestConfig = {
      method,
      url,
      headers,
      ...(method.toUpperCase() === "GET" ? { params: data } : { data }),
    };

    const response = await instance.request(config);
    const responseData = response.data;

    // ApiResponse 형태인지 확인 (status 필드가 있는지)
    if (
      responseData &&
      typeof responseData === "object" &&
      "status" in responseData
    ) {
      const apiResponse = responseData as ApiResponse<T>;

      if (apiResponse.status) {
        // 성공한 경우 데이터만 반환
        return apiResponse.data as T;
      } else {
        // 실패한 경우 에러 throw
        throw apiResponse.error;
      }
    }

    // ApiResponse 형태가 아닌 경우 그대로 반환
    return responseData as T;
  } catch (error: unknown) {
    let errorToThrow: ApiFailure;

    if (axios.isAxiosError(error)) {
      const failure = error.response?.data as ApiFailure;
      const statusCode = error.response?.status;

      // 401 에러 처리 - 팝업 표시 후 시작 페이지로 리다이렉트
      if (statusCode === 401) {
        // 인증 상태 초기화
        useAuthStore.getState().clear();

        // 에러 팝업 표시
        const { setErrorTitle, setErrorMessage, setButtonLabel } =
          useErrorStore.getState();
        setErrorTitle("인증 필요");
        setErrorMessage("로그인 후 시도하세요");
        setButtonLabel("확인");

        // 확인 버튼 클릭 시 시작 페이지로 이동하는 핸들러 설정
        const originalResetError = useErrorStore.getState().resetError;
        useErrorStore.setState({
          resetError: () => {
            originalResetError();
            window.location.href = "/";
          },
        });

        errorToThrow = {
          detail: "로그인 후 시도하세요",
          code: "UNAUTHORIZED",
          field: "",
        };
        throw errorToThrow;
      }

      // 404 에러는 팝업을 띄우지 않고 그대로 throw
      if (statusCode === 404) {
        errorToThrow = failure || {
          detail: "요청한 리소스를 찾을 수 없습니다.",
          code: "NOT_FOUND",
          field: "",
        };
        // 404는 팝업 없이 그대로 throw
        throw errorToThrow;
      }

      errorToThrow = failure || {
        detail: error.message || "네트워크 오류가 발생했습니다.",
        code: "NETWORK_ERROR",
        field: "",
      };
    } else {
      errorToThrow = {
        detail: "예상치 못한 오류가 발생했습니다.",
        code: "UNKNOWN",
        field: "",
      };
    }

    // 404와 401이 아닌 에러만 전역 에러 상태 설정
    if (
      errorToThrow.code !== "NOT_FOUND" &&
      errorToThrow.code !== "UNAUTHORIZED"
    ) {
      const { setErrorTitle, setErrorMessage, setButtonLabel } =
        useErrorStore.getState();
      setErrorTitle("요청 실패");
      setErrorMessage(errorToThrow.detail);
      setButtonLabel("확인");
    }

    throw errorToThrow;
  }
};

// 동적 URL 생성
export const createUrl = (
  path: string,
  params: Record<string, string> = {}
): string => {
  const query = new URLSearchParams(params).toString();
  return `${path}${query ? `?${query}` : ""}`;
};

// 인터셉터 적용
export const applyInterceptors = (instance: AxiosInstance): void => {
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = useAuthStore.getState().accessToken;

      // 로그인 전에는 인터셉터 제외
      const excludedPaths = ["/users/auth/kakao/callback/"];

      const isExcluded = excludedPaths.some((path) =>
        config.url?.includes(path)
      );

      if (isExcluded) return config;

      if (token) {
        config.headers.set("Authorization", `Token ${token}`);
        return config;
      }
      return config;
    },
    (error) => {
      console.error("🚨 Request Interceptor Error:", error);
      return Promise.reject(error);
    }
  );

  // 응답 인터셉터 (단순 에러 로깅만)
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error("🚨 Response Error:", error.response || error.message);
      return Promise.reject(error);
    }
  );
};
