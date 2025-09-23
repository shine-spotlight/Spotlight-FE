import styled from "@emotion/styled";

export const Container = styled.div`
  padding: 20px;
  width: 100%;
`;

export const Row = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;
export const Title = styled.p`
  color: ${({ theme }) => theme.color.text.primary};
  ${({ theme }) => theme.typography.h3};
  margin-bottom: 20px;
`;

export const Sort = styled.p`
  color: ${({ theme }) => theme.color.text.disabled};
  ${({ theme }) => theme.typography.body3}
`;

export const Empty = styled.div`
  padding: 48px 0;
  text-align: center;
  color: ${({ theme }) => theme.color.text.secondary};
`;

export const HistoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 16px;
`;
