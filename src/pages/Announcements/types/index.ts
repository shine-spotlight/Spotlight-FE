export type AnnouncementItemType = {
  id: number;
  address: string;
  title: string;
  posting_image_url: string;
  categories: string[];
  date: string;
  created_at: Date;
};

export type AnnouncementDetailType = {
  id: number;
  space: number;
  title: string;
  description: string;
  posting_image_url: string;
  categories: string[];
  price_type: "negotiable" | "paid";
  price_amount: number | null;
  date: string;
  address: string;
  created_at: Date;
};

export type AnnouncementFilterType = {
  regions: { sido: string; sgg?: string }[];
  eventTypes: string[];
  date: string | null;
};
