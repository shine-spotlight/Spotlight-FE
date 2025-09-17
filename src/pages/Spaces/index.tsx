import React, { useState, useMemo } from "react";
import { useBottomSheet } from "@hooks/useBottomSheet";
import { SpaceCardGrid } from "./components";
import { Filter } from "@components/Filter";
import { useSpacesQuery } from "@queries/spaces";
import SpaceFilterSheet from "./components/SpaceFilterSheet";
import * as S from "./index.styles";
import type { SpaceFilterType } from "./types";
import { useGlobalLoading } from "@hooks/useGlobalLoading";

const defaultFilter: SpaceFilterType = {
  regions: [],
  eventTypes: [],
  equipments: [],
};

const Spaces: React.FC = () => {
  const { data, isLoading } = useSpacesQuery();
  useGlobalLoading(isLoading, "공간 목록을 불러오는 중입니다...");

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

        <SpaceCardGrid data={data ?? []} />
      </S.Container>
    </>
  );
};

export default Spaces;
