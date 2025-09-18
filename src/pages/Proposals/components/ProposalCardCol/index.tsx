import { Card } from "@components/Card";
import * as S from "./index.styles";
import type { Suggestion } from "@models/suggestion/suggestion.type";

interface ProposalCardColProps {
  items: Suggestion[];
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
          <Card.Image
            src={item.opponentImage}
            alt={item.spaceObj ?? item.artistObj}
          />
          <Card.Content>
            <Card.Title>{item.spaceObj ?? item.artistObj} </Card.Title>
            {item.message && (
              <Card.IconContent type="description">
                {item.message}
              </Card.IconContent>
            )}
            <Card.RightBadge is_accepted={item.isAccepted} />
          </Card.Content>
        </Card>
      ))}
    </S.List>
  );
}
