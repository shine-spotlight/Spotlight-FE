import type { AnnouncementItemType } from "./types";

export const dummyAnnouncements: AnnouncementItemType[] = [
  {
    id: 1,
    address: "서울시 강남구 역삼동",
    title: "가을 재즈 콘서트",
    posting_image_url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwyMzK9PgT3_eHEMj7n1x-xFb2KAWxLM_BSA&s",
    categories: ["재즈", "콘서트"],
    date: "2025-09-10",
    created_at: new Date("2025-09-05T12:20:00Z"),
  },
  {
    id: 2,
    address: "서울시 성북구 동선동",
    title: "금요일 인디 나이트",
    posting_image_url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwyMzK9PgT3_eHEMj7n1x-xFb2KAWxLM_BSA&s",
    categories: ["인디", "밴드"],
    date: "2025-09-12",
    created_at: new Date("2025-09-08T05:11:19.560797Z"),
  },
  {
    id: 3,
    address: "부산시 해운대구 우동",
    title: "무료 클래식 공연",
    posting_image_url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwyMzK9PgT3_eHEMj7n1x-xFb2KAWxLM_BSA&s",
    categories: ["클래식"],
    date: "2025-09-15",
    created_at: new Date("2025-09-09T09:30:00Z"),
  },
  {
    id: 4,
    address: "서울시 마포구 합정동",
    title: "힙합 배틀",
    posting_image_url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwyMzK9PgT3_eHEMj7n1x-xFb2KAWxLM_BSA&s",
    categories: ["힙합"],
    date: "2025-09-20",
    created_at: new Date("2025-09-10T15:00:00Z"),
  },
  {
    id: 5,
    address: "대구시 중구 동성로",
    title: "어쿠스틱 라이브",
    posting_image_url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwyMzK9PgT3_eHEMj7n1x-xFb2KAWxLM_BSA&s",
    categories: ["어쿠스틱"],
    date: "2025-09-25",
    created_at: new Date("2025-09-12T08:45:00Z"),
  },
];
