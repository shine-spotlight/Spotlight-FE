import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@stores/userStore";
import * as S from "./index.styles";
import { ProfileCard, RoleMenus, CommonMenus } from "./components";
import { isArtistProfile, isSpaceProfile } from "@models/user/user.type";
import { useUserOverview } from "@queries/overview";
import { PointChargeModal, PointChargeSuccessModal } from "./components";
import { useChargePointMutation } from "@queries/points";
import { useGlobalLoading } from "@hooks/useGlobalLoading";

const Mypage: React.FC = () => {
  const navigate = useNavigate();
  const currentRole = useUserStore((s) => s.currentRole);
  const [isChargeModalOpen, setIsChargeModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [chargedAmount, setChargedAmount] = useState(0);
  const pointByRole = useUserStore((s) => s.pointByRole);
  const { data: profile, isLoading } = useUserOverview();
  const chargePointMutation = useChargePointMutation();
  useGlobalLoading(isLoading, "내 프로필을 불러오는 중입니다...");

  useEffect(() => {
    if (!currentRole) {
      navigate("/", { replace: true });
    }
  }, [currentRole, navigate]);

  if (!currentRole) return null;

  if (isLoading) return null;
  if (!profile) return <S.Empty>프로필 정보가 없어요.</S.Empty>;

  const handleCharge = () => {
    setIsChargeModalOpen(true);
  };

  const handleChargeSubmit = async (amount: number) => {
    try {
      await chargePointMutation.mutateAsync(amount);
      setChargedAmount(amount);
      setIsChargeModalOpen(false);
      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error("포인트 충전 실패:", error);
    }
  };

  const handleSuccessModalClose = () => {
    setIsSuccessModalOpen(false);
    setChargedAmount(0);
  };

  return (
    <S.Container>
      <>
        {isArtistProfile(profile) ? (
          <ProfileCard
            role="artist"
            name={profile.name}
            point={pointByRole[currentRole]}
            onEditProfile={() => {}}
            onPointHistory={() => {}}
            onPointCharge={handleCharge}
          />
        ) : isSpaceProfile(profile) ? (
          <ProfileCard
            role="space"
            name={profile.placeName}
            onEditProfile={() => {}}
          />
        ) : null}

        <S.MenuList>
          <RoleMenus role={currentRole} />
          <CommonMenus />
        </S.MenuList>

        <PointChargeModal
          isOpen={isChargeModalOpen}
          onClose={() => setIsChargeModalOpen(false)}
          onCharge={handleChargeSubmit}
          isLoading={chargePointMutation.isPending}
        />

        <PointChargeSuccessModal
          isOpen={isSuccessModalOpen}
          onClose={handleSuccessModalClose}
          chargedAmount={chargedAmount}
        />
      </>
    </S.Container>
  );
};

export default Mypage;
