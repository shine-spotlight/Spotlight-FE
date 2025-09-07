import React from "react";
import * as S from "./index.styles";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserStore } from "../../stores/userStore";
import { getMenusByRole } from "../../constants/navigation";
import { useTheme } from "@emotion/react";
import {
  HomeIcon,
  ProposalIcon,
  AnnouncementIcon,
  MypageIcon,
  FindIcon,
} from "@assets/svg/common";

export const BottomNavigationBar: React.FC = () => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useUserStore();

  if (!user) {
    return null;
  }

  const menus = getMenusByRole(user.role);

  const handleNavClick = (path: string) => {
    navigate(path);
  };

  const getIcon = (menuId: string, isActive: boolean) => {
    const IconColor = isActive
      ? theme.color.brand.solid
      : theme.color.brand.disabled;

    switch (menuId) {
      case "home":
        return <HomeIcon width={24} height={24} fill={IconColor} />;
      case "spaces":
      case "artists":
        return <FindIcon width={24} height={24} fill={IconColor} />;
      case "proposals":
        return <ProposalIcon width={24} height={24} fill={IconColor} />;
      case "announcements":
        return <AnnouncementIcon width={24} height={24} fill={IconColor} />;
      case "mypage":
        return <MypageIcon width={24} height={24} fill={IconColor} />;
    }
  };

  return (
    <S.NavigationContainer>
      {menus.map((menu) => {
        const isActive = location.pathname === menu.path;
        return (
          <S.NavItem
            key={menu.id}
            isActive={isActive}
            onClick={() => handleNavClick(menu.path)}
          >
            <S.NavIcon>{getIcon(menu.id, isActive)}</S.NavIcon>
            <S.NavLabel isActive={isActive}>{menu.label}</S.NavLabel>
          </S.NavItem>
        );
      })}
    </S.NavigationContainer>
  );
};
