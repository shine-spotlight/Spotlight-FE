import type { StatusFilterType } from "../types";
import type { Suggestion } from "@models/suggestion/suggestion.type";
import { STATUS_LABEL_TO_VALUE } from "../constants";

// 기존 ProposalType용 필터링 함수
export function filterByStatusLabel<T extends { is_accepted: boolean | null }>(
  list: T[],
  statusLabel: StatusFilterType
): T[] {
  if (statusLabel === "전체") return list;
  const target = STATUS_LABEL_TO_VALUE[statusLabel];
  return list.filter((item) => item.is_accepted === target);
}

// SuggestionProposal용 필터링 함수
export function filterSuggestionByStatusLabel(
  list: Suggestion[],
  statusLabel: StatusFilterType
): Suggestion[] {
  if (statusLabel === "전체") return list;

  return list.filter((item) => {
    switch (statusLabel) {
      case "대기":
        return item.isAccepted === null;
      case "수락":
        return item.isAccepted === true;
      case "거절":
        return item.isAccepted === false;
      default:
        return true;
    }
  });
}
