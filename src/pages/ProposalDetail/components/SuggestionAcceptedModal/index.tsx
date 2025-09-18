import React, { useState } from "react";
import CheckModal from "@components/CheckModal";
import * as S from "./index.styles";
import { formatPhone } from "../../utils/formatPhone";

type SuggestionAcceptedModalProps = {
  isOpen: boolean;
  opponentName?: string;
  phone?: string;
  onClose: () => void;
};

export const SuggestionAcceptedModal: React.FC<
  SuggestionAcceptedModalProps
> = ({ isOpen, opponentName, phone, onClose }) => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    if (!phone) return;
    try {
      await navigator.clipboard.writeText(phone);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback 처리
    }
  };

  return (
    <CheckModal
      isOpen={isOpen}
      onClose={onClose}
      title="제안서를 수락하였습니다!"
      message={
        <S.Wrapper>
          <S.Message>
            <b>[{opponentName ?? "상대"}]</b> 공간 보유자의
            <br />
            연락처를 확인한 후 직접 컨택을 시도해보세요!
          </S.Message>

          <S.PhoneBox>
            <S.PhoneInput
              value={formatPhone(phone) ?? ""}
              readOnly
              placeholder="-"
            />
            <S.CopyButton type="button" onClick={copy} disabled={!phone}>
              복사
            </S.CopyButton>
          </S.PhoneBox>
          {copied && <S.CopyLabel>복사가 완료되었습니다</S.CopyLabel>}
        </S.Wrapper>
      }
      confirmLabel="확인"
    />
  );
};
