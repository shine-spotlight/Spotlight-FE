import React from "react";
import styled from "@emotion/styled";
import Navigation from "./Navigation";
import { Outlet } from "react-router-dom";

const AppContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.color.background.app};
  position: relative;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 0;
  overflow-y: auto;
  padding-bottom: 80px;
`;

const Layout: React.FC = () => {
  return (
    <AppContainer>
      <MainContent>
        <Outlet />
      </MainContent>
      <Navigation />
    </AppContainer>
  );
};

export default Layout;
