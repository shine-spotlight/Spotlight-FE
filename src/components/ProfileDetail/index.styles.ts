import styled from "@emotion/styled";

export const Wrap = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  gap: 20px;
  padding: 20px;
  margin-top: 60px;
  background: ${({ theme }) => theme.color.background.surface};
`;

export const Image = styled.img`
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.radius.sm};
  display: block;
`;

export const PosterImage = styled.img`
  width: 100%;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.radius.sm};
  display: block;
`;

export const Header = styled.header`
  position: relative;
  display: grid;
  gap: 10px;
  width: 100%;
`;

export const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  padding-right: 28px;
`;

export const Title = styled.h1`
  ${({ theme }) => theme.typography.h2};
  color: ${({ theme }) => theme.color.text.primary};
  margin: 0;
`;

export const Description = styled.p`
  ${({ theme }) => theme.typography.body3};
  color: ${({ theme }) => theme.color.text.secondary};
  margin: 0;
`;

export const Value = styled.div`
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  min-width: 0;
`;

export const SectionTitle = styled.h2`
  ${({ theme }) => theme.typography.h3};
  color: ${({ theme }) => theme.color.text.primary};
  margin: 0;
`;

export const Content = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  width: 100%;
  min-width: 0;
`;

export const SectionBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;

  > * {
    min-width: 0;
  }
`;

export const ContentText = styled.p`
  flex: 1 1 auto;
  width: 100%;
  min-width: 0;

  ${({ theme }) => theme.typography.body3};
  color: ${({ theme }) => theme.color.text.secondary};
`;

export const ContentTextA = styled.a`
  flex: 1 1 auto;
  min-width: 0;
  width: 100%;
  ${({ theme }) => theme.typography.body3};
  color: ${({ theme }) => theme.color.text.secondary};
`;

export const ContentList = styled.div`
  flex: 1 1 auto;
  min-width: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const LinkRow = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 10px;
  width: 100%;
  min-width: 0;
  overflow: hidden;
`;

export const IconRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 6px;
  flex: 0 0 auto;

  & > svg {
    width: 18px;
    height: 18px;
    display: block;
    flex: 0 0 18px;
    --lh: 20px;
    margin-top: calc((var(--lh) - 18px) / 2);
  }
`;

export const RowContent = styled.div`
  flex: 0 0 80px;
  ${({ theme }) => theme.typography.body3};
  color: ${({ theme }) => theme.color.text.secondary};
  line-height: 20px;
`;

export const RightSlot = styled.div`
  position: absolute;
  right: 0px;
`;

export const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const Tag = styled.span`
  ${({ theme }) => theme.typography.buttonSm};
  padding: 2px 8px;
  border-radius: ${({ theme }) => theme.radius.xs};
  border: 1px solid ${({ theme }) => theme.palette.blue[500]};
  color: ${({ theme }) => theme.palette.blue[500]};
  background: ${({ theme }) => theme.color.background.surface};
`;

export const RedTag = styled.span`
  ${({ theme }) => theme.typography.buttonSm};
  padding: 2px 8px;
  border-radius: ${({ theme }) => theme.radius.xs};
  border: 1px solid ${({ theme }) => theme.palette.red[500]};
  color: ${({ theme }) => theme.palette.red[500]};
  background: ${({ theme }) => theme.color.background.surface};
`;

export const LinkCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
  overflow: hidden;
`;

export const ShortcutButton = styled.button`
  border: 1px solid ${({ theme }) => theme.color.brand.solid};
  background-color: ${({ theme }) => theme.color.background.surface};
  color: ${({ theme }) => theme.color.brand.solid};
  ${({ theme }) => theme.typography.buttonSm};
  white-space: nowrap;
  padding: 2px 8px;
  flex-shrink: 0;
  border-radius: ${({ theme }) => theme.radius.xs};
  cursor: pointer;
`;
