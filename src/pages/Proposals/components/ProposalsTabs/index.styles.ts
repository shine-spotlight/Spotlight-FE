import styled from "@emotion/styled";

export const Tabs = styled.div`
  position: fixed;
  max-width: 500px;
  background-color: ${({ theme }) => theme.color.background.surface};
  z-index: 10;
  display: flex;
  width: 100%;
  gap: 8px;
  height: 50px;
  border-bottom: 1px solid ${({ theme }) => theme.color.border.default};
`;

export const TabButton = styled.button`
  ${({ theme }) => theme.typography.buttonLg};
  padding: 16px;
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.color.text.secondary};
  position: relative;
  width: 100%;

  &[data-active="true"] {
    color: ${({ theme }) => theme.color.brand.solid};
  }

  &[data-active="true"]::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: -1px;
    height: 2px;
    background: ${({ theme }) => theme.color.brand.solid};
  }

  &:disabled {
    opacity: 0.4;
    cursor: default;
  }
`;
