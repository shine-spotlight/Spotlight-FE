import { useNavigate, Navigate } from "react-router-dom";
import { useAuthStore } from "@stores/authStore";
import { useUserStore } from "@stores/userStore";
import { useRegistrationDraftStore } from "@stores/registrationStore";
import { Topbar } from "@components/Topbar";
import { USER_ROLE_TYPE_LABELS } from "@constants/user";
import { SpaceContentSvg, ArtistContentSvg } from "@assets/svg/role";
import { PhoneSvg } from "@assets/svg/common";
import * as S from "./index.styles";

export function KakaoVerify() {
  const navigate = useNavigate();
  // const setToken = useAuthStore((s) => s.setTokens);
  const setVerified = useAuthStore((s) => s.setSocialVerified);
  const socialVerified = useAuthStore((s) => s.socialVerified);
  const onboarded = useUserStore((s) => s.onboardedByRole);

  const draft = useRegistrationDraftStore((s) => s.draft);
  const role = draft?.role;

  if (role && socialVerified && onboarded[role]) {
    console.log("role:", role);
    console.log("socialVerified:", socialVerified);
    console.log("onboarded:", onboarded);
    return <Navigate to="/home" replace />;
  }

  if (!role) return <Navigate to="/" replace />;

  const startKakao = async () => {
    try {
      // const { accessToken } = await kakaoLogin();
      // setToken({ accessToken });

      setVerified(true);
      //TODO: setOnboarded 값을 서버로부터 받아와서 저장하는 로직이 필요합니다.
      if (!onboarded[role]) {
        navigate("/register", { replace: true });
      } else {
        navigate("/home", { replace: true });
      }
    } catch (e) {
      console.error(e);
      alert("카카오 인증에 실패했습니다. 다시 시도해주세요.");
    }
  };

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
          <S.KakaoButton onClick={startKakao}>
            <S.KakaoIcon aria-hidden />
            카카오톡으로 시작하기
          </S.KakaoButton>
        </S.Content>
      </S.Container>
    </>
  );
}
