import styled from "@emotion/styled";

export const Container = styled.header`
  height: 60px;
  width: 100%;
  background-color: ${({ theme }) => theme.color.background.app};
  /* box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1); */
  padding: 20px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 500px;
  z-index: 1;
`;

export const Title = styled.h1`
  ${({ theme }) => theme.typography.h2};
  color: ${({ theme }) => theme.color.text.primary};
`;
