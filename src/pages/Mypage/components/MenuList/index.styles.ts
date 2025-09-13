import styled from "@emotion/styled";

export const MenuItem = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  padding: 16px 10px;
  color: ${({ theme }) => theme.color.text.primary};
  border-radius: ${({ theme }) => theme.radius.sm};
  ${({ theme }) => theme.typography.buttonLg};
  background-color: ${({ theme }) => theme.color.background.surface};
  &:hover {
    background-color: ${({ theme }) => theme.color.background.infoSubtle};
  }
`;
