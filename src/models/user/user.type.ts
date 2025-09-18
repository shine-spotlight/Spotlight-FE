import type { ArtistProfile } from "../artist/artist.type";
import type { SpaceProfile } from "../space/space.type";

export type UserRoleType = "artist" | "space";

export type UserProfile = ArtistProfile | SpaceProfile;

// 타입가드
export const isArtistProfile = (p: UserProfile): p is ArtistProfile =>
  p.role === "artist";
export const isSpaceProfile = (p: UserProfile): p is SpaceProfile =>
  p.role === "space";
