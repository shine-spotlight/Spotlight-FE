import * as S from "./index.styles";
import { useUserStore } from "@stores/userStore";
import { useState } from "react";
import { useChargePointMutation } from "@queries/points";
import { PointChargeModal } from "@pages/Mypage/components";
import { PointChargeSuccessModal } from "@pages/Mypage/components";

export const CurrentPointSection = () => {
  const currentRole = useUserStore((s) => s.currentRole);
  const [isChargeModalOpen, setIsChargeModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const chargePointMutation = useChargePointMutation();
  const pointByRole = useUserStore((s) => s.pointByRole);
  const [chargedAmount, setChargedAmount] = useState(0);

  const currentPoints = currentRole ? pointByRole[currentRole] : null;

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
    setIsSuccessModalOpen(false);
    setChargedAmount(0);
  };

  return (
    <S.Container>
      <S.TitleContainer>
        <S.Title>내 포인트 조회</S.Title>
        <S.Button onClick={() => setIsChargeModalOpen(true)}>
          포인트 충전
        </S.Button>
      </S.TitleContainer>

      <S.Points>{currentPoints} P</S.Points>
      <PointChargeModal
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
