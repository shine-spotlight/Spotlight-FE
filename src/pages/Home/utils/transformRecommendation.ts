import type { DemandRecommendationResponse } from "@models/demand/demand.dto";
import type { RecommendationData } from "../types";

// 피벗별 타입 가드
function isByGenre(
  res: DemandRecommendationResponse
): res is DemandRecommendationResponse & {
  pivot: "by_genre";
  results: Array<{ region: string; total_orders: number }>;
} {
  return res.pivot === "by_genre";
}

function isByRegion(
  res: DemandRecommendationResponse
): res is DemandRecommendationResponse & {
  pivot: "by_region";
  results: Array<{ genre: string; total_orders: number }>;
} {
  return res.pivot === "by_region";
}

export const transformRecommendation = (
  res: DemandRecommendationResponse
): RecommendationData => {
  const regions = isByGenre(res)
    ? res.results
        .filter((r) => typeof r.region === "string" && r.region.length > 0)
        .map((r, idx) => ({
          rank: idx + 1,
          name: r.region, // type: string
        }))
    : [];

  const genres = isByRegion(res)
    ? res.results
        .filter((r) => typeof r.genre === "string" && r.genre.length > 0)
        .map((r, idx) => ({
          rank: idx + 1,
          name: r.genre,
        }))
    : [];

  return { regions, genres };
};
