import type { AnnouncementDetailType } from "@models/announcement/announcement.dto";

export const mockAnnouncements: AnnouncementDetailType[] = [
  {
    id: 1,
    space: "홍대 라이브홀",
    space_id: 101,
    title: "인디밴드 공연 공고",
    description:
      "홍대 라이브홀에서 인디밴드 공연을 개최합니다. 많은 지원 바랍니다.",
    posting_image_url: [
      "https://example.com/images/posting1-1.jpg",
      "https://example.com/images/posting1-2.jpg",
    ],
    categories: ["락", "인디"],
    price_type: "paid",
    price_amount: 200000,
    date: new Date("2025-10-10"),
    address: "서울 마포구 와우산로 10",
    created_at: new Date("2025-09-15T12:00:00Z"),
  },
  {
    id: 2,
    space: "강남 아트홀",
    space_id: 102,
    title: "재즈 콘서트 모집",
    description:
      "강남 아트홀에서 열리는 재즈 콘서트에 참여할 연주자를 모집합니다.",
    posting_image_url: ["https://example.com/images/posting2-1.jpg"],
    categories: ["재즈"],
    price_type: "negotiable",
    date: new Date("2025-11-05"),
    address: "서울 강남구 테헤란로 50",
    created_at: new Date("2025-09-14T15:30:00Z"),
  },
];
