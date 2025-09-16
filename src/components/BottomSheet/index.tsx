import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import * as S from "./index.styles";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  footer?: React.ReactNode;
  children: React.ReactNode;
  maxHeight?: number; // 최대 높이 (0-1 사이의 비율)
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  title,
  footer,
  children,
  maxHeight = 0.8,
}) => {
  const vh =
    typeof window !== "undefined" && isOpen
      ? window.visualViewport?.height ?? window.innerHeight
      : 800;

  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const justOpenedRef = useRef(false);
  const draggingRef = useRef(false);

  const calculatedHeight = useMemo(() => {
    // 최대 높이 제한 (화면의 80% 이하로 제한)
    const maxHeightPx = Math.min(vh * maxHeight, vh * 0.8);

    // 최소 높이 (화면의 30%)
    const minHeight = vh * 0.3;

    // 콘텐츠가 측정되지 않았을 때는 최소 높이 사용
    if (!contentHeight) {
      return minHeight;
    }

    // 헤더, 푸터, 패딩 등을 고려한 추가 높이
    const headerHeight = title ? 60 : 0;
    const footerHeight = footer ? 80 : 0;
    const padding = 40; // 상하 패딩
    const grabberHeight = 25; // 그랩바 높이

    const additionalHeight =
      headerHeight + footerHeight + padding + grabberHeight;
    const totalContentHeight = contentHeight + additionalHeight;

    return Math.max(minHeight, Math.min(totalContentHeight, maxHeightPx));
  }, [contentHeight, vh, maxHeight, title, footer]);

  const openY = 0; // 화면 상단에서 시작
  const closedY = vh; // 완전 닫힘

  // 콘텐츠 높이 측정
  useEffect(() => {
    if (!isOpen || !contentRef.current) return;

    const measureHeight = () => {
      if (contentRef.current) {
        const height = contentRef.current.scrollHeight;
        setContentHeight(height);
      }
    };

    // 초기 측정 (약간의 지연을 두어 DOM이 완전히 렌더링된 후 측정)
    const timeoutId = setTimeout(measureHeight, 100);

    // ResizeObserver로 콘텐츠 변화 감지
    const resizeObserver = new ResizeObserver(measureHeight);
    resizeObserver.observe(contentRef.current);

    return () => {
      clearTimeout(timeoutId);
      resizeObserver.disconnect();
    };
  }, [isOpen]);

  // 열릴 때 스크롤 잠금
  useEffect(() => {
    if (!isOpen) {
      justOpenedRef.current = false;
      return;
    }

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // 열자마자 닫힘 방지를 위한 플래그 설정
    justOpenedRef.current = true;
    setTimeout(() => {
      justOpenedRef.current = false;
    }, 300); // 300ms 후에 플래그 해제

    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const h = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [isOpen, onClose]);

  const handleOverlayDown = () => {
    if (justOpenedRef.current) return; // 열자마자 닫힘 방지
    if (draggingRef.current) return; // 드래그 중 닫힘 방지
    onClose();
  };

  const handleDragStart = () => {
    draggingRef.current = true;
  };

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: { velocity: { y: number }; point: { y: number } }
  ) => {
    const vy = info.velocity.y;
    const currentY = info.point.y;

    const distanceFromOpen = currentY - openY;
    const closeByDistance = distanceFromOpen > vh * 0.25;
    const closeByVelocity = vy > 1200;

    if (currentY > closedY - 40 || closeByVelocity || closeByDistance) {
      onClose();
      return;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <S.Wrap>
          <S.Overlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.35 }}
            exit={{ opacity: 0 }}
            onMouseDown={handleOverlayDown}
          />
          <S.MotionSheet
            initial={{ y: closedY, opacity: 0 }} // 아래에서 등장
            animate={{ y: openY, opacity: 1 }} // 첫 스냅으로
            exit={{ y: closedY, opacity: 0 }} // 아래로 퇴장
            transition={{ type: "spring", stiffness: 380, damping: 36 }}
            drag="y"
            dragConstraints={{
              top: 0,
              bottom: vh - calculatedHeight,
            }}
            dragElastic={0.2}
            dragMomentum={false}
            onDragStart={handleDragStart}
            onDrag={() => {}}
            onDragEnd={handleDragEnd}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            onMouseDown={(e: React.MouseEvent) => e.stopPropagation()}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
              padding: "0 20px",
              maxHeight: vh * 0.8,
            }}
            onPointerDownCapture={(e) => {
              const el = e.target as HTMLElement;
              if (el.closest("[data-nodrag]")) {
                e.stopPropagation();
              }
            }}
          >
            <S.Grabber />
            {title ? <S.Header>{title}</S.Header> : null}
            <S.Content ref={contentRef}>{children}</S.Content>
            {footer ? <S.Footer>{footer}</S.Footer> : null}
          </S.MotionSheet>
        </S.Wrap>
      )}
    </AnimatePresence>
  );
};

export default BottomSheet;
