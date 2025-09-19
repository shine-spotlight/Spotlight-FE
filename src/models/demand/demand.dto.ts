// API 응답용 타입 (DTO에서 변환된 후)
export type DemandForecastItem = {
  month: string; // "2024-02-01" 형식
  forecast: number | null;
  yhatLower: number | null;
  yhatUpper: number | null;
};

export type DemandForecastResponse = {
  region: string;
  genre: string;
  age_group: number;
  gender: string;
  as_of: string; // "2025-09-01" 형식
  items: DemandForecastItem[];
};

type Period = {
  start_month: string; // "YYYY-MM-01"
  end_month: string; // "YYYY-MM-01"
};

export type DemandRecommendationByGenreResponse = {
  pivot: "by_genre";
  region: null;
  genre: string;
  period: Period;
  top_n: number;
  results: Array<{
    region: string;
    total_orders: number;
  }>;
};

export type DemandRecommendationByRegionResponse = {
  pivot: "by_region";
  region: string;
  genre: null;
  period: Period;
  top_n: number;
  results: Array<{
    genre: string;
    total_orders: number;
  }>;
};

// 최종 유니온
export type DemandRecommendationResponse =
  | DemandRecommendationByGenreResponse
  | DemandRecommendationByRegionResponse;
