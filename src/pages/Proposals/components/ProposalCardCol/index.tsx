import { Card } from "@components/Card";
import type { ProposalType } from "@pages/Proposals/types";
import * as S from "./index.styles";

interface ProposalCardColProps {
  items: ProposalType[];
  onItemClick: (id: number) => void;
}

export function ProposalCardCol({ items, onItemClick }: ProposalCardColProps) {
  return (
    <S.List>
      {items.map((item) => (
        <Card
          thumbCol={90}
          key={item.id}
          variant="horizontal"
          onClick={() => onItemClick(item.id)}
        >
          <Card.Image src={item.image} alt={item.name} />
          <Card.Content>
            <Card.Title>{item.name}</Card.Title>
            <Card.IconContent type="category">{item.category}</Card.IconContent>

            {item.address && (
              <Card.IconContent type="place">{item.address}</Card.IconContent>
            )}
            {item.members && (
              <Card.IconContent type="people">
                {item.members}명
              </Card.IconContent>
            )}

            {item.description && (
              <Card.IconContent type="description">
                {item.description}
              </Card.IconContent>
            )}
            <Card.RightBadge is_accepted={item.is_accepted} />
          </Card.Content>
        </Card>
      ))}
    </S.List>
  );
}
