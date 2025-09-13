import { useRegistrationDraftStore } from "@stores/registrationStore";
import { SPACE_STEP } from "@pages/Registration/types/steps";
import type { SpaceBusinessPayload } from "@pages/Registration/types/payloads";
import { useCallback, useState } from "react";
import { useRegistrationStepNav } from "@pages/Registration/hooks/useRegistrationStepNav";
import * as S from "../../index.styles";
import ActionFooter from "@components/ActionFooter";
import FormSection from "../../FormSection";
import { HelpIcon } from "@assets/svg/common";
import { formatBusinessNumber } from "@utils/formatBusinessNumber";

export function SpaceBusinessForm() {
  const draft = useRegistrationDraftStore((s) => s.draft);
  const { saveAndGoNext } = useRegistrationStepNav();

  const initial = (draft?.role === "space" &&
    draft.data[SPACE_STEP.Business]) as SpaceBusinessPayload | undefined;

  const [form, setForm] = useState<SpaceBusinessPayload>({
    businessNumber: initial?.businessNumber ?? 0,
  });

  const bnText = formatBusinessNumber(String(form.businessNumber || ""));
  const valid = /^\d{3}-\d{2}-\d{5}$/.test(bnText); // "000-00-00000" 패턴 검사

  const onChangeText = (v: string) => {
    const onlyNum = v.replace(/\D/g, "").slice(0, 10);
    setForm({ businessNumber: Number(onlyNum) || 0 });
  };

  const onNext = useCallback(() => {
    saveAndGoNext(form);
  }, [form, saveAndGoNext]);

  return (
    <S.Container>
      <S.Headline>사업자등록번호를 입력해주세요!</S.Headline>
      <S.ContentContainer>
        <FormSection
          title="사업자등록번호"
          helper="사업자등록번호 10자리를 입력하세요."
        >
          <S.Input
            inputMode="numeric"
            placeholder="사업자등록번호를 입력하세요."
            value={bnText}
            onChange={(e) => onChangeText(e.target.value)}
          />
          <S.HelperAction type="button">
            <HelpIcon height={16} width={16} />
            사업자등록을 하지 않으셨나요?
          </S.HelperAction>
        </FormSection>
      </S.ContentContainer>

      <ActionFooter
        variant="single"
        nextLabel="다음으로"
        nextDisabled={!valid}
        onNext={onNext}
      />
    </S.Container>
  );
}
