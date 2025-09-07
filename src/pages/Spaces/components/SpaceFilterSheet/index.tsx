import { FilterSheet } from "@/components/FilterSheet";
import { EVENT_CATEGORIES, EQUIPMENT_CATEGORIES } from "@constants/categories";
import type { SpaceFilterType } from "@pages/Spaces/types";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  value: SpaceFilterType;
  onChange: (next: SpaceFilterType) => void;
  onReset: () => void;
  onApply: () => void;
};

export default function SpaceFilterSheet({
  isOpen,
  onClose,
  value,
  onChange,
  onReset,
  onApply,
}: Props) {
  const toggle = (key: "eventTypes" | "equipments", item: string) => {
    const exists = value[key].includes(item);
    onChange({
      ...value,
      [key]: exists
        ? value[key].filter((i) => i !== item)
        : [...value[key], item],
    });
  };

  return (
    <FilterSheet
      isOpen={isOpen}
      onClose={onClose}
      title="필터링을 통해 원하는 공간을 쉽게 찾아봐요!"
      onReset={onReset}
      onApply={onApply}
    >
      <FilterSheet.Section title="지역 필터링">
        <FilterSheet.RegionSelector
          value={value.regions}
          onChange={(regions) => onChange({ ...value, regions })}
        />
      </FilterSheet.Section>

      <FilterSheet.Section title="행사 형태">
        <FilterSheet.Chips
          items={EVENT_CATEGORIES}
          selected={value.eventTypes}
          onToggle={(v) => toggle("eventTypes", v)}
        />
      </FilterSheet.Section>

      <FilterSheet.Section title="보유 장비">
        <FilterSheet.Chips
          items={EQUIPMENT_CATEGORIES}
          selected={value.equipments}
          onToggle={(v) => toggle("equipments", v)}
        />
      </FilterSheet.Section>
    </FilterSheet>
  );
}
