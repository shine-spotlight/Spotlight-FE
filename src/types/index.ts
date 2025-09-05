// ===== 기본 타입 정의 =====

// 사용자 역할 타입
export type UserRole = "artist" | "space";

// 제안 상태 타입
export type SuggestionStatus = "pending" | "accepted" | "rejected";

// 좋아요 대상 타입
export type LikeTargetType = "artist" | "space";

// 포인트 거래 타입
export type TransactionType = "charge" | "deduct";

// 가격 타입
export type PriceType = "paid" | "free" | "negotiable";

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
  phone_number?: number;
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

// ===== 4. artist_equipments =====

export interface ArtistEquipment {
  id: number;
  artist_id: number;
  category_id: number;
  model_description: string; // 장비 상세 설명
}

// ===== 5. space_equipments =====

export interface SpaceEquipment {
  id: number;
  space_id: number;
  category_id: number;
  model_description: string; // 장비 상세 설명
}

// ===== 6. equipment_categories =====

export interface EquipmentCategory {
  id: number;
  name: string; // 장비 카테고리명
}

// ===== 7. categories (공연/전시 카테고리) =====

export interface Category {
  id: number;
  name: string; // 공연/전시 카테고리명
}

// ===== 8. suggestions_to_space (아티스트 → 공간 제안) =====

export interface SuggestionToSpace {
  id: number;
  artist_id: number;
  space_id: number;
  message: string; // 제안 메시지
  performance_date: string; // 공연 희망 날짜 (DATE)
  is_accepted: boolean; // 수락 여부
  is_performed_confirmed: boolean; // 공연 완료 확인 여부
  created_at: string;
}

// ===== 9. suggestions_to_artist (공간 → 아티스트 제안) =====

export interface SuggestionToArtist {
  id: number;
  space_id: number;
  artist_id: number;
  message: string; // 제안 메시지
  performance_date: string; // 공연 희망 날짜 (DATE)
  is_accepted: boolean; // 수락 여부
  is_performed_confirmed: boolean; // 공연 완료 확인 여부
  created_at: string;
}

// ===== 10. likes =====

export interface Like {
  id: number;
  user_id: number;
  target_type: LikeTargetType; // 좋아요 대상 타입
  target_id: number; // 대상 테이블 ID
}

// ===== 11. notifications =====

export interface Notification {
  id: number;
  user_id: number;
  content: string; // 알림 내용
  target_link?: string; // 제안/공고 등 연결 URL
  is_read: boolean; // 읽음 여부
  created_at: string;
}

// ===== 12. postings (공연 공고) =====

export interface Posting {
  id: number;
  artist_id: number;
  title: string; // 제목
  description: string; // 공연 설명
  categories: number[]; // 공연 형태 (FK[] → categories)
  price_type: PriceType; // 유료/무료/협의
  price_amount?: number; // 금액 (nullable)
  region: string; // 지역
  date: string; // 공연 날짜 (DATE)
  created_at: string;
}

// ===== 13. space_available_dates =====

export interface SpaceAvailableDate {
  id: number;
  space_id: number;
  date: string; // 가능한 날짜 (DATE)
  is_planned_event: boolean; // 기획공연 여부
}

// ===== 14. points (결제/포인트 관리) =====

export interface Point {
  id: number;
  user_id: number;
  balance: number; // 현재 포인트 잔액
  transaction_type: TransactionType; // 충전/차감 구분
  amount: number; // 변동된 포인트
  created_at: string;
}

// ===== 확장된 사용자 정보 (프론트엔드용) =====

export interface UserWithProfile extends User {
  artist?: Artist;
  space?: Space;
  isProfileComplete: boolean;
}

// ===== 네비게이션 메뉴 타입 =====

export interface NavMenuItem {
  id: string;
  label: string;
  path: string;
  icon?: string;
  roles: UserRole[];
}

// ===== API 응답 타입 =====

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ApiError {
  message: string;
  status: number;
  code?: string;
}

// ===== 페이지네이션 타입 =====

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
