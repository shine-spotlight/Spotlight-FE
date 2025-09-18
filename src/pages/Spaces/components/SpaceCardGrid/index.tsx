import { Card } from "@components/Card";
import type { SpaceProfile } from "@models/space/space.type";
import { printList } from "@utils/printList";
import { useNavigate } from "react-router-dom";
import { useLike } from "@hooks/useLike";

interface SpaceCardGridProps {
  data: SpaceProfile[] | null;
}

export function SpaceCardGrid({ data }: SpaceCardGridProps) {
  if (!data) return <>없어용</>;

  return (
    <Card.Grid>
      {data.map((item) => (
        <SpaceCardItem key={item.id} item={item} />
      ))}
    </Card.Grid>
  );
}

function SpaceCardItem({ item }: { item: SpaceProfile }) {
  const navigate = useNavigate();

  const imgSrc = firstImage(item.placeImageUrl);
  const title = item.placeName;
  const address = item.address;
  const categories = printList(item.preferredCategoriesDisplay);

  const { liked, toggle, isPending } = useLike(
    { spaceId: item.id },
    { initialLiked: !!item.isLiked }
  );

  return (
    <Card onClick={() => navigate(`/spaces/${item.id}`)}>
      <Card.Image src={imgSrc} alt={title} />
      <Card.Content>
        <Card.StarButton
          isStar={liked}
          onToggle={toggle}
          disabled={isPending}
        />
        <Card.Title>{title}</Card.Title>
        <Card.IconContent type="place">{address}</Card.IconContent>
        <Card.IconContent type="category">{categories}</Card.IconContent>
      </Card.Content>
    </Card>
  );
}

function firstImage(images?: unknown): string {
  if (!Array.isArray(images)) return "";
  const first = images.find((v) => typeof v === "string" && v.trim());
  return (first as string) ?? "";
}
