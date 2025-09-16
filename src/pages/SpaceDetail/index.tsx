import * as S from "./index.styles";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Topbar } from "@components/Topbar";
import { useSpaceDetailQuery } from "@queries/spaces";
import { ProfileDetail } from "@components/ProfileDetail";
import ActionFooter from "@components/ActionFooter";
import NotFound from "@pages/NotFound";

const SpaceDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const spaceId = Number(id);
  const hasValidId = Number.isFinite(spaceId);

  const { data, isLoading, error } = useSpaceDetailQuery(spaceId, {
    enabled: hasValidId,
  });

  useEffect(() => {
    if (!hasValidId) {
      navigate("/404", { replace: true });
    }
  }, [hasValidId, navigate]);

  if (!hasValidId) {
    return null;
  }

  if (isLoading) {
    return (
      <S.Container>
        <Topbar title="공간 보유자 상세" goBack={() => navigate("/spaces")} />
        <div>불러오는 중…</div>
      </S.Container>
    );
  }

  if (error || !data) {
    return <NotFound />;
  }

  const title = data.placeName ?? "이름 없음";
  const description = data.description ?? "설명 없음";
  const img =
    Array.isArray(data.placeImageUrl) && data.placeImageUrl[0]
      ? data.placeImageUrl[0]
      : "";
  const categories = Array.isArray(data.preferredCategoriesDisplay)
    ? data.preferredCategoriesDisplay
    : [];
  const place_categories = Array.isArray(data.categoriesDisplay)
    ? data.categoriesDisplay
    : [];
  const address = data.address ?? "주소 정보 없음";
  const atmosphere =
    Array.isArray(data.atmosphere) && data.atmosphere.length
      ? data.atmosphere.map((v) => `#${v}`).join(", ")
      : "정보 없음";
  const equipments =
    Array.isArray(data.equipmentsDisplay) && data.equipmentsDisplay.length
      ? data.equipmentsDisplay.join(", ")
      : "정보 없음";
  const seated =
    typeof data.capacitySeated === "number" ? data.capacitySeated : 0;
  const standing =
    typeof data.capacityStanding === "number" ? data.capacityStanding : 0;

  return (
    <S.Container>
      <Topbar title="공간 보유자 상세" goBack={() => navigate("/spaces")} />
      <ProfileDetail>
        <ProfileDetail.Media image={img} />
        <ProfileDetail.Header
          title={title}
          description={description}
          isStar
          categories={place_categories}
        />
        <ProfileDetail.Section title="희망 공연 카테고리">
          <ProfileDetail.Tags items={categories} />
        </ProfileDetail.Section>
        <ProfileDetail.Section title="공간 정보">
          <ProfileDetail.IconContent
            icon="place"
            label="주소"
            content={address}
          />
          <ProfileDetail.IconContent
            icon="mood"
            label="분위기"
            content={atmosphere}
          />
          <ProfileDetail.IconContent
            icon="equipment"
            label="보유 장비"
            content={equipments}
          />
          <ProfileDetail.IconContent
            icon="people"
            label="수용 인원"
            content={`좌석 ${seated}명, 스탠딩 ${standing}명`}
          />
        </ProfileDetail.Section>
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

export default SpaceDetail;
