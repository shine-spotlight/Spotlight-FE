import React, { useState, useMemo } from "react";
import { useBottomSheet } from "@hooks/useBottomSheet";
import { Filter } from "@components/Filter";
import type { AnnouncementFilterType } from "./types";
import { AnnouncementFilterSheet, AnnouncementCard } from "./components";
import { dummyAnnouncements } from "./datas";
import * as S from "./index.styles";

const defaultFilter: AnnouncementFilterType = {
  regions: [],
  eventTypes: [],
  date: null,
};

const Announcements: React.FC = () => {
  const sheet = useBottomSheet(false);
  const [filter, setFilter] = useState<AnnouncementFilterType>(defaultFilter);

  const isActive = useMemo(() => {
    const hasRegions = filter.regions.length > 0;
    const hasEvents = filter.eventTypes.length > 0;
    const hasDate = filter.date;

    return hasRegions || hasEvents || hasDate;
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
        <AnnouncementFilterSheet
          isOpen={sheet.isOpen}
          onClose={sheet.close}
          value={filter}
          onChange={setFilter}
          onReset={handleReset}
          onApply={handleApply}
        />
        <S.List>
          {dummyAnnouncements.map((item, index) => {
            return <AnnouncementCard key={index} announcement={item} />;
          })}
        </S.List>
      </S.Container>
    </>
  );
};

export default Announcements;
