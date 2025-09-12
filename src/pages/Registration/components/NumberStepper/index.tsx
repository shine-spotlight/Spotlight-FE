import * as S from "./index.styles";
import { useState, useEffect } from "react";

interface NumberStepperProps {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  unit?: string;
}

export default function NumberStepper({
  value,
  onChange,
  min = 0,
  max = 200,
  unit = "명",
}: NumberStepperProps) {
  const [editingValue, setEditingValue] = useState(value.toString());

  // 부모 value 변경 시 표시값 동기화
  useEffect(() => {
    setEditingValue(String(value));
  }, [value]);

  const apply = (next: number) => {
    const clamped = Math.min(max, Math.max(min, next));
    onChange(clamped);
    setEditingValue(String(clamped));
  };

  const dec = () => apply(value - 1);
  const inc = () => apply(value + 1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingValue(e.target.value);
  };

  const handleBlur = () => {
    let num = parseInt(editingValue, 10);
    if (isNaN(num)) num = min;
    if (num < min) num = min;
    if (num > max) num = max;
    onChange(num);
    setEditingValue(num.toString());
  };

  return (
    <S.Wrap>
      <S.IconButton onClick={dec} aria-label="감소">
        ▾
      </S.IconButton>
      <S.Value>
        <input
          type="number"
          value={editingValue}
          onChange={handleChange}
          onBlur={handleBlur}
          style={{
            width: "60px",
            textAlign: "center",
            fontWeight: "bold",
            border: "none",
            outline: "none",
            background: "transparent",
          }}
        />
        {unit}
      </S.Value>
      <S.IconButton onClick={inc} aria-label="증가">
        ▴
      </S.IconButton>
      <S.Underline />
    </S.Wrap>
  );
}
