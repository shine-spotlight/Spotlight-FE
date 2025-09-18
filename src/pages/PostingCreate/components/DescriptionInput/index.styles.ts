import styled from "@emotion/styled";

export const TextArea = styled.textarea`
  padding: 12px 16px;
  border: 1px solid ${({ theme }) => theme.color.border.default};
  border-radius: ${({ theme }) => theme.radius.sm};
  font-size: 16px;
  color: ${({ theme }) => theme.color.text.primary};
  background-color: ${({ theme }) => theme.color.background.surface};
  min-height: 120px;
  resize: vertical;
  font-family: inherit;

  &::placeholder {
    color: ${({ theme }) => theme.color.text.placeholder};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.color.border.focus};
  }
`;
