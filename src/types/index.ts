import type { UserRoleType } from "../models/user/user.type";

export type NavMenuItem = {
  id: string;
  label: string;
  path: string;
  roles: UserRoleType[];
};
