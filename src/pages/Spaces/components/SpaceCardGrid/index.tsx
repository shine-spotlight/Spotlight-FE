import { Card } from "@components/Card";
import { dummySpace } from "@pages/Spaces/datas";

export function SpaceCardGrid() {
  return (
    <Card.Grid>
      {dummySpace.map((item) => (
        <Card key={item.id}>
          <Card.Image src={item.img} alt={item.name} />
          <Card.Content>
            <Card.StarIcon isStar={true} />
            <Card.Title>{item.name}</Card.Title>
            <Card.IconContent type="place">{item.address}</Card.IconContent>
            <Card.IconContent type="category">
              {item.category.join(", ")}
            </Card.IconContent>
          </Card.Content>
        </Card>
      ))}
    </Card.Grid>
  );
}
