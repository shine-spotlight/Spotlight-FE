import React from "react";
import * as S from "./index.styles";
import {
  PlaceIcon,
  CategoryIcon,
  StarEmptyIcon,
  StarFillIcon,
  PeopleIcon,
  DescriptionIcon,
} from "@assets/svg/common";

type IconKind = "place" | "category" | "people" | "description";

type Variant = "vertical" | "horizontal";

const iconMap: Record<IconKind, React.FC<React.SVGProps<SVGSVGElement>>> = {
  place: PlaceIcon,
  category: CategoryIcon,
  people: PeopleIcon,
  description: DescriptionIcon,
};

type RootProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: Variant;
  thumbCol?: number;
};

function Root({
  children,
  onClick,
  variant = "vertical",
  thumbCol = 200,
}: RootProps) {
  if (variant === "horizontal") {
    return (
      <S.WideContainer
        onClick={onClick}
        data-variant="horizontal"
        style={{ gridTemplateColumns: `${thumbCol}px 1fr` }}
      >
        {children}
      </S.WideContainer>
    );
  }
  return (
    <S.Container onClick={onClick} data-variant="vertical">
      {children}
    </S.Container>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return <S.Grid>{children}</S.Grid>;
}

function Image({ src, alt = "이미지" }: { src: string; alt?: string }) {
  const defaultImageUrl = "/defaultImage.png";
  const [imgSrc, setImgSrc] = React.useState(src || defaultImageUrl);
  return (
    <S.Image
      src={imgSrc}
      alt={alt}
      onError={() => {
        if (imgSrc !== defaultImageUrl) {
          setImgSrc(defaultImageUrl);
        }
      }}
    />
  );
}

function Title({ children }: { children: React.ReactNode }) {
  return <S.TitleText>{children}</S.TitleText>;
}

function IconContent({
  type,
  children,
}: {
  type: IconKind;
  children: React.ReactNode;
}) {
  const Icon = iconMap[type];
  return (
    <S.IconContentContainer>
      <Icon width={16} height={16} />
      <S.ContentText>{children}</S.ContentText>
    </S.IconContentContainer>
  );
}

function Content({ children }: { children: React.ReactNode }) {
  return <S.ContentContainer>{children}</S.ContentContainer>;
}

function StarButton({
  isStar,
  onToggle,
  disabled,
}: {
  isStar: boolean;
  onToggle: () => void;
  disabled?: boolean;
}) {
  const Icon = isStar ? StarFillIcon : StarEmptyIcon;
  return (
    <S.RightSlot>
      <button
        type="button"
        aria-pressed={isStar}
        disabled={disabled}
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        style={{
          background: "transparent",
          border: 0,
          padding: 0,
          cursor: disabled ? "not-allowed" : "pointer",
        }}
      >
        <Icon width={21} height={21} />
      </button>
    </S.RightSlot>
  );
}

function RightBadge({ is_accepted }: { is_accepted: boolean | null }) {
  if (is_accepted == null) {
    return null;
  }

  const label = is_accepted ? "수락 완료" : "거절 완료";

  return <S.Badge $is_accepted={is_accepted}>{label}</S.Badge>;
}

export const Card = Object.assign(Root, {
  Grid,
  Image,
  Title,
  Content,
  IconContent,
  RightBadge,
  StarButton,
});
