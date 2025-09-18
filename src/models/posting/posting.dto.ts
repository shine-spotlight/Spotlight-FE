export type PostingDTO = {
  title: string;
  description: string;
  posting_image: File;
  categories: string[];
  price_type: "negotiable" | "paid" | "free";
  price_amount?: number;
  date: Date;
};

export type PostingPOSTRequest = PostingDTO;

export type PostingResponse = PostingDTO & {
  id: number;
  space: string;
  space_id: number;
  space_address: string;
  posting_image_url?: string;
  category_names: string;
  created_at: string;
};
export type PostingDetailResponse = PostingResponse;
export type PostingListResponse = PostingResponse[];
