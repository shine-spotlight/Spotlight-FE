import styled from "@emotion/styled";
import { motion } from "framer-motion";

export const Wrap = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  pointer-events: auto;
  z-index: 10000;
`;

export const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.3);
`;

export const Sheet = styled(motion.section)`
  position: relative;
  z-index: 10000;

  width: 100%;
  max-width: 500px;
  background: ${({ theme }) => theme.color.background.surface};
  border-radius: 20px 20px 0 0;
  box-shadow: 0 -12px 40px rgba(0, 0, 0, 0.24);

  max-height: 100dvh;
  display: flex;
  flex-direction: column;
  overscroll-behavior: contain;
  touch-action: none;
  will-change: transform;

  padding-bottom: calc(env(safe-area-inset-bottom, 0px) + 12px);
`;

export const Grabber = styled.div`
  width: 48px;
  height: 5px;
  border-radius: 999px;
  margin: 10px auto 8px;
  background: ${({ theme }) => theme.color.border.subtle};
`;

export const Header = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.color.text.primary};
  ${({ theme }) => theme.typography.h2};
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;

  /* 크롬, 사파리 */
  &::-webkit-scrollbar {
    display: none;
  }

  /* 파이어폭스 */
  scrollbar-width: none;

  /* IE */
  -ms-overflow-style: none;
`;

export const Footer = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
  padding: 0px 0px 20px;
  margin-bottom: 10px;
`;

export const MotionSheet = styled(motion.section)`
  position: relative;
  z-index: 10000;
  width: 100%;
  max-width: 500px;
  background: ${({ theme }) => theme.color.background.surface};
  border-radius: 20px 20px 0 0;
  box-shadow: 0 -12px 40px rgba(0, 0, 0, 0.24);
  max-height: 100dvh;
  display: flex;
  flex-direction: column;
  overscroll-behavior: contain;
  touch-action: none;
  will-change: transform;
  padding-bottom: calc(env(safe-area-inset-bottom, 0px) + 12px);
`;
