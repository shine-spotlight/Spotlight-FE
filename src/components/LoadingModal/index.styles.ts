import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  gap: 1.5rem;
`;

export const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid ${({ theme }) => theme.color.border.default};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

export const Message = styled.p`
  ${({ theme }) => theme.typography.body3}
  color: ${({ theme }) => theme.color.text.secondary};
  text-align: center;
  margin: 0;
`;
