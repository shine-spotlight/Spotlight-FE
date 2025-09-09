import styled from "@emotion/styled";

export const Page = styled.div`
  padding: 16px;
  width: 100%;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  padding-top: 50px;
`;

export const Header = styled.h1`
  ${({ theme }) => theme.typography.h1};
  color: ${({ theme }) => theme.color.text.primary};
  margin: 8px 0 12px;
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const RowCard = styled.div`
  background: ${({ theme }) => theme.color.background.surface};
  border-radius: 16px;
  box-shadow: ${({ theme }) => theme.shadow.sm};
  overflow: hidden;
`;

export const RowHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
`;

export const InlineIcon = styled.svg`
  flex: 0 0 auto;
`;

export const SubText = styled.span`
  ${({ theme }) => theme.typography.body4};
  color: ${({ theme }) => theme.color.text.secondary};
`;

export const Desc = styled.p`
  ${({ theme }) => theme.typography.body4};
  color: ${({ theme }) => theme.color.text.secondary};
  margin-top: 6px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

/** 상태 뱃지 */
export const Badge = styled.span<{ $tone: "default" | "primary" | "danger" }>`
  ${({ theme }) => theme.typography.buttonSm};
  margin-left: auto;
  padding: 6px 10px;
  border-radius: ${({ theme }) => theme.radius.pill};
  border: 1px solid
    ${({ theme, $tone }) =>
      $tone === "primary"
        ? theme.color.border.focus
        : $tone === "danger"
        ? theme.color.border.strong
        : theme.color.border.default};
  color: ${({ theme, $tone }) =>
    $tone === "primary"
      ? theme.color.brand.solid
      : $tone === "danger"
      ? theme.palette.red[500]
      : theme.color.text.secondary};
  background: ${({ theme, $tone }) =>
    $tone === "primary"
      ? theme.color.brand.tint
      : $tone === "danger"
      ? theme.palette.red[500]
      : theme.color.background.surface};
`;
