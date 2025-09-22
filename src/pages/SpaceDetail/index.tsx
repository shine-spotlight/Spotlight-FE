import * as S from "./index.styles";
import { useState } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { Topbar } from "@components/Topbar";
import { useSpaceDetailQuery } from "@queries/spaces";
import { ProfileDetail } from "@components/ProfileDetail";
import ActionFooter from "@components/ActionFooter";
import ProposalSheet from "@components/ProposalSheet";
import ConfirmModal from "@components/ConfirmModal";
import { useBottomSheet } from "@hooks/useBottomSheet";
import { useGlobalLoading } from "@hooks/useGlobalLoading";
import { useSuggestToSpaceMutation } from "@queries/suggestions";
import CheckModal from "@components/CheckModal";
import { useLike } from "@hooks/useLike";

const SpaceDetail = () => {
  const { isOpen, open, close } = useBottomSheet();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isConfirmFinishOpen, setIsConfirmFinishOpen] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  const spaceId = Number(id);
  const hasValidId = Number.isFinite(spaceId);

  const { data, isLoading } = useSpaceDetailQuery(spaceId, {
    enabled: hasValidId,
  });
  const { suggest, isPending } = useSuggestToSpaceMutation(spaceId);
  useGlobalLoading(
    isLoading || isPending,
    isPending
      ? "제안서를 보내는 중입니다..."
      : "공간 정보를 조회하는 중입니다..."
  );

  const {
    liked,
    toggle,
    isPending: likeIsPending,
  } = useLike({ spaceId }, { initialLiked: data?.isLiked });

  if (!isLoading && !data) return <Navigate to="/404" replace />;

  if (isLoading || !data) return null;

  return (
    <S.Container>
      <Topbar title="공간 보유자 상세" goBack={() => navigate(-1)} />
      <ProfileDetail>
        <ProfileDetail.Media
          image={data.placeImageUrl ? data.placeImageUrl[0] : ""}
        />
        <ProfileDetail.Header
          title={data.placeName}
          description={data.description}
          categories={data.categoriesDisplay}
          isStar={liked}
          onToggle={toggle}
          disabled={likeIsPending}
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
        message="제안서 보내기 1회 당 1000포인트가 차감됩니다."
        confirmLabel="확인"
        cancelLabel="취소"
      />
      <ProposalSheet
        isOpen={isOpen}
        onClose={close}
        onSubmit={async (text) => {
          try {
            await suggest(text);
            close();
            setIsConfirmFinishOpen(true);
          } catch {
            /* empty */
          }
        }}
      />
      <CheckModal
        isOpen={isConfirmFinishOpen}
        onClose={() => setIsConfirmFinishOpen(false)}
        title="제안서 전송 완료!"
        message={
          <>
            <b>포인트 1000 차감</b>
            <br /> 제안서 전송이 성공적으로 완료되었습니다!
          </>
        }
        confirmLabel="확인"
      />
    </S.Container>
  );
};

export default SpaceDetail;
