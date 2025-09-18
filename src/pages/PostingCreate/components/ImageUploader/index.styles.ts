import styled from "@emotion/styled";

export const ImageUploadArea = styled.div`
  border: 2px dashed ${({ theme }) => theme.color.border.default};
  border-radius: ${({ theme }) => theme.radius.sm};
  padding: 40px 20px;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.color.border.focus};
  }
`;

export const ImageUploadInput = styled.input`
  display: none;
`;

export const ImagePreview = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  border-radius: ${({ theme }) => theme.radius.sm};
  overflow: hidden;
  background-color: ${({ theme }) => theme.color.background.muted};
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const RemoveImageButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: rgba(0, 0, 0, 0.1);
  border: 1px solid ${({ theme }) => theme.color.border.strong};
  color: 1px solid ${({ theme }) => theme.color.border.strong};
  border-radius: 40px;
  padding: 4px 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;
