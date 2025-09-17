import React from "react";
import { useLoadingStore } from "@stores/useLoadingStore";
import BaseModal from "@components/BaseModal";
import * as S from "./index.styles";

const LoadingModal: React.FC = () => {
  const { isLoading, loadingMessage } = useLoadingStore();

  return (
    <BaseModal
      isOpen={isLoading}
      onClose={() => {}} // 로딩 중에는 닫을 수 없음
      title=""
      showCloseButton={false}
      closeOnOverlayClick={false}
    >
      <S.Content>
        <S.Spinner />
        <S.Message>{loadingMessage}</S.Message>
      </S.Content>
    </BaseModal>
  );
};

export default LoadingModal;
