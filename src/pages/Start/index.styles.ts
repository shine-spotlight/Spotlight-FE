import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  height: 100dvh;
  background: ${({ theme }) => theme.gradient.background};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 120px;
  gap: 20px;
`;

export const LogoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span {
    ${({ theme }) => theme.typography.h2}
    color: ${({ theme }) => theme.palette.white};
  }

  svg {
    flex-shrink: 0;
    width: 210px;
    height: 70px;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;
