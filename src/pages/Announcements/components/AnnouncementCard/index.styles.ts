import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.color.border.subtle};
  cursor: pointer;
`;

export const ImageContainer = styled.div`
  flex: 0 0 90px;
  width: 90px;
  height: 90px;
  border-radius: ${({ theme }) => theme.radius.sm};
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  width: 100%;
  gap: 4px;
  min-width: 0;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  min-width: 0;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-width: 0;
`;

export const Title = styled.h2`
  ${({ theme }) => theme.typography.h3};
  color: ${({ theme }) => theme.color.text.primary};
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
  flex: 1 1 auto;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  min-width: 0;
`;

export const ContentText = styled.span`
  ${({ theme }) => theme.typography.body3}
  color: ${({ theme }) => theme.color.text.primary};
  width: 100%;
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
  word-break: keep-all;
`;

export const Time = styled.span`
  ${({ theme }) => theme.typography.body4};
  color: ${({ theme }) => theme.color.text.secondary};
  flex: 0 0 auto;
`;
