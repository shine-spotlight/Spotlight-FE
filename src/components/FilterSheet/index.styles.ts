import styled from "@emotion/styled";

export const SectionTitle = styled.h3`
  ${({ theme }) => theme.typography.h3};
  color: ${({ theme }) => theme.color.brand.solid};
  margin-bottom: 12px;
`;

export const ChipsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

export const OutlineButton = styled.button`
  ${({ theme }) => theme.typography.buttonLg};
  flex: 1;
  padding: 16px 0;
  border-radius: ${({ theme }) => theme.radius.pill};
  border: 1px solid ${({ theme }) => theme.color.border.default};
  background: ${({ theme }) => theme.color.background.surface};
  color: ${({ theme }) => theme.color.text.primary};
  cursor: pointer;
`;

export const SolidButton = styled.button`
  ${({ theme }) => theme.typography.buttonLg};
  flex: 2;
  padding: 16px 0;
  border-radius: ${({ theme }) => theme.radius.pill};
  border: none;
  background: ${({ theme }) => theme.palette.sky[500]};
  color: ${({ theme }) => theme.color.text.inverse};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.palette.sky[600]};
  }
`;

export const PayText = styled.p`
  ${({ theme }) => theme.typography.body2};
  color: ${({ theme }) => theme.color.text.primary};
  margin-bottom: 8px;
`;

export const Wrap = styled.div`
  width: 100%;
`;

export const Label = styled.div`
  ${({ theme }) => theme.typography.body2};
  color: ${({ theme }) => theme.color.text.primary};
  margin-bottom: 12px;
`;

export const Track = styled.div`
  position: relative;
  height: 10px;
  display: flex;
  align-items: center;
  border-radius: 9999px;
  padding: 4px 0;

  --track-bg: ${({ theme }) => theme.color.border.subtle};
  --track-fill: ${({ theme }) => theme.palette.sky[500]};
`;
export const Input = styled.input`
  appearance: none;
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  height: 4px;
  margin-top: -16px;
  outline: none;
  background: transparent;
  pointer-events: none;

  &::-webkit-slider-runnable-track {
    height: 4px;
    background: transparent;
  }
  &::-moz-range-track {
    height: 4px;
    background: transparent;
  }

  /* 핸들 */
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    pointer-events: auto; /* 핸들은 드래그 가능 */
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${({ theme }) => theme.color.brand.solid};
    cursor: grab;
  }
  &::-webkit-slider-thumb:active {
    cursor: grabbing;
  }
  &::-moz-range-thumb {
    pointer-events: auto;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${({ theme }) => theme.color.brand.solid};
    cursor: grab;
  }
  &[data-upper] {
    z-index: 2;
  }
`;

export const FreeCheckbox = styled.div`
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
