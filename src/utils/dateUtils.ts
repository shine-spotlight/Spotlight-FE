/**
 * 월 선택시 해당 월의 1일 날짜 문자열을 반환
 * @param yearMonth "2024-01" 형식의 문자열
 * @returns "2024-01-01" 형식의 문자열
 */
export const getFirstDayOfMonth = (yearMonth: string): string => {
  return `${yearMonth}-01`;
};

/**
 * 날짜 문자열을 "YYYY-MM" 형식으로 변환
 * @param dateString "2024-01-01" 형식의 문자열
 * @returns "2024-01" 형식의 문자열
 */
export const getYearMonth = (dateString: string): string => {
  return dateString.substring(0, 7);
};

/**
 * 현재 날짜를 기준으로 기본 날짜 반환 (2020-01-01)
 * @returns "2020-01-01" 형식의 문자열
 */
export const getDefaultDate = (): string => {
  return "2024-08-01";
};

/**
 * 월 선택시 해당 월의 1일로 변환하는 함수
 * @param selectedMonth "2024-01" 또는 "2024-01-01" 형식의 문자열
 * @returns "2024-01-01" 형식의 문자열
 */
export const convertToFirstDayOfMonth = (selectedMonth: string): string => {
  // 이미 "YYYY-MM-DD" 형식인 경우
  if (selectedMonth.length === 10) {
    return selectedMonth;
  }

  // "YYYY-MM" 형식인 경우 1일로 변환
  if (selectedMonth.length === 7) {
    return getFirstDayOfMonth(selectedMonth);
  }

  // 기본값 반환
  return getDefaultDate();
};
