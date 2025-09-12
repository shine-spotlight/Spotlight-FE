import styled from "@emotion/styled";

export const SectionTitle = styled.h3`
  ${({ theme }) => theme.typography.h3};
  color: ${({ theme }) => theme.color.brand.solid};
  margin-bottom: 12px;
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

export const DateInput = styled.input`
  display: flex;
  width: 100%;
  justify-content: space-between;
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

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    pointer-events: auto;
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

export const DateField = styled.div`
  position: relative;
  width: 100%;
`;

export const DateInputWithPadding = styled.input`
  width: 100%;
  padding: 10px 12px;
  padding-left: 40px;
  border: 1px solid ${({ theme }) => theme.color.border.default};
  border-radius: ${({ theme }) => theme.radius.xs};
  color: ${({ theme }) => theme.color.text.primary};

  /* 값이 있을 때 강조 색상 */
  &[data-has-value="true"] {
    border-color: ${({ theme }) => theme.palette.sky[500]};
    color: ${({ theme }) => theme.palette.sky[500]};
    font-weight: 500;
  }

  &::-webkit-calendar-picker-indicator {
    opacity: 0;
    pointer-events: none;
  }
`;

export const CalendarBtn = styled.button<{
  $size?: number;
}>`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  width: ${(p) => p.$size ?? 16}px;
  height: ${(p) => p.$size ?? 16}px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 0;
  background: transparent;
  cursor: pointer;
  padding: 0;
  svg {
    width: 100%;
    height: 100%;
    fill: ${({ theme }) => theme.color.text.disabled};
  }

  [data-has-value="true"] ~ & svg {
    fill: ${({ theme }) => theme.palette.sky[500]};
  }
`;
