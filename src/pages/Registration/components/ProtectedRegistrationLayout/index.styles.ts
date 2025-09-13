import styled from "@emotion/styled";

export const Container = styled.div`
  max-width: 500px;
  width: 100%;
  flex: 1;
`;

export const ContentContainer = styled.div`
  width: 100%;
  padding: 20px;
  margin-top: 60px;
  margin-bottom: 60px;
`;

export const Stepper = styled.ol`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 0 auto;
  gap: 8px;
  list-style: none;
  margin-bottom: 20px;
`;

export const Step = styled.li`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border-radius: ${({ theme }) => theme.radius.pill};
  height: 32px;

  &[data-active="true"] {
    border-color: ${({ theme }) => theme.palette.sky[500]};
    background: ${({ theme }) => theme.palette.sky[500]};
    color: ${({ theme }) => theme.color.text.inverse};
    padding: 0 12px;
  }
`;

export const StepNum = styled.span`
  ${({ theme }) => theme.typography.buttonSm};
`;

export const StepLabel = styled.span`
  ${({ theme }) => theme.typography.buttonSm};
`;

export const StepNumOnly = styled.span`
  ${({ theme }) => theme.typography.buttonSm};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) => theme.color.background.muted};
  color: ${({ theme }) => theme.color.text.inverse};
  font-weight: 700;
`;
