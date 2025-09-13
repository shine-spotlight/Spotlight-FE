import { useAuthStore } from "@stores/authStore";
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
): Promise<ApiResponse<T>> => {
  try {
    const config: AxiosRequestConfig = {
      method,
      url,
      headers,
      ...(method.toUpperCase() === "GET" ? { params: data } : { data }),
    };

    const response = await instance.request(config);

    return { status: true, data: response.data as T };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const failure = error.response?.data as ApiFailure;
      return { status: false, error: failure };
    }
    return {
      status: false,
      error: {
        detail: "예상치 못한 오류가 발생했습니다.",
        code: "UNKNOWN",
        field: "",
      },
    };
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
