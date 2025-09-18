import { Card } from "@components/Card";
import type { SpaceProfile } from "@models/space/space.type";
import { printList } from "@utils/printList";
import { useNavigate } from "react-router-dom";

interface SpaceCardGridProps {
  data: SpaceProfile[] | null;
}

const firstImage = (images?: unknown): string => {
  if (!Array.isArray(images)) return "";
  const first = images.find((v) => typeof v === "string" && v.trim());
  return (first as string) ?? "";
};

export function SpaceCardGrid({ data }: SpaceCardGridProps) {
  const navigate = useNavigate();

  if (!data) {
    return <>없어용</>;
  }

  return (
    <Card.Grid>
      {data.map((item) => {
        const imgSrc = firstImage(item.placeImageUrl);
        const title = item.placeName;
        const address = item.address;
        const categories = printList(item.preferredCategoriesDisplay);

        return (
          <Card
            key={item.id ?? `${title}-${address}`}
            onClick={() => navigate(`/spaces/${item.id}`)}
          >
            <Card.Image src={imgSrc} alt={title} />
            <Card.Content>
              <Card.StarIcon isStar={item.isLiked ?? false} />
              <Card.Title>{title}</Card.Title>
              <Card.IconContent type="place">{address}</Card.IconContent>
              <Card.IconContent type="category">{categories}</Card.IconContent>
            </Card.Content>
          </Card>
        );
      })}
    </Card.Grid>
  );
}
