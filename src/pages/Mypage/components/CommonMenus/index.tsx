import { MenuList } from "../MenuList";
import { useNavigate } from "react-router-dom";
import { resetAllStores } from "@stores/resetAll";
import { logout } from "@apis/users";
import ConfirmModal from "@components/ConfirmModal";
import { useState } from "react";
import { deleteUser } from "@apis/users";

export const CommonMenus: React.FC = () => {
  const nav = useNavigate();
  const [openLogoutModal, setOpenLogoutModal] = useState<boolean>(false);
  const [openWithdrawModal, setOpenWithdrawModal] = useState<boolean>(false);

  return (
    <>
      <MenuList
        items={[
          {
            id: "logout",
            label: "로그아웃",
            onClick: async () => {
              setOpenLogoutModal(true);
            },
          },
          {
            id: "withdraw",
            label: "회원 탈퇴",
            onClick: async () => {
              setOpenWithdrawModal(true);
            },
          },
        ]}
      />
      <ConfirmModal
        isOpen={openLogoutModal}
        onClose={() => setOpenLogoutModal(false)}
        onConfirm={() => {
          logout();
          resetAllStores();
          setOpenLogoutModal(false);
          nav("/", { replace: true });
        }}
        title="로그아웃 하시겠습니까?"
        message={
          <>
            로그아웃 시 Spotlight 내부 기능을
            <br />
            사용할 수 없습니다.
          </>
        }
        confirmLabel="확인"
        cancelLabel="취소"
      />
      <ConfirmModal
        isOpen={openWithdrawModal}
        onClose={() => setOpenWithdrawModal(false)}
        onConfirm={async () => {
          await deleteUser();
          resetAllStores();
          setOpenWithdrawModal(false);
          nav("/", { replace: true });
        }}
        title="정말 탈퇴하시겠습니까?"
        message={
          <>
            탈퇴 버튼 선택 시, <br />
            프로필을 포함한 모든 정보가 삭제되며 <br />
            복구되지 않습니다.
            <br />
            정말로 탈퇴하시겠어요?
          </>
        }
        confirmLabel="탈퇴"
        isWithdraw={true}
        cancelLabel="취소"
      />
    </>
  );
};
