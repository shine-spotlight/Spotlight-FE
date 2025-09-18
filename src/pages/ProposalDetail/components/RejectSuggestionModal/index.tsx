import React from "react";
import ConfirmModal from "@components/ConfirmModal";

type RejectSuggestionModalProps = {
  isOpen: boolean;
  isLoading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export const RejectSuggestionModal: React.FC<RejectSuggestionModalProps> = ({
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
      title="제안을 거절할까요?"
      message="거절하면 상대에게 알림이 전송됩니다."
      confirmLabel="거절"
      cancelLabel="취소"
      isLoading={isLoading}
    />
  );
};
