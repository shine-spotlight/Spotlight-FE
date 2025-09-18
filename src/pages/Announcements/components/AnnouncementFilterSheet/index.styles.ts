import styled from "@emotion/styled";

export const Label = styled.p`
  margin-top: 10px;
  ${({ theme }) => theme.typography.body4};
  color: ${({ theme }) => theme.palette.red[500]};
`;
