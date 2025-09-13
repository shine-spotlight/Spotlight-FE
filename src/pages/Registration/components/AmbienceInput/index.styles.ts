import styled from "@emotion/styled";

export const TagWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
`;
export const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: ${({ theme }) => theme.radius.pill};
  border: 1px solid ${({ theme }) => theme.color.border.focus};
  background: ${({ theme }) => theme.color.background.surface};
  color: ${({ theme }) => theme.color.brand.solid};
  ${({ theme }) => theme.typography.body3};
`;
export const RemoveBtn = styled.button`
  border: 0;
  background: transparent;
  line-height: 1;
  cursor: pointer;
  color: ${({ theme }) => theme.color.brand.solid};
`;
