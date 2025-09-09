export type ArtistFilterType = {
  regions: { sido: string; sgg?: string }[];
  eventTypes: string[];
  payRange: [number, number];
  freeOnly: boolean;
};

export type ArtistItemType = {
  id: number;
  name: string;
  isStar: boolean;
  img: string;
  place: string[];
  category: string[];
};
