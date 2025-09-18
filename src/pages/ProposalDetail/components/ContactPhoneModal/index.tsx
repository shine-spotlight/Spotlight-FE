import React, { useState } from "react";
import CheckModal from "@components/CheckModal";
import * as S from "./index.styles";
import { formatPhone } from "../../utils/formatPhone";

type ContactPhoneModalProps = {
  isOpen: boolean;
  opponentName?: string;
  phone?: string;
  onClose: () => void;
};

export const ContactPhoneModal: React.FC<ContactPhoneModalProps> = ({
  isOpen,
  opponentName,
  phone,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    if (!phone) return;

    await navigator.clipboard.writeText(phone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatted = formatPhone(phone ?? "");

  return (
    <CheckModal
      isOpen={isOpen}
      onClose={onClose}
      title="연락처 확인"
      message={
        <S.Wrapper>
          <S.Message>
            <b>[{opponentName ?? "상대"}]</b>의 연락처입니다.
          </S.Message>

          <S.PhoneBox>
            <S.PhoneInput value={formatted} readOnly placeholder="-" />
            <S.CopyButton type="button" onClick={copy} disabled={!phone}>
              복사
            </S.CopyButton>
          </S.PhoneBox>

          {copied && <S.CopyLabel>복사가 완료되었습니다</S.CopyLabel>}
        </S.Wrapper>
      }
      confirmLabel="닫기"
    />
  );
};
