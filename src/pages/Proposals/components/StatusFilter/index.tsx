import * as S from "./index.styles";
import type { StatusFilterType } from "@pages/Proposals/types";
import { STATUS_FILTERS } from "../../constants";

interface StatusFilterProps {
  data?: StatusFilterType[];
  value: StatusFilterType;
  onChange: (next: StatusFilterType) => void;
}

export const StatusFilter = ({
  data = STATUS_FILTERS,
  value,
  onChange,
}: StatusFilterProps) => {
  return (
    <S.Col>
      <S.FilterRow>
        {data.map((label) => (
          <S.Pill
            key={label}
            data-active={value === label ? "true" : "false"}
            onClick={() => onChange(label)}
          >
            {label}
          </S.Pill>
        ))}
      </S.FilterRow>
      <S.SortText>최근 등록순</S.SortText>
    </S.Col>
  );
};
