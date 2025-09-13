import type { UserRoleType } from "@types";

export const USER_ROLE_TYPES = [
  "artist",
  "space",
] as const satisfies readonly UserRoleType[];

export const USER_ROLE_TYPE_LABELS: Record<UserRoleType, string> = {
  artist: "공연 예술가",
  space: "공간 보유자",
};
