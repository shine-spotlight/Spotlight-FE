import styled from "@emotion/styled";

const BASE_H = 72;

export const Footer = styled.div`
  bottom: 0;
  left: 0;
  right: 0;
  position: fixed;
  background: ${({ theme }) => theme.color.background.surface};
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.15);
  padding: 20px;
  border-radius: 20px 20px 0 0;
  padding-bottom: 30px;

  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  max-width: 500px;
  margin: 0 auto;
`;

export const Spacer = styled.div`
  height: ${BASE_H}px;

  &[data-safe="true"] {
    height: calc(${BASE_H}px + env(safe-area-inset-bottom));
  }
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 12px;
  width: 100%;
`;

export const Button = styled.button`
  width: 100%;
  padding: 16px 0;
  border-radius: ${({ theme }) => theme.radius.sm};
  border: none;
  cursor: pointer;
  ${({ theme }) => theme.typography.buttonLg};

  &[data-variant="primary"] {
    background: ${({ theme }) => theme.palette.sky[500]};
    color: ${({ theme }) => theme.color.text.inverse};
  }

  &[data-variant="ghost"] {
    background: ${({ theme }) => theme.color.background.subtle};
    color: ${({ theme }) => theme.color.text.disabled};
  }

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
`;
