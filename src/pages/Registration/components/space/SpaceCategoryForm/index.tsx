import { useState, useCallback } from "react";
import * as S from "../../index.styles";
import FormSection from "../../FormSection";
import ActionFooter from "@components/ActionFooter";
import SelectChipsGroup from "@components/SelectChipsGroup";
import { useRegistrationDraftStore } from "@stores/registrationStore";
import { SPACE_STEP } from "@pages/Registration/types/steps";
import type { SpaceCategoryPayload } from "@pages/Registration/types/payloads";
import { useRegistrationStepNav } from "@pages/Registration/hooks/useRegistrationStepNav";
import { EVENT_CATEGORIES } from "@constants/categories";
import { buildSpaceInfoFromSteps } from "@pages/Registration/utils";
import { setSpaceInfo } from "@apis/spaces";
import { toCamelCase } from "@utils/caseConvert";
import type { SpaceDetailResponse } from "@models/space/space.dto";
import type { SpaceProfile } from "@models/space/space.type";
import { setUserPhone } from "@apis/users";

export default function SpaceCategoryForm() {
  const draft = useRegistrationDraftStore((s) => s.draft);
  const getDraft = useRegistrationDraftStore.getState;
  const { saveCurrent, saveAndGoPrev, submitAll } = useRegistrationStepNav();

  const initial =
    draft?.role === "space"
      ? (draft.data[SPACE_STEP.Category] as SpaceCategoryPayload | undefined)
      : undefined;

  const [form, setForm] = useState<SpaceCategoryPayload>({
    preferredCategories: initial?.preferredCategories ?? [],
  });

  const ready = form.preferredCategories.length > 0;

  const onPrev = useCallback(() => {
    saveAndGoPrev(form);
  }, [form, saveAndGoPrev]);

  const onComplete = useCallback(() => {
    saveCurrent(form);
    submitAll(async () => {
      const cur = getDraft().draft;
      if (!cur || cur.role !== "space") {
        throw new Error("등록 진행 상태가 유효하지 않습니다.");
      }
      const dto = buildSpaceInfoFromSteps(cur.data);
      await setUserPhone(dto.phone_number);

      const savedProfile = await setSpaceInfo(dto);
      return toCamelCase<SpaceDetailResponse, SpaceProfile>(savedProfile);
    });
  }, [form, saveCurrent, submitAll, getDraft]);

  return (
    <S.Container>
      <S.Headline>원하는 공연 형태를 선택해주세요!</S.Headline>
      <S.ContentContainer>
        <FormSection
          title="공연 형태"
          helper="가능한 공연 형태를 모두 선택해주세요."
        >
          <SelectChipsGroup
            items={EVENT_CATEGORIES}
            selected={form.preferredCategories}
            onChange={(preferredCategories) => setForm({ preferredCategories })}
          />
        </FormSection>
      </S.ContentContainer>

      <ActionFooter
        variant="double"
        nextLabel="완료"
        nextDisabled={!ready}
        onPrev={onPrev}
        onNext={onComplete}
      />
    </S.Container>
  );
}
