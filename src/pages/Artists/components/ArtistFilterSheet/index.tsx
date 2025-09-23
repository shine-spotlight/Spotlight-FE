import { FilterSheet } from "@/components/FilterSheet";
import { EVENT_CATEGORIES } from "@constants/categories";
import type { ArtistFilter } from "@models/artist/artist.type";
import type { RegionValue } from "@/types";

type ArtistFilterSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  value: ArtistFilter;
  onChange: (next: ArtistFilter) => void;
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
  const formatRegionKey = (v: RegionValue) =>
    v.sigungu ? `${v.sido} ${v.sigungu}` : `${v.sido}`;
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
          onChange={(categories) => onChange({ ...value, categories })}
        />
      </FilterSheet.Section>

      <FilterSheet.Section title="희망 페이">
        <FilterSheet.PayRange
          min={0}
          max={500}
          value={[value.payMin ?? 0, value.payMax ?? 500]}
          onChange={([payMin, payMax]) =>
            onChange({ ...value, payMin, payMax })
          }
        />
      </FilterSheet.Section>
    </FilterSheet>
  );
}
