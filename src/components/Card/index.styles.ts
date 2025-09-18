import styled from "@emotion/styled";

export const Container = styled.div`
  background-color: ${({ theme }) => theme.color.background.surface};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  border-radius: 10px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 16px;
  cursor: pointer;
  width: 100%;
`;

export const WideContainer = styled.div`
  background: ${({ theme }) => theme.color.background.surface};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  border-radius: 10px;
  padding: 12px;
  display: flex;
  flex-direction: row;
  gap: 16px;
  align-items: center;
  cursor: pointer;
  width: 100%;
  > *:last-child {
    min-width: 0;
    flex: 1 1 auto;
  }
`;

export const Image = styled.img`
  aspect-ratio: 1 / 1;
  border-radius: 8px;
  object-fit: cover;
  display: block;
  /* 기본: vertical 카드에서는 이미지가 가로를 꽉 채우도록 */
  [data-variant="vertical"] & {
    width: 100%;
    aspect-ratio: 1 / 1;
  }

  /* horizontal 카드에서는 작은 썸네일로 고정(좌측) */
  [data-variant="horizontal"] & {
    flex: 0 0 auto;
    width: 100px;
    height: 100px;
    aspect-ratio: auto;
  }
`;

export const TitleText = styled.span`
  ${({ theme }) => theme.typography.h3};
  color: ${({ theme }) => theme.color.text.primary};

  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const IconContentContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 8px;
  min-width: 0;
  flex: 1 1 auto;
  overflow: hidden;
  > svg {
    flex: 0 0 auto;
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  position: relative;
  width: 100%;
  min-width: 0;
`;

export const ContentText = styled.p`
  ${({ theme }) => theme.typography.body4}
  color: ${({ theme }) => theme.color.text.secondary};
  width: 100%;
  flex: 1 1 auto;
  margin: 0;
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const RightSlot = styled.div`
  position: absolute;
  right: 0px;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
  width: 100%;
  box-sizing: border-box;
`;

export const Badge = styled.span<{ $is_accepted: boolean }>`
  ${({ theme }) => theme.typography.buttonSm};
  padding: 2px 8px;
  border-radius: ${({ theme }) => theme.radius.xs};
  color: ${({ theme, $is_accepted }) =>
    $is_accepted ? theme.palette.blue[500] : theme.palette.red[500]};
  background: ${({ theme }) => theme.color.background.surface};
  border: 1px solid
    ${({ theme, $is_accepted }) =>
      $is_accepted ? theme.palette.blue[500] : theme.palette.red[500]};
  white-space: nowrap;
  position: absolute;
  right: 0px;
  top: 0px;
`;
