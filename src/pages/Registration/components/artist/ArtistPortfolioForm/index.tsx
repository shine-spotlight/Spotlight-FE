import { useState, useCallback } from "react";
import FormSection from "../../FormSection";
import ActionFooter from "@components/ActionFooter";
import * as S from "../../index.styles";
import { useRegistrationDraftStore } from "@stores/registrationStore";
import { ARTIST_STEP } from "@pages/Registration/types/steps";
import type { ArtistPortfolioPayload } from "@pages/Registration/types/payloads";
import { ARTIST_STEP_MESSAGES } from "@pages/Registration/constants/messages";
import ProfileAvatarPicker from "../../ProfileAvatarPicker";
import { useRegistrationStepNav } from "@pages/Registration/hooks/useRegistrationStepNav";

function ArtistPortfolioForm() {
  const draft = useRegistrationDraftStore((s) => s.draft);
  const { saveAndGoNext, saveAndGoPrev } = useRegistrationStepNav();

  const initial =
    draft?.role === "artist"
      ? (draft.data[ARTIST_STEP.Portfolio] as
          | ArtistPortfolioPayload
          | undefined)
      : undefined;

  const [form, setForm] = useState<ArtistPortfolioPayload>({
    profileImageUrl: initial?.profileImageUrl ?? "",
    portfolioLinks: initial?.portfolioLinks ?? [],
  });
  const [urlInput, setUrlInput] = useState("");

  const addUrl = useCallback(() => {
    const v = urlInput.trim();
    if (!v) return;
    if (form.portfolioLinks.includes(v)) return;
    setForm((prev) => ({
      ...prev,
      portfolioLinks: [...prev.portfolioLinks, v],
    }));
    setUrlInput("");
  }, [urlInput, form.portfolioLinks]);

  const removeUrl = useCallback((target: string) => {
    setForm((prev) => ({
      ...prev,
      portfolioLinks: prev.portfolioLinks.filter((u) => u !== target),
    }));
  }, []);

  const onNext = useCallback(() => {
    saveAndGoNext(form);
  }, [form, saveAndGoNext]);

  const onPrev = useCallback(() => {
    saveAndGoPrev(form);
  }, [form, saveAndGoPrev]);

  return (
    <S.Container>
      <S.Headline>{ARTIST_STEP_MESSAGES.Portfolio}</S.Headline>
      <S.ContentContainer>
        <FormSection
          title="프로필 사진"
          helper="[팀/이름]을 나타내는 사진을 등록해주세요!"
        >
          <ProfileAvatarPicker
            value={form.profileImageUrl ?? null}
            onChange={(url) =>
              setForm((prev) => ({ ...prev, profileImageUrl: url ?? "" }))
            }
            size={240}
          />
        </FormSection>
        <FormSection
          title="포트폴리오 URL"
          helper="여러 개를 추가할 수 있어요."
        >
          <div style={{ display: "flex", gap: 8 }}>
            <S.Input
              value={urlInput}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUrlInput(e.target.value)
              }
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addUrl();
                }
              }}
              placeholder="URL을 입력해주세요."
            />
            <S.AddButton type="button" onClick={addUrl}>
              추가
            </S.AddButton>
          </div>
          {form.portfolioLinks && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                marginTop: 12,
              }}
            >
              {form.portfolioLinks.map((u) => (
                <S.Pill key={u}>
                  <a href={u} target="_blank" rel="noreferrer">
                    {u}
                  </a>
                  <S.LinkButton
                    type="button"
                    onClick={() => removeUrl(u)}
                    aria-label="삭제"
                  >
                    ×
                  </S.LinkButton>
                </S.Pill>
              ))}
            </div>
          )}
        </FormSection>
      </S.ContentContainer>
      <ActionFooter
        variant="double"
        nextLabel="다음"
        nextDisabled={!form.profileImageUrl}
        onNext={onNext}
        onPrev={onPrev}
      />
    </S.Container>
  );
}

export default ArtistPortfolioForm;
