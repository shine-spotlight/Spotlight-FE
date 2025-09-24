import * as S from "./index.styles";
import { useState } from "react";
import { useChargePointMutation } from "@queries/points";
import { PointChargeModal } from "@pages/Mypage/components";
import { PointChargeSuccessModal } from "@pages/Mypage/components";

interface CurrentPointSectionProps {
  point?: number | null;
}

export const CurrentPointSection = ({ point }: CurrentPointSectionProps) => {
  const [isChargeModalOpen, setIsChargeModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const chargePointMutation = useChargePointMutation();
  const [chargedAmount, setChargedAmount] = useState(0);
  const [modalKey, setModalKey] = useState(0);

  const openChargeModal = () => {
    setModalKey((k) => k + 1);
    setIsChargeModalOpen(true);
  };

  const handleChargeSubmit = async (amount: number) => {
    try {
      await chargePointMutation.mutateAsync(amount);
      setChargedAmount(amount);
      setIsChargeModalOpen(false);
      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error("포인트 충전 실패:", error);
    }
  };

  const handleSuccessModalClose = () => {
    setChargedAmount(0);
    setIsSuccessModalOpen(false);
  };

  return (
    <S.Container>
      <S.TitleContainer>
        <S.Title>내 포인트 조회</S.Title>
        <S.Button onClick={openChargeModal}>포인트 충전</S.Button>
      </S.TitleContainer>

      <S.Points>{point} P</S.Points>
      <PointChargeModal
        key={modalKey}
        isOpen={isChargeModalOpen}
        onClose={() => setIsChargeModalOpen(false)}
        onCharge={handleChargeSubmit}
        isLoading={chargePointMutation.isPending}
      />
      <PointChargeSuccessModal
        isOpen={isSuccessModalOpen}
        onClose={handleSuccessModalClose}
        chargedAmount={chargedAmount}
      />
    </S.Container>
  );
};
