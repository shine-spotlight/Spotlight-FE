import type { StatusFilterType } from "../types";

export const STATUS_FILTERS: StatusFilterType[] = [
  "전체",
  "대기",
  "수락",
  "거절",
];

export const STATUS_LABEL_TO_VALUE: Record<
  Exclude<StatusFilterType, "전체">,
  boolean | null
> = {
  대기: null,
  수락: true,
  거절: false,
};
