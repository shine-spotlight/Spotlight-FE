import styled from "@emotion/styled";

export const FilterRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Pill = styled.button`
  ${({ theme }) => theme.typography.buttonMd};
  padding: 8px 16px;
  border-radius: ${({ theme }) => theme.radius.pill};
  border: 1px solid ${({ theme }) => theme.color.border.default};
  background: ${({ theme }) => theme.color.background.surface};
  color: ${({ theme }) => theme.color.text.disabled};
  cursor: pointer;

  &[data-active="true"] {
    border-color: ${({ theme }) => theme.color.border.focus};
    color: ${({ theme }) => theme.color.brand.solid};
    background: ${({ theme }) => theme.color.brand.tint};
  }
`;

export const SortText = styled.span`
  margin-left: auto;
  ${({ theme }) => theme.typography.body3};
  color: ${({ theme }) => theme.color.text.secondary};
`;

export const Col = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 500px;
  padding: 16px 0;
`;
