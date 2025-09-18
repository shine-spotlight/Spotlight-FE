type ArtistRef = { id: number; name: string };
type SpaceRef = { id: number; placeName: string };

// Suggestion 내부 모델
export type Suggestion = {
  id: number;
  artist: number | null;
  artistCategories?: string[];
  spaceCategories?: string[];
  spaceAddress?: string;
  space: number | null;
  artistObj: ArtistRef | null;
  spaceObj: SpaceRef | null;
  posting?: number | null;
  message: string;
  isFreeAllowed: boolean | null;
  isAccepted: boolean | null;
  isRead: boolean;
  receiverPhone?: string;
  opponentImageUrl: string;
  createdAt: string;
  updatedAt: string;
};

export type SuggestionPhoneNumber = {
  artistPhone: string;
  spacePhone: string;
};
