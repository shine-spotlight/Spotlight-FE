import React from "react";
import * as S from "./index.styles";
import { BottomNavigationBar } from "../BottomNavigationBar";
import { Header } from "../Header";
import { Outlet, useLocation } from "react-router-dom";

export const Layout: React.FC = () => {
  const location = useLocation();
  const shouldHide =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname.startsWith("/register");

  return (
    <S.AppContainer>
      {!shouldHide && <Header />}
      <S.MainContent $shouldHide={shouldHide}>
        <Outlet />
      </S.MainContent>
      {!shouldHide && <BottomNavigationBar />}
    </S.AppContainer>
  );
};
