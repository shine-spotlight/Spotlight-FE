import styled from "@emotion/styled";

export const Content = styled.div`
  padding: 0;
`;

export const Message = styled.p`
  margin: 0;
  ${({ theme }) => theme.typography.body3}
  text-align: center;
  white-space: pre-line;
  color: ${({ theme }) => theme.color.text.secondary};
  line-height: 1.5;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
`;

export const Button = styled.button<{ variant?: "primary" | "secondary" }>`
  background: ${({ theme, variant }) =>
    variant === "secondary"
      ? theme.color.background.subtle
      : theme.color.brand.solid};
  color: ${({ theme, variant }) =>
    variant === "secondary" ? theme.color.text.primary : "white"};
  border-radius: ${({ theme }) => theme.radius.pill};
  padding: 12px 24px;
  ${({ theme }) => theme.typography.buttonMd};
  cursor: pointer;
  transition: all 0.2s;
  min-width: 80px;

  &:hover:not(:disabled) {
    background: ${({ theme, variant }) =>
      variant === "secondary"
        ? theme.color.background.muted
        : theme.palette.sky[600]};
  }

  &:active:not(:disabled) {
    background: ${({ theme, variant }) =>
      variant === "secondary"
        ? theme.color.background.muted
        : theme.palette.sky[600]};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
