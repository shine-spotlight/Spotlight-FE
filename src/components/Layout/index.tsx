import React from "react";
import * as S from "./index.styles";
import { BottomNavigationBar } from "../BottomNavigationBar";
import { Header } from "../Header";
import { Outlet, useLocation } from "react-router-dom";

export const Layout: React.FC = () => {
  const location = useLocation();
  const shouldShow =
    location.pathname === "/home" ||
    location.pathname === "/spaces" ||
    location.pathname === "/artists" ||
    location.pathname === "/proposals" ||
    location.pathname === "/announcements" ||
    location.pathname === "/mypage";

  return (
    <S.AppContainer>
      {shouldShow && <Header />}
      <S.MainContent $shouldShow={shouldShow}>
        <Outlet />
      </S.MainContent>
      {shouldShow && <BottomNavigationBar />}
    </S.AppContainer>
  );
};
