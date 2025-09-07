import React, { useState, useMemo } from "react";
import { useBottomSheet } from "@hooks/useBottomSheet";
import { SpaceCardGrid } from "./components";
import { Filter } from "@components/Filter";
import SpaceFilterSheet from "./components/SpaceFilterSheet";
import * as S from "./index.styles";
import type { SpaceFilterType } from "./types";

const defaultFilter: SpaceFilterType = {
  regions: [],
  eventTypes: [],
  equipments: [],
};

export const Spaces: React.FC = () => {
  const sheet = useBottomSheet(false);
  const [filter, setFilter] = useState<SpaceFilterType>(defaultFilter);

  const isActive = useMemo(
    () =>
      filter.regions.length ||
      filter.eventTypes.length ||
      filter.equipments.length,
    [filter]
  );

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
        <SpaceFilterSheet
          isOpen={sheet.isOpen}
          onClose={sheet.close}
          value={filter}
          onChange={setFilter}
          onReset={handleReset}
          onApply={handleApply}
        />
        <SpaceCardGrid />
      </S.Container>
    </>
  );
};
