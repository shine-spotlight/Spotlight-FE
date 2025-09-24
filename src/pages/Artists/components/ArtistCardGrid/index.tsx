import { Card } from "@components/Card";
import type { ArtistProfile } from "@models/artist/artist.type";
import { printList } from "@utils/printList";
import { useNavigate } from "react-router-dom";
import { useLike } from "@hooks/useLike";

interface ArtistCardGridProps {
  artist: ArtistProfile[];
}

export function ArtistCardGrid({ artist }: ArtistCardGridProps) {
  return (
    <Card.Grid>
      {artist.map((item) => (
        <ArtistCardItem key={item.id} item={item} />
      ))}
    </Card.Grid>
  );
}

function ArtistCardItem({ item }: { item: ArtistProfile }) {
  const navigate = useNavigate();

  const { liked, toggle, isPending } = useLike(
    { artistId: item.id },
    { initialLiked: !!item.isLiked }
  );

  return (
    <Card onClick={() => navigate(`/artists/${item.id}`)}>
      <Card.Image src={item.profileImageUrl ?? ""} alt={item.name} />
      <Card.Content>
        <Card.StarButton
          isStar={liked}
          onToggle={toggle}
          disabled={isPending}
        />
        <Card.Title>{item.name}</Card.Title>
        <Card.IconContent type="place">
          {printList(item.regionDisplay)}
        </Card.IconContent>
        <Card.IconContent type="category">
          {printList(item.categoriesDisplay)}
        </Card.IconContent>
      </Card.Content>
    </Card>
  );
}
