import React, { useMemo, useState } from "react";
import BottomSheet from "../BottomSheet";
import * as S from "./index.styles";

type ProposalSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (text: string) => void;
};

export default function ProposalSheet({
  isOpen,
  onClose,
  onSubmit,
}: ProposalSheetProps) {
  const [text, setText] = useState("");

  const footer = useMemo(
    () => (
      <S.FooterBar>
        <S.PrimaryButton
          type="button"
          disabled={!text.trim()}
          onClick={() => {
            onSubmit?.(text.trim());
          }}
        >
          전달하기
        </S.PrimaryButton>
      </S.FooterBar>
    ),
    [onSubmit, text]
  );

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title="제안서 보내기"
      footer={footer}
      maxHeight={0.9}
    >
      <section>
        <S.SectionTitle>이렇게 쓰면 좋아요!</S.SectionTitle>
        <S.Tips>
          이렇게~~~ 쓰면 ~~~ 좋아요 ~~
          <br />
          이렇게~~~ 쓰면 ~~~ 좋아요 ~~
          <br />
          이렇게~~~ 쓰면 ~~~ 좋아요 ~~ 이렇게~~~ 쓰면 ~좋아요 ~~
        </S.Tips>
      </section>

      <section>
        <S.SectionTitle>공연 설명</S.SectionTitle>
        <S.TextareaWrapper data-nodrag>
          <S.Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="공간 소개, 원하는 공연 형식 등 자유 형식으로 작성합니다."
            rows={6}
          />
        </S.TextareaWrapper>
      </section>
    </BottomSheet>
  );
}
