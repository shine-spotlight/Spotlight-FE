export type ProposalType = {
  id: number;
  name: string;
  members?: number;
  category: string[];
  description: string;
  image: string;
  address?: string;
  is_accepted: boolean | null;
};

export type StatusFilterType = "전체" | "대기 중" | "수락 완료" | "거절";

export type ProposalsTab = "sent" | "received";
