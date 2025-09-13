import { MenuList } from "../MenuList";
import { useNavigate } from "react-router-dom";
import { resetAllStores } from "@stores/resetAll";

export const CommonMenus: React.FC = () => {
  const nav = useNavigate();

  return (
    <MenuList
      items={[
        {
          id: "logout",
          label: "로그아웃",
          onClick: async () => {
            resetAllStores();
            nav("/", { replace: true });
          },
        },
        // {
        //   id: "withdraw",
        //   label: "회원 탈퇴",
        //   onClick: () => nav("/mypage/withdraw"),
        // },
        // 추후 추가 예정
      ]}
    />
  );
};
