export const formatDate = (d: unknown) => {
  if (!d) return "없음";

  const date =
    d instanceof Date ? d : typeof d === "string" ? new Date(d) : null;

  if (!date || isNaN(date.getTime())) return "없음";

  // 날짜 부분
  const dateStr = date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // 요일 부분
  const weekday = date.toLocaleDateString("ko-KR", {
    weekday: "short",
  });

  return `${dateStr} (${weekday})`;
};
