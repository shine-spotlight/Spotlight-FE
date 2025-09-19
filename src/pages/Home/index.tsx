import React from "react";
import * as S from "./index.styles";
import {
  HomeBanner,
  FilterSection,
  DemandChart,
  RecommendationSection,
  HomeSkeleton,
} from "./components";
import { genreValueToLabel, regionValueToLabel } from "./utils/valueToLabel";
import { useHomeData } from "./hooks/useHomeData";

const Home: React.FC = () => {
  const { filters, data, isLoading, handleFiltersChange } = useHomeData();

  return (
    <S.HomeContainer>
      <HomeBanner />
      <FilterSection filters={filters} onFiltersChange={handleFiltersChange} />
      {isLoading ? (
        <HomeSkeleton />
      ) : data ? (
        <>
          <DemandChart data={data.chartData} />
          <RecommendationSection
            data={data.recommendations}
            selectedRegion={regionValueToLabel(filters.region)}
            selectedCategory={genreValueToLabel(filters.genre)}
          />
        </>
      ) : (
        <div style={{ textAlign: "center", padding: "40px" }}>
          <p>데이터를 불러올 수 없습니다.</p>
        </div>
      )}
    </S.HomeContainer>
  );
};

export default Home;
