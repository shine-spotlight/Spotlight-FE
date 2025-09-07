import React, { useState, useMemo } from "react";
import { useBottomSheet } from "@hooks/useBottomSheet";
import { ArtistCardGrid } from "./components";
import { Filter } from "@components/Filter";
import type { ArtistFilterType } from "./types";
import ArtistFilterSheet from "./components/ArtistFilterSheet";
import * as S from "./index.styles";

const defaultFilter: ArtistFilterType = {
  regions: [],
  eventTypes: [],
  payRange: [0, 1000000],
  freeOnly: false,
};

export const Artists: React.FC = () => {
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
        <ArtistCardGrid />
      </S.Container>
    </>
  );
};
