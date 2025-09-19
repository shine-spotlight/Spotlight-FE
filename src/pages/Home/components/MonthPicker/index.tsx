import React from "react";

type MonthPickerProps = {
  label?: string;
  value: string;
  onChange: (next: string) => void;
  minYear?: number; // 기본 2020
  disabled?: boolean;
  required?: boolean;
};

function toMonthInputValue(v: string): string {
  // YYYY-MM-01 -> YYYY-MM
  if (!v) return "";
  // 간단 방어
  if (/^\d{4}-\d{2}-\d{2}$/.test(v)) return v.slice(0, 7);
  if (/^\d{4}-\d{2}$/.test(v)) return v;
  return "";
}

function fromMonthInputValue(v: string): string {
  // YYYY-MM -> YYYY-MM-01
  if (!v) return "";
  return `${v}-01`;
}

function getMinMonthString(minYear = 2020) {
  return `${minYear}-01`;
}

function getMaxMonthString() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

export const MonthPicker: React.FC<MonthPickerProps> = ({
  label = "월 선택",
  value,
  onChange,
  minYear = 2020,
  disabled,
  required,
}) => {
  const inputValue = toMonthInputValue(value);
  const min = getMinMonthString(minYear);
  const max = getMaxMonthString();

  return (
    <label style={{ display: "grid", gap: 6, width: "100%" }}>
      <span style={{ fontSize: 12, color: "#666" }}>{label}</span>
      <input
        type="month"
        value={inputValue}
        onChange={(e) => onChange(fromMonthInputValue(e.target.value))}
        min={min}
        max={max}
        disabled={disabled}
        required={required}
        style={{
          appearance: "none",
          WebkitAppearance: "none",
          height: 40,
          padding: "0 12px",
          borderRadius: 8,
          border: "1px solid #e5e5ec",
          background: "white",
          width: "100%",
        }}
      />
    </label>
  );
};
