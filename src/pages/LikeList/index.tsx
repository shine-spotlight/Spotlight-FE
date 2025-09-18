import * as S from "./index.styles";
import { Topbar } from "@components/Topbar";
import { useUserStore } from "@stores/userStore";
import { useGlobalLoading } from "@hooks/useGlobalLoading";
import { useLikesQuery } from "@queries/likes";
import { useNavigate } from "react-router-dom";
import type { ArtistProfile } from "@models/artist/artist.type";
import type { SpaceProfile } from "@models/space/space.type";
import { ArtistCardGrid } from "@pages/Artists/components/ArtistCardGrid";
import { SpaceCardGrid } from "@pages/Spaces/components/SpaceCardGrid";

function isArtistList(arr: unknown): arr is ArtistProfile[] {
  return Array.isArray(arr) && (arr[0] == null || "name" in arr[0]);
}

function isSpaceList(arr: unknown): arr is SpaceProfile[] {
  return Array.isArray(arr) && (arr[0] == null || "placeName" in arr[0]);
}

const LikeList: React.FC = () => {
  const navigate = useNavigate();
  const currentRole = useUserStore((s) => s.currentRole);

  const { data, isLoading } = useLikesQuery();

  useGlobalLoading(isLoading, "내가 찜한 목록을 불러오는 중입니다...");

  const isSpaceRole = currentRole === "space";
  const isArtistRole = currentRole === "artist";

  // 비어있는 상태
  const isEmpty = !isLoading && Array.isArray(data) && data.length === 0;

  return (
    <>
      <Topbar title="내가 찜한 목록" goBack={() => navigate(-1)} />
      <S.Container>
        {isLoading ? null : isEmpty ? (
          <S.Empty>아직 찜한 항목이 없어요.</S.Empty>
        ) : (
          <>
            {/* 공간 보유자라면 아티스트 카드 그리드 */}
            {isSpaceRole && isArtistList(data) && (
              <ArtistCardGrid artist={data} />
            )}

            {/* 아티스트라면 공간 카드 그리드 */}
            {isArtistRole && isSpaceList(data) && <SpaceCardGrid data={data} />}
          </>
        )}
      </S.Container>
    </>
  );
};

export default LikeList;
