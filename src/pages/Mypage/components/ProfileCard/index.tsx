import * as S from "../../index.styles";
import { USER_ROLE_TYPE_LABELS } from "@constants/user";
import type { UserRoleType } from "@types";
import { ArtistRoleIcon, SpaceRoleIcon } from "@assets/svg/role";
import { ChargeIcon, ListIcon } from "@assets/svg/mypage";

interface ProfileCardProps {
  role: UserRoleType;
  name: string;
  point?: number;
  onEditProfile: () => void;
  onPointHistory?: () => void;
  onPointCharge?: () => void;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  role,
  name,
  point = 0,
  onEditProfile,
  onPointHistory,
  onPointCharge,
}) => {
  return (
    <S.ProfileCard>
      <S.DefaultProfileSection>
        {role === "artist" ? (
          <ArtistRoleIcon width={80} height={80} />
        ) : (
          <SpaceRoleIcon width={80} height={80} />
        )}
        <S.UserInfo>
          <S.RoleBadge data-role={role}>
            {USER_ROLE_TYPE_LABELS[role]}
          </S.RoleBadge>
          <S.Name>{name}</S.Name>
        </S.UserInfo>
      </S.DefaultProfileSection>
      <S.EditProfileButton onClick={onEditProfile}>
        프로필 수정
      </S.EditProfileButton>
      <S.Meta>
        {role === "artist" && (
          <S.PointCard>
            <S.PointRow>
              <S.PointBrand>Spotlight 포인트</S.PointBrand>
              <S.PointRight>
                <S.PointValue>{point}P</S.PointValue>
              </S.PointRight>
            </S.PointRow>
            <S.Line />
            <S.PointActions>
              <button onClick={onPointHistory}>
                <ListIcon width={20} height={20} />
                거래내역 조회
              </button>
              <p>|</p>
              <button onClick={onPointCharge}>
                <ChargeIcon width={20} height={20} />
                포인트 충전
              </button>
            </S.PointActions>
          </S.PointCard>
        )}
      </S.Meta>
    </S.ProfileCard>
  );
};
