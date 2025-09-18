import styled from "@emotion/styled";

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const SuccessIcon = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: ${({ theme }) => theme.color.brand.solid};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  font-size: 32px;
  color: white;
  font-weight: bold;
`;

export const Message = styled.div`
  ${({ theme }) => theme.typography.body2};
  color: ${({ theme }) => theme.color.text.primary};
`;

export const Footer = styled.div`
  display: flex;
  justify-content: center;
`;

export const Button = styled.button`
  background: ${({ theme }) => theme.color.brand.solid};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.radius.pill};
  padding: 12px 24px;
  ${({ theme }) => theme.typography.buttonMd};
  cursor: pointer;
  transition: background-color 0.2s;
  min-width: 80px;

  &:hover {
    background: ${({ theme }) => theme.palette.sky[600]};
  }

  &:active {
    background: ${({ theme }) => theme.palette.sky[600]};
  }
`;
