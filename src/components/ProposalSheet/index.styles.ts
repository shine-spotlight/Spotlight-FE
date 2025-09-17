import styled from "@emotion/styled";

export const SectionTitle = styled.h3`
  ${({ theme }) => theme.typography.h3};
  margin: 0 0 12px;
  color: ${({ theme }) => theme.color.text.primary};
`;

export const Tips = styled.p`
  ${({ theme }) => theme.typography.body3};
  color: ${({ theme }) => theme.color.text.secondary};
  line-height: 1.6;
  word-break: keep-all;
`;

export const TextareaWrapper = styled.div`
  border: 1px solid ${({ theme }) => theme?.palette?.gray?.[300] ?? "#dfe3e7"};
  border-radius: 12px;
  padding: 12px;
  background: ${({ theme }) => theme?.color?.background?.surface ?? "#fff"};
`;

export const Textarea = styled.textarea`
  width: 100%;
  min-height: 160px;
  border: none;
  outline: none;
  resize: vertical;
  background: transparent;
  font: inherit;
  color: ${({ theme }) => theme.color.text.primary};
  ${({ theme }) => theme.typography.body3};
  word-break: keep-all;

  ::placeholder {
    color: ${({ theme }) => theme.color.text.secondary};
  }
`;

export const FooterBar = styled.div`
  width: 100%;
`;

export const PrimaryButton = styled.button`
  width: 100%;
  padding: 16px 0;
  border-radius: ${({ theme }) => theme.radius.sm};
  border: none;
  cursor: pointer;
  ${({ theme }) => theme.typography.buttonLg};

  background: ${({ theme }) => theme.palette.sky[500]};
  color: ${({ theme }) => theme.color.text.inverse};

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`;
