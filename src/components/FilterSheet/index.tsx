import React, { useRef } from "react";
import BottomSheet from "@components/BottomSheet";
import * as S from "./index.styles";
import type { RegionValue } from "@components/RegionPicker";
import RegionPicker from "@components/RegionPicker";
import { CalendarColorIcon } from "@assets/svg/common";
import SelectChipsGroup from "@components/SelectChipsGroup";

type RootProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  onReset: () => void;
  onApply: () => void;
  children: React.ReactNode;
};

function Root({
  isOpen,
  onClose,
  title,
  onReset,
  onApply,
  children,
}: RootProps) {
  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      footer={
        <>
          <S.OutlineButton onClick={onReset}>초기화</S.OutlineButton>
          <S.SolidButton onClick={onApply}>필터 적용하기</S.SolidButton>
        </>
      }
    >
      {children}
    </BottomSheet>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section style={{ marginBottom: 20 }}>
      <S.SectionTitle>{title}</S.SectionTitle>
      {children}
    </section>
  );
}

type ChipsProps = {
  items: ReadonlyArray<string>;
  selected: ReadonlyArray<string>;
  onChange: (val: string[]) => void;
};

function Chips({ items, selected, onChange }: ChipsProps) {
  return (
    <SelectChipsGroup items={items} selected={selected} onChange={onChange} />
  );
}

type RegionProps = {
  value: RegionValue[];
  onChange: (next: RegionValue[]) => void;
  multiple?: boolean;
};

function RegionSelector({ value, onChange, multiple = true }: RegionProps) {
  return <RegionPicker value={value} onChange={onChange} multiple={multiple} />;
}

type PayRangeProps = {
  min: number;
  max: number;
  value: [number, number];
  onChange: (next: [number, number]) => void;
  freeOnly?: boolean;
  onToggleFreeOnly?: (next: boolean) => void;
};

function RangeSlider({
  min,
  max,
  step = 1000,
  value,
  onChange,
}: {
  min: number;
  max: number;
  step?: number;
  value: [number, number];
  onChange: (next: [number, number]) => void;
}) {
  const [lo, hi] = value;

  const toPercent = (v: number) => ((v - min) / (max - min)) * 100;
  const loPct = toPercent(lo);
  const hiPct = toPercent(hi);

  return (
    <S.Wrap data-nodrag>
      <S.Label>
        {lo.toLocaleString()}원 ~ {hi.toLocaleString()}원
      </S.Label>

      <S.Track
        style={{
          background: `linear-gradient(to right,
            var(--track-bg) 0%,
            var(--track-bg) ${loPct}%,
            var(--track-fill) ${loPct}%,
            var(--track-fill) ${hiPct}%,
            var(--track-bg) ${hiPct}%,
            var(--track-bg) 100%)`,
        }}
      >
        {/* 하한 */}
        <S.Input
          type="range"
          min={min}
          max={max}
          step={step}
          value={lo}
          onChange={(e) => onChange([Math.min(Number(e.target.value), hi), hi])}
          aria-label="최소 금액"
        />
        <S.Input
          type="range"
          min={min}
          max={max}
          step={step}
          value={hi}
          onChange={(e) => onChange([lo, Math.max(Number(e.target.value), lo)])}
          aria-label="최대 금액"
          data-upper
        />
      </S.Track>
    </S.Wrap>
  );
}

function PayRange({
  min,
  max,
  value,
  onChange,
  freeOnly = false,
  onToggleFreeOnly,
}: PayRangeProps) {
  return (
    <>
      <RangeSlider min={min} max={max} value={value} onChange={onChange} />
      <S.FreeCheckbox>
        <input
          id="free-only"
          type="checkbox"
          checked={freeOnly}
          onChange={(e) => onToggleFreeOnly?.(e.target.checked)}
        />
        <label htmlFor="free-only">무료 공연만</label>
      </S.FreeCheckbox>
    </>
  );
}

type DatePickerProps = {
  label?: string;
  value: string | null;
  onChange: (next: string | null) => void;
  required?: boolean;
};

function DatePicker({ value, onChange, required = false }: DatePickerProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const openPicker = () => {
    if (inputRef.current) {
      if ("showPicker" in inputRef.current) {
        inputRef.current.showPicker();
      }
    }
  };

  return (
    <S.Wrap data-nodrag>
      <S.DateField>
        <S.DateInputWithPadding
          ref={inputRef}
          type="date"
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value || null)}
          required={required}
          data-has-value={!!value}
        />
        <S.CalendarBtn type="button" onClick={openPicker} $size={16}>
          <CalendarColorIcon />
        </S.CalendarBtn>
      </S.DateField>
    </S.Wrap>
  );
}

export const FilterSheet = Object.assign(Root, {
  Section,
  Chips,
  RegionSelector,
  PayRange,
  DatePicker,
});
