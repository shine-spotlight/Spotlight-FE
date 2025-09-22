import React from "react";
import * as S from "./index.styles";

interface RecommendationItem {
  rank: number;
  name: string;
}

interface RecommendationCardProps {
  title: React.ReactNode;
  items: RecommendationItem[];
  color: "blue" | "pink";
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  title,
  items,
  color,
}) => {
  const text = color === "blue" ? "장르" : "지역";
  return (
    <S.CardContainer $color={color}>
      <S.CardTitle $color={color}>{title}</S.CardTitle>
      <S.ItemList>
        {items.length == 0 && <S.Empty>특정 {text}을 선택하세요</S.Empty>}
        {items.map((item) => (
          <S.Item key={item.rank}>
            <S.RankBadge $color={color}>{item.rank}</S.RankBadge>
            <S.ItemName>{item.name}</S.ItemName>
          </S.Item>
        ))}
      </S.ItemList>
    </S.CardContainer>
  );
};
