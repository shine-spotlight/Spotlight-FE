import * as S from "./index.styles";

interface DateSelectorProps {
  value: Date;
  onChange: (date: Date) => void;
}

export default function DateSelector({ value, onChange }: DateSelectorProps) {
  return (
    <>
      <S.DateInput
        type="date"
        value={value ? new Date(value).toISOString().split("T")[0] : ""}
        onChange={(e) => onChange(new Date(e.target.value))}
      />
    </>
  );
}
