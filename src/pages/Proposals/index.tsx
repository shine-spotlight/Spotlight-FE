import React, { useMemo, useState } from "react";
import * as S from "./index.styles";
import { ProposalCardCol, ProposalsTabs, StatusFilter } from "./components";
import { STATUS_FILTERS } from "./constants";
import type { ProposalsTab, StatusFilterType } from "./types";
import { filterSuggestionByStatusLabel } from "./utils/filterByStatusLabel";
import { useSuggestionsOverview } from "@queries/suggestions";

const Proposals: React.FC = () => {
  const [tab, setTab] = useState<ProposalsTab>("received");
  const [statusFilter, setStatusFilter] = useState<StatusFilterType>("전체");

  const { sent, received } = useSuggestionsOverview();

  const baseList = tab === "sent" ? sent : received;
  const filteredList = useMemo(
    () => filterSuggestionByStatusLabel(baseList, statusFilter),
    [baseList, statusFilter]
  );

  return (
    <>
      <ProposalsTabs value={tab} onChange={setTab} />
      <S.Page>
        <StatusFilter
          data={STATUS_FILTERS}
          value={statusFilter}
          onChange={setStatusFilter}
        />
        <ProposalCardCol items={filteredList} onItemClick={() => {}} />
      </S.Page>
    </>
  );
};

export default Proposals;
