import { Card } from "@components/Card";
import * as S from "./index.styles";
import type { Suggestion } from "@models/suggestion/suggestion.type";
import { getOpponentDisplayName } from "@pages/Proposals/utils/getOpponentDisplayName";
import { useNavigate } from "react-router-dom";
import type { ProposalsTab } from "@pages/Proposals/types";
import { useUserStore } from "@stores/userStore";
import { printList } from "@utils/printList";

interface ProposalCardColProps {
  items: Suggestion[];
  kind: ProposalsTab;
}

export function ProposalCardCol({ items, kind }: ProposalCardColProps) {
  const navigate = useNavigate();
  const currentRole = useUserStore((s) => s.currentRole); // 'artist' | 'space' | undefined

  return (
    <S.List>
      {items.map((item) => {
        const opponentIsSpace =
          currentRole === "artist" || (!currentRole && !!item.spaceObj);
        const opponentIsArtist =
          currentRole === "space" ||
          (!currentRole && !!item.artistObj && !item.spaceObj);

        // 보여줄 필드(상대쪽 것만)
        const showArtistCategories =
          opponentIsArtist && !!item.artistCategories?.length;
        const showSpaceCategories =
          opponentIsSpace && !!item.spaceCategories?.length;
        const showSpaceAddress = opponentIsSpace && !!item.spaceAddress;

        return (
          <Card
            thumbCol={90}
            key={item.id}
            variant="horizontal"
            onClick={() =>
              navigate(`/proposals/${item.id}`, {
                state: { suggestion: item, kind },
              })
            }
          >
            {kind == "received" && (
              <Card.Image
                src={item.opponentImageUrl}
                alt={getOpponentDisplayName(item)}
              />
            )}

            <Card.Content>
              <Card.Title>{getOpponentDisplayName(item)} </Card.Title>
              {showArtistCategories && (
                <Card.IconContent type="category">
                  {printList(item.artistCategories)}
                </Card.IconContent>
              )}

              {showSpaceCategories && (
                <Card.IconContent type="category">
                  {printList(item.spaceCategories)}
                </Card.IconContent>
              )}

              {showSpaceAddress && (
                <Card.IconContent type="place">
                  {item.spaceAddress}
                </Card.IconContent>
              )}

              {item.message && (
                <Card.IconContent type="description">
                  {item.message}
                </Card.IconContent>
              )}

              <Card.RightBadge is_accepted={item.isAccepted} />
            </Card.Content>
          </Card>
        );
      })}
    </S.List>
  );
}
