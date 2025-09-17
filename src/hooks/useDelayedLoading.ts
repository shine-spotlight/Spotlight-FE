import { useState, useEffect } from "react";

interface UseDelayedLoadingOptions {
  delay?: number; // 지연 시간 (밀리초)
  isLoading: boolean; // 실제 로딩 상태
}

/**
 * 로딩이 일정 시간 이상 지속되면 true를 반환하는 훅
 * @param options - 설정 옵션
 * @returns 지연된 로딩 상태
 */
export function useDelayedLoading({
  delay = 300,
  isLoading,
}: UseDelayedLoadingOptions): boolean {
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (isLoading) {
      // 로딩이 시작되면 delay 후에 true로 설정
      timeoutId = setTimeout(() => {
        setShowLoading(true);
      }, delay);
    } else {
      // 로딩이 끝나면 즉시 false로 설정
      setShowLoading(false);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isLoading, delay]);

  return showLoading;
}

