import { Card } from "@components/Card";
import type { Like } from "@models/like/like.type";
import { printList } from "@utils/printList";
import { useNavigate } from "react-router-dom";
import { useLike } from "@hooks/useLike";
import type { UserRoleType } from "@models/user/user.type";

interface LikeCardGridProps {
  likes: Like[];
  currentRole: UserRoleType;
}

export function LikeCardGrid({ likes, currentRole }: LikeCardGridProps) {
  return (
    <Card.Grid>
      {likes.map((item) => (
        <LikeCardItem key={item.id} item={item} currentRole={currentRole} />
      ))}
    </Card.Grid>
  );
}

function LikeCardItem({
  item,
  currentRole,
}: {
  item: Like;
  currentRole: UserRoleType;
}) {
  const navigate = useNavigate();

  const isArtistView = currentRole === "space"; // 공간이 보고 있다면 아티스트 목록
  const likeTarget = isArtistView
    ? { artistId: item.targetId }
    : { spaceId: item.targetId };

  const detailPath = isArtistView
    ? `/artists/${item.targetId}`
    : `/spaces/${item.targetId}`;

  const { liked, toggle, isPending } = useLike(likeTarget, {
    initialLiked: true,
  });

  return (
    <Card onClick={() => navigate(detailPath)}>
      <Card.Image src={item.thumbnail ?? ""} alt={item.targetName} />
      <Card.Content>
        <Card.StarButton
          isStar={liked}
          onToggle={toggle}
          disabled={isPending}
        />
        <Card.Title>{item.targetName}</Card.Title>
        <Card.IconContent type="place">{item.address}</Card.IconContent>
        <Card.IconContent type="category">
          {printList(item.categories)}
        </Card.IconContent>
      </Card.Content>
    </Card>
  );
}
