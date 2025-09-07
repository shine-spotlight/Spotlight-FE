import React from "react";
import * as S from "./index.styles";
import { useNavigate } from "react-router";
import { AlertIcon, LogoIcon } from "@assets/svg/common";

export const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/home");
  };

  return (
    <S.Container>
      <LogoIcon onClick={() => handleLogoClick()} height={24} width={113} />
      <AlertIcon width={20} height={20} />
    </S.Container>
  );
};
