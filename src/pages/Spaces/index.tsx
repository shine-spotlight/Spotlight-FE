import React, { useState, useMemo } from "react";
import { useBottomSheet } from "@hooks/useBottomSheet";
import { SpaceCardGrid } from "./components";
import { Filter } from "@components/Filter";
import { useSpacesQuery } from "@queries/spaces";
import SpaceFilterSheet from "./components/SpaceFilterSheet";
import * as S from "./index.styles";
import { useGlobalLoading } from "@hooks/useGlobalLoading";
import type { SpaceFilter } from "@models/space/space.type";
import { useFilteredSpacesQuery } from "@queries/spaces";
import { isSpaceFilterActive } from "@utils/isFilterActive";

const defaultFilter: SpaceFilter = {
  region: [],
  categories: [],
  capMin: 0,
  capMax: 1000,
};

const Spaces: React.FC = () => {
  const sheet = useBottomSheet(false);

  const [filter, setFilter] = useState<SpaceFilter>(defaultFilter);
  const [appliedFilter, setAppliedFilter] =
    useState<SpaceFilter>(defaultFilter);

  const activeNow = useMemo(() => isSpaceFilterActive(filter), [filter]);
  const appliedActive = useMemo(
    () => isSpaceFilterActive(appliedFilter),
    [appliedFilter]
  );

  // 분기: 적용된 필터가 있으면 필터 쿼리만, 없으면 기본 쿼리만 켜기
  const unfilteredQ = useSpacesQuery({ enabled: !appliedActive });
  const filteredQ = useFilteredSpacesQuery(appliedFilter, {
    enabled: appliedActive,
  });

  const list = appliedActive ? filteredQ.data : unfilteredQ.data;
  const loading = appliedActive ? filteredQ.isLoading : unfilteredQ.isLoading;

  useGlobalLoading(loading, "공연 예술가 목록을 불러오는 중입니다...");

  const handleReset = () => {
    setFilter(defaultFilter);
    setAppliedFilter(defaultFilter);
    sheet.close();
  };

  const handleApply = () => {
    setAppliedFilter(filter);
    sheet.close();
  };

  return (
    <>
      <S.FilterSection>
        <Filter isActive={activeNow} onClick={sheet.open} />
        <S.Sort>최근 등록순</S.Sort>
      </S.FilterSection>
      <S.Container>
        <SpaceFilterSheet
          isOpen={sheet.isOpen}
          onClose={sheet.close}
          value={filter}
          onChange={setFilter}
          onReset={handleReset}
          onApply={handleApply}
        />

        <SpaceCardGrid data={list ?? []} />
      </S.Container>
    </>
  );
};

export default Spaces;
