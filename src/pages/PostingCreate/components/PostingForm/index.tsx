import React from "react";
import * as S from "./index.styles";

interface PostingFormProps {
  children: React.ReactNode;
}

function PostingForm({ children }: PostingFormProps) {
  return <S.Container>{children}</S.Container>;
}

function Section({
  children,
  title,
  error,
}: {
  children: React.ReactNode;
  title: string;
  error?: string;
}) {
  return (
    <S.Section>
      <S.SectionTitle>{title}</S.SectionTitle>
      {children}
      {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
    </S.Section>
  );
}

PostingForm.Content = S.Content;
PostingForm.Section = Section;

export default PostingForm;
