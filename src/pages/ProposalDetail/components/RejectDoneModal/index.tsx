import React from "react";
import CheckModal from "@components/CheckModal";

type RejectDoneModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const RejectDoneModal: React.FC<RejectDoneModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <CheckModal
      isOpen={isOpen}
      onClose={onClose}
      title="거절 완료"
      message="제안을 거절했습니다."
      confirmLabel="확인"
    />
  );
};
