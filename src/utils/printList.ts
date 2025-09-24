export const printList = (list?: unknown, empty = "없음") => {
  // 배열일 경우
  if (Array.isArray(list)) {
    const cleaned = list
      .map((v) => (typeof v === "number" ? String(v) : String(v ?? "").trim()))
      .filter(Boolean);
    return cleaned.length ? cleaned.join(", ") : empty;
  }

  // 단일 값일 경우
  if (list != null) {
    const value = typeof list === "number" ? String(list) : String(list).trim();
    return value || empty;
  }
  return empty;
};
