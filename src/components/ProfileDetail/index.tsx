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
  CategoryIcon,
  CalendarIcon,
} from "@assets/svg/common";
import { printList } from "@utils/printList";

type IconKind =
  | "place"
  | "people"
  | "link"
  | "pay"
  | "mood"
  | "equipment"
  | "category"
  | "calendar";

const iconMap: Record<IconKind, React.FC<React.SVGProps<SVGSVGElement>>> = {
  place: PlaceIcon,
  people: PeopleIcon,
  pay: PayIcon,
  mood: MoodIcon,
  link: LinkIcon,
  equipment: EquipmentIcon,
  category: CategoryIcon,
  calendar: CalendarIcon,
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
  const defaultImageUrl = "/defaultImage.png";
  const [imgSrc, setImgSrc] = React.useState(image || defaultImageUrl);
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

function Poster({
  image,
  alt = "공고 이미지",
}: {
  image: string;
  alt?: string;
}) {
  const defaultImageUrl = "/defaultImage.png";
  const [imgSrc, setImgSrc] = React.useState(image || defaultImageUrl);
  return (
    <S.PosterImage
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

function StarButton({
  isStar,
  onToggle,
  disabled,
}: {
  isStar: boolean;
  onToggle: () => void;
  disabled?: boolean;
  title?: string;
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

function Header({
  title,
  description,
  isStar,
  categories,
  onToggle,
  disabled,
}: {
  title: string;
  description?: string;
  isStar: boolean;
  categories?: string[];
  onToggle: () => void;
  disabled?: boolean;
}) {
  return (
    <S.Header>
      <S.TitleRow>
        <S.Title>{title}</S.Title>
        {!!categories?.length && (
          <S.TagRow>
            {categories.map((t) => (
              <S.RedTag key={t}>{t}</S.RedTag>
            ))}
          </S.TagRow>
        )}
      </S.TitleRow>
      <StarButton isStar={isStar} onToggle={onToggle} disabled={disabled} />
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
      <S.SectionBody>{children}</S.SectionBody>
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
          <S.ContentText>{printList(content)}</S.ContentText>
        </S.ContentList>
      ) : (
        <S.ContentText>{content}</S.ContentText>
      )}
    </S.Content>
  );
}

function IconRow({
  icon,
  children,
}: {
  icon: IconKind;
  children: React.ReactNode;
}) {
  const Icon = iconMap[icon];
  return (
    <S.IconRow>
      <Icon width={18} height={18} />
      <S.RowContent>{children}</S.RowContent>
    </S.IconRow>
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
          <S.Value>
            <S.ContentTextA
              href={t}
              target="_blank"
              rel="noopener noreferrer"
              title={t}
            >
              {t}
            </S.ContentTextA>
          </S.Value>
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
  Poster,
});
