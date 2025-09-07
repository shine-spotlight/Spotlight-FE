import styled from "@emotion/styled";

export const FilterSection = styled.div`
  position: fixed;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 500px;
  padding: 20px;
  background-color: ${({ theme }) => theme.color.background.surface};
`;

export const Container = styled.div`
  padding: 20px;
  padding-top: 80px;
`;

export const Sort = styled.span`
  ${({ theme }) => theme.typography.body3};
  color: ${({ theme }) => theme.color.text.secondary};
`;
