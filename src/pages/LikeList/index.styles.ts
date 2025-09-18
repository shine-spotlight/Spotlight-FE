import styled from "@emotion/styled";

export const Container = styled.div`
  padding: 20px;
  padding-top: 80px;
  width: 100%;
  height: 100dvh;
`;

export const Empty = styled.div`
  padding: 48px 0;
  text-align: center;
  color: ${({ theme }) => theme.color.text.secondary};
`;
