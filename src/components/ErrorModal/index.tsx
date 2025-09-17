import React from "react";
import { useErrorStore } from "@stores/useErrorStore";
import BaseModal from "@components/BaseModal";
import * as S from "./index.styles";

const ErrorModal: React.FC = () => {
  const { errorTitle, errorMessage, buttonLabel, resetError } = useErrorStore();

  const isOpen = !!(errorTitle || errorMessage);

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={resetError}
      title={String(errorTitle || "오류가 발생했습니다")}
      showCloseButton={false}
    >
      <S.Content>
        <S.Message>
          {errorMessage || "알 수 없는 오류가 발생했습니다."}
        </S.Message>
      </S.Content>
      <S.Footer>
        <S.Button onClick={resetError}>{buttonLabel || "확인"}</S.Button>
      </S.Footer>
    </BaseModal>
  );
};

export default ErrorModal;
