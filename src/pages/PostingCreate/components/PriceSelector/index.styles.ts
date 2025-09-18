import styled from "@emotion/styled";

export const SectionTitle = styled.h3`
  ${({ theme }) => theme.typography.h3};
  color: ${({ theme }) => theme.color.text.primary};
  margin-bottom: 8px;
`;

export const PriceRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 110px;
  gap: 12px;

  @media (max-width: 360px) {
    grid-template-columns: 1fr 100px;
  }
`;

export const NegotiableDisplay = styled.div`
  width: 100%;
  padding: 12px 16px;
  padding-left: 30px;
  border: 1px solid ${({ theme }) => theme.color.border.default};
  border-radius: ${({ theme }) => theme.radius.sm};
  ${({ theme }) => theme.typography.buttonLg};
  color: ${({ theme }) => theme.color.text.disabled};
  background-color: ${({ theme }) => theme.color.background.subtle};
  display: flex;
  align-items: center;
`;

export const InputWrapper = styled.div`
  position: relative;
`;

export const InputPrefix = styled.span`
  position: absolute;
  top: 50%;
  left: 12px;
  ${({ theme }) => theme.typography.buttonLg};

  transform: translateY(-50%);
  color: ${({ theme }) => theme.color.text.secondary};
  pointer-events: none;
`;

export const PriceInput = styled.input`
  width: 100%;
  padding: 12px 14px 12px 30px;
  border: 1px solid ${({ theme }) => theme.color.border.default};
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.color.background.surface};
  color: ${({ theme }) => theme.color.text.primary};
  ${({ theme }) => theme.typography.buttonLg};
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: ${({ theme }) => theme.color.brand.solid};
  }

  &::placeholder {
    color: ${({ theme }) => theme.color.text.disabled};
  }

  &:disabled {
    background: ${({ theme }) => theme.color.background.subtle};
    color: ${({ theme }) => theme.color.text.secondary};
    cursor: not-allowed;
  }
`;

export const NegotiableButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border: 1px solid ${({ theme }) => theme.color.border.default};
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.color.background.surface};
  color: ${({ theme }) => theme.color.text.secondary};
  ${({ theme }) => theme.typography.buttonMd};
  padding: 0 12px;
  transition: all 0.2s;

  &[data-active="true"] {
    border-color: ${({ theme }) => theme.color.brand.solid};
    background: ${({ theme }) => theme.color.brand.tint};
    color: ${({ theme }) => theme.color.brand.solid};
  }
`;

export const CheckIcon = styled.svg`
  width: 16px;
  height: 16px;
  fill: currentColor;
`;
