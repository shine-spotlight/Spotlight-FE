import { useLocation, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { Topbar } from "@components/Topbar";
import ActionFooter from "@components/ActionFooter";
import { Card } from "@components/Card";
import * as S from "./index.styles";
import { useUserStore } from "@stores/userStore";
import type { Suggestion } from "@models/suggestion/suggestion.type";
import type { ProposalsTab } from "@pages/Proposals/types";
import { formatPhone } from "./utils/formatPhone";
import {
  useRejectSuggestionMutation,
  useAcceptSuggestionMutation,
  useSuggestionPhoneQuery,
} from "@queries/suggestions";
import {
  AcceptSuggestionModal,
  RejectSuggestionModal,
  SuggestionAcceptedModal,
  ContactPhoneModal,
  RejectDoneModal,
} from "./components";

type LocationState =
  | { suggestion: Suggestion; kind?: ProposalsTab }
  | Suggestion
  | undefined;

const ProposalDetail = () => {
  const navigate = useNavigate();
  const [contactOpen, setContactOpen] = useState(false);
  const [rejectDoneOpen, setRejectDoneOpen] = useState(false);
  const currentRole = useUserStore((s) => s.currentRole);

  const locState = useLocation().state as LocationState;
  // state 형태가 { suggestion, kind } 또는 그냥 suggestion 인 두 경우 모두 커버
  const suggestion: Suggestion | undefined =
    locState && "suggestion" in locState ? locState.suggestion : locState;

  const kind: ProposalsTab | undefined =
    locState && "suggestion" in locState ? locState.kind : undefined;

  const goBack = () => navigate(-1);
  // 모달 상태
  const [acceptOpen, setAcceptOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [result, setResult] = useState<{ open: boolean; message: string }>({
    open: false,
    message: "",
  });
  const [acceptedPhone, setAcceptedPhone] = useState<string>("");

  const safeId = suggestion?.id ?? 0;

  // mutations
  const { mutateAsync: doAccept, isPending: accepting } =
    useAcceptSuggestionMutation(safeId);
  const { mutateAsync: doReject, isPending: rejecting } =
    useRejectSuggestionMutation(safeId);
  const phoneQ = useSuggestionPhoneQuery(safeId, {
    enabled: result.open || contactOpen,
  });

  useEffect(() => {
    if (!phoneQ.data) return;

    // 응답 키 방어(camel/snake 모두 수용)
    const artistPhone = phoneQ.data.artistPhone ?? "";
    const spacePhone = phoneQ.data.spacePhone ?? "";

    let opponentRaw = "";

    if (currentRole === "artist") {
      // 나는 아티스트 → 상대는 공간
      opponentRaw = spacePhone;
    } else if (currentRole === "space") {
      // 나는 공간 → 상대는 아티스트
      opponentRaw = artistPhone;
    } else {
      if (suggestion?.space) {
        opponentRaw = spacePhone || artistPhone;
      } else if (suggestion?.artist) {
        opponentRaw = artistPhone || spacePhone;
      } else {
        opponentRaw = spacePhone || artistPhone;
      }
    }

    setAcceptedPhone(formatPhone(opponentRaw));
  }, [phoneQ.data, currentRole, suggestion?.space, suggestion?.artist]);

  if (!suggestion) {
    return (
      <>
        <Topbar title="제안서 상세" goBack={goBack} />
        <S.Container>
          <S.ErrorText>
            제안서를 찾을 수 없어요. 목록에서 다시 시도해 주세요.
          </S.ErrorText>
        </S.Container>
      </>
    );
  }
  const iAmArtist = currentRole === "artist";
  const iAmSpace = currentRole === "space";

  const opponentTitle = iAmArtist
    ? suggestion.spaceObj?.placeName
    : iAmSpace
    ? suggestion.artistObj?.name
    : // role이 없다면 데이터로 추론 (spaceObj가 있으면 공간, 아니면 아티스트)
      suggestion.spaceObj?.placeName ?? suggestion.artistObj?.name ?? "상대방";

  const goOpponentDetail = () => {
    if (iAmArtist && suggestion.space) navigate(`/spaces/${suggestion.space}`);
    else if (iAmSpace && suggestion.artist)
      navigate(`/artists/${suggestion.artist}`);
    else if (suggestion.space) navigate(`/spaces/${suggestion.space}`);
    else if (suggestion.artist) navigate(`/artists/${suggestion.artist}`);
  };

  const isReceived = kind != null ? kind === "received" : false;

  const handleAcceptConfirm = async () => {
    try {
      await doAccept();
      setAcceptOpen(false);
      setResult({ open: true, message: "제안을 수락했습니다." });
    } catch {
      // 에러 처리 필요 시 여기서
    }
  };

  const handleRejectConfirm = async () => {
    try {
      await doReject();
      setRejectOpen(false);
      setRejectDoneOpen(true);
    } catch {
      // 에러 처리 필요 시 여기서
    }
  };

  return (
    <>
      <Topbar title="제안서 상세" goBack={goBack} />
      <S.Container>
        <S.ProfileSection>
          <S.SectionTitle>상대방 프로필</S.SectionTitle>
          <Card variant="vertical" onClick={goOpponentDetail}>
            {kind == "received" && (
              <Card.Image
                src={suggestion.opponentImageUrl}
                alt={opponentTitle}
              />
            )}
            <S.Row>
              <Card.Title>{opponentTitle}</Card.Title>
              <S.DetailButton>자세히 보기</S.DetailButton>
            </S.Row>
          </Card>
        </S.ProfileSection>
        <S.DescriptionSection>
          <S.SectionTitle>공연 설명</S.SectionTitle>
          <S.DescriptionTextArea readOnly value={suggestion.message} />
        </S.DescriptionSection>
        {isReceived &&
          suggestion.isAccepted !== false &&
          (suggestion.isAccepted == null ? (
            <ActionFooter
              variant="double"
              prevLabel="제안 거절"
              nextLabel="제안 수락"
              onPrev={() => setRejectOpen(true)}
              onNext={() => setAcceptOpen(true)}
            />
          ) : (
            <ActionFooter
              variant="single"
              nextLabel="연락처 확인하기"
              onNext={() => setContactOpen(true)}
            />
          ))}
        {/* 분리한 모달들 */}
        <AcceptSuggestionModal
          isOpen={acceptOpen}
          isLoading={accepting}
          onClose={() => setAcceptOpen(false)}
          onConfirm={handleAcceptConfirm}
        />

        <RejectSuggestionModal
          isOpen={rejectOpen}
          isLoading={rejecting}
          onClose={() => setRejectOpen(false)}
          onConfirm={handleRejectConfirm}
        />

        <SuggestionAcceptedModal
          isOpen={result.open}
          opponentName={opponentTitle}
          phone={acceptedPhone}
          onClose={() => {
            setResult({ open: false, message: "" });
            navigate(-1);
          }}
        />
        <ContactPhoneModal
          isOpen={contactOpen}
          opponentName={opponentTitle}
          phone={acceptedPhone}
          onClose={() => setContactOpen(false)}
        />
        <RejectDoneModal
          isOpen={rejectDoneOpen}
          onClose={() => {
            setRejectDoneOpen(false);
            navigate(-1);
          }}
        />
      </S.Container>
    </>
  );
};

export default ProposalDetail;
