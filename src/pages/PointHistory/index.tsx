import * as S from "./index.styles";
import { Topbar } from "@components/Topbar";
import { useUserStore } from "@stores/userStore";
import { useGlobalLoading } from "@hooks/useGlobalLoading";
import { usePointHistoryQuery } from "@queries/points";
import { useNavigate } from "react-router-dom";
import { HistoryItem, CurrentPointSection } from "./components";
import CheckModal from "@components/CheckModal";
import { useState } from "react";

const PointHistory = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const currentRole = useUserStore((s) => s.currentRole);
  const pointByRole = useUserStore((s) => s.pointByRole);
  const { data, isLoading } = usePointHistoryQuery();

  useGlobalLoading(isLoading, "내가 찜한 목록을 불러오는 중입니다...");

  const isEmpty = !isLoading && Array.isArray(data) && data.length === 0;

  if (!currentRole) {
    setOpenModal(true);
  }

  return (
    <>
      <Topbar title="포인트 거래 내역" goBack={() => navigate(-1)} />
      <CurrentPointSection
        point={currentRole ? pointByRole[currentRole] : null}
      />
      <S.Container>
        <S.Row>
          <S.Title>거래 내역 조회</S.Title>
          <S.Sort>최신순</S.Sort>
        </S.Row>

        {isEmpty || !data ? (
          <S.Empty>포인트 거래 내역이 없습니다.</S.Empty>
        ) : (
          <S.HistoryContainer>
            {data.map((item) => (
              <HistoryItem item={item} />
            ))}
          </S.HistoryContainer>
        )}
      </S.Container>
      <CheckModal
        isOpen={openModal}
        onClose={() => {
          setOpenModal(false);
          navigate("/mypage");
        }}
        title="잘못된 접근 경로입니다."
        message={<>공간 보유자는 포인트를 사용하지 않습니다.</>}
      />
    </>
  );
};

export default PointHistory;
