import React from "react";
import BaseModal from "@components/BaseModal";
import * as S from "./index.styles";

type CheckModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: React.ReactNode;
  confirmLabel?: string;
  closeOnOverlayClick?: boolean;
};

const CheckModal: React.FC<CheckModalProps> = ({
  isOpen,
  onClose,
  title = "알림",
  message,
  confirmLabel = "확인",
  closeOnOverlayClick = true,
}) => {
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      showCloseButton={false}
      closeOnOverlayClick={closeOnOverlayClick}
    >
      <S.Content>
        <S.SuccessIcon>✓</S.SuccessIcon>
        {message && <S.Message>{message}</S.Message>}
      </S.Content>

      <S.Footer>
        <S.Button onClick={onClose}>{confirmLabel}</S.Button>
      </S.Footer>
    </BaseModal>
  );
};

export default CheckModal;
