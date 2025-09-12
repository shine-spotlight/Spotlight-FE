import styled from "@emotion/styled";

export const Circle = styled.button<{ $size: number }>`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: 50%;
  background: ${({ theme }) => theme.palette.sky[100]}; /* 연한 하늘색 */
  border: none;
  display: grid;
  place-items: center;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  margin: 0 auto;
  &[data-disabled="true"] {
    cursor: default;
    opacity: 0.6;
  }

  &:hover .overlay {
    opacity: 1;
  }
`;

export const Preview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

export const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  display: grid;
  place-items: center;
  opacity: 1;
  pointer-events: auto;
  transition: opacity 0.2s ease;
`;

export const OverlayActions = styled.div`
  display: flex;
  gap: 12px;
  pointer-events: auto;
`;

export const OverlayBtn = styled.button`
  ${({ theme }) => theme.typography.buttonMd};
  padding: 8px 14px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.7);
  background: rgba(0, 0, 0, 0.45);

  color: #fff;
  background: transparent;
  cursor: pointer;
  backdrop-filter: blur(2px);
`;

export const Empty = styled.div`
  display: grid;
  place-items: center;
  gap: 6px;
  color: ${({ theme }) => theme.color.text.secondary};
`;

export const EmptyPlus = styled.span`
  font-size: 32px;
  line-height: 1;
`;

export const EmptyText = styled.span`
  ${({ theme }) => theme.typography.body3};
`;

export const CircleContainer = styled.div`
  margin: 0 auto;
  width: 100%;
`;
