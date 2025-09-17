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
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.h2`
  margin: 0;
  ${({ theme }) => theme.typography.h2};
  color: ${({ theme }) => theme.color.text.primary};
  text-align: center;
  flex: 1;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  transition: background-color 0.2s;
`;

export const CloseIcon = styled.span`
  font-size: 20px;
  color: ${({ theme }) => theme.color.text.secondary};
  line-height: 1;
`;

export const Content = styled.div`
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Footer = styled.div`
  padding: 16px;
  display: flex;
  justify-content: center;
  gap: 12px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid ${({ theme }) => theme.color.border.focus};
  border-radius: ${({ theme }) => theme.radius.md};
  ${({ theme }) => theme.typography.body3};
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: ${({ theme }) => theme.color.brand.solid};
  }

  &::placeholder {
    color: ${({ theme }) => theme.color.text.primary};
  }
`;

export const Message = styled.p`
  margin: 0;
  ${({ theme }) => theme.typography.body3}
  text-align: center;
  white-space: pre-line;
  color: ${({ theme }) => theme.color.text.secondary};
`;

export const SuccessIcon = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: ${({ theme }) => theme.color.brand.solid};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  font-size: 32px;
  color: white;
`;
