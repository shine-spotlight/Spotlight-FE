import React from "react";
import ConfirmModal from "@components/ConfirmModal";

type AcceptSuggestionModalProps = {
  isOpen: boolean;
  isLoading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export const AcceptSuggestionModal: React.FC<AcceptSuggestionModalProps> = ({
  isOpen,
  isLoading = false,
  onClose,
  onConfirm,
}) => {
  return (
    <ConfirmModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="제안을 수락할까요?"
      message="수락하면 상대에게 알림이 전송됩니다."
      confirmLabel="수락"
      cancelLabel="취소"
      isLoading={isLoading}
    />
  );
};
