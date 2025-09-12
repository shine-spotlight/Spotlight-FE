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
          onChange={(next) => onChange({ ...value, eventTypes: next })}
        />
      </FilterSheet.Section>

      <FilterSheet.Section title="보유 장비">
        <FilterSheet.Chips
          items={EQUIPMENT_CATEGORIES}
          selected={value.equipments}
          onChange={(next) => onChange({ ...value, equipments: next })}
        />
      </FilterSheet.Section>
    </FilterSheet>
  );
}
