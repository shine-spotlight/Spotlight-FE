import React, { useRef } from "react";
import * as S from "./index.styles";

type Props = {
  value: File | null;
  onChange: (file: File | null) => void;
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

  const handleFile = (file: File) => {
    onChange(file);
  };

  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const f = e.target.files?.[0];
    if (f) handleFile(f);
    e.currentTarget.value = "";
  };

  const handleClear = () => {
    onChange(null);
  };

  const stop = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // File 객체를 미리보기 URL로 변환
  const previewUrl = React.useMemo(() => {
    if (value instanceof File) {
      return URL.createObjectURL(value);
    }
    return null;
  }, [value]);

  // 컴포넌트 언마운트 시 URL 정리
  React.useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <S.CircleContainer>
      <S.Circle
        $size={size}
        onClick={openPicker}
        data-disabled={disabled ? "true" : "false"}
      >
        {previewUrl ? (
          <>
            <S.Preview src={previewUrl} alt="프로필 이미지" />
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
                <S.OverlayBtn
                  type="button"
                  onClick={(e) => {
                    stop(e);
                    handleClear();
                  }}
                  onTouchStart={(e) => {
                    stop(e);
                    handleClear();
                  }}
                >
                  삭제
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
        accept="image/png,image/jpeg"
        capture="environment"
        style={{ display: "none" }}
        onChange={onInputChange}
      />
    </S.CircleContainer>
  );
}
