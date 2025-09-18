import type { UserRoleType } from "@models/user/user.type";

export type Like = {
  address: string;
  categories: string[];
  createdAt: string;
  id: number;
  targetId: number;
  targetName: string;
  targetType: UserRoleType;
  thumbnail?: string | null;
  userId: number;
};
