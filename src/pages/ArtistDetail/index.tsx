import * as S from "./index.styles";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Topbar } from "@components/Topbar";
import ActionFooter from "@components/ActionFooter";
import { useArtistDetailQuery } from "@queries/artists";
import { ProfileDetail } from "@components/ProfileDetail";

const ArtistDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // id 파싱 & 유효성
  const artistId = Number(id ?? NaN);
  const hasValidId = Number.isFinite(artistId);

  // 훅은 항상 호출, enabled로 제어
  const { data, isLoading } = useArtistDetailQuery(artistId, {
    enabled: hasValidId,
  });

  if (isLoading) {
    return (
      <S.Container>
        <Topbar title="공연 예술가 상세" goBack={() => navigate("/artists")} />
        <div>불러오는 중…</div>
      </S.Container>
    );
  }

  if (!data) {
    return <Navigate to="/404" replace />;
  }

  const title = data.name;
  const description = data.bio;
  const img = data.profileImageUrl || ""; // 문자열 단일 필드라고 가정
  const categories = Array.isArray(data.categories) ? data.categories : [];
  const region =
    Array.isArray(data.region) && data.region.length
      ? data.region.join(", ")
      : "정보 없음";
  const equipments =
    Array.isArray(data.equipments) && data.equipments.length
      ? data.equipments.join(", ")
      : "정보 없음";
  const members =
    typeof data.numberOfMembers === "number" ? data.numberOfMembers : 0;
  const pay =
    typeof data.desiredPay === "number"
      ? `${data.desiredPay}만 원`
      : "정보 없음";
  const portfolioLinks = Array.isArray(data.portfolioLinks)
    ? data.portfolioLinks
    : [];

  return (
    <S.Container>
      <Topbar title="공연 예술가 상세" goBack={() => navigate("/artists")} />
      <ProfileDetail>
        <ProfileDetail.Media image={img} />
        <ProfileDetail.Header
          title={title}
          description={description}
          isStar={true}
        />
        <ProfileDetail.Section title="희망 공연 카테고리">
          <ProfileDetail.Tags items={categories} />
        </ProfileDetail.Section>
        <ProfileDetail.Section title="상세 정보">
          <ProfileDetail.IconContent
            icon="people"
            label="인원수"
            content={`${members}명`}
          />
          <ProfileDetail.IconContent
            icon="place"
            label="활동 지역"
            content={region}
          />
          <ProfileDetail.IconContent
            icon="equipment"
            label="필요 장비"
            content={equipments}
          />
          <ProfileDetail.IconContent
            icon="pay"
            label="공연 페이"
            content={`${pay}만 원`}
          />
        </ProfileDetail.Section>
        {portfolioLinks.length > 0 && (
          <ProfileDetail.Section title="포트폴리오 자료">
            <ProfileDetail.PortfolioLink links={portfolioLinks} />
          </ProfileDetail.Section>
        )}
      </ProfileDetail>
      <ActionFooter
        variant="single"
        nextLabel="제안서 보내기"
        nextDisabled={false}
        onNext={() => {}}
      />
    </S.Container>
  );
};

export default ArtistDetail;
