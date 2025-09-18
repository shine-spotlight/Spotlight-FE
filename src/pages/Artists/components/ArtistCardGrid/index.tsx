import { Card } from "@components/Card";
import type { ArtistProfile } from "@models/artist/artist.type";
import { printList } from "@utils/printList";
import { useNavigate } from "react-router-dom";

interface ArtistCardGridProps {
  artist: ArtistProfile[];
}
export function ArtistCardGrid({ artist }: ArtistCardGridProps) {
  const navigate = useNavigate();
  return (
    <Card.Grid>
      {artist.map((item) => (
        <Card key={item.id} onClick={() => navigate(`/artists/${item.id}`)}>
          <Card.Image src={item.profileImageUrl ?? ""} alt={item.name} />
          <Card.Content>
            <Card.StarIcon isStar={item.isLiked ?? false} />
            <Card.Title>{item.name}</Card.Title>
            <Card.IconContent type="place">
              {printList(item.region)}
            </Card.IconContent>
            <Card.IconContent type="category">
              {printList(item.categoriesDisplay)}
            </Card.IconContent>
          </Card.Content>
        </Card>
      ))}
    </Card.Grid>
  );
}
