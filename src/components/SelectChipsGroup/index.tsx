import { SelectChip } from "../SelectChip";
import * as S from "./index.styles";

interface SelectChipsGroupProps {
  items: readonly string[];
  selected: readonly string[];
  onChange: (next: string[]) => void;
  max?: number;
}

export default function SelectChipsGroup({
  items,
  selected,
  onChange,
  max,
}: SelectChipsGroupProps) {
  const toggle = (label: string) => {
    const exists = selected.includes(label);
    if (exists) {
      onChange(selected.filter((i) => i !== label));
      return;
    }
    if (max && selected.length >= max) {
      return;
    }
    onChange([...selected, label]);
  };

  return (
    <S.Row>
      {items.map((label) => (
        <SelectChip
          key={label}
          selected={selected.includes(label)}
          onClick={() => toggle(label)}
          label={label}
        />
      ))}
    </S.Row>
  );
}
