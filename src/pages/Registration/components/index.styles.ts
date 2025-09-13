import styled from "@emotion/styled";

export const Container = styled.div`
  max-width: 500px;
  margin: 0 auto;
  width: 100%;
`;

export const Headline = styled.h2`
  ${({ theme }) => theme.typography.h2};
  color: ${({ theme }) => theme.color.text.primary};
  margin-bottom: 30px;
`;

export const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 4px;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.palette.sky[400]};
  background: transparent;
  color: ${({ theme }) => theme.color.text.primary};
  ${({ theme }) => theme.typography.body3}
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.palette.sky[500]};
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  padding: 8px;
  border: none;
  ${({ theme }) => theme.typography.body3}
  border-radius: ${({ theme }) => theme.radius.xs};
  border: 1px solid ${({ theme }) => theme.palette.sky[400]};
  background: transparent;
  color: ${({ theme }) => theme.color.text.primary};
  resize: none;
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.palette.sky[500]};
  }
`;

export const AddButton = styled.button`
  ${({ theme }) => theme.typography.buttonSm};
  padding: 2px 16px;
  border-radius: ${({ theme }) => theme.radius.pill};
  white-space: nowrap;
  background: ${({ theme }) => theme.color.brand.solid};
  cursor: pointer;
  color: ${({ theme }) => theme.palette.white};

  &:hover {
    background: ${({ theme }) => theme.palette.sky[600]};
  }
`;

export const Pill = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border-radius: ${({ theme }) => theme.radius.pill};
  border: 1px solid ${({ theme }) => theme.color.border.default};
  background: ${({ theme }) => theme.color.background.surface};
  a {
    ${({ theme }) => theme.typography.buttonSm};
    color: ${({ theme }) => theme.color.text.primary};
    text-decoration: none;
    max-width: 220px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

export const LinkButton = styled.button`
  margin-left: 6px;
  border: none;
  background: none;
  cursor: pointer;
  ${({ theme }) => theme.typography.buttonMd}
`;

export const OutlineButton = styled.button`
  height: 36px;
  padding: 0 14px;
  border-radius: 18px;
  border: 1px solid ${({ theme }) => theme.color.brand.solid};
  background: transparent;
  color: ${({ theme }) => theme.color.brand.solid};
  font-size: 13px;
  font-weight: 700;

  &:disabled {
    border-color: ${({ theme }) => theme.color.brand.disabled};
    color: ${({ theme }) => theme.color.brand.disabled};
  }
`;

export const HelperAction = styled.button`
  margin-top: 8px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: none;
  color: ${({ theme }) => theme.palette.gray[300]};
  ${({ theme }) => theme.typography.body4};
  padding: 0;
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.color.border.default};
  margin: 16px 0;
`;

export const UploaderRow = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

export const Checkbox = styled.div`
  margin-top: 12px;
  display: flex;
  align-items: center;
  gap: 6px;

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

export const SubTitle = styled.span`
  ${({ theme }) => theme.typography.buttonMd};
  color: ${({ theme }) => theme.color.text.secondary};
`;
