import { MenuList } from "../MenuList";
import type { UserRoleType } from "@models/user/user.type";
import { useNavigate } from "react-router-dom";

interface RoleMenusProps {
  role: UserRoleType;
}

export const RoleMenus: React.FC<RoleMenusProps> = ({ role }) => {
  const navigate = useNavigate();

  const items =
    role === "space"
      ? [
          {
            id: "post",
            label: "공연 공고 등록",
            onClick: () => navigate("/posting/create"),
          },
          {
            id: "likes",
            label: "내가 찜한 목록",
            onClick: () => navigate("/likes"),
          },
        ]
      : [
          {
            id: "likes",
            label: "내가 찜한 목록",
            onClick: () => navigate("/likes"),
          },
        ];

  return <MenuList items={items} />;
};
