import { useState } from "react";
import { useToggleLikeMutation } from "@queries/likes";

type LikeTarget =
  | { artistId: number; spaceId?: never }
  | { spaceId: number; artistId?: never };

type UseLikeOptions = {
  initialLiked?: boolean;
};

export function useLike(target: LikeTarget, opts: UseLikeOptions = {}) {
  const [liked, setLiked] = useState<boolean>(!!opts.initialLiked);
  const toggleMut = useToggleLikeMutation();

  const toggle = () => {
    const prev = liked;
    setLiked(!prev);

    toggleMut.mutate(target);
  };

  return {
    liked,
    toggle,
    isPending: toggleMut.isPending,
  };
}
