import type { ArtistFilter } from "@models/artist/artist.type";
import type { SpaceFilter } from "@models/space/space.type";
import type { PostingFilter } from "@models/posting/posting.type";

export const isArtistFilterActive = (f: ArtistFilter) => {
  const hasRegion = (f.region?.length ?? 0) > 0;
  const hasCategory = (f.categories?.length ?? 0) > 0;
  const hasPay =
    (f.payMin != null && f.payMin > 0) || (f.payMax != null && f.payMax < 1000);

  return hasRegion || hasCategory || hasPay;
};

export const isSpaceFilterActive = (f: SpaceFilter) => {
  const hasRegion = (f.region?.length ?? 0) > 0;
  const hasCategory = (f.categories?.length ?? 0) > 0;
  const hasCapacity =
    (f.capMin != null && f.capMin > 0) || (f.capMax != null && f.capMax < 1000);

  return hasRegion || hasCategory || hasCapacity;
};

export const isPostingFilterActive = (f?: PostingFilter) => {
  if (!f) return false;
  const hasRegion = (f.region?.length ?? 0) > 0;
  const hasCategory = (f.categories?.length ?? 0) > 0;
  const hasDate = !!f.dateFrom || !!f.dateTo;
  return hasRegion || hasCategory || hasDate;
};
