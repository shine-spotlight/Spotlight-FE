import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, useDragControls } from "framer-motion";
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
    }, 500); // 500ms 후에 플래그 해제

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

  const handleDragStart = () => {
    draggingRef.current = true;
  };
  const controls = useDragControls(); // ✅ 추가

  // 그랩바에서만 드래그 시작
  const onGrabberPointerDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    controls.start(e);
  };

  const handleOverlayClick = () => onClose();

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: { velocity: { y: number }; point: { y: number } }
  ) => {
    const vy = info.velocity.y;
    const currentY = info.point.y;

    // 닫힘 임계치 완화 (오동작 줄이기)
    const closeByVelocity = vy > 2000; // 기존 1200 → 2000
    const closeByDistance = currentY > window.innerHeight * 0.35; // 거리 기준도 조금 완화
    draggingRef.current = false;

    if (closeByVelocity || closeByDistance) onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <S.Wrap>
          <S.Overlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.35 }}
            exit={{ opacity: 0 }}
            onClick={handleOverlayClick} // ✅ click만 사용
          />
          <S.MotionSheet
            initial={{ y: closedY, opacity: 0 }} // 아래에서 등장
            animate={{ y: openY, opacity: 1 }} // 첫 스냅으로
            exit={{ y: closedY, opacity: 0 }} // 아래로 퇴장
            transition={{ type: "spring", stiffness: 380, damping: 36 }}
            drag="y"
            dragControls={controls} // ✅ 추가
            dragListener={false}
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
            onTouchStart={(e: React.TouchEvent) => e.stopPropagation()}
            style={{
              maxHeight: vh * 0.8,
            }}
            onPointerDownCapture={(e) => {
              // 스크롤 가능한 곳에서의 드래그 시작 차단
              const el = e.target as HTMLElement;
              if (el.closest("[data-nodrag]")) e.stopPropagation();
            }}
          >
            <S.Grabber onPointerDown={onGrabberPointerDown} />
            {title ? <S.Header>{title}</S.Header> : null}
            <S.Content ref={contentRef}>{children}</S.Content>
            {footer ? <S.Footer data-nodrag>{footer}</S.Footer> : null}{" "}
          </S.MotionSheet>
        </S.Wrap>
      )}
    </AnimatePresence>
  );
};

export default BottomSheet;
