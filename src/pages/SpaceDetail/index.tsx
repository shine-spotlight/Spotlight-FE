import * as S from "./index.styles";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Topbar } from "@components/Topbar";
import { useSpaceDetailQuery } from "@queries/spaces";
import { ProfileDetail } from "@components/ProfileDetail";
import ActionFooter from "@components/ActionFooter";
import ProposalSheet from "@components/ProposalSheet";
import ConfirmModal from "@components/ConfirmModal";
import { useBottomSheet } from "@hooks/useBottomSheet";
import { useGlobalLoading } from "@hooks/useGlobalLoading";

const SpaceDetail = () => {
  const { isOpen, open, close } = useBottomSheet();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  const spaceId = Number(id);
  const hasValidId = Number.isFinite(spaceId);

  const { data, isLoading } = useSpaceDetailQuery(spaceId, {
    enabled: hasValidId,
  });

  useGlobalLoading(isLoading, "공간 정보를 조회 중입니다...");

  useEffect(() => {
    if (!hasValidId) {
      navigate("/404", { replace: true });
    }
  }, [hasValidId, navigate]);

  useEffect(() => {
    if (!isLoading && !data) {
      navigate("/404", { replace: true });
    }
  }, [isLoading, data, navigate]);

  if (!hasValidId || isLoading || !data) return null;

  return (
    <S.Container>
      <Topbar title="공간 보유자 상세" goBack={() => navigate("/spaces")} />
      <ProfileDetail>
        <ProfileDetail.Media
          image={data.placeImageUrl ? data.placeImageUrl[0] : ""}
        />
        <ProfileDetail.Header
          title={data.placeName}
          description={data.description}
          isStar
          categories={data.categoriesDisplay}
        />
        <ProfileDetail.Section title="희망 공연 카테고리">
          <ProfileDetail.Tags items={data.preferredCategoriesDisplay} />
        </ProfileDetail.Section>
        <ProfileDetail.Section title="공간 정보">
          <ProfileDetail.IconContent
            icon="place"
            label="주소"
            content={data.address}
          />
          <ProfileDetail.IconContent
            icon="mood"
            label="분위기"
            content={data.atmosphere}
          />
          <ProfileDetail.IconContent
            icon="equipment"
            label="보유 장비"
            content={data.equipmentsDisplay}
          />
          <ProfileDetail.IconContent
            icon="people"
            label="수용 인원"
            content={`좌석 ${data.capacitySeated}명, 스탠딩 ${data.capacityStanding}명`}
          />
        </ProfileDetail.Section>
      </ProfileDetail>
      <ActionFooter
        variant="single"
        nextLabel="제안서 보내기"
        nextDisabled={false}
        onNext={() => setIsConfirmModalOpen(true)}
      />
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={() => {
          setIsConfirmModalOpen(false);
          open();
        }}
        title="제안서를 보내시겠습니까?"
        message="제안서 보내기 1회 당 100포인트가 차감됩니다."
        confirmLabel="확인"
        cancelLabel="취소"
      />
      <ProposalSheet
        isOpen={isOpen}
        onClose={close}
        onSubmit={(text) => {
          console.log("제안서 내용:", text);
          close();
        }}
      />
    </S.Container>
  );
};

export default SpaceDetail;
