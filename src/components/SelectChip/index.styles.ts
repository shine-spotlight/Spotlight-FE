import styled from "@emotion/styled";

type ChipProps = {
  "data-active"?: "true" | "false";
};

export const Chip = styled.button<ChipProps>`
  border: 1px solid ${({ theme }) => theme.color.border.default};
  border-radius: ${({ theme }) => theme.radius.pill};
  padding: 8px 16px;
  ${({ theme }) => theme.typography.buttonMd}
  cursor: pointer;
  background: ${({ theme }) => theme.color.background.surface};
  color: ${({ theme }) => theme.color.text.disabled};

  &[data-active="true"] {
    background: ${({ theme }) => theme.palette.sky[500]};
    border-color: ${({ theme }) => theme.color.border.focus};
    color: ${({ theme }) => theme.palette.white};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
