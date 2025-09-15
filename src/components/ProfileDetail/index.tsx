import React from "react";
import * as S from "./index.styles";
import {
  PlaceIcon,
  PeopleIcon,
  LinkIcon,
  MoodIcon,
  EquipmentIcon,
  PayIcon,
  StarEmptyIcon,
  StarFillIcon,
} from "@assets/svg/common";

type IconKind = "place" | "people" | "link" | "pay" | "mood" | "equipment";

const iconMap: Record<IconKind, React.FC<React.SVGProps<SVGSVGElement>>> = {
  place: PlaceIcon,
  people: PeopleIcon,
  pay: PayIcon,
  mood: MoodIcon,
  link: LinkIcon,
  equipment: EquipmentIcon,
};

type RootProps = {
  children: React.ReactNode;
};

function Root({ children }: RootProps) {
  return <S.Wrap>{children}</S.Wrap>;
}

function Media({
  image,
  alt = "대표 이미지",
}: {
  image: string;
  alt?: string;
}) {
  return <S.Image src={image} alt={alt} />;
}

function Header({
  title,
  description,
  isStar,
}: {
  title: string;
  description?: string;
  isStar: boolean;
}) {
  return (
    <S.Header>
      <S.Title>{title}</S.Title>
      {isStar && <StarIcon isStar={isStar} />}
      {description && <S.Description>{description}</S.Description>}
    </S.Header>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <S.Section>
      <S.SectionTitle>{title}</S.SectionTitle>
      <div>{children}</div>
    </S.Section>
  );
}

type ContentValue = string | number | Array<string | number>;

function IconContent({
  icon,
  label,
  content,
}: {
  icon: IconKind;
  label: string;
  content: ContentValue;
}) {
  const isArray = Array.isArray(content);

  return (
    <S.Content>
      <IconRow icon={icon}>{label}</IconRow>
      {isArray ? (
        <S.ContentList>
          {(content as Array<string | number>).map((item, i) => (
            <S.ContentText key={`${label}-${i}`}>{String(item)}</S.ContentText>
          ))}
        </S.ContentList>
      ) : (
        <S.ContentText>{content}</S.ContentText>
      )}{" "}
    </S.Content>
  );
}

function IconRow({
  icon,
  children,
}: {
  icon: IconKind;
  children: React.ReactNode;
  withDivider?: boolean;
}) {
  const Icon = iconMap[icon];
  return (
    <S.IconRow>
      <Icon width={18} height={18} />
      <S.RowContent>{children}</S.RowContent>
    </S.IconRow>
  );
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

function Tags({ items }: { items: string[] }) {
  if (!items?.length) return null;
  return (
    <S.TagRow>
      {items.map((t) => (
        <S.Tag key={t}>{t}</S.Tag>
      ))}
    </S.TagRow>
  );
}

function PortfolioLink({ links }: { links: string[] }) {
  if (!links?.length) return null;
  return (
    <S.LinkCol>
      {links.map((t, index) => (
        <S.LinkRow>
          <IconRow icon="link">링크 {index + 1}</IconRow>
          <S.ContentTextA
            as="a"
            href={t}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t}
          </S.ContentTextA>
          <S.ShortcutButton
            onClick={() => window.open(t, "_blank", "noopener,noreferrer")}
          >
            바로가기
          </S.ShortcutButton>
        </S.LinkRow>
      ))}
    </S.LinkCol>
  );
}

export const ProfileDetail = Object.assign(Root, {
  Media,
  Header,
  IconContent,
  Section,
  IconRow,
  Tags,
  PortfolioLink,
});
