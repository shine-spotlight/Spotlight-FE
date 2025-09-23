import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.color.background.infoSubtle};
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 100px;
`;

export const Title = styled.h3`
  ${({ theme }) => theme.typography.h2}
`;

export const TitleContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const Points = styled.p`
  font-size: 30px;
  font-weight: 700;
  text-align: right;
  color: ${({ theme }) => theme.color.brand.solid};
`;

export const Button = styled.button`
  cursor: pointer;
  padding: 4px 8px;
  border-radius: ${({ theme }) => theme.radius.xs};
  background-color: ${({ theme }) => theme.color.background.surface};
  border: 1px solid ${({ theme }) => theme.color.brand.solid};
  :hover {
    background-color: ${({ theme }) => theme.color.background.subtle};
    transition: 0.3s;
  }
  ${({ theme }) => theme.typography.buttonSm};
  color: ${({ theme }) => theme.color.brand.solid};
`;
