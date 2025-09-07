import styled from "@emotion/styled";

export const Container = styled.div`
  background-color: ${({ theme }) => theme.color.background.surface};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  border-radius: 10px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 12px;
  cursor: pointer;
`;

export const Image = styled.img`
  aspect-ratio: 1 / 1;
  border-radius: 8px;
  object-fit: cover;
  display: block;
  width: 100%;
`;

export const TitleText = styled.span`
  ${({ theme }) => theme.typography.h3};
  color: ${({ theme }) => theme.color.text.primary};
`;

export const IconContentContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  position: relative;
`;

export const ContentText = styled.p`
  ${({ theme }) => theme.typography.body4}
  color: ${({ theme }) => theme.color.text.secondary};
`;

export const RightSlot = styled.div`
  position: absolute;
  right: 0px;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  width: 100%;
  box-sizing: border-box;
`;
