import { useEffect } from "react";
import { useDelayedLoading } from "./useDelayedLoading";
import { useLoadingStore } from "@stores/useLoadingStore";

/**
 * 전역 로딩 상태를 관리하는 간단한 훅
 * @param isLoading - 실제 로딩 상태
 * @param loadingMessage - 로딩 메시지
 * @param delay - 로딩 모달을 띄우기까지의 지연 시간 (기본 1초)
 */
export function useGlobalLoading(
  isLoading: boolean,
  loadingMessage?: string,
  delay: number = 300
) {
  const { setLoading } = useLoadingStore();
  const shouldShowLoading = useDelayedLoading({ isLoading, delay });

  useEffect(() => {
    if (shouldShowLoading) {
      setLoading(true, loadingMessage);
    } else {
      setLoading(false);
    }
  }, [shouldShowLoading, loadingMessage, setLoading]);

  // 컴포넌트 언마운트 시 로딩 상태 정리
  useEffect(() => {
    return () => {
      setLoading(false);
    };
  }, [setLoading]);
}
