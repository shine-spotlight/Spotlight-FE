import type { StatusFilterType } from "../types";

export const STATUS_FILTERS: StatusFilterType[] = [
  "전체",
  "대기 중",
  "수락 완료",
  "거절",
];

export const STATUS_LABEL_TO_VALUE: Record<
  Exclude<StatusFilterType, "전체">,
  boolean | null
> = {
  "대기 중": null,
  "수락 완료": true,
  거절: false,
};
