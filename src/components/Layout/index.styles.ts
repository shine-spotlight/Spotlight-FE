import styled from "@emotion/styled";

export const AppContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.color.background.app};
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const MainContent = styled.main`
  flex: 1;
  padding: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 60px;
  padding-bottom: 90px;
`;
