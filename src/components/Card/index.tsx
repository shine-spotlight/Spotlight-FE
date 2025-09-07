import React from "react";
import * as S from "./index.styles";
import {
  PlaceIcon,
  CategoryIcon,
  StarEmptyIcon,
  StarFillIcon,
} from "@assets/svg/common";

type IconKind = "place" | "category";

const iconMap: Record<IconKind, React.FC<React.SVGProps<SVGSVGElement>>> = {
  place: PlaceIcon,
  category: CategoryIcon,
};

function Root({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return <S.Container onClick={onClick}>{children}</S.Container>;
}

function Grid({ children }: { children: React.ReactNode }) {
  return <S.Grid>{children}</S.Grid>;
}

function Image({ src, alt = "이미지" }: { src: string; alt?: string }) {
  return <S.Image src={src} alt={alt} />;
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

function StarIcon({ isStar }: { isStar: boolean }) {
  return isStar ? (
    <S.RightSlot>
      <StarFillIcon width={21} height={21} />
    </S.RightSlot>
  ) : (
    <S.RightSlot>
      <StarEmptyIcon width={21} height={21} />
    </S.RightSlot>
  );
}

export const Card = Object.assign(Root, {
  Grid,
  Image,
  Title,
  Content,
  IconContent,
  StarIcon,
});
