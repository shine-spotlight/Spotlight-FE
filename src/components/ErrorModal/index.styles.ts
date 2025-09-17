import styled from "@emotion/styled";

export const Content = styled.div`
  padding: 0;
`;

export const Message = styled.p`
  margin: 0;
  ${({ theme }) => theme.typography.body3}
  text-align: center;
  white-space: pre-line;
  color: ${({ theme }) => theme.color.text.secondary};
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
