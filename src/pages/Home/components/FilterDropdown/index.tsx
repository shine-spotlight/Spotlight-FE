import React, { useState } from "react";
import styled from "@emotion/styled";
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
    <DropdownContainer>
      <DropdownButton
        onClick={() => setIsOpen((v) => !v)}
        $isActive={showActive}
      >
        {icon === "calendar" && <CalendarIcon width={16} height={16} />}
        <span>{displayText}</span>
        <ChevronDownIcon width={16} height={16} />
      </DropdownButton>

      {isOpen && (
        <DropdownList>
          {options.map((option) => (
            <DropdownItem
              key={option.value}
              onClick={() => handleSelect(option.value)}
              $isSelected={option.value === value}
            >
              {option.label}
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </DropdownContainer>
  );
};

const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
`;

const DropdownButton = styled.button<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 12px 16px;
  border: 1px solid ${({ $isActive }) => ($isActive ? "#3B82F6" : "#E5E7EB")};
  border-radius: 8px;
  background: white;
  color: ${({ $isActive }) => ($isActive ? "#3B82F6" : "#374151")};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #3b82f6;
  }

  span {
    flex: 1;
    text-align: left;
  }
`;

const DropdownList = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 10;
  margin-top: 4px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  max-height: 200px;
  overflow-y: auto;
`;

const DropdownItem = styled.div<{ $isSelected: boolean }>`
  padding: 12px 16px;
  cursor: pointer;
  background: ${({ $isSelected }) => ($isSelected ? "#F3F4F6" : "white")};
  color: ${({ $isSelected }) => ($isSelected ? "#3B82F6" : "#374151")};
  font-size: 14px;
  transition: all 0.2s;

  &:hover {
    background: #f3f4f6;
  }

  &:first-of-type {
    border-radius: 8px 8px 0 0;
  }

  &:last-of-type {
    border-radius: 0 0 8px 8px;
  }
`;
