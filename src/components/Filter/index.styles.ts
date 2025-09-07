import styled from "@emotion/styled";

export const Container = styled.button`
  background-color: ${({ theme }) => theme.color.background.surface};
  border-radius: ${({ theme }) => theme.radius.pill};
  border: 1px solid ${({ theme }) => theme.color.border.default};
  padding: 8px 16px;
  display: flex;
  gap: 4px;
  align-items: center;
  color: ${({ theme }) => theme.color.border.default};

  &[data-active="true"] {
    border-color: ${({ theme }) => theme.color.border.focus};
    background: ${({ theme }) => theme.color.background.infoSubtle};
    color: ${({ theme }) => theme.color.border.focus};
  }

  :hover {
    background-color: ${({ theme }) => theme.color.background.surfaceAlt};
  }
`;
