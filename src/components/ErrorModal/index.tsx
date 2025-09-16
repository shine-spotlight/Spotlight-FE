import React from 'react';
import { useErrorStore } from '@stores/useErrorStore';
import * as S from './index.styles';

const ErrorModal: React.FC = () => {
  const { errorTitle, errorMessage, buttonLabel, resetError } = useErrorStore();

  if (!errorTitle && !errorMessage) {
    return null;
  }

  return (
    <S.Overlay onClick={resetError}>
      <S.Modal onClick={(e) => e.stopPropagation()}>
        <S.Header>
          <S.Title>{errorTitle || '오류가 발생했습니다'}</S.Title>
        </S.Header>
        <S.Content>
          <S.Message>{errorMessage || '알 수 없는 오류가 발생했습니다.'}</S.Message>
        </S.Content>
        <S.Footer>
          <S.Button onClick={resetError}>
            {buttonLabel || '확인'}
          </S.Button>
        </S.Footer>
      </S.Modal>
    </S.Overlay>
  );
};

export default ErrorModal;
