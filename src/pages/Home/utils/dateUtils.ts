export const formatMonthForDisplay = (month: string): string => {
  return month.replace(".", "-") + "월";
};

export const getCurrentMonth = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  return `${year}.${month}`;
};

export const getDefaultDateRange = () => {
  const currentMonth = getCurrentMonth();
  return {
    startMonth: currentMonth,
    endMonth: currentMonth,
  };
};
