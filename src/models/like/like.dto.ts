import type { UserRoleType } from "@models/user/user.type";

export type LikeDTO = {
  address: string;
  categories: string[];
  created_at: string;
  id: number;
  target_id: number;
  target_name: string;
  target_type: UserRoleType;
  thumbnail?: string | null;
  user_id: number;
};

export type LikeResponse = LikeDTO;
export type LikeListResponse = LikeResponse[];
