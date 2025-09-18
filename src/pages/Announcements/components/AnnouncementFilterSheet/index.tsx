import { FilterSheet } from "@/components/FilterSheet";
import { EVENT_CATEGORIES } from "@constants/categories";
import type { PostingFilter } from "@models/posting/posting.type";
import type { RegionValue } from "@types";
import * as S from "./index.styles";
import React from "react";

interface AnnouncementFilterSheetProps {
  isOpen: boolean;
  onClose: () => void;
  value: PostingFilter;
  onChange: (next: PostingFilter) => void;
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
  const [dateError, setDateError] = React.useState<string | null>(null);

  const formatRegionKey = (v: RegionValue) =>
    v.sigungu ? `${v.sido} ${v.sigungu}` : `${v.sido}`;

  const validateDates = (start?: string, end?: string): string | null => {
    const hasStart = !!start;
    const hasEnd = !!end;

    if (!hasStart && !hasEnd) return null; // 날짜 필터 미사용은 OK
    if (hasStart !== hasEnd) return "시작일과 종료일을 모두 선택해 주세요.";
    if (start! > end!) return "시작 날짜가 종료 날짜보다 늦을 수 없습니다.";
    return null;
  };

  // 날짜가 바뀔 때마다 즉시 검증
  const handleChangeDateFrom = (dateFrom: string | null) => {
    const next: PostingFilter = { ...value, dateFrom: dateFrom ?? undefined };
    setDateError(validateDates(next.dateFrom, next.dateTo));
    onChange(next);
  };

  const handleChangeDateTo = (dateTo: string | null) => {
    const next: PostingFilter = { ...value, dateTo: dateTo ?? undefined };
    setDateError(validateDates(next.dateFrom, next.dateTo));
    onChange(next);
  };

  // 적용 버튼 클릭 시 검증 통과한 경우에만 onApply 호출
  const handleApply = () => {
    const err = validateDates(value.dateFrom, value.dateTo);
    setDateError(err);
    if (err) return;
    onApply();
  };

  return (
    <FilterSheet
      isOpen={isOpen}
      onClose={onClose}
      title="필터링을 통해 원하는 공고를 쉽게 찾아봐요!"
      onReset={onReset}
      onApply={handleApply}
    >
      <FilterSheet.Section title="지역 필터링">
        <FilterSheet.RegionSelector
          value={value.regions ?? []}
          onChange={(regions) =>
            onChange({
              ...value,
              regions,
              region: regions.map(formatRegionKey),
            })
          }
        />
      </FilterSheet.Section>

      <FilterSheet.Section title="행사 형태">
        <FilterSheet.Chips
          items={EVENT_CATEGORIES}
          selected={value.categories ?? []}
          onChange={(categories) => onChange({ ...value, categories })}
        />
      </FilterSheet.Section>

      <FilterSheet.Section title="공고 날짜">
        <div style={{ display: "grid", gap: 12 }}>
          <FilterSheet.DatePicker
            label="시작 날짜"
            value={value.dateFrom ?? null}
            onChange={handleChangeDateFrom}
          />
          <FilterSheet.DatePicker
            label="종료 날짜"
            value={value.dateTo ?? null}
            onChange={handleChangeDateTo}
          />
        </div>
        {dateError && <S.Label>{dateError}</S.Label>}
      </FilterSheet.Section>
    </FilterSheet>
  );
}
