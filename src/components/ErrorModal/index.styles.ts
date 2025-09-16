import styled from "@emotion/styled";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99999;
  padding: 20px;
`;

export const Modal = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  width: 100%;
  max-height: 80vh;
  overflow: hidden;
  animation: modalSlideIn 0.2s ease-out;

  @keyframes modalSlideIn {
    from {
      opacity: 0;
      transform: translateY(-20px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`;

export const Header = styled.div`
  padding: 24px 24px 16px;
  border-bottom: 1px solid #f0f0f0;
`;

export const Title = styled.h2`
  margin: 0;
  ${({ theme }) => theme.typography.h2};
  color: ${({ theme }) => theme.color.text.primary};
  text-align: center;
`;

export const Content = styled.div`
  padding: 20px 24px;
`;

export const Message = styled.p`
  margin: 0;
  ${({ theme }) => theme.typography.body3}
  text-align: center;
  white-space: pre-line;
  color: ${({ theme }) => theme.color.text.secondary};
`;

export const Footer = styled.div`
  padding: 16px 24px 24px;
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
