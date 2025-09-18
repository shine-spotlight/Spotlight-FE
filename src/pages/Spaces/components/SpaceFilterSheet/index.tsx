import { FilterSheet } from "@/components/FilterSheet";
import { EVENT_CATEGORIES } from "@constants/categories";
import type { SpaceFilter } from "@models/space/space.type";
import type { RegionValue } from "@types";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  value: SpaceFilter;
  onChange: (next: SpaceFilter) => void;
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
  const formatRegionKey = (v: RegionValue) =>
    v.sigungu ? `${v.sido} ${v.sigungu}` : `${v.sido}`;
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
          value={value.regions ?? []}
          onChange={(regions) => {
            onChange({
              ...value,
              regions,
              region: regions.map(formatRegionKey),
            });
          }}
        />
      </FilterSheet.Section>
      <FilterSheet.Section title="행사 형태">
        <FilterSheet.Chips
          items={EVENT_CATEGORIES}
          selected={value.categories ?? []}
          onChange={(next) => onChange({ ...value, categories: next })}
        />
      </FilterSheet.Section>
      <FilterSheet.Section title="수용 인원">
        <FilterSheet.PayRange
          min={0}
          max={1_000}
          value={[value.capMin ?? 0, value.capMax ?? 1000]}
          onChange={([capMin, capMax]) =>
            onChange({ ...value, capMin, capMax })
          }
          label="명"
        />
      </FilterSheet.Section>
    </FilterSheet>
  );
}
