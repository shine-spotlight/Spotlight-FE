import styled from "@emotion/styled";
import { KakaoLogo } from "@assets/svg/common";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding: 100px 20px 100px;
  min-height: 100vh;
  overflow: hidden;
  background: linear-gradient(168deg, #fff 20.43%, #c7eaff 100%);
`;

export const Title = styled.h1`
  ${({ theme }) => theme.typography.h3};
  color: ${({ theme }) => theme.color.text.primary};
  margin-bottom: 24px;
`;

export const Illustration = styled.div`
  width: 200px;
  height: 200px;
  margin-bottom: 40px;
  background: url("/images/kakao-verify-hero.png") no-repeat center/contain;
`;

export const KakaoButton = styled.button`
  width: 100%;
  height: 52px;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: #fee500;
  color: #371d1e;
  ${({ theme }) => theme.typography.buttonLg}
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:active {
    background: #fada0a;
  }
`;

export const KakaoIcon = styled(KakaoLogo)`
  width: 20px;
  height: 20px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
  width: 100%;
`;
