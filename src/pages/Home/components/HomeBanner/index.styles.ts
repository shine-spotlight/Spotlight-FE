import styled from "@emotion/styled";

export const BannerContainer = styled.div`
  border-radius: 8px;
  margin-bottom: 24px;
  position: relative;
  overflow: hidden;
  aspect-ratio: 393/ 200;
  width: 40%;
`;

export const SliderWrapper = styled.div<{
  $currentIndex: number;
  $count: number;
}>`
  display: flex;
  transition: transform 0.6s ease;
  transform: translateX(-${({ $currentIndex }) => $currentIndex * 100}%);
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const Slide = styled.div`
  min-width: 100%;
  height: 100%;
  flex-shrink: 0;
`;

export const BannerDots = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
`;

export const Dot = styled.div<{ $active: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  cursor: pointer;
  background: ${({ $active }) =>
    $active ? "white" : "rgba(255, 255, 255, 0.4)"};
  transition: all 0.3s ease;
`;
