import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

export const Wrap = styled.main`
  min-height: 100dvh;
  display: grid;
  place-items: center;
  background: ${({ theme }) => theme.color.background.surface};
  padding: 24px;
  width: 100%;
`;

export const Card = styled.section`
  width: 100%;
  max-width: 420px;
  padding: 28px 24px;
  border-radius: 16px;
  background: ${({ theme }) => theme.color.background.surface};
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  display: grid;
  gap: 16px;
  text-align: center;
`;

export const Brand = styled.div`
  font-weight: 800;
  font-size: 20px;
  letter-spacing: 0.3px;
  color: ${({ theme }) => theme.color.brand.solid};
`;

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

export const Spinner = styled.div`
  margin: 8px auto 6px;
  width: 36px;
  height: 36px;
  border: 3px solid ${({ theme }) => theme.color.border.subtle};
  border-top-color: ${({ theme }) => theme.color.brand.solid};
  border-radius: 50%;
  animation: ${spin} 0.9s linear infinite;
`;

export const Progress = styled.div`
  height: 6px;
  width: 100%;
  background: ${({ theme }) => theme.color.background.surfaceAlt};
  border-radius: 999px;
  overflow: hidden;
`;

export const Bar = styled.div`
  height: 100%;
  background: ${({ theme }) => theme.color.brand.solid};
  transition: width 360ms ease;
`;

export const Title = styled.h1`
  margin: 8px 0 0;
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.color.text.primary};
`;

export const Sub = styled.p`
  margin: 0;
  font-size: 14px;
  color: ${({ theme }) => theme.color.text.secondary};
  min-height: 20px;
`;

export const Hint = styled.p`
  margin: 0;
  font-size: 12px;
  color: ${({ theme }) => theme.color.text.primary};
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 4px;
`;

export const GhostButton = styled.button`
  padding: 12px 14px;
  border-radius: ${({ theme }) => theme.radius.pill};
  border: 1px solid ${({ theme }) => theme.color.border.default};
  background: transparent;
  color: ${({ theme }) => theme.color.text.primary};
  ${({ theme }) => theme.typography.buttonMd};
`;

export const PrimaryButton = styled.button`
  padding: 12px 14px;
  border-radius: ${({ theme }) => theme.radius.pill};
  border: none;
  background: ${({ theme }) => theme.color.brand.solid};
  ${({ theme }) => theme.typography.buttonMd};

  color: ${({ theme }) => theme.palette.white};
`;
