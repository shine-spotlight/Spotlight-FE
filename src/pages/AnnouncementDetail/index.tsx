import * as S from "./index.styles";
import { useParams } from "react-router-dom";
import { Topbar } from "@components/Topbar";
import { ProfileDetail } from "@components/ProfileDetail";
import ActionFooter from "@components/ActionFooter";
import { useNavigate } from "react-router-dom";
import { SpaceRoleIcon } from "@assets/svg/role";
import { useBottomSheet } from "@hooks/useBottomSheet";
import ProposalSheet from "@components/ProposalSheet";
import ConfirmModal from "@components/ConfirmModal";
import ProposalSuccessModal from "@components/ProposalSuccessModal";
import { usePostingDetailQuery } from "@queries/postings";
import { useState, useEffect } from "react";
import { useGlobalLoading } from "@hooks/useGlobalLoading";
import { formatDate } from "@utils/formatDate";
import { usePostPostingSuggestionMutation } from "@queries/postings";
import { useUserStore } from "@stores/userStore";

const AnnouncementDetail = () => {
  const { id } = useParams<{ id: string }>();
  const postingId = Number(id);
  const { data: announcementDetail, isLoading } =
    usePostingDetailQuery(postingId);
  useGlobalLoading(isLoading, "공연 공고를 조회중입니다...");
  const navigate = useNavigate();
  const { isOpen, open, close } = useBottomSheet();
  const currentRole = useUserStore((s) => s.currentRole);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const { mutateAsync: sendSuggestion, isPending: isSending } =
    usePostPostingSuggestionMutation(postingId);

  useGlobalLoading(isSending, "제안서를 보내는 중입니다...");

  useEffect(() => {
    if (!isLoading && !announcementDetail) {
      navigate("/404", { replace: true });
    }
  }, [isLoading, announcementDetail, navigate]);

  if (!announcementDetail) return null;

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
                {formatDate(announcementDetail.createdAt)}
              </S.CreateAt>
            </S.BriefContent>
            <S.GotoButton
              onClick={() => navigate(`/spaces/${announcementDetail.spaceId}`)}
            >
              바로가기
            </S.GotoButton>
          </S.BriefProfile>

          <ProfileDetail.Section title="공연 카테고리">
            <ProfileDetail.Tags items={announcementDetail.categoryNames} />
          </ProfileDetail.Section>

          <ProfileDetail.Section title="상세 정보">
            <ProfileDetail.IconContent
              icon="pay"
              label="공연 페이"
              content={`${
                announcementDetail.priceType == "free"
                  ? "무료 공연"
                  : announcementDetail.priceType == "negotiable"
                  ? "협의 가능"
                  : `${announcementDetail.priceAmount}만 원`
              }`}
            />
            <ProfileDetail.IconContent
              icon="calendar"
              label="공연 날짜"
              content={announcementDetail.date}
            />
            <ProfileDetail.IconContent
              icon="place"
              label="주소"
              content={announcementDetail.spaceAddress}
            />
          </ProfileDetail.Section>
          <ProfileDetail.Section title="공연 설명">
            {announcementDetail.description}
          </ProfileDetail.Section>
          <ProfileDetail.Poster
            image={announcementDetail.postingImageUrl ?? ""}
          />
        </ProfileDetail>

        {currentRole == "artist" && (
          <>
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
              message="제안서 보내기 1회 당 1000포인트가 차감됩니다."
              confirmLabel="확인"
              cancelLabel="취소"
            />
            <ProposalSheet
              isOpen={isOpen}
              onClose={close}
              onSubmit={async (text) => {
                await sendSuggestion(text.trim());
                close();
                setIsSuccessModalOpen(true);
              }}
            />
            <ProposalSuccessModal
              isOpen={isSuccessModalOpen}
              onClose={() => setIsSuccessModalOpen(false)}
              deductedPoints={100}
            />
          </>
        )}
      </S.Container>
    </>
  );
};

export default AnnouncementDetail;
