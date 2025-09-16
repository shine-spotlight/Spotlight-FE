import { MenuList } from "../MenuList";
import type { UserRoleType } from "@models/user/user.type";

interface RoleMenusProps {
  role: UserRoleType;
}

export const RoleMenus: React.FC<RoleMenusProps> = ({ role }) => {
  const items =
    role === "space"
      ? [
          {
            id: "post",
            label: "공연 공고 등록",
            onClick: () => {},
          },
          {
            id: "likes",
            label: "내가 찜한 목록",
            onClick: () => {},
          },
        ]
      : [
          {
            id: "edit",
            label: "프로필 수정",
            onClick: () => {},
          },
          {
            id: "likes",
            label: "내가 찜한 목록",
            onClick: () => {},
          },
        ];

  return <MenuList items={items} />;
};
