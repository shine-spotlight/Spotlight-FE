import styled from "@emotion/styled";

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

export const Label = styled.label`
  ${({ theme }) => theme.typography.body3};
  color: ${({ theme }) => theme.color.text.secondary};
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  display: inline-block;

  /* 오른쪽에 P가 겹치지 않게 여백 확보 */
  input {
    width: 100%;
    padding: 12px 28px 12px 16px;
    border: 1px solid ${({ theme }) => theme.color.border.default};
    border-radius: ${({ theme }) => theme.radius.pill};
    ${({ theme }) => theme.typography.buttonLg};
    outline: none;
    transition: border-color 0.2s;
    text-align: center;

    &::placeholder {
      color: ${({ theme }) => theme.color.text.disabled};
    }

    &:focus {
      border-color: ${({ theme }) => theme.color.brand.solid};
    }
  }
  &::after {
    content: "P";
    ${({ theme }) => theme.typography.buttonLg};
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: ${({ theme }) => theme.color.text.primary};
    pointer-events: none;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid ${({ theme }) => theme.color.border.default};
  border-radius: ${({ theme }) => theme.radius.pill};
  ${({ theme }) => theme.typography.buttonLg};

  outline: none;
  transition: border-color 0.2s;
  text-align: center;

  &:focus {
    border-color: ${({ theme }) => theme.color.brand.solid};
  }

  &::placeholder {
    color: ${({ theme }) => theme.color.text.secondary};
  }

  &::after {
    content: "P";
    position: absolute;
    right: 8px;
    color: ${({ theme }) => theme.color.text.secondary};
    pointer-events: none;
  }
`;

export const ErrorMessage = styled.div`
  ${({ theme }) => theme.typography.caption};
  color: ${({ theme }) => theme.palette.red[500]};
  text-align: center;
`;

export const QuickAmounts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const QuickAmountLabel = styled.span`
  ${({ theme }) => theme.typography.caption};
  color: ${({ theme }) => theme.color.text.secondary};
`;

export const QuickAmountButtons = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
`;

export const QuickAmountButton = styled.button`
  padding: 4px 8px;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) => theme.color.background.subtle};
  color: ${({ theme }) => theme.color.text.secondary};
  ${({ theme }) => theme.typography.body4};
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
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
  width: 40%;
  min-width: 80px;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
