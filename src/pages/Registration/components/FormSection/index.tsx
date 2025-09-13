import React from "react";
import * as S from "./index.styles";

export default function FormSection({
  title,
  helper,
  children,
}: {
  title: string;
  helper?: string;
  children: React.ReactNode;
}) {
  return (
    <S.Section>
      <S.Title>{title}</S.Title>
      {helper && <S.Helper>{helper}</S.Helper>}
      <div>{children}</div>
    </S.Section>
  );
}
