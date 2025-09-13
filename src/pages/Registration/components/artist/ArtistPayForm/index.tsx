import { useState, useCallback } from "react";
import FormSection from "../../FormSection";
import ActionFooter from "@components/ActionFooter";
import * as S from "../../index.styles";
import { useRegistrationDraftStore } from "@stores/registrationStore";
import { ARTIST_STEP } from "@pages/Registration/types/steps";
import type { ArtistPayPayload } from "@pages/Registration/types/payloads";
import { ARTIST_STEP_MESSAGES } from "@pages/Registration/constants/messages";
import { useRegistrationStepNav } from "@pages/Registration/hooks/useRegistrationStepNav";
import { setArtistInfo } from "@apis/artists";
import NumberStepper from "../../NumberStepper";
import { buildArtistInfoFromSteps } from "@pages/Registration/utils";

function ArtistPayForm() {
  const draft = useRegistrationDraftStore((s) => s.draft);
  const getDraft = useRegistrationDraftStore.getState;
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
      const cur = getDraft().draft;
      if (!cur || cur.role !== "artist")
        throw new Error("등록 진행 상태가 유효하지 않습니다.");

      const dto = buildArtistInfoFromSteps(cur.data);
      await setArtistInfo(dto);
    });
  }, [form, saveCurrent, submitAll, getDraft]);

  const onPrev = useCallback(() => {
    saveAndGoPrev(form);
  }, [form, saveAndGoPrev]);

  const ready = form.isFreeAllowed || form.desiredPay > 0;

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
        nextDisabled={!ready}
        onNext={onSubmit}
        onPrev={onPrev}
      />
    </S.Container>
  );
}

export default ArtistPayForm;
