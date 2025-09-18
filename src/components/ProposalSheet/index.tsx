import React, { useMemo, useState } from "react";
import BottomSheet from "../BottomSheet";
import { useUserStore } from "@stores/userStore";
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
  const currentRole = useUserStore((s) => s.currentRole);

  const tips =
    currentRole == "artist" ? (
      <>
        본인의 강점과 매력을 충분히 어필해주세요.
        <br />
        공연 가능한 날짜는 매칭 후 협의해 주세요. <br />
      </>
    ) : (
      <>
        아티스트가 공연을 준비할 때 도움이 될 수 있도록, 마음에 든 이유를
        구체적으로 설명해 주세요. <br />
        공연 가능한 날짜는 매칭 후 협의해 주세요.
        <br />
      </>
    );
  const placeholder =
    currentRole == "artist"
      ? "공간에 바라는 점(예: 장비 사용, 리허설 시간, 무대 구성, 좌석 배치 등)을 구체적으로 작성해 주세요."
      : "공간에서 제공할 수 있는 지원 사항과 불가능한 부분, 운영 정책 등아티스트가 반드시 알아야 할 내용을 빠짐없이 적어 주세요.";

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
        <S.Tips>{tips}</S.Tips>
      </section>

      <section>
        <S.SectionTitle>공연 설명</S.SectionTitle>
        <S.TextareaWrapper data-nodrag>
          <S.Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={placeholder}
            rows={6}
          />
        </S.TextareaWrapper>
      </section>
    </BottomSheet>
  );
}
