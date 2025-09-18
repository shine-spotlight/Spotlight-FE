import React from "react";
import BaseModal from "@components/BaseModal";
import * as S from "./index.styles";

export interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string | React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  isLoading?: boolean;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = "확인",
  cancelLabel = "취소",
  isLoading = false,
}) => {
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      showCloseButton={false}
      closeOnOverlayClick={!isLoading}
    >
      <S.Content>
        <S.Message>{message}</S.Message>
      </S.Content>
      <S.Footer>
        <S.Button variant="secondary" onClick={onClose} disabled={isLoading}>
          {cancelLabel}
        </S.Button>
        <S.Button onClick={onConfirm} disabled={isLoading}>
          {isLoading ? "처리 중..." : confirmLabel}
        </S.Button>
      </S.Footer>
    </BaseModal>
  );
};

export default ConfirmModal;
