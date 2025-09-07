import React from "react";
import * as S from "./index.styles";
import { BottomNavigationBar } from "../BottomNavigationBar";
import { Header } from "../Header";
import { Outlet } from "react-router-dom";

export const Layout: React.FC = () => {
  return (
    <S.AppContainer>
      <Header />
      <S.MainContent>
        <Outlet />
      </S.MainContent>
      <BottomNavigationBar />
    </S.AppContainer>
  );
};
