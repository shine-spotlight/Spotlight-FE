import React from "react";
import * as S from "./index.styles";

interface ImageUploaderProps {
  imagePreview: string | null;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: () => void;
}

export default function ImageUploader({
  imagePreview,
  onImageChange,
  onRemoveImage,
}: ImageUploaderProps) {
  return (
    <>
      {imagePreview ? (
        <S.ImagePreview>
          <S.Image src={imagePreview} alt="업로드된 이미지" />
          <S.RemoveImageButton onClick={onRemoveImage}>
            삭제
          </S.RemoveImageButton>
        </S.ImagePreview>
      ) : (
        <S.ImageUploadArea
          onClick={() => document.getElementById("image-upload")?.click()}
        >
          <div>+</div>
          <div>이미지를 업로드해주세요</div>
          <S.ImageUploadInput
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={onImageChange}
          />
        </S.ImageUploadArea>
      )}
    </>
  );
}
