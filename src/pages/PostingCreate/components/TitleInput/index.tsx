import * as S from "./index.styles";

interface TitleInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function TitleInput({ value, onChange }: TitleInputProps) {
  return (
    <>
      <S.Input
        placeholder="공연 제목을 입력해주세요"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </>
  );
}
