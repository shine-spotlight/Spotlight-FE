import * as S from "./index.styles";
import React from "react";
import { CalendarIcon, CategoryIcon, PlaceIcon } from "@assets/svg/common";
import { timeAgo } from "@utils/timeAgo";
import type { Posting } from "@models/posting/posting.type";
import { formatDate } from "@utils/formatDate";
import { printList } from "@utils/printList";
import { useNavigate } from "react-router-dom";

type IconKind = "category" | "calendar" | "place";

const iconMap: Record<IconKind, React.FC<React.SVGProps<SVGSVGElement>>> = {
  place: PlaceIcon,
  category: CategoryIcon,
  calendar: CalendarIcon,
};

interface AnnouncementCardProps {
  announcement: Posting;
}

export const AnnouncementCard = ({ announcement }: AnnouncementCardProps) => {
  const navigate = useNavigate();
  const defaultImageUrl = "/defaultImage.png";
  const [imgSrc, setImgSrc] = React.useState(
    announcement.postingImageUrl || defaultImageUrl
  );

  return (
    <S.Container onClick={() => navigate(`/announcements/${announcement.id}`)}>
      <S.ImageContainer>
        <img
          src={imgSrc}
          alt={announcement.title}
          onError={() => {
            if (imgSrc !== defaultImageUrl) {
              setImgSrc(defaultImageUrl);
            }
          }}
        />
        //
      </S.ImageContainer>
      <S.ContentContainer>
        <S.Row>
          <S.Title>{announcement.title}</S.Title>
          <S.Time>{timeAgo(announcement.createdAt)}</S.Time>
        </S.Row>

        <IconContent type="category">
          {printList(announcement.categoryNames)}
        </IconContent>
        <IconContent type="calendar">
          {formatDate(announcement.date)}
        </IconContent>
        <IconContent type="place">{announcement.spaceAddress}</IconContent>
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
