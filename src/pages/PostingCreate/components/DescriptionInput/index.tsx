import * as S from "./index.styles";

interface DescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function DescriptionInput({
  value,
  onChange,
}: DescriptionInputProps) {
  return (
    <>
      <S.TextArea
        placeholder="공연에 대한 자세한 설명을 입력해주세요"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </>
  );
}
