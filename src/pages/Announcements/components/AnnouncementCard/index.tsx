import * as S from "./index.styles";
import { CalendarIcon, CategoryIcon, PlaceIcon } from "@assets/svg/common";
import type { AnnouncementItemType } from "@pages/Announcements/types";
import { timeAgo } from "@utils/timeAgo";

type IconKind = "category" | "calendar" | "place";

const iconMap: Record<IconKind, React.FC<React.SVGProps<SVGSVGElement>>> = {
  place: PlaceIcon,
  category: CategoryIcon,
  calendar: CalendarIcon,
};

interface AnnouncementCardProps {
  announcement: AnnouncementItemType;
}

export const AnnouncementCard = ({ announcement }: AnnouncementCardProps) => {
  return (
    <S.Container>
      <S.ImageContainer>
        <img src={announcement.posting_image_url} alt={announcement.title} />
      </S.ImageContainer>
      <S.ContentContainer>
        <S.Title>{announcement.title}</S.Title>
        <IconContent type="category">
          {announcement.categories.join(", ")}
        </IconContent>
        <IconContent type="calendar">{announcement.date}</IconContent>
        <IconContent type="place">{announcement.address}</IconContent>
        <S.Time>{timeAgo(announcement.created_at)}</S.Time>
      </S.ContentContainer>
    </S.Container>
  );
};

const IconContent = ({
  type,
  children,
}: {
  type: IconKind;
  children: React.ReactNode;
}) => {
  const Icon = iconMap[type];
  return (
    <S.Content>
      <Icon width={16} height={16} />
      <S.ContentText>{children}</S.ContentText>
    </S.Content>
  );
};
