import styled from "@emotion/styled";

export const CardContainer = styled.button`
  background: ${({ theme }) => theme.gradient.white};
  border-radius: ${({ theme }) => theme.radius.lg};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  padding: 20px 32px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 4px 4px 14px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: scale(0.96);
    box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.2) inset;
  }

  &:focus {
    outline-offset: 4px;
  }
`;

export const Label = styled.span`
  ${({ theme }) => theme.typography.h2};
  color: ${({ theme }) => theme.palette.white};
`;
