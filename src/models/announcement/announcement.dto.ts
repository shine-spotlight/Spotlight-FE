export type AnnouncementDetailType = {
  id: number;
  space: string;
  space_id: number;
  title: string;
  description: string;
  posting_image_url: string[];
  categories: string[];
  price_type: "negotiable" | "paid";
  price_amount?: number;
  date: Date;
  address?: string;
  created_at: Date;
};

// API 응답 타입들
export type AnnouncementListResponse = AnnouncementDetailType[];
