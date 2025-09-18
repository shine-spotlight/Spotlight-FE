import type { Suggestion } from "@models/suggestion/suggestion.type";

export const getOpponentDisplayName = (s: Suggestion): string => {
  if (s.spaceObj) {
    return typeof s.spaceObj === "string" ? s.spaceObj : s.spaceObj.placeName;
  }
  if (s.artistObj) {
    return typeof s.artistObj === "string" ? s.artistObj : s.artistObj.name;
  }
  return "";
};
