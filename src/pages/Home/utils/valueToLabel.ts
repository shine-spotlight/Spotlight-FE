import { GENRE_OPTIONS, REGION_OPTIONS } from "../constants/filters";

export const genreValueToLabel = (value: string): string => {
  const found = GENRE_OPTIONS.find((opt) => opt.value === value);
  return found ? found.label : value;
};

export const regionValueToLabel = (value: string): string => {
  const found = REGION_OPTIONS.find((opt) => opt.value === value);
  return found ? found.label : value;
};
