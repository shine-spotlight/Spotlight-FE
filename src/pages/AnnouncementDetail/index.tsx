import * as S from "./index.styles";
// import { useParams } from "react-router-dom";
import { Topbar } from "@components/Topbar";
import { ProfileDetail } from "@components/ProfileDetail";
import ActionFooter from "@components/ActionFooter";
import { useNavigate } from "react-router-dom";
import { mockAnnouncements } from "./data";
import { SpaceRoleIcon } from "@assets/svg/role";
import { useBottomSheet } from "@hooks/useBottomSheet";
import ProposalSheet from "@components/ProposalSheet";
import ConfirmModal from "@components/ConfirmModal";
import ProposalSuccessModal from "@components/ProposalSuccessModal";
import { useState } from "react";

const AnnouncementDetail = () => {
  // const { id } = useParams();
  const announcementDetail = mockAnnouncements[0];
  const navigate = useNavigate();
  const { isOpen, open, close } = useBottomSheet();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  return (
    <>
      <Topbar
        title="공연 공고 상세"
        goBack={() => navigate("/announcements")}
      />
      <S.Container>
        <ProfileDetail>
          <S.BriefProfile>
            <SpaceRoleIcon width={60} height={60} />
            <S.BriefContent>
              <S.Title>{announcementDetail.title}</S.Title>
              <S.CreateAt>
                {announcementDetail.created_at.toLocaleString("ko-KR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </S.CreateAt>
            </S.BriefContent>
            <S.GotoButton
              onClick={() => navigate(`/spaces/${announcementDetail.space_id}`)}
            >
              바로가기
            </S.GotoButton>
          </S.BriefProfile>

          <ProfileDetail.Section title="공연 카테고리">
            <ProfileDetail.Tags items={announcementDetail.categories} />
          </ProfileDetail.Section>

          <ProfileDetail.Section title="상세 정보">
            <ProfileDetail.IconContent
              icon="pay"
              label="공연 페이"
              content={`${
                announcementDetail.price_amount
                  ? announcementDetail.price_amount
                  : 0
              }만 원`}
            />
            <ProfileDetail.IconContent
              icon="calendar"
              label="공연 날짜"
              content={announcementDetail.date.toLocaleString("ko-KR", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            />
            <ProfileDetail.IconContent
              icon="place"
              label="주소"
              content={
                announcementDetail.address ? announcementDetail.address : ""
              }
            />
          </ProfileDetail.Section>
          <ProfileDetail.Section title="공연 설명">
            {announcementDetail.description}
          </ProfileDetail.Section>
          <ProfileDetail.Poster image="https://otr.co.kr/wp-content/uploads/mangboard/2022/12/20/F129154_%5B%ED%8F%AC%EC%8A%A4%ED%84%B0%5D2023_%EC%83%81%EC%83%81%EA%B7%B9%EC%9E%A5%20%EC%A0%95%EA%B8%B0%EA%B3%B5%EC%97%B0%20%EA%B3%B5%EB%AA%A8%20%282%29.jpg" />
        </ProfileDetail>

        <ActionFooter
          variant="single"
          nextLabel="공연 제안서 보내기"
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
            setIsSuccessModalOpen(true);
          }}
        />

        <ProposalSuccessModal
          isOpen={isSuccessModalOpen}
          onClose={() => setIsSuccessModalOpen(false)}
          deductedPoints={100}
        />
      </S.Container>
    </>
  );
};

export default AnnouncementDetail;
