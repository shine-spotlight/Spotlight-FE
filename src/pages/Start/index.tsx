import { RoleSelectCard } from "./components";
import { LogoWhiteIcon } from "@assets/svg/common";
import { USER_ROLE_TYPES } from "@constants/user";
import { resetAllStores } from "@stores/resetAll";
import { useUserStore } from "@stores/userStore";
import { useAuthStore } from "@stores/authStore";
import { useNavigate } from "react-router-dom";
import { mockArtists, mockSpaces } from "@stores/data";

import * as S from "./index.styles";

const Start: React.FC = () => {
  const setSocialVerified = useAuthStore((s) => s.setSocialVerified);
  const setOnboardedForRole = useUserStore((s) => s.setOnboardedForRole);
  const setCurrentRole = useUserStore((s) => s.setCurrentRole);
  const setProfileForRole = useUserStore((s) => s.setProfileForRole);

  const nav = useNavigate();

  const testArtistClick = () => {
    setSocialVerified(true);
    setCurrentRole("artist");
    setOnboardedForRole("artist", true);
    setProfileForRole("artist", mockArtists[0]);
    nav("/home");
  };

  const testSpaceClick = () => {
    setSocialVerified(true);
    setCurrentRole("space");
    setOnboardedForRole("space", true);
    setProfileForRole("space", mockSpaces[0]);

    nav("/home");
  };
  return (
    <S.Container>
      <S.LogoSection>
        <span>예술가와 공간, 서로의 빛이 되다.</span>
        <LogoWhiteIcon />
      </S.LogoSection>
      {/* 디버깅 용 */}
      <button onClick={resetAllStores}>Reset</button>
      <button onClick={testArtistClick}>유저 테스트 - 아티스트</button>
      <button onClick={testSpaceClick}>유저 테스트 - 공간</button>
      {/* 디버깅 용 */}
      <S.ButtonContainer>
        {USER_ROLE_TYPES.map((role) => {
          return <RoleSelectCard role={role} />;
        })}
      </S.ButtonContainer>
    </S.Container>
  );
};

export default Start;
