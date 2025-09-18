import { useState, useCallback } from "react";
import NumberStepper from "../../NumberStepper";
import SelectChipsGroup from "@components/SelectChipsGroup";
import FormSection from "../../FormSection";
import { EVENT_CATEGORIES, EQUIPMENT_CATEGORIES } from "@constants/categories";
import ActionFooter from "@components/ActionFooter";
import { useRegistrationStepNav } from "@pages/Registration/hooks/useRegistrationStepNav";
import * as S from "../../index.styles";
import { useRegistrationDraftStore } from "@stores/registrationStore";
import { ARTIST_STEP } from "@pages/Registration/types/steps";
import type { ArtistBasicPayload } from "@pages/Registration/types/payloads";
import { ARTIST_STEP_MESSAGES } from "@pages/Registration/constants/messages";
import { formatPhoneNumber } from "@utils/formatNumber";

function ArtistBasicForm() {
  const draft = useRegistrationDraftStore((s) => s.draft);
  const { saveAndGoNext } = useRegistrationStepNav();

  const initial =
    draft?.role === "artist"
      ? (draft.data[ARTIST_STEP.Basic] as ArtistBasicPayload | undefined)
      : undefined;

  const [form, setForm] = useState<ArtistBasicPayload>({
    name: initial?.name ?? "",
    description: initial?.description ?? "",
    phoneNumber: initial?.phoneNumber ?? "",
    members: initial?.members ?? 1,
    categories: initial?.categories ?? [],
    equipments: initial?.equipments ?? [],
  });

  const onNext = useCallback(() => {
    saveAndGoNext(form);
  }, [form, saveAndGoNext]);

  const phoneText = formatPhoneNumber(String(form.phoneNumber || ""));

  const phoneValid = /^\d{3}-\d{4}-\d{4}$/.test(phoneText); // "000-0000-0000" 패턴 검사

  const onChangePhoneNumber = (v: string) => {
    const onlyNum = v.replace(/\D/g, "").slice(0, 11);
    setForm((prev) => ({ ...prev, phoneNumber: onlyNum }));
  };

  const ready =
    form.name &&
    phoneValid &&
    form.phoneNumber &&
    form.description &&
    form.members &&
    form.categories;

  return (
    <S.Container>
      <S.Headline>{ARTIST_STEP_MESSAGES.Basic}</S.Headline>
      <S.ContentContainer>
        <FormSection title="활동명">
          <S.Input
            placeholder="활동명을 작성해주세요!"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </FormSection>
        <FormSection title="소개 글">
          <S.Textarea
            rows={3}
            placeholder="자신을 나타내는 소개글을 간단히 작성해주세요!"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </FormSection>
        <FormSection title="휴대폰 번호">
          <S.Input
            inputMode="numeric"
            placeholder="휴대폰 번호를 입력하세요."
            value={phoneText}
            onChange={(e) => onChangePhoneNumber(e.target.value)}
          />
        </FormSection>
        <FormSection title="인원수">
          <NumberStepper
            value={form.members}
            onChange={(v) => setForm({ ...form, members: v })}
          />
        </FormSection>
        <FormSection title="공연 카테고리" helper="최대 3개 선택이 가능합니다.">
          <SelectChipsGroup
            items={[...EVENT_CATEGORIES]}
            selected={form.categories}
            onChange={(next) => setForm({ ...form, categories: next })}
          />
        </FormSection>
        <FormSection
          title="필요 장비"
          helper="공연 시에 필요한 장비를 선택합니다."
        >
          <SelectChipsGroup
            items={[...EQUIPMENT_CATEGORIES]}
            selected={form.equipments}
            onChange={(next) => setForm({ ...form, equipments: next })}
          />
        </FormSection>
      </S.ContentContainer>
      <ActionFooter
        variant="single"
        nextLabel="다음으로"
        nextDisabled={!ready}
        onNext={onNext}
      />
    </S.Container>
  );
}

export default ArtistBasicForm;
