import * as S from "./index.styles";
// import { useParams } from "react-router-dom";
import { Topbar } from "@components/Topbar";
// import { useNavigate } from "react-router-dom";
import { ProfileDetail } from "@components/ProfileDetail";
import { mockArtists } from "@stores/data";
import ActionFooter from "@components/ActionFooter";
import { useNavigate } from "react-router-dom";

const ArtistDetail = () => {
  // const { id } = useParams();
  // const navigate = useNavigate();
  const artistDetail = mockArtists[0];
  const navigate = useNavigate();

  return (
    <S.Container>
      <Topbar title="공연 예술가 상세" goBack={() => navigate("/artists")} />
      <ProfileDetail>
        <ProfileDetail.Media image="https://d1z7ls0lpgvz0q.cloudfront.net/media/artist/image/web/Untitled-6_uk6PZyA.png" />
        <ProfileDetail.Header
          title={artistDetail.name}
          description={artistDetail.bio}
          isStar={true}
        />
        <ProfileDetail.Section title="희망 공연 카테고리">
          <ProfileDetail.Tags
            items={artistDetail.categoryName ? artistDetail.categoryName : []}
          />
        </ProfileDetail.Section>
        <ProfileDetail.Section title="상세 정보">
          <ProfileDetail.IconContent
            icon="people"
            label="인원수"
            content={`${artistDetail.numberOfMembers}명`}
          />
          <ProfileDetail.IconContent
            icon="place"
            label="활동 지역"
            content={
              artistDetail.region.length > 0
                ? artistDetail.region
                    .map((r) => `${r.sido} ${r.sigungu ?? ""}`)
                    .join(", ")
                : "정보 없음"
            }
          />
          <ProfileDetail.IconContent
            icon="equipment"
            label="필요 장비"
            content={
              artistDetail.equipments.length > 0
                ? artistDetail.equipments.map((r) => `${r}`).join(", ")
                : "정보 없음"
            }
          />
          <ProfileDetail.IconContent
            icon="pay"
            label="공연 페이"
            content={`${artistDetail.desiredPay}만 원`}
          />
        </ProfileDetail.Section>
        <ProfileDetail.Section title="포트폴리오 자료">
          <ProfileDetail.PortfolioLink
            links={[
              "https://www.notion.so/71b124a7a4964210b79178b4ca23ec71",
              "https://www.notion.so/71b124a7a4964210b79178b4ca23ec71",
              "https://www.notion.so/71b124a7a4964210b79178b4ca23ec71",
            ]}
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

export default ArtistDetail;
