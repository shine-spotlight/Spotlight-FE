// ===== 기본 타입 정의 =====

// 사용자 역할 타입
export type UserRole = "artist" | "space";

// 제안 상태 타입
export type SuggestionStatus = "pending" | "accepted" | "rejected";

// 포인트 거래 타입
export type TransactionType = "charge" | "deduct";

// ===== 로그인 관련 =====

export interface KakaoUser {
  id: number;
  connected_at: string;
  properties: {
    nickname: string;
    profile_image?: string;
    thumbnail_image?: string;
  };
  kakao_account: {
    profile: {
      nickname: string;
      profile_image_url?: string;
      thumbnail_image_url?: string;
    };
    email?: string;
    age_range?: string;
    gender?: string;
    birthday?: string;
  };
}

// ===== 1. users (공통 회원) =====

export interface User {
  id: number;
  kakao_id: string;
  role: UserRole;
  phone_number?: string;
  created_at: string;
}

// ===== 2. artists (공연 예술가 전용 정보) =====

export interface Artist {
  id: number;
  user_id: number;
  name: string; // 활동명
  bio: string; // 소개글
  number_of_members: number; // 구성원 수
  category_id: number; // 공연/전시 카테고리 FK
  portfolio_links: string[]; // 포트폴리오 링크
  profile_image_url?: string; // 프로필 사진
  region: string[]; // 활동 지역 (구 단위)
  desired_pay: number; // 희망 페이 (만원 단위)
  is_free_allowed: boolean; // 무료 공연 가능 여부
  created_at: string;
}

// ===== 3. spaces (공간 보유자 전용 정보) =====

export interface Space {
  id: number;
  user_id: number;
  place_name: string; // 공간명
  address: string; // 상세 주소
  kakao_map_link?: string; // 카카오맵 URL
  category: string; // 공간 카테고리
  description: string; // 공간 설명
  capacity_seated: number; // 좌석 수용 인원
  capacity_standing: number; // 스탠딩 수용 인원
  preferred_categories: string[]; // 공연 형태 선택 가능 목록
  is_planning_host: boolean; // 기획공연 의사 여부
  phone_number?: string; // 연락처
  business_registration_number?: string; // 사업자 등록 번호
  created_at: string;
  atmosphere: string; // 분위기 키워드
}

export type ArtistUser = User & {
  role: "artist";
  artist: Artist;
  space?: never;
};

export type NavMenuItem = {
  id: string;
  label: string;
  path: string;
  roles: UserRole[];
};

export type SpaceUser = User & { role: "space"; space: Space; artist?: never };

export type UserWithProfile = ArtistUser | SpaceUser;

// 타입 가드
export const isArtistUser = (u: UserWithProfile): u is ArtistUser =>
  u.role === "artist";
export const isSpaceUser = (u: UserWithProfile): u is SpaceUser =>
  u.role === "space";
