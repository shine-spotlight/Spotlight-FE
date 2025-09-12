import React, { useRef } from "react";
import * as S from "./index.styles";

type Props = {
  value?: string | null;
  onChange: (next: string | null) => void;
  size?: number;
  disabled?: boolean;
};

export default function ProfileAvatarPicker({
  value,
  onChange,
  size = 220,
  disabled = false,
}: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const openPicker = () => {
    if (disabled) return;
    inputRef.current?.click();
  };

  const handleFile = async (file: File) => {
    // 간단하게 dataURL 미리보기 (업로드 API가 있으면 그 결과 URL을 onChange로 올려주세요)
    const reader = new FileReader();
    reader.onload = () => {
      onChange((reader.result as string) ?? null);
    };
    reader.readAsDataURL(file);
  };

  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const f = e.target.files?.[0];
    if (f) handleFile(f);
    e.currentTarget.value = "";
  };

  const stop = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <S.CircleContainer>
      <S.Circle
        $size={size}
        onClick={openPicker}
        data-disabled={disabled ? "true" : "false"}
      >
        {value ? (
          <>
            <S.Preview src={value} alt="프로필 이미지" />
            <S.Overlay className="overlay">
              <S.OverlayActions>
                <S.OverlayBtn
                  type="button"
                  onClick={(e) => {
                    stop(e);
                    openPicker();
                  }}
                  onTouchStart={(e) => {
                    stop(e);
                    openPicker();
                  }}
                >
                  변경
                </S.OverlayBtn>
              </S.OverlayActions>
            </S.Overlay>
          </>
        ) : (
          <S.Empty>
            <S.EmptyPlus>＋</S.EmptyPlus>
            <S.EmptyText>이미지 추가</S.EmptyText>
          </S.Empty>
        )}
      </S.Circle>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        style={{ display: "none" }}
        onChange={onInputChange}
      />
    </S.CircleContainer>
  );
}
