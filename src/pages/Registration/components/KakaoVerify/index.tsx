import { useNavigate, Navigate } from "react-router-dom";
import { useRegistrationDraftStore } from "@stores/registrationStore";
import { Topbar } from "@components/Topbar";
import { USER_ROLE_TYPE_LABELS } from "@constants/user";
import { SpaceContentSvg, ArtistContentSvg } from "@assets/svg/role";
import { PhoneSvg } from "@assets/svg/common";
import { makeAuthorizeUrl } from "@apis/users";
import * as S from "./index.styles";

const KakaoLoginButton = () => {
  const onClick = () => {
    try {
      const url = makeAuthorizeUrl();
      window.location.href = url;
    } catch {
      alert("카카오 설정이 누락되었습니다.");
    }
  };

  return (
    <S.KakaoButton onClick={onClick}>
      <S.KakaoIcon aria-hidden />
      카카오톡으로 시작하기
    </S.KakaoButton>
  );
};

function KakaoVerify() {
  const navigate = useNavigate();
  const draft = useRegistrationDraftStore((s) => s.draft);
  const role = draft?.role;

  if (!role) return <Navigate to="/" replace />;

  return (
    <>
      <Topbar
        title={`${USER_ROLE_TYPE_LABELS[role]} 회원가입`}
        goBack={() => navigate("/")}
      />
      <S.Container>
        {role == "artist" ? (
          <ArtistContentSvg width={300} height={100} />
        ) : (
          <SpaceContentSvg width={300} height={100} />
        )}
        <S.Content>
          <PhoneSvg width={361} height={341} />
          <KakaoLoginButton />
        </S.Content>
      </S.Container>
    </>
  );
}

export default KakaoVerify;
