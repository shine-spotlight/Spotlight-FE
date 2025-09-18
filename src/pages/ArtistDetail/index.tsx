import * as S from "./index.styles";
import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Topbar } from "@components/Topbar";
import ActionFooter from "@components/ActionFooter";
import { useArtistDetailQuery } from "@queries/artists";
import { ProfileDetail } from "@components/ProfileDetail";
import ProposalSheet from "@components/ProposalSheet";
import { useBottomSheet } from "@hooks/useBottomSheet";
import { useSuggestToArtistMutation } from "@queries/suggestions";
import { useGlobalLoading } from "@hooks/useGlobalLoading";
import CheckModal from "@components/CheckModal";
import { useLike } from "@hooks/useLike";

const ArtistDetail = () => {
  const { isOpen, open, close } = useBottomSheet();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  // id 파싱 & 유효성
  const artistId = Number(id ?? NaN);
  const hasValidId = Number.isFinite(artistId);

  // 훅은 항상 호출, enabled로 제어
  const { data, isLoading } = useArtistDetailQuery(artistId, {
    enabled: hasValidId,
  });
  const { suggest, isPending } = useSuggestToArtistMutation(artistId);

  const {
    liked,
    toggle,
    isPending: likeIsPending,
  } = useLike({ artistId }, { initialLiked: data?.isLiked });

  useGlobalLoading(
    isLoading || isPending,
    isPending
      ? "제안서를 보내는 중입니다..."
      : "아티스트 정보를 조회하는 중입니다..."
  );
  if (!isLoading && !data) return <Navigate to="/404" replace />;

  if (isLoading || !data) return null;

  return (
    <S.Container>
      <Topbar title="공연 예술가 상세" goBack={() => navigate("/artists")} />
      <ProfileDetail>
        <ProfileDetail.Media
          image={data.profileImageUrl ? data.profileImageUrl[0] : ""}
        />
        {/* 프론트 단에서는 하나의 사진만 가능하도록 제한 */}
        <ProfileDetail.Header
          title={data.name}
          description={data.bio}
          categories={data.categoriesDisplay}
          isStar={liked}
          onToggle={toggle}
          disabled={likeIsPending}
        />
        <ProfileDetail.Section title="희망 공연 카테고리">
          <ProfileDetail.Tags items={data.categoriesDisplay} />
        </ProfileDetail.Section>
        <ProfileDetail.Section title="상세 정보">
          <ProfileDetail.IconContent
            icon="people"
            label="인원수"
            content={`${data.numberOfMembers ?? 0}명`}
          />
          <ProfileDetail.IconContent
            icon="place"
            label="활동 지역"
            content={data.region}
          />
          <ProfileDetail.IconContent
            icon="equipment"
            label="필요 장비"
            content={data.equipmentsDisplay ?? "없음"}
          />
          <ProfileDetail.IconContent
            icon="pay"
            label="공연 페이"
            content={data.desiredPay}
          />
        </ProfileDetail.Section>
        {data.portfolioLinks.length > 0 && (
          <ProfileDetail.Section title="포트폴리오 자료">
            <ProfileDetail.PortfolioLink links={data.portfolioLinks} />
          </ProfileDetail.Section>
        )}
      </ProfileDetail>
      <ActionFooter
        variant="single"
        nextLabel="제안서 보내기"
        nextDisabled={false}
        onNext={open}
      />
      <ProposalSheet
        isOpen={isOpen}
        onClose={close}
        onSubmit={async (text) => {
          try {
            await suggest(text);
            close();
            setIsConfirmOpen(true);
          } catch {
            /* empty */
          }
        }}
      />
      <CheckModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        title="제안서 전송 완료!"
        message="제안서 전송이 성공적으로 완료되었습니다!"
        confirmLabel="확인"
      />
    </S.Container>
  );
};

export default ArtistDetail;
