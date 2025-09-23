import * as S from "./index.styles";
import type { PointTransaction } from "@models/point/point.type";
import { formatDateYMD } from "@utils/formatDate";

interface HistoryItemProps {
  item: PointTransaction;
}

export const HistoryItem = ({ item }: HistoryItemProps) => {
  const isEarn = item.transactionType === "charge";

  return (
    <S.ItemContainer>
      <S.Left>
        <S.Type>포인트 {isEarn ? "충전" : "사용"}</S.Type>
        <S.Date>{formatDateYMD(new Date(item.createdAt))}</S.Date>
      </S.Left>
      <S.Amount $isEarn={isEarn}>
        {isEarn
          ? `+${item.amount.toLocaleString()}`
          : `-${item.amount.toLocaleString()}`}
        P
      </S.Amount>
    </S.ItemContainer>
  );
};
