import { sendRequest } from "@apis/api";
import { userInstance } from "@apis/instance";
import type { UserRoleType } from "@models/user/user.type";

const CLIENT_ID = import.meta.env.VITE_KAKAO_CLIENT_ID!;
const KAKAO_REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;
const STATE_KEY = "kakao_oauth_state";

export type KakaoLoginResponse = {
  accessToken: string;
  isOnboarding: boolean;
  is_artistonboarding: boolean | null;
  is_spaceonboarding: boolean | null;
  user: {
    id: number;
    kakao_id: string;
    role: UserRoleType | null;
    phone_number: string | null;
    created_at: string;
  };
};

export function makeAuthorizeUrl() {
  if (!CLIENT_ID || !KAKAO_REDIRECT_URI) throw new Error("Kakao env missing");
  const state = crypto.getRandomValues(new Uint32Array(1))[0].toString(36);
  sessionStorage.setItem(STATE_KEY, state);
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    redirect_uri: KAKAO_REDIRECT_URI,
    response_type: "code",
    state, // CSRF 방지
  });
  return `https://kauth.kakao.com/oauth/authorize?${params.toString()}`;
}

export function validateState(returned?: string | null) {
  const saved = sessionStorage.getItem(STATE_KEY);

  // 재사용 방지를 위해 즉시 삭제
  sessionStorage.removeItem(STATE_KEY);
  return !!(saved && returned && saved === returned);
}

export async function exchangeCode(code: string) {
  return await sendRequest<KakaoLoginResponse>(
    userInstance,
    "get",
    `/auth/kakao/callback/?code=${encodeURIComponent(code)}`
  );
}

// 로그아웃
export function logout() {
  return sendRequest<void>(userInstance, "POST", "/auth/kakao/logout/");
}

// role 저장 API
export function setUserRole(role: UserRoleType) {
  return sendRequest(userInstance, "POST", "/type/", { role });
}

// 휴대폰 저장 API
export function setUserPhone(phoneNumber: string) {
  return sendRequest(userInstance, "POST", "/phone/", {
    phone_number: phoneNumber,
  });
}

// 내 정보 조회
export function getUserInfo() {
  return sendRequest<KakaoLoginResponse>(userInstance, "GET", "/me/");
}

// 회원 탈퇴
export function deleteUser() {
  return sendRequest<void>(userInstance, "DELETE", "/withdraw/");
}
