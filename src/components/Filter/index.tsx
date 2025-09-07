import React from "react";
import * as S from "./index.styles";
import { FilterIcon } from "@assets/svg/common";
import { useTheme } from "@emotion/react";

interface FilterProps {
  isActive?: boolean;
  onClick?: () => void;
}

export const Filter: React.FC<FilterProps> = ({
  isActive = false,
  onClick,
}) => {
  const theme = useTheme();
  return (
    <S.Container
      type="button"
      data-active={isActive ? "true" : "false"}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
      aria-pressed={isActive}
    >
      <FilterIcon
        height={16}
        width={16}
        fill={isActive ? theme.color.border.focus : theme.color.border.default}
      />
      <span>필터</span>
    </S.Container>
  );
};
