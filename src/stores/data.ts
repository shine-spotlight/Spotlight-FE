import type { Artist, Space, UserWithProfile } from "@/types";

export const mockArtistProfile: Artist = {
  id: 101,
  user_id: 1,
  name: "블루문 앙상블",
  bio: "재즈와 인디의 경계를 넘나드는 4인조 밴드",
  number_of_members: 4,
  category_id: 12,
  portfolio_links: ["https://youtu.be/xxxx", "https://soundcloud.com/xxxx"],
  profile_image_url: "https://picsum.photos/seed/artist/200/200",
  region: ["서울 마포구", "서울 용산구"],
  desired_pay: 80,
  is_free_allowed: false,
  created_at: new Date().toISOString(),
};

export const mockSpaceProfile: Space = {
  id: 201,
  user_id: 2,
  place_name: "라이트하우스 스테이지",
  address: "서울시 마포구 어딘가 123",
  kakao_map_link: "https://map.kakao.com/some-place",
  category: "라이브클럽",
  description: "50~120명 규모의 라이브 공연 전문 공간",
  capacity_seated: 60,
  capacity_standing: 120,
  preferred_categories: ["재즈", "인디", "어쿠스틱"],
  is_planning_host: true,
  phone_number: "02-1234-5678",
  business_registration_number: "123-45-67890",
  created_at: new Date().toISOString(),
  atmosphere: "아늑함, 빈티지, 따뜻한 조명",
};

export const mockArtistUser: UserWithProfile = {
  id: 1,
  kakao_id: "kakao_123",
  role: "artist",
  phone_number: "010-1111-2222",
  created_at: new Date().toISOString(),
  artist: mockArtistProfile,
};

export const mockSpaceUser: UserWithProfile = {
  id: 2,
  kakao_id: "kakao_987",
  role: "space",
  phone_number: "010-3333-4444",
  created_at: new Date().toISOString(),
  space: mockSpaceProfile,
};
