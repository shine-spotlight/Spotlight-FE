import { sendRequest, createUrl } from "@apis/api";
import { demandInstance } from "@apis/instance";
import type {
  DemandForecastRequest,
  DemandRecommendationRequest,
} from "../../models/demand/demand.type";
import type {
  DemandForecastResponse,
  DemandRecommendationResponse,
} from "@models/demand/demand.dto";

const sanitizeAll = (v?: string | null): string | undefined =>
  v && v !== "(ALL)" ? v : undefined;

export function getDemandForecast(
  params: DemandForecastRequest
): Promise<DemandForecastResponse> {
  const url = createUrl("/forecast/", {
    region: params.region ? params.region : undefined,
    genre: params.genre ? params.genre : undefined,
    age_group: params.ageGroup !== -1 ? params.ageGroup : undefined,
    gender: params.gender !== -1 ? params.gender : undefined,
    as_of: params.asOf,
  });

  return sendRequest<DemandForecastResponse>(demandInstance, "GET", url);
}

export function getDemandRecommendation(
  params: DemandRecommendationRequest
): Promise<DemandRecommendationResponse> {
  const url = createUrl("/recommendation/", {
    region: sanitizeAll(params.region),
    genre: sanitizeAll(params.genre),
  });
  return sendRequest<DemandRecommendationResponse>(demandInstance, "GET", url);
}
