import { RoleSelectCard } from "./components";
import { LogoWhiteIcon } from "@assets/svg/common";
import { USER_ROLE_TYPES } from "@constants/user";
// import { resetAllStores } from "@stores/resetAll";
import * as S from "./index.styles";

const Start: React.FC = () => {
  return (
    <S.Container>
      <S.LogoSection>
        <span>예술가와 공간, 서로의 빛이 되다.</span>
        <LogoWhiteIcon />
      </S.LogoSection>
      <S.ButtonContainer>
        {USER_ROLE_TYPES.map((role) => {
          return <RoleSelectCard role={role} />;
        })}
      </S.ButtonContainer>
    </S.Container>
  );
};

export default Start;
