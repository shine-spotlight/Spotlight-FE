// Suggestion 내부 모델
export type Suggestion = {
  id: number;
  senderType: "artist" | "space";
  artist: number | null;
  space: number | null;
  artistObj: string;
  spaceObj: string;
  posting: number | null;
  message: string;
  isFreeAllowed: boolean | null;
  isAccepted: boolean | null;
  isRead: boolean;
  receiverPhone: string;
  createdAt: string;
  updatedAt: string;
};
