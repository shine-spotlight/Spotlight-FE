import styled from "@emotion/styled";

export const ChipsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin: 12px 0 12px;
`;

export const Chip = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  ${({ theme }) => theme.typography.buttonSm}
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) => theme.color.background.surface};
  border: 1px solid ${({ theme }) => theme.color.border.focus};
  color: ${({ theme }) => theme.color.brand.solid};
`;

export const PickerPane = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr;
  height: 250px;
  border-top: 1px solid ${({ theme }) => theme.color.border.strong};
  border-bottom: 1px solid ${({ theme }) => theme.color.border.strong};
  overflow: hidden;
`;

export const SidoCol = styled.div`
  background: ${({ theme }) => theme.color.background.subtle};
  border-right: 1px solid ${({ theme }) => theme.color.border.strong};
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;

  /* 스크롤바 숨기기 */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE, Edge */
  &::-webkit-scrollbar {
    display: none;
  } /* Chrome, Safari */
`;

export const SidoItem = styled.button`
  width: 100%;
  text-align: left;
  padding: 16px;
  border: none;
  background: transparent;
  cursor: pointer;
  color: ${({ theme }) => theme.color.text.secondary};
  ${({ theme }) => theme.typography.body4}

  &[data-active="true"] {
    background: ${({ theme }) => theme.color.background.surface};
    color: ${({ theme }) => theme.color.text.primary};
    font-weight: 600;
  }
`;

export const SggCol = styled.div`
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  /* 스크롤바 숨기기 */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE, Edge */
  &::-webkit-scrollbar {
    display: none;
  } /* Chrome, Safari */
`;

export const SggItem = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: left;
  padding: 16px;
  border: none;
  background: transparent;
  cursor: pointer;
  color: ${({ theme }) => theme.color.text.secondary};
  ${({ theme }) => theme.typography.body4}
  &[data-checked="true"] {
    color: ${({ theme }) => theme.color.text.primary};
    font-weight: 600;
  }
`;

export const Check = styled.span`
  color: ${({ theme }) => theme.color.brand.solid};
  font-weight: 700;
`;
