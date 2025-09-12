import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.color.background.surface};
  height: 60px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  ${({ theme }) => theme.typography.h2};
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
  color: ${({ theme }) => theme.color.text.primary};
  svg {
    position: absolute;
    left: 10px;
  }
  max-width: 500px;
  position: fixed;
`;
