import styled from "@emotion/styled";

export const NavigationContainer = styled.nav`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 500px;
  background-color: ${({ theme }) => theme.color.background.surface};
  display: flex;
  align-items: center;
  padding: 8px;
  gap: 8px;
  z-index: 1000;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
`;

export const NavItem = styled.button<{ isActive: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  border-radius: 8px;
  transition: all 0.2s ease;
  min-width: 60px;
  margin-bottom: 10px;
  ${({ isActive, theme }) =>
    isActive &&
    `
    background-color: ${theme.color.brand.tint};
  `}

  &:hover {
    background-color: ${({ theme }) => theme.color.background.surfaceAlt};
  }
`;

export const NavIcon = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const NavLabel = styled.span<{ isActive: boolean }>`
  ${({ theme }) => theme.typography.caption}
  color: ${({ isActive, theme }) =>
    isActive ? theme.color.brand.solid : theme.color.brand.disabled};
  text-align: center;
`;
