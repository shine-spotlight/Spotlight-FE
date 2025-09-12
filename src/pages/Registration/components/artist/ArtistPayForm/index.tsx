import { useState, useCallback } from "react";
import FormSection from "../../FormSection";
import ActionFooter from "@components/ActionFooter";
import * as S from "../index.styles";
import { useRegistrationDraftStore } from "@stores/registrationStore";
import { ARTIST_STEP } from "@pages/Registration/types/steps";
import type { ArtistPayPayload } from "@pages/Registration/types/payloads";
import { ARTIST_STEP_MESSAGES } from "@pages/Registration/constants/messages";
import { useRegistrationStepNav } from "@pages/Registration/hooks/useRegistrationStepNav";
import NumberStepper from "../../NumberStepper";

export function ArtistPayForm() {
  const draft = useRegistrationDraftStore((s) => s.draft);
  const { saveCurrent, saveAndGoPrev, submitAll } = useRegistrationStepNav();

  const initial =
    draft?.role === "artist"
      ? (draft.data[ARTIST_STEP.Pay] as ArtistPayPayload | undefined)
      : undefined;

  const [form, setForm] = useState<ArtistPayPayload>({
    desiredPay: initial?.desiredPay ?? 0,
    isFreeAllowed: initial?.isFreeAllowed ?? false,
  });

  const onSubmit = useCallback(() => {
    saveCurrent(form);
    submitAll(async () => {
      // 요청 함수
    });
  }, [form, saveCurrent, submitAll]);

  const onPrev = useCallback(() => {
    saveAndGoPrev(form);
  }, [form, saveAndGoPrev]);

  const nextDisabled = !form.isFreeAllowed && form.desiredPay <= 0;

  return (
    <S.Container>
      <S.Headline>{ARTIST_STEP_MESSAGES.Pay}</S.Headline>
      <S.ContentContainer>
        <FormSection
          title="희망 페이(선택)"
          helper="공간 보유자와의 원활한 협상을 위해 필요한 정보입니다!"
        >
          <NumberStepper
            value={form.desiredPay}
            onChange={(p) => setForm({ ...form, desiredPay: p })}
            unit="만 원"
          />
        </FormSection>
      </S.ContentContainer>
      <ActionFooter
        variant="double"
        nextLabel="완료"
        nextDisabled={nextDisabled}
        onNext={onSubmit}
        onPrev={onPrev}
      />
    </S.Container>
  );
}
