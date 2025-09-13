import { useState, useCallback } from "react";
import * as S from "../../index.styles";
import FormSection from "../../FormSection";
import ActionFooter from "@components/ActionFooter";
import SelectChipsGroup from "@components/SelectChipsGroup";
import ProfileAvatarPicker from "../../ProfileAvatarPicker";
import { useRegistrationDraftStore } from "@stores/registrationStore";
import { SPACE_STEP } from "@pages/Registration/types/steps";
import type { SpaceVenueBasicPayload } from "@pages/Registration/types/payloads";
import { useRegistrationStepNav } from "@pages/Registration/hooks/useRegistrationStepNav";
import { EQUIPMENT_CATEGORIES, SPACE_CATEGORIES } from "@constants/categories";
import { AmbienceInput } from "../../AmbienceInput";
import NumberStepper from "../../NumberStepper";

export function SpaceVenueBasicForm() {
  const draft = useRegistrationDraftStore((s) => s.draft);
  const { saveAndGoNext, saveAndGoPrev } = useRegistrationStepNav();

  const initial =
    draft?.role === "space"
      ? (draft.data[SPACE_STEP.VenueBasic] as
          | SpaceVenueBasicPayload
          | undefined)
      : undefined;

  const [form, setForm] = useState<SpaceVenueBasicPayload>({
    placeImage: initial?.placeImage ?? "",
    description: initial?.description ?? "",
    categories: initial?.categories ?? [],
    atmosphere: initial?.atmosphere ?? [],
    isOkayNoise: initial?.isOkayNoise ?? false,
    capacitySeated: initial?.capacitySeated ?? 0,
    capacityStanding: initial?.capacityStanding ?? 0,
    equipments: initial?.equipments ?? [],
  });

  const canNext =
    form.description.trim().length > 0 &&
    form.categories.length > 0 &&
    form.capacitySeated >= 0 &&
    form.capacityStanding >= 0;

  const onNext = useCallback(() => {
    saveAndGoNext(form);
  }, [form, saveAndGoNext]);

  const onPrev = useCallback(() => {
    saveAndGoPrev(form);
  }, [form, saveAndGoPrev]);

  return (
    <S.Container>
      <S.Headline>공연 공간에 대한 정보를 입력해주세요!</S.Headline>

      <S.ContentContainer>
        <FormSection
          title="공간 사진"
          helper="공간을 촬영한 사진을 업로드 해주세요."
        >
          <ProfileAvatarPicker
            value={form.placeImage || null}
            onChange={(url) =>
              setForm((p) => ({ ...p, placeImage: url ?? "" }))
            }
            size={220}
          />
        </FormSection>

        <FormSection
          title="공간 소개"
          helper="공간을 나타내는 소개글을 간단히 작성해주세요!"
        >
          <S.Textarea
            placeholder="공간 소개를 입력해주세요."
            value={form.description}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, description: e.target.value }))
            }
            rows={5}
          />
        </FormSection>

        <FormSection title="공간 카테고리" helper="하나만 선택 가능합니다.">
          <SelectChipsGroup
            items={SPACE_CATEGORIES}
            selected={form.categories}
            max={1}
            onChange={(categories) => setForm((p) => ({ ...p, categories }))}
          />
          <S.Checkbox>
            <input
              id="free-only"
              type="checkbox"
              checked={form.isOkayNoise}
              onChange={(e) =>
                setForm((p) => ({
                  ...p,
                  isOkayNoise: e.target.checked,
                }))
              }
            />
            <label htmlFor="free-only">
              마이크/스피커를 사용한 공연이 가능합니다.
            </label>
          </S.Checkbox>
        </FormSection>

        <FormSection title="공간 분위기" helper="최대 5개 입력이 가능합니다.">
          <AmbienceInput
            value={form.atmosphere}
            onChange={(ambienceTags) =>
              setForm((p) => ({ ...p, atmosphere: ambienceTags.slice(0, 5) }))
            }
          />
        </FormSection>

        <FormSection title="수용 인원">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: 12,
              alignItems: "center",
            }}
          >
            <div
              style={{ color: "var(--text-secondary, #6b7280)", fontSize: 14 }}
            >
              좌석 기준
            </div>
            <NumberStepper
              value={form.capacitySeated}
              onChange={(n) => setForm((p) => ({ ...p, capacitySeated: n }))}
              min={0}
              max={100}
              unit="명"
            />
            <div
              style={{ color: "var(--text-secondary, #6b7280)", fontSize: 14 }}
            >
              스탠딩 기준
            </div>
            <NumberStepper
              value={form.capacityStanding}
              onChange={(n) => setForm((p) => ({ ...p, capacityStanding: n }))}
              min={0}
              max={100}
              unit="명"
            />
          </div>
        </FormSection>

        <FormSection
          title="보유 장비"
          helper="공간에서 보유하고 있는 장비를 선택합니다."
        >
          <SelectChipsGroup
            items={EQUIPMENT_CATEGORIES}
            selected={form.equipments}
            onChange={(equipments) => setForm((p) => ({ ...p, equipments }))}
          />
        </FormSection>
      </S.ContentContainer>

      <ActionFooter
        variant="double"
        prevLabel="이전"
        nextLabel="다음"
        prevDisabled={false}
        nextDisabled={!canNext}
        onPrev={onPrev}
        onNext={onNext}
      />
    </S.Container>
  );
}
