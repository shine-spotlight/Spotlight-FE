import React from "react";
import BaseModal from "@components/BaseModal";
import * as S from "./index.styles";

export interface ProposalSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  deductedPoints?: number;
}

const ProposalSuccessModal: React.FC<ProposalSuccessModalProps> = ({
  isOpen,
  onClose,
  deductedPoints = 100,
}) => {
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="제안서 전송 완료!"
      showCloseButton={false}
    >
      <S.Content>
        <S.SuccessIcon>✓</S.SuccessIcon>
        <S.Message>
          <S.PointsDeducted>포인트 {deductedPoints} 차감</S.PointsDeducted>
          <S.SuccessText>
            제안서 전송이 성공적으로 완료되었습니다!
            <br />
            3일 내 제안서 응답이 없을 시 사용한 포인트를 환분해드립니다.
          </S.SuccessText>
        </S.Message>
      </S.Content>

      <S.Footer>
        <S.Button onClick={onClose}>확인</S.Button>
      </S.Footer>
    </BaseModal>
  );
};

export default ProposalSuccessModal;
