import styled from "@emotion/styled";

export const Container = styled.div`
  padding: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ProfileCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: ${({ theme }) => theme.color.background.surface};
  border-radius: 14px;
  width: 100%;
`;

export const DefaultProfileSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  width: 100%;
`;

export const Avatar = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 14px;
  object-fit: cover;
`;

export const Meta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;

export const RoleBadge = styled.span`
  display: inline-block;
  padding: 2px 8px;
  ${({ theme }) => theme.typography.body4}
  border-radius: ${({ theme }) => theme.radius.xs};
  width: fit-content;
  background: ${({ theme }) => theme.color.background.surface};

  &[data-role="artist"] {
    color: ${({ theme }) => theme.palette.blue[500]};
    border: 1px solid ${({ theme }) => theme.palette.blue[500]};
  }
  &[data-role="space"] {
    color: ${({ theme }) => theme.palette.red[500]};
    border: 1px solid ${({ theme }) => theme.palette.red[500]};
  }
`;
export const Name = styled.div`
  ${({ theme }) => theme.typography.h3};
  color: ${({ theme }) => theme.color.text.primary};
`;

export const EditProfileButton = styled.button`
  width: 100%;
  padding: 8px 12px;
  border-radius: ${({ theme }) => theme.radius.sm};
  ${({ theme }) => theme.typography.buttonMd};
  border: 1px solid ${({ theme }) => theme.color.border.default};
  background: ${({ theme }) => theme.color.background.surface};
  color: ${({ theme }) => theme.color.text.secondary};
`;

export const PointCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;
  align-items: center;
  background: ${({ theme }) => theme.color.background.infoSubtle};
  border: 1px solid ${({ theme }) => theme.palette.sky[300]};
  border-radius: ${({ theme }) => theme.radius.sm};
  padding: 16px;
`;

export const PointRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const PointBrand = styled.div`
  font-weight: 700;
  ${({ theme }) => theme.typography.h2};
  color: ${({ theme }) => theme.color.text.primary};
`;

export const PointRight = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const PointValue = styled.div`
  font-weight: 700;
  ${({ theme }) => theme.typography.h2};
  color: ${({ theme }) => theme.color.brand.solid};
`;

export const Line = styled.hr`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.palette.sky[300]};
  border: none;
`;

export const PointActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  gap: 6px;
  & > button {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
    border: none;
    background: transparent;
    color: ${({ theme }) => theme.color.brand.solidHover};
    cursor: pointer;
    ${({ theme }) => theme.typography.buttonMd};
  }
  color: ${({ theme }) => theme.palette.sky[300]};
`;

export const Empty = styled.div`
  padding: 24px;
  color: ${({ theme }) => theme.color.text.secondary};
`;

export const MenuList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
