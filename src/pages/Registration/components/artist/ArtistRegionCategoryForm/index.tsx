import { useState, useCallback } from "react";
import FormSection from "../../FormSection";
import ActionFooter from "@components/ActionFooter";
import * as S from "../../index.styles";
import { useRegistrationDraftStore } from "@stores/registrationStore";
import { ARTIST_STEP } from "@pages/Registration/types/steps";
import type { ArtistRegionCategoryPayload } from "@pages/Registration/types/payloads";
import { ARTIST_STEP_MESSAGES } from "@pages/Registration/constants/messages";
import RegionPicker from "@components/RegionPicker";
import { useRegistrationStepNav } from "@pages/Registration/hooks/useRegistrationStepNav";

function ArtistRegionForm() {
  const draft = useRegistrationDraftStore((s) => s.draft);
  const { saveAndGoNext, saveAndGoPrev } = useRegistrationStepNav();

  const initial =
    draft?.role === "artist"
      ? (draft.data[ARTIST_STEP.RegionCategory] as
          | ArtistRegionCategoryPayload
          | undefined)
      : undefined;

  const [form, setForm] = useState<ArtistRegionCategoryPayload>({
    regions: initial?.regions ?? [],
  });

  const onNext = useCallback(() => {
    saveAndGoNext(form);
  }, [form, saveAndGoNext]);

  const onPrev = useCallback(() => {
    saveAndGoPrev(form);
  }, [form, saveAndGoPrev]);

  const ready = form.regions;

  return (
    <S.Container>
      <S.Headline>{ARTIST_STEP_MESSAGES.RegionCategory}</S.Headline>
      <S.ContentContainer>
        <FormSection title="활동 지역" helper="중복 선택이 가능합니다.">
          <RegionPicker
            value={form.regions}
            onChange={(regions) => setForm((prev) => ({ ...prev, regions }))}
          />
        </FormSection>
      </S.ContentContainer>
      <ActionFooter
        variant="double"
        nextLabel="다음"
        nextDisabled={!ready}
        onNext={onNext}
        onPrev={onPrev}
      />
    </S.Container>
  );
}

export default ArtistRegionForm;
