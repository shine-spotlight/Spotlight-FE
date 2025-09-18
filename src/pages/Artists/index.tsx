import React, { useState, useMemo } from "react";
import { useBottomSheet } from "@hooks/useBottomSheet";
import { ArtistCardGrid } from "./components";
import { Filter } from "@components/Filter";
import ArtistFilterSheet from "./components/ArtistFilterSheet";
import { useArtistsQuery } from "@queries/artists";
import * as S from "./index.styles";
import { useGlobalLoading } from "@hooks/useGlobalLoading";
import type { ArtistFilter } from "@models/artist/artist.type";
import { useFilteredArtistsQuery } from "@queries/artists";
import { isArtistFilterActive } from "@utils/isFilterActive";

const defaultFilter: ArtistFilter = {
  region: [],
  categories: [],
  payMin: 0,
  payMax: 1000,
};

const Artists: React.FC = () => {
  const sheet = useBottomSheet(false);

  const [filter, setFilter] = useState<ArtistFilter>(defaultFilter);
  const [appliedFilter, setAppliedFilter] =
    useState<ArtistFilter>(defaultFilter);

  const activeNow = useMemo(() => isArtistFilterActive(filter), [filter]);
  const appliedActive = useMemo(
    () => isArtistFilterActive(appliedFilter),
    [appliedFilter]
  );

  // 분기: 적용된 필터가 있으면 필터 쿼리만, 없으면 기본 쿼리만 켜기
  const unfilteredQ = useArtistsQuery({ enabled: !appliedActive });
  const filteredQ = useFilteredArtistsQuery(appliedFilter, {
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
        <ArtistFilterSheet
          isOpen={sheet.isOpen}
          onClose={sheet.close}
          value={filter}
          onChange={setFilter}
          onReset={handleReset}
          onApply={handleApply}
        />
        <ArtistCardGrid artist={list ?? []} />
      </S.Container>
    </>
  );
};

export default Artists;
