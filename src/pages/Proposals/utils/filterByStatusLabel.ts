import type { StatusFilterType } from "../types";
import { STATUS_LABEL_TO_VALUE } from "../constants";

export function filterByStatusLabel<T extends { is_accepted: boolean | null }>(
  list: T[],
  statusLabel: StatusFilterType
): T[] {
  if (statusLabel === "전체") return list;
  const target = STATUS_LABEL_TO_VALUE[statusLabel];
  return list.filter((item) => item.is_accepted === target);
}
