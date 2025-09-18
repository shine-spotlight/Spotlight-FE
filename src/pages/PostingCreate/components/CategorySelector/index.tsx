import SelectChipsGroup from "@components/SelectChipsGroup";
import { EVENT_CATEGORIES } from "@constants/categories";

interface CategorySelectorProps {
  selected: string[];
  onChange: (categories: string[]) => void;
}

export default function CategorySelector({
  selected,
  onChange,
}: CategorySelectorProps) {
  return (
    <>
      <SelectChipsGroup
        items={EVENT_CATEGORIES}
        selected={selected}
        onChange={onChange}
        max={3}
      />
    </>
  );
}
