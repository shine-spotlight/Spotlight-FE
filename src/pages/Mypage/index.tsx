import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@stores/userStore";
import * as S from "./index.styles";
import { ProfileCard, RoleMenus, CommonMenus } from "./components";
import { isArtistProfile, isSpaceProfile } from "@/types";
import type { UserProfile } from "@/types";

const Mypage: React.FC = () => {
  const nav = useNavigate();
  const currentRole = useUserStore((s) => s.currentRole);
  const profilesByRole = useUserStore((s) => s.profilesByRole);

  const profile = useMemo<UserProfile | null>(
    () => (currentRole ? profilesByRole[currentRole] ?? null : null),
    [profilesByRole, currentRole]
  );

  if (!currentRole) {
    nav("/");
    return;
  }
  if (!profile) {
    return <S.Empty>프로필 정보를 불러오는 중이에요…</S.Empty>;
  }

  const handleCharge = () => {
    //TODO: 포인트 충전 로직
  };

  return (
    <S.Container>
      <>
        {isArtistProfile(profile) ? (
          <ProfileCard
            role="artist"
            name={profile.name}
            point={profile.desiredPay}
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
      </>
    </S.Container>
  );
};

export default Mypage;
