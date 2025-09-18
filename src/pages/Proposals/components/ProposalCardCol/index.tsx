import { Card } from "@components/Card";
import * as S from "./index.styles";
import type { Suggestion } from "@models/suggestion/suggestion.type";
import { getOpponentDisplayName } from "@pages/Proposals/utils/getOpponentDisplayName";

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
            alt={getOpponentDisplayName(item)}
          />
          <Card.Content>
            <Card.Title>{getOpponentDisplayName(item)} </Card.Title>
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
