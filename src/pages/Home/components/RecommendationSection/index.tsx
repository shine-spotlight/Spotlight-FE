import React from "react";
import styled from "@emotion/styled";
import { RecommendationCard } from "../../components";
import type { RecommendationData } from "../../types";

interface RecommendationSectionProps {
  data: RecommendationData;
  selectedRegion: string;
  selectedCategory: string;
}

export const RecommendationSection: React.FC<RecommendationSectionProps> = ({
  data,
  selectedRegion,
  selectedCategory,
}) => {
  const regionTitle = selectedRegion ? (
    <>
      <b>{selectedRegion}</b>
      <br />
      공연 추천 장르
    </>
  ) : (
    "공연 추천 장르"
  );

  const categoryTitle = selectedCategory ? (
    <>
      <b>{selectedCategory}</b> <br />
      공연 추천 지역
    </>
  ) : (
    "공연 추천 지역"
  );

  return (
    <RecommendationSectionContainer>
      <RecommendationCard
        title={categoryTitle}
        items={data.regions}
        color="blue"
      />
      <RecommendationCard
        title={regionTitle}
        items={data.genres}
        color="pink"
      />
    </RecommendationSectionContainer>
  );
};

const RecommendationSectionContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
`;
