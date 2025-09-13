import { useState, useRef } from "react";
import * as L from "./index.styles";
import * as S from "../index.styles";

export function AmbienceInput({
  value,
  onChange,
  max = 5,
}: {
  value: string[];
  onChange: (next: string[]) => void;
  max?: number;
}) {
  const [input, setInput] = useState("");
  const composingRef = useRef(false);

  const commit = (raw: string) => {
    const t = raw.trim();
    if (!t) return;
    if (value.includes(t)) return;
    if (value.length >= max) return;
    // 길이 제한이나 금칙문자 등의 검증이 필요하면 여기에서 처리
    onChange([...value, t]);
    setInput("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;

    // 조합(한글) 중에는 파싱하지 않음
    if (composingRef.current) {
      setInput(raw);
      return;
    }

    // 공백/콤마 기준으로 토큰화
    const parts = raw.split(/[,\s]+/);
    const endsWithSep = /[,\s]+$/.test(raw);

    // 마지막 미완성 토큰을 제외하고 커밋
    const completeTokens = endsWithSep ? parts : parts.slice(0, -1);
    completeTokens.filter(Boolean).forEach(commit);

    // 끝이 구분자로 끝나면 input 비우고, 아니면 마지막 토큰만 남김
    const tail = endsWithSep ? "" : parts[parts.length - 1] ?? "";
    setInput(tail);
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    // Enter로도 확정 가능 (조합 중 제외)
    if (!composingRef.current && e.key === "Enter") {
      e.preventDefault();
      if (input) {
        commit(input);
        setInput("");
      }
    }
  };

  return (
    <>
      <S.Input
        placeholder="#태그를 입력하고 Enter"
        value={input}
        onChange={handleChange}
        onKeyDown={onKeyDown}
        onCompositionStart={() => (composingRef.current = true)}
        onCompositionEnd={(e) => {
          composingRef.current = false;
          // 조합이 끝난 시점의 값으로 한 번 더 파싱
          handleChange(e as unknown as React.ChangeEvent<HTMLInputElement>);
        }}
      />
      <L.TagWrap>
        {value.map((t) => (
          <L.Tag key={t}>
            #{t}
            <L.RemoveBtn
              aria-label={`${t} 제거`}
              onClick={() => onChange(value.filter((x) => x !== t))}
            >
              ×
            </L.RemoveBtn>
          </L.Tag>
        ))}
      </L.TagWrap>
    </>
  );
}
