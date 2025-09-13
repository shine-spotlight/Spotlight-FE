import type { NavMenuItem, UserRoleType } from "../types";

const artistMenus: NavMenuItem[] = [
  {
    id: "home",
    label: "홈",
    path: "/home",
    roles: ["artist"],
  },
  {
    id: "spaces",
    label: "공간 찾기",
    path: "/spaces",
    roles: ["artist"],
  },
  {
    id: "proposals",
    label: "제안서 보기",
    path: "/proposals",
    roles: ["artist"],
  },
  {
    id: "announcements",
    label: "공연 공고",
    path: "/announcements",
    roles: ["artist"],
  },
  {
    id: "mypage",
    label: "마이페이지",
    path: "/mypage",
    roles: ["artist"],
  },
];

const spaceMenus: NavMenuItem[] = [
  {
    id: "home",
    label: "홈",
    path: "/home",
    roles: ["space"],
  },
  {
    id: "artists",
    label: "예술가 찾기",
    path: "/artists",
    roles: ["space"],
  },
  {
    id: "proposals",
    label: "제안서 보기",
    path: "/proposals",
    roles: ["space"],
  },
  {
    id: "announcements",
    label: "공연 공고",
    path: "/announcements",
    roles: ["space"],
  },
  {
    id: "mypage",
    label: "마이페이지",
    path: "/mypage",
    roles: ["space"],
  },
];

// 역할별 메뉴 매핑
export const getMenusByRole = (role: UserRoleType | null): NavMenuItem[] => {
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
