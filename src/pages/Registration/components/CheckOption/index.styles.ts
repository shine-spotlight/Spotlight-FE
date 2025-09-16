import styled from "@emotion/styled";

export const Checkbox = styled.div`
  margin-top: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;

  input[type="checkbox"] {
    width: 16px;
    height: 16px;
    cursor: pointer;
  }

  label {
    ${({ theme }) => theme.typography.body3};
    color: ${({ theme }) => theme.color.text.secondary};
    cursor: pointer;
  }
`;
