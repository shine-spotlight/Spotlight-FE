import { Card } from "@components/Card";
import { dummyArtist } from "@pages/Artists/data";

export function ArtistCardGrid() {
  return (
    <Card.Grid>
      {dummyArtist.map((item) => (
        <Card key={item.id}>
          <Card.Image src={item.img} alt={item.title} />
          <Card.Content>
            <Card.StarIcon isStar={true} />
            <Card.Title>{item.title}</Card.Title>
            <Card.IconContent type="place">{item.place}</Card.IconContent>
            <Card.IconContent type="category">{item.category}</Card.IconContent>
          </Card.Content>
        </Card>
      ))}
    </Card.Grid>
  );
}
