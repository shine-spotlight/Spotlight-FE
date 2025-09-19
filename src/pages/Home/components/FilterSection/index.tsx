import React from "react";
import styled from "@emotion/styled";
import { FilterDropdown } from "../../components";
import { AGE_OPTIONS, GENDER_OPTIONS } from "../../constants/filters";
import { GENRE_OPTIONS, REGION_OPTIONS } from "../../constants/filters";
import type { FilterState } from "../../types";
import { MonthPicker } from "../../components/MonthPicker";

interface FilterSectionProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

export const FilterSection: React.FC<FilterSectionProps> = ({
  filters,
  onFiltersChange,
}) => {
  const regionOptions = REGION_OPTIONS;
  const genreOptions = GENRE_OPTIONS;
  const ageOptions = [
    ...AGE_OPTIONS.map((a) => ({ value: String(a.value), label: a.label })),
  ];
  const genderOptions = [
    ...GENDER_OPTIONS.map((g) => ({ value: String(g.value), label: g.label })),
  ];

  const regionActive = filters.region !== "(ALL)";
  const genreActive = filters.genre !== "(ALL)";
  const ageActive = filters.age !== -1;
  const genderActive = filters.gender !== -1;

  const handleRegionChange = (region: string) => {
    onFiltersChange({
      ...filters,
      region,
    });
  };

  const handleCategoryChange = (genre: string) => {
    onFiltersChange({
      ...filters,
      genre,
    });
  };

  const handleAgeChange = (age: string) => {
    onFiltersChange({
      ...filters,
      age: Number(age),
    });
  };

  const handleGenderChange = (gender: string) => {
    onFiltersChange({
      ...filters,
      gender: Number(gender),
    });
  };

  const handleMonthChange = (asOf: string) => {
    onFiltersChange({ ...filters, asOf: asOf });
  };

  return (
    <FilterSectionContainer>
      <FilterRow>
        <FilterDropdown
          label="지역"
          value={filters.region}
          options={regionOptions}
          onSelect={handleRegionChange}
          isActive={regionActive}
        />
        <FilterDropdown
          label="장르"
          value={filters.genre}
          options={genreOptions}
          onSelect={handleCategoryChange}
          isActive={genreActive}
        />
      </FilterRow>
      <FilterRow>
        <FilterDropdown
          label="연령"
          value={filters.age.toString()}
          options={ageOptions}
          onSelect={handleAgeChange}
          isActive={ageActive}
        />
        <FilterDropdown
          label="성별"
          value={filters.gender.toString()}
          options={genderOptions}
          onSelect={handleGenderChange}
          isActive={genderActive}
        />
      </FilterRow>

      <FilterRow>
        <MonthPicker
          label="조회 년월"
          value={filters.asOf}
          onChange={handleMonthChange}
          minYear={2020}
        />
      </FilterRow>
    </FilterSectionContainer>
  );
};

const FilterSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
`;

const FilterRow = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;
`;
