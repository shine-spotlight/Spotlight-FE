export const printList = (list?: unknown, empty = "없음") => {
  if (!Array.isArray(list)) return empty;
  const cleaned = list
    .map((v) => (typeof v === "number" ? String(v) : String(v ?? "").trim()))
    .filter(Boolean);
  return cleaned.length ? cleaned.join(", ") : empty;
};
