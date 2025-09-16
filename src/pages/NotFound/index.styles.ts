import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  height: 100dvh;
  background: ${({ theme }) => theme.color.background.surface};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 400px;
  width: 100%;
  gap: 32px;
`;

export const ErrorSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

export const ErrorCode = styled.div`
  ${({ theme }) => theme.typography.h1};
  font-size: 72px;
  font-weight: 800;
  line-height: 1;
  color: ${({ theme }) => theme.palette.sky[600]};
  margin-bottom: 8px;
`;

export const Title = styled.h1`
  ${({ theme }) => theme.typography.h2};
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.color.text.primary};
  margin: 0;
`;

export const Description = styled.p`
  ${({ theme }) => theme.typography.body2};
  font-size: 16px;
  color: ${({ theme }) => theme.color.text.secondary};
  opacity: 0.8;
  margin: 0;
  line-height: 1.5;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  max-width: 280px;
`;

export const PrimaryButton = styled.button`
  width: 100%;
  padding: 16px 24px;
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 2px solid ${({ theme }) => theme.palette.sky[500]};
  background: ${({ theme }) => theme.palette.sky[500]};
  color: ${({ theme }) => theme.palette.white};
  ${({ theme }) => theme.typography.buttonLg};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const SecondaryButton = styled.button`
  width: 100%;
  padding: 16px 24px;
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 2px solid ${({ theme }) => theme.palette.sky[500]};
  background: transparent;
  color: ${({ theme }) => theme.palette.sky[600]};
  ${({ theme }) => theme.typography.buttonLg};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;
