import React, { useMemo, useState } from "react";
import * as S from "./index.styles";
import regionsData from "@assets/json/region.json";

type Sido = {
  code: string;
  name: string;
  sgg: string[];
};

export type RegionValue = {
  sido: string;
  sigungu?: string | null;
};

type Props = {
  value: RegionValue[];
  onChange: (next: RegionValue[]) => void;
  multiple?: boolean;
};

const RegionPicker: React.FC<Props> = ({
  value,
  onChange,
  multiple = true,
}) => {
  const sidos = regionsData as Sido[];
  const [activeSidoCode, setActiveSidoCode] = useState<string>(sidos[0].code);

  const activeSido = useMemo(
    () => sidos.find((s) => s.code === activeSidoCode) ?? sidos[0],
    [sidos, activeSidoCode]
  );

  const isSelected = (sido: string, sigungu?: string) =>
    value.some((v) => v.sido === sido && v.sigungu === sigungu);

  const toggle = (sido: string, sigungu?: string) => {
    const exists = isSelected(sido, sigungu);
    if (multiple) {
      onChange(
        exists
          ? value.filter((v) => !(v.sido === sido && v.sigungu === sigungu))
          : [...value, { sido, sigungu }]
      );
    } else {
      onChange(exists ? [] : [{ sido, sigungu }]);
    }
  };

  const removeChip = (idx: number) => {
    const next = [...value];
    next.splice(idx, 1);
    onChange(next);
  };

  return (
    <div>
      <S.ChipsRow>
        {value.map((v, i) => (
          <S.Chip
            key={`${v.sido}-${v.sigungu ?? "ALL"}`}
            onClick={() => removeChip(i)}
          >
            {v.sigungu ? `${v.sido} ${v.sigungu}` : `${v.sido} 전체`}{" "}
            <span>✕</span>
          </S.Chip>
        ))}
      </S.ChipsRow>

      <S.PickerPane>
        <S.SidoCol>
          {sidos.map((s) => (
            <S.SidoItem
              key={s.code}
              type="button"
              data-active={s.code === activeSidoCode ? "true" : "false"}
              onClick={() => setActiveSidoCode(s.code)}
            >
              {s.name}
            </S.SidoItem>
          ))}
        </S.SidoCol>

        <S.SggCol>
          {/* 전체 선택 */}
          <S.SggItem
            type="button"
            data-checked={
              isSelected(activeSido.name, undefined) ? "true" : "false"
            }
            onClick={() => toggle(activeSido.name, undefined)}
          >
            {activeSido.name} 전체
            {isSelected(activeSido.name, undefined) && <S.Check>✓</S.Check>}
          </S.SggItem>

          {activeSido.sgg.map((g) => (
            <S.SggItem
              key={g}
              type="button"
              data-checked={isSelected(activeSido.name, g) ? "true" : "false"}
              onClick={() => toggle(activeSido.name, g)}
            >
              {g}
              {isSelected(activeSido.name, g) && <S.Check>✓</S.Check>}
            </S.SggItem>
          ))}
        </S.SggCol>
      </S.PickerPane>
    </div>
  );
};

export default RegionPicker;
