import styled from "@emotion/styled";

export const Container = styled.div`
  padding: 80px 20px 20px;
  margin: 0 auto;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.color.background.app};
  width: 100%;
`;

export const ErrorText = styled.div`
  text-align: center;
  padding: 40px 0;
  ${({ theme }) => theme.typography.body3};
  color: ${({ theme }) => theme.palette.red[500]};
`;

export const ProfileSection = styled.section`
  margin-bottom: 32px;
`;

export const DescriptionSection = styled.section`
  margin-bottom: 32px;
`;

export const SectionTitle = styled.h3`
  ${({ theme }) => theme.typography.h3};
  color: ${({ theme }) => theme.color.text.primary};
  margin-bottom: 20px;
`;

export const DetailButton = styled.button`
  background-color: ${({ theme }) => theme.color.background.surface};
  color: ${({ theme }) => theme.palette.sky[500]};
  ${({ theme }) => theme.typography.buttonSm}
  border: 1px solid ${({ theme }) => theme.color.brand.solid};
  border-radius: ${({ theme }) => theme.radius.sm};
  padding: 4px 10px;
  ${({ theme }) => theme.typography.buttonSm};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.palette.sky[100]};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const DescriptionTextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 10px;
  background-color: ${({ theme }) => theme.color.background.surface};
  border: 1px solid ${({ theme }) => theme.color.border.default};
  border-radius: ${({ theme }) => theme.radius.xs};
  ${({ theme }) => theme.typography.body2};
  color: ${({ theme }) => theme.color.text.primary};
  resize: vertical;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.palette.sky[500]};
  }

  &::placeholder {
    color: ${({ theme }) => theme.color.text.placeholder};
  }
`;

export const Row = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
