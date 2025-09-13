import styled from "@emotion/styled";

export const Wrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 18px;
  width: fit-content;
  padding: 8px 4px 14px;
  margin: 0 auto;
`;

export const IconButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  ${({ theme }) => theme.typography.buttonLg}
  color: ${({ theme }) => theme.palette.sky[500]};
  &:disabled {
    opacity: 0.3;
    cursor: default;
  }
`;

export const Value = styled.span`
  ${({ theme }) => theme.typography.h3};
  color: ${({ theme }) => theme.color.text.primary};
  strong {
    font-weight: 800;
  }
  input {
    -moz-appearance: textfield; /* Firefox */
    appearance: textfield; /* 표준 */
    &::-webkit-outer-spin-button,     /* Chrome/Safari/Edge */
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    width: 60px;
    text-align: center;
    font-weight: bold;
    border: none;
    outline: none;
    background: transparent;
  }
`;

export const Underline = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
  width: 120px;
  height: 2px;
  background: ${({ theme }) => theme.palette.sky[400]};
  border-radius: 999px;
`;
