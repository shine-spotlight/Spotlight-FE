import React from "react";
import * as S from "./index.styles";

type CheckOptionProps = {
  label: string;
  checked: boolean;
  onChange: (next: boolean) => void;
  className?: string;
};

const CheckOption: React.FC<CheckOptionProps> = ({
  label,
  checked,
  onChange,
  className,
}) => {
  return (
    <S.Checkbox className={className}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <label>{label}</label>
    </S.Checkbox>
  );
};

export default CheckOption;
