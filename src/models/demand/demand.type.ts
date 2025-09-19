// API 요청용 타입
export type DemandForecastRequest = {
  region: string;
  genre: string;
  ageGroup: number;
  gender: number;
  asOf: string; // "2020-01-01" 형식
};

export type DemandForecast = {
  region: string;
  genre: string;
  ageGroup: number;
  gender: number;
  asOf: string; // "2025-09-01" 형식
  items: ChartDataPoint[];
};

// 홈 페이지에서 사용하는 필터 타입
export type DemandFilterState = {
  region: string;
  genre: string;
  age: number;
  gender: number;
  asOf: string;
};

// 홈 페이지에서 사용하는 차트 데이터 타입
export type ChartDataPoint = {
  month: string;
  forecast: number | null;
  yhatLower: number | null;
  yhatUpper: number | null;
};

// 홈 페이지에서 사용하는 추천 데이터 타입
export type RecommendationData = {
  regions: Array<{
    rank: number;
    name: string;
  }>;
  genres: Array<{
    rank: number;
    name: string;
  }>;
};

// 홈 페이지 전체 데이터 타입
export type HomePageData = {
  chartData: ChartDataPoint[];
  recommendations: RecommendationData;
};

export type DemandRecommendation = {
  pivot: "by_genre" | "by_region" | string;
  genre: string | null;
  period: {
    startMonth: string; // "YYYY-MM-01"
    endMonth: string; // "YYYY-MM-01"
  };
  topN: number;
  results: Array<{
    region: string;
    totalOrders: number;
  }>;
};

export type DemandRecommendationRequest = {
  region?: string | null;
  genre?: string | null;
};
