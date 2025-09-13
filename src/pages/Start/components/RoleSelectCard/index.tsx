import * as S from "./index.styles";
import type { UserRoleType } from "@types";
import { ArtistRoleIcon, SpaceRoleIcon } from "@assets/svg/role";
import { useNavigate } from "react-router-dom";
import { useRegistrationDraftStore } from "@/stores/registrationStore";
import { useAuthStore } from "@stores/authStore";
import { useUserStore } from "@stores/userStore";
interface RoleSelectCard {
  role: UserRoleType;
}

export const RoleSelectCard = ({ role }: RoleSelectCard) => {
  const navigate = useNavigate();
  const verified = useAuthStore((s) => s.socialVerified);
  const chooseRole = useRegistrationDraftStore((s) => s.chooseRole);
  const setCurrentRole = useUserStore((s) => s.setCurrentRole);

  const iconMap: Record<
    UserRoleType,
    React.FC<React.SVGProps<SVGSVGElement>>
  > = {
    artist: ArtistRoleIcon,
    space: SpaceRoleIcon,
  };

  const labelMap: Record<UserRoleType, string> = {
    artist: "공연 예술가",
    space: "공간 보유자",
  };

  const Icon = iconMap[role];

  const handleClick = () => {
    setCurrentRole(role);
    chooseRole(role);

    if (!verified) {
      navigate("/register", { replace: true });
    } else {
      navigate("/register/verify", { replace: true });
    }
  };

  return (
    <S.CardContainer onClick={handleClick}>
      <Icon width={80} height={80} />
      <S.Label>{labelMap[role]}로 시작하기</S.Label>
    </S.CardContainer>
  );
};
