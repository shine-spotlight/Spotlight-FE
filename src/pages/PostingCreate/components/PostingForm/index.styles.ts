import styled from "@emotion/styled";

export const SectionTitle = styled.h3`
  ${({ theme }) => theme.typography.h3};
  color: ${({ theme }) => theme.color.text.primary};
  margin-bottom: 20px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 20px;
  padding-top: 80px;
  margin-bottom: 40px;
  background-color: ${({ theme }) => theme.color.background.app};
`;

export const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.palette.red[500]};
  margin-top: 10px;
  ${({ theme }) => theme.typography.body4}
`;
