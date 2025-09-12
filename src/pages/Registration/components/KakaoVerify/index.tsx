import { useNavigate, Navigate } from "react-router-dom";
import { useAuthStore } from "@stores/authStore";
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
  const draft = useRegistrationDraftStore((s) => s.draft);
  const role = draft?.role;

  if (!role) return <Navigate to="/" replace />;

  const startKakao = async () => {
    try {
      // const { accessToken } = await kakaoLogin();
      // setToken({ accessToken });

      setVerified(true);
      navigate("/register", { replace: true });
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
