import * as S from "./index.styles";
// import { useParams } from "react-router-dom";
import { Topbar } from "@components/Topbar";
// import { useNavigate } from "react-router-dom";
import { ProfileDetail } from "@components/ProfileDetail";
import ActionFooter from "@components/ActionFooter";
import { mockSpaces } from "@stores/data";
import { useNavigate } from "react-router-dom";

const SpaceDetail = () => {
  // const { id } = useParams();
  // const navigate = useNavigate();
  const spaceDetail = mockSpaces[0];
  const navigate = useNavigate();
  return (
    <S.Container>
      <Topbar title="공간 보유자 상세" goBack={() => navigate("/spaces")} />
      <ProfileDetail>
        <ProfileDetail.Media image="https://d1z7ls0lpgvz0q.cloudfront.net/media/artist/image/web/Untitled-6_uk6PZyA.png" />
        <ProfileDetail.Header
          title={spaceDetail.placeName}
          description={spaceDetail.description}
          isStar={true}
        />
        <ProfileDetail.Section title="희망 공연 카테고리">
          <ProfileDetail.Tags items={spaceDetail.categoryName} />
        </ProfileDetail.Section>
        <ProfileDetail.Section title="공간 정보">
          <ProfileDetail.IconContent
            icon="place"
            label="주소"
            content={spaceDetail.address}
          />
          <ProfileDetail.IconContent
            icon="mood"
            label="분위기"
            content={
              spaceDetail.atmosphere.length > 0
                ? spaceDetail.atmosphere.map((r) => `#${r}`).join(", ")
                : "정보 없음"
            }
          />
          <ProfileDetail.IconContent
            icon="equipment"
            label="필요 장비"
            content={
              spaceDetail.equipments.length > 0
                ? spaceDetail.equipments.map((r) => `${r}`).join(", ")
                : "정보 없음"
            }
          />
          <ProfileDetail.IconContent
            icon="people"
            label="수용 인원"
            content={`좌석 ${spaceDetail.capacitySeated}명, 스탠딩 ${spaceDetail.capacityStanding}명`}
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
