import React, { useMemo, useState } from "react";
import { useUserStore } from "@/stores/userStore";
import * as S from "./index.styles";
import type { UserRole } from "@types";
import { dummyArtistProposalData, dummySpaceProposalData } from "./data";
import { ProposalCardCol, ProposalsTabs, StatusFilter } from "./components";

import type { ProposalsTab, StatusFilterType } from "./types";
import { STATUS_FILTERS } from "./constants";
import { filterByStatusLabel } from "./utils/filterByStatusLabel";

export const Proposals: React.FC = () => {
  const { user } = useUserStore();
  const role: UserRole = (user?.role as UserRole) ?? "artist";

  const [tab, setTab] = useState<ProposalsTab>("received");

  const [statusFilter, setStatusFilter] = useState<StatusFilterType>("전체");

  const { sentList, receivedList } = useMemo(() => {
    if (role === "artist") {
      return {
        sentList: dummySpaceProposalData, // 아티스트가 보낸(공간에게)
        receivedList: dummyArtistProposalData, // 아티스트가 받은(공간으로부터)
      };
    }
    return {
      sentList: dummySpaceProposalData, // 공간이 보낸
      receivedList: dummyArtistProposalData, // 공간이 받은
    };
  }, [role]);

  const baseList = tab === "sent" ? sentList : receivedList;

  const filteredList = useMemo(
    () => filterByStatusLabel(baseList, statusFilter),
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
