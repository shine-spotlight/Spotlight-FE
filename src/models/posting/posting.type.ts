export type Posting = {
  id: number;
  space: string;
  spaceId: number;
  spaceAddress: string;
  title: string;
  description: string;
  postingImage?: File;
  postingImageUrl?: string;
  categories: string[];
  priceType: "negotiable" | "paid" | "free";
  priceAmount?: number;
  date: string;
  categoryNames: string[];
  createdAt: string;
};

// 작성 폼에서 쓰는 타입
export type PostingPost = {
  title: string;
  description: string;
  postingImage?: File | null;
  categories: string[];
  priceType: "negotiable" | "paid" | "free";
  priceAmount?: number;
  date: Date;
};
