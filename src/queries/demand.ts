import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { getDemandForecast, getDemandRecommendation } from "@apis/demand";
import type {
  DemandForecast,
  DemandForecastRequest,
  DemandRecommendation,
  DemandRecommendationRequest,
} from "../models/demand/demand.type";
import type {
  DemandForecastResponse,
  DemandRecommendationResponse,
} from "../models/demand/demand.dto";
import { toCamelCase } from "@utils/caseConvert";
import { transformRecommendation } from "@pages/Home/utils/transformRecommendation";

export const demandKeys = {
  all: ["demand"] as const,
  forecast: (params: DemandForecastRequest) =>
    [...demandKeys.all, "forecast", params] as const,
  recommendationByRegion: (region: string) =>
    [...demandKeys.all, "recommendation", "by_region", region] as const,
  recommendationByGenre: (genre: string) =>
    [...demandKeys.all, "recommendation", "by_genre", genre] as const,
};

export const useDemandForecastQuery = (
  params: DemandForecastRequest,
  enabled = true
) => {
  return useQuery<DemandForecast, Error>({
    queryKey: demandKeys.forecast(params),
    queryFn: async () => {
      const res = await getDemandForecast(params);
      return toCamelCase<DemandForecastResponse, DemandForecast>(res);
    },
    enabled,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

// 지역 기준 추천 (지역 → 추천 장르)
export function useDemandRecommendationByRegion(region?: string | null) {
  const enabled = !!region && region !== "(ALL)";

  return useQuery<DemandRecommendation>({
    queryKey: demandKeys.recommendationByRegion(region ?? ""),
    enabled,
    queryFn: async () => {
      const res = await getDemandRecommendation({ region, genre: null });
      return toCamelCase<DemandRecommendationResponse, DemandRecommendation>(
        res
      );
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

// 장르 기준 추천 (장르 → 추천 지역)
export function useDemandRecommendationByGenre(genre?: string | null) {
  const enabled = !!genre && genre !== "(ALL)";

  return useQuery<DemandRecommendation>({
    queryKey: demandKeys.recommendationByGenre(genre ?? ""),
    enabled,
    queryFn: async () => {
      const res = await getDemandRecommendation({ region: null, genre });
      return toCamelCase<DemandRecommendationResponse, DemandRecommendation>(
        res
      );
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

export function useDemandRecommendationCombined(
  params: DemandRecommendationRequest
) {
  const hasRegion = !!params.region && params.region !== "(ALL)";
  const hasGenre = !!params.genre && params.genre !== "(ALL)";

  const qRegion = useDemandRecommendationByRegion(
    hasRegion ? params.region! : null
  );
  const qGenre = useDemandRecommendationByGenre(
    hasGenre ? params.genre! : null
  );

  const isLoading =
    (qRegion.isLoading && hasRegion) || (qGenre.isLoading && hasGenre);
  const isFetching =
    (qRegion.isFetching && hasRegion) || (qGenre.isFetching && hasGenre);
  const isError =
    (qRegion.isError && hasRegion) || (qGenre.isError && hasGenre);
  const error = qRegion.error ?? qGenre.error ?? null;

  // transformRecommendation은 pivot에 따라 regions/genres를 채우므로
  // 각각을 변환 후 합쳐서 반환
  const data = useMemo(() => {
    const fromRegion = qRegion.data
      ? transformRecommendation(toCamelCase(qRegion.data))
      : { regions: [], genres: [] };
    const fromGenre = qGenre.data
      ? transformRecommendation(toCamelCase(qGenre.data))
      : { regions: [], genres: [] };

    return {
      regions: fromGenre.regions, // 장르 기준 → 추천 "지역" 리스트
      genres: fromRegion.genres, // 지역 기준 → 추천 "장르" 리스트
    };
  }, [qRegion.data, qGenre.data]);

  return {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    // 개별 원본 쿼리도 필요하면 노출
    byRegion: qRegion.data,
    byGenre: qGenre.data,
    refetchAll: async () => {
      await Promise.all([
        hasRegion ? qRegion.refetch() : Promise.resolve(),
        hasGenre ? qGenre.refetch() : Promise.resolve(),
      ]);
    },
  };
}
