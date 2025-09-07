export type ArtistFilterType = {
  regions: { sido: string; sgg?: string }[];
  eventTypes: string[];
  payRange: [number, number];
  freeOnly: boolean;
};
