import { useState, useCallback } from "react";
import { useRegistrationDraftStore } from "@stores/registrationStore";
import { SPACE_STEP } from "@pages/Registration/types/steps";
import type { SpaceAddressCapacityPayload } from "@pages/Registration/types/payloads";
import { useRegistrationStepNav } from "@pages/Registration/hooks/useRegistrationStepNav";
import ActionFooter from "@components/ActionFooter";
import FormSection from "../../FormSection";
import AddressSearchSheet from "../../AddressSearchSheet";
import * as S from "../../index.styles";
import * as L from "./index.styles";

export default function SpaceAddressCapacityForm() {
  const draft = useRegistrationDraftStore((s) => s.draft);
  const { saveAndGoNext, saveAndGoPrev } = useRegistrationStepNav();

  const [zipcode, setZipcode] = useState<string>("");
  const [showSheet, setShowSheet] = useState(false);
  const [addressDetail, setAddressDetail] = useState<string>("");

  const initial =
    draft?.role === "space"
      ? (draft.data[SPACE_STEP.AddressCapacity] as
          | SpaceAddressCapacityPayload
          | undefined)
      : undefined;

  const [form, setForm] = useState<SpaceAddressCapacityPayload>({
    address: initial?.address ?? "",
    placeName: initial?.placeName ?? "",
    kakaoMapLink: initial?.kakaoMapLink ?? "",
    postalCode: initial?.postalCode ?? "",
  });

  // 다음 버튼 활성화
  const valid =
    zipcode.trim().length > 0 &&
    form.address.trim().length > 0 &&
    form.placeName.trim().length > 0;

  const onNext = useCallback(() => {
    // zipcode는 전송하지 않음
    saveAndGoNext(form);
  }, [form, saveAndGoNext]);

  const onPrev = useCallback(() => {
    saveAndGoPrev(form);
  }, [form, saveAndGoPrev]);

  return (
    <S.Container>
      <S.Headline>등록할 공연 공간을 선택해주세요!</S.Headline>

      <FormSection
        title="공간 등록"
        helper="공간 검색을 통해 공간을 선택해주세요!"
      >
        <L.SearchButton type="button" onClick={() => setShowSheet(true)}>
          주소 검색
        </L.SearchButton>

        <L.FormTable>
          <L.Row>
            <L.Label>우편번호</L.Label>
            <L.BorderInput
              placeholder="우편번호"
              value={zipcode}
              readOnly
              disabled
              data-locked
            />
          </L.Row>

          <L.Row>
            <L.Label>주소지</L.Label>
            <L.BorderInput
              placeholder="주소지를 입력해주세요."
              value={form.address}
              readOnly
              disabled
              data-locked
            />
          </L.Row>

          <L.Row>
            <L.Label>상세주소</L.Label>
            <L.BorderInput
              placeholder="상세주소를 입력해주세요."
              value={addressDetail}
              onChange={(e) => setAddressDetail(e.target.value)}
            />
          </L.Row>

          <L.Row>
            <L.Label>장소명</L.Label>
            <L.BorderInput
              placeholder="장소명을 입력해주세요."
              value={form.placeName}
              onChange={(e) =>
                setForm((p) => ({ ...p, placeName: e.target.value }))
              }
            />
          </L.Row>
        </L.FormTable>
      </FormSection>

      <ActionFooter
        variant="double"
        prevLabel="이전"
        nextLabel="다음"
        nextDisabled={!valid}
        onPrev={onPrev}
        onNext={onNext}
      />
      <AddressSearchSheet
        isOpen={showSheet}
        onClose={() => setShowSheet(false)}
        onSelect={({ zonecode, address }) => {
          setZipcode(zonecode);
          setForm((p) => ({
            ...p,
            address,
            kakaoMapLink: `https://map.kakao.com/link/search/${encodeURIComponent(
              address
            )}`,
          }));
          setShowSheet(false);
        }}
      />
    </S.Container>
  );
}
