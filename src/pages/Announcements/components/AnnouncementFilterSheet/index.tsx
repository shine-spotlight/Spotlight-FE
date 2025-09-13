import { FilterSheet } from "@/components/FilterSheet";
import { EVENT_CATEGORIES } from "@constants/categories";
import type { AnnouncementFilterType } from "../../types";

interface AnnouncementFilterSheetProps {
  isOpen: boolean;
  onClose: () => void;
  value: AnnouncementFilterType;
  onChange: (next: AnnouncementFilterType) => void;
  onReset: () => void;
  onApply: () => void;
}

export function AnnouncementFilterSheet({
  isOpen,
  onClose,
  value,
  onChange,
  onReset,
  onApply,
}: AnnouncementFilterSheetProps) {
  return (
    <FilterSheet
      isOpen={isOpen}
      onClose={onClose}
      title="필터링을 통해 원하는 공고를 쉽게 찾아봐요!"
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

      <FilterSheet.Section title="공고 날짜">
        <FilterSheet.DatePicker
          label="원하는 날짜"
          value={value.date ?? null}
          onChange={(date) => onChange({ ...value, date })}
        />
      </FilterSheet.Section>
    </FilterSheet>
  );
}
