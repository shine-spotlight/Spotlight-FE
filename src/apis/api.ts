import { useUserStore } from "@stores/userStore";
import axios from "axios";

import type {
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  Method,
  AxiosResponse,
} from "axios";

export interface ApiResponse<T> {
  code: string;
  message: string;
  result?: T;
  success: boolean;
}

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

    const response: AxiosResponse<ApiResponse<T>> = await instance.request(
      config
    );

    const responseData = response.data;

    return responseData;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(
        `❌ ${url} [${method}] Error:`,
        error.response?.data || error.message
      );
      throw error;
    }

    console.error(`❌ ${url} [${method}] Unknown error:`, error);
    throw new Error("예상치 못한 오류가 발생했습니다.");
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
      const token = useUserStore.getState().accessToken;

      // 로그인 전에는 인터셉터 제외
      const excludedPaths = ["/kakao/login"];

      const isExcluded = excludedPaths.some((path) =>
        config.url?.includes(path)
      );

      if (isExcluded) return config;

      if (token) {
        config.headers.set("Authorization", `Bearer ${token}`);
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
