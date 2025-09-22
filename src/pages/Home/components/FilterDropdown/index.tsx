import React, { useState } from "react";
import * as S from "./index.styles";
import { ChevronDownIcon, CalendarIcon } from "@heroicons/react/24/outline";

interface FilterDropdownProps {
  label: string;
  value: string;
  options: ReadonlyArray<{ value: string; label: string }>;
  onSelect: (value: string) => void;
  icon?: "calendar" | "arrow";
  isActive?: boolean;
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({
  label,
  value,
  options,
  onSelect,
  icon = "arrow",
  isActive = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (selectedValue: string) => {
    onSelect(selectedValue);
    setIsOpen(false);
  };

  // 옵션 디듀핑(중복 제거)
  const dedupedOptions = React.useMemo(() => {
    const map = new Map<string, { value: string; label: string }>();
    options.forEach((opt) => {
      if (!map.has(opt.value)) map.set(opt.value, opt);
    });
    return Array.from(map.values());
  }, [options]);

  const selectedOption = dedupedOptions.find((o) => o.value === value);

  const isAllValue = value === "(ALL)" || value === "" || value === "-1";
  const displayText =
    !isActive || isAllValue ? label : selectedOption?.label ?? label;

  const showActive = isActive && !isAllValue;

  return (
    <S.DropdownContainer>
      <S.DropdownButton
        onClick={() => setIsOpen((v) => !v)}
        $isActive={showActive}
      >
        {icon === "calendar" && <CalendarIcon width={16} height={16} />}
        <span>{displayText}</span>
        <ChevronDownIcon width={16} height={16} />
      </S.DropdownButton>

      {isOpen && (
        <S.DropdownList>
          {options.map((option) => (
            <S.DropdownItem
              key={option.value}
              onClick={() => handleSelect(option.value)}
              $isSelected={option.value === value}
            >
              {option.label}
            </S.DropdownItem>
          ))}
        </S.DropdownList>
      )}
    </S.DropdownContainer>
  );
};
