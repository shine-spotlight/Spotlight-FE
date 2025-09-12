import React from "react";
import * as S from "./index.styles";
import { ArrowIcon } from "@assets/svg/common";

interface TopbarProps {
  title: string;
  goBack?: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ title, goBack }) => {
  return (
    <S.Container>
      {title}
      {goBack !== null && <ArrowIcon onClick={goBack} width={20} height={20} />}
    </S.Container>
  );
};
