import React from "react";
import BaseModal from "@components/BaseModal";
import * as S from "./index.styles";

export interface PointChargeSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  chargedAmount: number;
}

export const PointChargeSuccessModal: React.FC<
  PointChargeSuccessModalProps
> = ({ isOpen, onClose, chargedAmount }) => {
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="충전 완료"
      showCloseButton={false}
      closeOnOverlayClick={true}
    >
      <S.Content>
        <S.SuccessIcon>✓</S.SuccessIcon>
        <S.Message>
          <S.Amount>{chargedAmount.toLocaleString()} P</S.Amount>가
          <br />
          성공적으로 충전되었습니다!
        </S.Message>
      </S.Content>

      <S.Footer>
        <S.Button onClick={onClose}>확인</S.Button>
      </S.Footer>
    </BaseModal>
  );
};
