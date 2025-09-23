import styled from "@emotion/styled";

export const ItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
  border-radius: 8px;
  width: 100%;
  background: ${({ theme }) => theme.color.background.surface};
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
`;

export const Left = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Type = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.color.text.primary};
`;

export const Date = styled.span`
  ${({ theme }) => theme.typography.body4}
  color: ${({ theme }) => theme.color.text.secondary};
  margin-top: 4px;
`;

export const Amount = styled.span<{ $isEarn: boolean }>`
  ${({ theme }) => theme.typography.h2};
  color: ${({ $isEarn, theme }) =>
    $isEarn ? theme.palette.blue[600] : theme.palette.red[500]};
`;
