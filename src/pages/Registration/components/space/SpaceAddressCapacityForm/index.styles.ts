import styled from "@emotion/styled";

export const FormTable = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 16px;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const Label = styled.label`
  flex: 0 0 80px;
  ${({ theme }) => theme.typography.buttonMd};
  color: ${({ theme }) => theme.color.text.secondary};
`;

export const SearchButton = styled.button`
  padding: 6px 12px;
  ${({ theme }) => theme.typography.buttonMd}
  border-radius: ${({ theme }) => theme.radius.pill};
  border: 1px solid ${({ theme }) => theme.color.brand.solid};
  background-color: ${({ theme }) => theme.color.brand.solid};
  color: white;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 0;
  &:hover {
    opacity: 0.9;
  }
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1200;
`;

export const Sheet = styled.div`
  background: white;
  width: 90%;
  max-width: 500px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
`;

export const SheetHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid ${({ theme }) => theme.color.border.subtle};
`;

export const SheetTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin: 0;
`;

export const BorderInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  ${({ theme }) => theme.typography.body3};
  border: 1px solid ${({ theme }) => theme.color.border.subtle};
  border-radius: ${({ theme }) => theme.radius.pill};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.color.brand.solid};
  }

  &[disabled],
  &[data-locked] {
    background-color: ${({ theme }) => theme.color.background.subtle};
    color: ${({ theme }) => theme.color.text.primary};
    cursor: not-allowed;
  }
`;
