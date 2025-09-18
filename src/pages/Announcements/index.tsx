import React, { useState, useMemo } from "react";
import { useBottomSheet } from "@hooks/useBottomSheet";
import { Filter } from "@components/Filter";
import { AnnouncementFilterSheet, AnnouncementCard } from "./components";
import * as S from "./index.styles";
import { usePostingListQuery } from "@queries/postings";
import { useGlobalLoading } from "@hooks/useGlobalLoading";
import type { PostingFilter } from "@models/posting/posting.type";
import { isPostingFilterActive } from "@utils/isFilterActive";

const defaultFilter: PostingFilter = {
  region: [],
  categories: [],
  dateFrom: "",
  dateTo: "",
};

const Announcements: React.FC = () => {
  const sheet = useBottomSheet(false);
  const [filter, setFilter] = useState<PostingFilter>(defaultFilter);
  const [appliedFilter, setAppliedFilter] =
    useState<PostingFilter>(defaultFilter);
  const activeNow = useMemo(() => isPostingFilterActive(filter), [filter]);

  // 적용된 UI필터를 API필터로 변환 → 쿼리 훅에 전달
  const { data, isLoading } = usePostingListQuery(appliedFilter);

  useGlobalLoading(isLoading, "공연 공고 목록을 불러오는 중입니다...");

  const handleReset = () => {
    setFilter(defaultFilter);
    setAppliedFilter(defaultFilter);
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
        <AnnouncementFilterSheet
          isOpen={sheet.isOpen}
          onClose={sheet.close}
          value={filter}
          onChange={setFilter}
          onReset={handleReset}
          onApply={handleApply}
        />
        <S.List>
          {data &&
            data.map((item, index) => {
              return <AnnouncementCard key={index} announcement={item} />;
            })}
        </S.List>
      </S.Container>
    </>
  );
};

export default Announcements;
