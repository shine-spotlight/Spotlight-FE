import { useNavigate } from "react-router-dom";
import * as S from "./index.styles";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <S.Container>
      <S.Content>
        <S.ErrorSection>
          <S.ErrorCode>404</S.ErrorCode>
          <S.Title>페이지를 찾을 수 없습니다</S.Title>
          <S.Description>
            요청하신 페이지가 존재하지 않거나
            <br />
            이동되었을 수 있습니다.
          </S.Description>
        </S.ErrorSection>

        <S.ButtonContainer>
          <S.PrimaryButton onClick={() => navigate("/home")}>
            홈으로 가기
          </S.PrimaryButton>
          <S.SecondaryButton onClick={() => navigate(-1)}>
            이전 페이지
          </S.SecondaryButton>
        </S.ButtonContainer>
      </S.Content>
    </S.Container>
  );
};

export default NotFound;
