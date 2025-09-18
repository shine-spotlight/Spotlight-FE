import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 30px;
`;

export const Title = styled.h3`
  ${({ theme }) => theme.typography.h2};
  color: ${({ theme }) => theme.color.text.primary};
`;

export const CreateAt = styled.span`
  ${({ theme }) => theme.typography.body3};
  color: ${({ theme }) => theme.color.text.secondary};
`;

export const BriefProfile = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  width: 100%;
  min-width: 0;
  align-items: center;
  gap: 10px;
`;

export const BriefContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: flex-start;
`;

export const GotoButton = styled.button`
  white-space: nowrap;
  ${({ theme }) => theme.typography.buttonSm};
  padding: 2px 8px;
  border-radius: ${({ theme }) => theme.radius.xs};
  background-color: ${({ theme }) => theme.color.background.surface};
  border: 1px solid ${({ theme }) => theme.color.border.focus};
  color: ${({ theme }) => theme.color.brand.solid};
`;
