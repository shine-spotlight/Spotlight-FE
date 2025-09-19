import React from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

const SkeletonBox = styled.div<{
  width?: string;
  height?: string;
  borderRadius?: string;
}>`
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200px 100%;
  animation: ${shimmer} 1.5s infinite;
  width: ${({ width }) => width || "100%"};
  height: ${({ height }) => height || "20px"};
  border-radius: ${({ borderRadius }) => borderRadius || "4px"};
`;

const SkeletonContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;
`;

const ChartSkeleton = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const HomeSkeleton: React.FC = () => {
  return (
    <SkeletonContainer>
      <ChartSkeleton>
        <div
          style={{ marginTop: "20px", height: "300px", position: "relative" }}
        >
          <SkeletonBox width="100%" height="100%" borderRadius="8px" />
        </div>
      </ChartSkeleton>
    </SkeletonContainer>
  );
};
