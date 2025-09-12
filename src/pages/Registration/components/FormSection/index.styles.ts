import styled from "@emotion/styled";

export const Section = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Title = styled.h3`
  ${({ theme }) => theme.typography.h3};
  color: ${({ theme }) => theme.color.text.primary};
`;

export const Helper = styled.p`
  ${({ theme }) => theme.typography.body4};
  color: ${({ theme }) => theme.color.text.secondary};
`;

export const SmallButton = styled.button`
  ${({ theme }) => theme.typography.buttonSm};
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.color.border.default};
  background: ${({ theme }) => theme.color.background.surface};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.color.background.subtle};
  }
`;

export const Pill = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.color.border.default};
  background: ${({ theme }) => theme.color.background.surface};
  a {
    ${({ theme }) => theme.typography.caption};
    color: ${({ theme }) => theme.color.text.primary};
    text-decoration: none;
    max-width: 220px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;
