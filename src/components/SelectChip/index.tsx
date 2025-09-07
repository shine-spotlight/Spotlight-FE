import React from "react";
import * as S from "./index.styles";

type SelectChipProps = {
  label: string;
  selected?: boolean;
  onClick?: () => void;
  disabled?: boolean;
};

export const SelectChip: React.FC<SelectChipProps> = ({
  label,
  selected = false,
  onClick,
  disabled,
}) => {
  return (
    <S.Chip
      type="button"
      data-active={selected ? "true" : "false"}
      disabled={disabled}
      onClick={onClick}
      title={label}
    >
      {label}
    </S.Chip>
  );
};
