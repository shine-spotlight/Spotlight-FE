import React from 'react';
import * as S from './index.styles';

export interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
}

const BaseModal: React.FC<BaseModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  showCloseButton = true,
  closeOnOverlayClick = true,
}) => {
  if (!isOpen) return null;

  const handleOverlayClick = () => {
    if (closeOnOverlayClick) {
      onClose();
    }
  };

  return (
    <S.Overlay onClick={handleOverlayClick}>
      <S.Modal onClick={(e) => e.stopPropagation()}>
        {title && (
          <S.Header>
            <S.Title>{title}</S.Title>
            {showCloseButton && (
              <S.CloseButton onClick={onClose}>
                <S.CloseIcon>×</S.CloseIcon>
              </S.CloseButton>
            )}
          </S.Header>
        )}
        <S.Content>{children}</S.Content>
      </S.Modal>
    </S.Overlay>
  );
};

export default BaseModal;
