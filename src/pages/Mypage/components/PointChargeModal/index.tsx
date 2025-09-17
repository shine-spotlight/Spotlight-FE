import React, { useState } from "react";
import BaseModal from "@components/BaseModal";
import * as S from "./index.styles";

export interface PointChargeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCharge: (amount: number) => void;
  isLoading?: boolean;
}

export const PointChargeModal: React.FC<PointChargeModalProps> = ({
  isOpen,
  onClose,
  onCharge,
  isLoading = false,
}) => {
  const [amount, setAmount] = useState<number>(0);
  const [error, setError] = useState<string>("");

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^\d+$/.test(value)) {
      setAmount(value === "" ? 0 : parseInt(value, 10));
      setError("");
    }
  };

  const handleCharge = () => {
    if (!amount || amount <= 0) {
      setError("충전할 포인트를 입력해주세요.");
      return;
    }

    if (amount < 100) {
      setError("최소 충전 금액은 100포인트입니다.");
      return;
    }

    if (amount > 100000) {
      setError("최대 충전 금액은 100,000포인트입니다.");
      return;
    }

    onCharge(amount);
  };

  const handleClose = () => {
    setAmount(0);
    setError("");
    onClose();
  };

  const quickAmounts = [100, 500, 1000, 5000];

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={handleClose}
      title="포인트 충전"
      showCloseButton={false}
      closeOnOverlayClick={!isLoading}
    >
      <S.Content>
        <S.Label>충전할 포인트를 입력해주세요</S.Label>
        <S.InputWrapper>
          <S.Input
            type="text"
            value={amount === 0 ? "" : amount}
            onChange={handleAmountChange}
            placeholder="얼마를 충전할까요?"
            disabled={isLoading}
          />
        </S.InputWrapper>
        {error && <S.ErrorMessage>{error}</S.ErrorMessage>}

        <S.QuickAmounts>
          <S.QuickAmountButtons>
            {quickAmounts.map((quickAmount) => (
              <S.QuickAmountButton
                key={quickAmount}
                onClick={() => setAmount((prev) => prev + quickAmount)} // 기존 값에 더하기
                disabled={isLoading}
              >
                + {quickAmount.toLocaleString()}P
              </S.QuickAmountButton>
            ))}
          </S.QuickAmountButtons>
        </S.QuickAmounts>
      </S.Content>

      <S.Footer>
        <S.Button
          variant="secondary"
          onClick={handleClose}
          disabled={isLoading}
        >
          취소
        </S.Button>
        <S.Button onClick={handleCharge} disabled={isLoading}>
          {isLoading ? "충전 중..." : "충전"}
        </S.Button>
      </S.Footer>
    </BaseModal>
  );
};
