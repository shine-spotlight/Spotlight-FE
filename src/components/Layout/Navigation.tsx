import React from "react";
import styled from "@emotion/styled";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserStore } from "../../stores/userStore";
import { getMenusByRole } from "../../constants/navigation";

const NavigationContainer = styled.nav`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 500px;
  height: 80px;
  background-color: ${({ theme }) => theme.color.background.surface};
  border-top: 1px solid ${({ theme }) => theme.color.border.default};
  display: flex;
  align-items: center;
  justify-content: space-around;
  z-index: 1000;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
`;

const NavItem = styled.button<{ isActive: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 8px;
  transition: all 0.2s ease;
  min-width: 60px;

  ${({ isActive, theme }) =>
    isActive &&
    `
    background-color: ${theme.color.brand.tint};
  `}

  &:hover {
    background-color: ${({ theme }) => theme.color.background.muted};
  }
`;

const NavIcon = styled.div<{ isActive: boolean }>`
  width: 24px;
  height: 24px;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: ${({ isActive, theme }) =>
    isActive ? theme.color.brand.solid : theme.palette.gray[600]};
  color: ${({ isActive, theme }) =>
    isActive ? theme.color.brand.solid : theme.palette.gray[600]};
`;

const NavLabel = styled.span<{ isActive: boolean }>`
  font-size: 12px;
  font-weight: ${({ isActive }) => (isActive ? "600" : "400")};
  color: ${({ isActive }) => (isActive ? "#007bff" : "#6c757d")};
  text-align: center;
  line-height: 1.2;
`;

// 간단한 아이콘 컴포넌트들
const HomeIcon = () => <span>🏠</span>;
const SearchIcon = () => <span>🔍</span>;
const ProposalIcon = () => <span>📋</span>;
const AnnouncementIcon = () => <span>📢</span>;
const ProfileIcon = () => <span>👤</span>;

const getIcon = (menuId: string) => {
  switch (menuId) {
    case "home":
      return <HomeIcon />;
    case "space-search":
    case "artist-search":
      return <SearchIcon />;
    case "proposals":
      return <ProposalIcon />;
    case "announcements":
      return <AnnouncementIcon />;
    case "profile":
      return <ProfileIcon />;
    default:
      return <span>📄</span>;
  }
};

const Navigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useUserStore();

  if (!user) {
    return null; // 로그인하지 않은 경우 네비게이션 숨김
  }

  const menus = getMenusByRole(user.role);

  const handleNavClick = (path: string) => {
    navigate(path);
  };

  return (
    <NavigationContainer>
      {menus.map((menu) => {
        const isActive = location.pathname === menu.path;
        return (
          <NavItem
            key={menu.id}
            isActive={isActive}
            onClick={() => handleNavClick(menu.path)}
          >
            <NavIcon isActive={isActive}>{getIcon(menu.id)}</NavIcon>
            <NavLabel isActive={isActive}>{menu.label}</NavLabel>
          </NavItem>
        );
      })}
    </NavigationContainer>
  );
};

export default Navigation;
