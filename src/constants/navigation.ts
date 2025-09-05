import type { NavMenuItem, UserRole } from "../types";

// 공연예술가 메뉴
const artistMenus: NavMenuItem[] = [
  {
    id: "home",
    label: "홈",
    path: "/",
    roles: ["artist"],
  },
  {
    id: "space-search",
    label: "공간찾기",
    path: "/spaces",
    roles: ["artist"],
  },
  {
    id: "proposals",
    label: "제안서보기",
    path: "/proposals",
    roles: ["artist"],
  },
  {
    id: "announcements",
    label: "공연공고",
    path: "/announcements",
    roles: ["artist"],
  },
  {
    id: "profile",
    label: "마이페이지",
    path: "/profile",
    roles: ["artist"],
  },
];

// 공간보유자 메뉴
const spaceMenus: NavMenuItem[] = [
  {
    id: "home",
    label: "홈",
    path: "/",
    roles: ["space"],
  },
  {
    id: "artist-search",
    label: "예술가찾기",
    path: "/artists",
    roles: ["space"],
  },
  {
    id: "proposals",
    label: "제안서보기",
    path: "/proposals",
    roles: ["space"],
  },
  {
    id: "announcements",
    label: "공연공고",
    path: "/announcements",
    roles: ["space"],
  },
  {
    id: "profile",
    label: "마이페이지",
    path: "/profile",
    roles: ["space"],
  },
];

// 역할별 메뉴 매핑
export const getMenusByRole = (role: UserRole): NavMenuItem[] => {
  switch (role) {
    case "artist":
      return artistMenus;
    case "space":
      return spaceMenus;
    default:
      return [];
  }
};

// 모든 메뉴 (개발/디버깅용)
export const allMenus: NavMenuItem[] = [...artistMenus, ...spaceMenus];
