import React, { useState, useMemo } from "react";
import { useBottomSheet } from "@hooks/useBottomSheet";
import { ArtistCardGrid } from "./components";
import { Filter } from "@components/Filter";
import type { ArtistFilterType } from "./types";
import ArtistFilterSheet from "./components/ArtistFilterSheet";
import { useArtistsQuery } from "@queries/artists";
import * as S from "./index.styles";
import { useGlobalLoading } from "@hooks/useGlobalLoading";

const defaultFilter: ArtistFilterType = {
  regions: [],
  eventTypes: [],
  payRange: [0, 1000],
  freeOnly: false,
};

const Artists: React.FC = () => {
  const { data, isLoading } = useArtistsQuery();
  useGlobalLoading(isLoading, "공연 예술가 목록을 불러오는 중입니다...");

  const sheet = useBottomSheet(false);
  const [filter, setFilter] = useState<ArtistFilterType>(defaultFilter);

  const isActive = useMemo(() => {
    const base = defaultFilter;

    const hasRegions = filter.regions.length > 0;
    const hasEvents = filter.eventTypes.length > 0;
    const payChanged =
      filter.payRange[0] !== base.payRange[0] ||
      filter.payRange[1] !== base.payRange[1] ||
      filter.freeOnly !== base.freeOnly;

    return hasRegions || hasEvents || payChanged;
  }, [filter]);

  const handleReset = () => setFilter(defaultFilter);
  const handleApply = () => {
    sheet.close();
  };

  return (
    <>
      <S.FilterSection>
        <Filter isActive={!!isActive} onClick={sheet.open} />
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
        <ArtistCardGrid artist={data ?? []} />
      </S.Container>
    </>
  );
};

export default Artists;
