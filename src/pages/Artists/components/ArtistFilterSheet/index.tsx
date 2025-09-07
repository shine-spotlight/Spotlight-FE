import { FilterSheet } from "@/components/FilterSheet";
import { EVENT_CATEGORIES } from "@constants/categories";
import type { ArtistFilterType } from "@pages/Artists/types";

type ArtistFilterSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  value: ArtistFilterType;
  onChange: (next: ArtistFilterType) => void;
  onReset: () => void;
  onApply: () => void;
};

export default function ArtistFilterSheet({
  isOpen,
  onClose,
  value,
  onChange,
  onReset,
  onApply,
}: ArtistFilterSheetProps) {
  const toggle = (key: "eventTypes", item: string) => {
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
      title="필터링을 통해 원하는 예술가를 쉽게 찾아봐요!"
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

      <FilterSheet.Section title="희망 페이">
        <FilterSheet.PayRange
          min={0}
          max={1_000_000}
          value={value.payRange}
          freeOnly={value.freeOnly}
          onToggleFreeOnly={(freeOnly) => onChange({ ...value, freeOnly })}
          onChange={(payRange) => onChange({ ...value, payRange })}
        />
      </FilterSheet.Section>
    </FilterSheet>
  );
}
