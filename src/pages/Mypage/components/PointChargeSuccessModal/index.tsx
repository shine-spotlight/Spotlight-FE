import React from "react";
import CheckModal from "@components/CheckModal";
import * as S from "./index.styles";

export interface PointChargeSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  chargedAmount: number;
}

export const PointChargeSuccessModal: React.FC<
  PointChargeSuccessModalProps
> = ({ isOpen, onClose, chargedAmount }) => {
  const message = (
    <>
      <S.Amount>{chargedAmount.toLocaleString()} P</S.Amount>가
      <br />
      성공적으로 충전되었습니다!
    </>
  );
  return (
    <CheckModal
      isOpen={isOpen}
      onClose={onClose}
      title="충전 완료"
      message={message}
      confirmLabel="확인"
      closeOnOverlayClick={true}
    />
  );
};
