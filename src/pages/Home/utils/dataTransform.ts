import type { DemandForecastRequest } from "@models/demand/demand.type";

export const transformFiltersToApiParams = (filters: DemandForecastRequest) => {
  return {
    region: filters.region,
    genre: filters.genre,
    ageGroup: filters.ageGroup,
    gender: getGenderString(filters.gender),
    asOf: convertMonthToApiFormat(filters.asOf),
  };
};

export const convertMonthToApiFormat = (month: string): string => {
  if (!month) return "";
  const [year, monthStr] = month.split(".");
  return `${year}-${monthStr}-01`;
};

// 성별 숫자를 문자열로 변환
const getGenderString = (gender: number): string => {
  switch (gender) {
    case 1:
      return "남성";
    case 2:
      return "여성";
    case 0:
      return "알 수 없음";
    default:
      return "전체";
  }
};
