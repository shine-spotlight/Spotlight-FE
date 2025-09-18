import * as S from "./index.styles";
import { Navigate } from "react-router-dom";
import { Topbar } from "@components/Topbar";
import { useUserStore } from "@stores/userStore";
import { useGlobalLoading } from "@hooks/useGlobalLoading";
import { useLikesQuery } from "@queries/likes";
import { useNavigate } from "react-router-dom";
import { LikeCardGrid } from "./components";

const LikeList: React.FC = () => {
  const navigate = useNavigate();
  const currentRole = useUserStore((s) => s.currentRole);

  const { data, isLoading } = useLikesQuery();

  useGlobalLoading(isLoading, "내가 찜한 목록을 불러오는 중입니다...");

  // 비어있는 상태
  const isEmpty = !isLoading && Array.isArray(data) && data.length === 0;

  if (!currentRole) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Topbar title="내가 찜한 목록" goBack={() => navigate(-1)} />
      <S.Container>
        {isLoading ? null : isEmpty ? (
          <S.Empty>아직 찜한 항목이 없어요.</S.Empty>
        ) : (
          <>
            <LikeCardGrid currentRole={currentRole} likes={data ?? []} />
          </>
        )}
      </S.Container>
    </>
  );
};

export default LikeList;
