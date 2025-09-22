import { useState, useMemo } from "react";
import type { FilterState, HomePageData } from "../types";
import {
  useDemandForecastQuery,
  useDemandRecommendationCombined,
} from "@queries/demand";
import { convertToFirstDayOfMonth, getDefaultDate } from "@utils/dateUtils";

const initialFilters: FilterState = {
  region: "(ALL)",
  genre: "(ALL)",
  age: -1,
  gender: -1,
  asOf: getDefaultDate(),
};

export const useHomeData = () => {
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  // API 요청 파라미터
  const forecastParams = useMemo(
    () => ({
      region: filters.region,
      genre: filters.genre,
      ageGroup: filters.age,
      gender: filters.gender,
      asOf: convertToFirstDayOfMonth(filters.asOf),
    }),
    [filters]
  );

  // 수요 예측 데이터
  const { data: rawForecast, isLoading: isForecastLoading } =
    useDemandForecastQuery(forecastParams);

  const recommendationParams = useMemo(
    () => ({
      region: filters.region !== "(ALL)" ? filters.region : "서울특별시",
      genre: filters.genre !== "(ALL)" ? filters.genre : "대중무용",
    }),
    [filters.region, filters.genre]
  );

  const { data: rawRecommendation, isLoading: isRecommendationLoading } =
    useDemandRecommendationCombined(recommendationParams);

  // API 응답을 홈 페이지 데이터 형식으로 변환
  const data: HomePageData | undefined = useMemo(() => {
    if (!rawForecast) return undefined;

    const chartData = rawForecast.items.map((item) => ({
      month: item.month,
      forecast: item.forecast,
      yhatLower: null,
      yhatUpper: null,
    }));

    const genres = rawRecommendation.genres;
    const regions = rawRecommendation.regions;
    const recommendations = { genres: genres, regions: regions };

    return {
      chartData,
      recommendations,
    };
  }, [rawForecast, rawRecommendation]);

  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  return {
    filters,
    data,
    isLoading: isForecastLoading || isRecommendationLoading,
    handleFiltersChange,
  };
};
