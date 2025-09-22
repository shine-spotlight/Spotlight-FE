import styled from "@emotion/styled";

export const CardContainer = styled.div<{ $color: "blue" | "pink" }>`
  flex: 1;
  background: ${({ $color, theme }) =>
    $color === "blue" ? theme.palette.blue[50] : theme.palette.red[50]};
  border-radius: 12px;
  padding: 20px;
  min-height: 160px;
`;

export const CardTitle = styled.h3<{ $color: "blue" | "pink" }>`
  ${({ theme }) => theme.typography.h3};
  color: ${({ $color, theme }) =>
    $color === "blue" ? theme.palette.blue[500] : theme.palette.red[500]};
  margin-bottom: 10px;
  text-align: center;
`;

export const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const RankBadge = styled.div<{ $color: "blue" | "pink" }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${({ $color }) => ($color === "blue" ? "#3B82F6" : "#EC4899")};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  flex-shrink: 0;
`;

export const ItemName = styled.span`
  ${({ theme }) => theme.typography.buttonMd};
  color: ${({ theme }) => theme.color.text.primary};
`;

export const Empty = styled.span`
  ${({ theme }) => theme.typography.buttonMd};
  text-align: center;
  padding: 20px 0;
  color: ${({ theme }) => theme.color.text.disabled};
`;
