import { useNavigate, Navigate } from "react-router-dom";
import { useRegistrationDraftStore } from "@stores/registrationStore";
import { Topbar } from "@components/Topbar";
import { USER_ROLE_TYPE_LABELS } from "@constants/user";
import { SpaceContentSvg, ArtistContentSvg } from "@assets/svg/role";
import { PhoneSvg } from "@assets/svg/common";
import { makeAuthorizeUrl } from "@apis/users";
import * as S from "./index.styles";
import { useUserStore } from "@stores/userStore";
import { useAuthStore } from "@stores/authStore";

const KakaoLoginButton = () => {
  const handleLoginClick = () => {
    try {
      const url = makeAuthorizeUrl();
      window.location.href = url;
    } catch {
      alert("카카오 설정이 누락되었습니다.");
    }
  };
  const nav = useNavigate();
  const currentRole = useUserStore((s) => s.currentRole);
  const setOnboardedForRole = useUserStore((s) => s.setOnboardedForRole);
  const setTokens = useAuthStore((s) => s.setTokens);
  const setSocialVerified = useAuthStore((s) => s.setSocialVerified);
  const ACCESSTOKEN = import.meta.env.VITE_ACCESSTOKEN;

  const handleTestClick = () => {
    setTokens({ accessToken: ACCESSTOKEN });
    setSocialVerified(true);
    if (currentRole) {
      setOnboardedForRole(currentRole, true);
      nav("/home");
    }
  };

  const testActive = true;

  return (
    <S.KakaoButton onClick={testActive ? handleTestClick : handleLoginClick}>
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
