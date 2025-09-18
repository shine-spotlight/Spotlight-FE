import React from "react";
import * as S from "./index.styles";
import type { ProposalsTab } from "../../types";

type Props = {
  value: ProposalsTab;
  onChange: (next: ProposalsTab) => void;
};

export const ProposalsTabs: React.FC<Props> = ({ value, onChange }) => {
  return (
    <S.Tabs>
      <S.TabButton
        data-active={value === "received" ? "true" : "false"}
        onClick={() => onChange("received")}
      >
        받은 제안서
      </S.TabButton>
      <S.TabButton
        data-active={value === "sent" ? "true" : "false"}
        onClick={() => onChange("sent")}
      >
        보낸 제안서
      </S.TabButton>
    </S.Tabs>
  );
};
