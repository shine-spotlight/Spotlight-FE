import styled from "@emotion/styled";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
`;

export const Message = styled.div`
  ${({ theme }) => theme.typography.body3}
  line-height: 1.5;
  color: ${({ theme }) => theme.color.text.secondary};
`;

export const PhoneBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid ${({ theme }) => theme.color.border.default};
  border-radius: 999px;
  padding: 10px 12px;
  justify-content: space-between;
  background: ${({ theme }) => theme.color.background.surface};
`;

export const PhoneInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  text-align: center;
  ${({ theme }) => theme.typography.buttonMd}
  color:${({ theme }) => theme.color.text.primary};
  background: transparent;

  &::placeholder {
    color: ${({ theme }) => theme.color.text.secondary};
  }
`;

export const CopyButton = styled.button`
  border: 1px solid ${({ theme }) => theme.color.brand.solid};
  background: ${({ theme }) => theme.color.background.infoSubtle};
  color: ${({ theme }) => theme.color.brand.solid};
  border-radius: ${({ theme }) => theme.radius.pill};
  padding: 6px 12px;
  ${({ theme }) => theme.typography.buttonSm}
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const CopyLabel = styled.span`
  ${({ theme }) => theme.typography.body4};
  color: ${({ theme }) => theme.color.brand.solidActive};
`;
