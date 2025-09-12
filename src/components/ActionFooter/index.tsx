import * as S from "./index.styles";

type SingleProps = {
  variant?: "single";
  nextLabel?: string;
  nextDisabled?: boolean;
  onNext: () => void;
};

type DoubleProps = {
  variant: "double";
  prevLabel?: string;
  nextLabel?: string;
  prevDisabled?: boolean;
  nextDisabled?: boolean;
  onPrev: () => void;
  onNext: () => void;
};

export type ActionFooterProps = SingleProps | DoubleProps;

export default function ActionFooter(props: ActionFooterProps) {
  if (props.variant === "double") {
    const { prevDisabled, nextDisabled, onPrev, onNext, prevLabel, nextLabel } =
      props;
    return (
      <>
        <S.Spacer />
        <S.Footer>
          <S.Row>
            <S.Button
              data-variant="ghost"
              disabled={prevDisabled}
              onClick={onPrev}
            >
              {prevLabel ?? "이전"}
            </S.Button>
            <S.Button
              data-variant="primary"
              disabled={nextDisabled}
              onClick={onNext}
            >
              {nextLabel ?? "다음"}
            </S.Button>
          </S.Row>
        </S.Footer>
      </>
    );
  }

  const { nextDisabled, onNext, nextLabel } = props;
  return (
    <>
      <S.Spacer />
      <S.Footer>
        <S.Button
          data-variant="primary"
          disabled={!!nextDisabled}
          onClick={onNext}
        >
          {nextLabel ?? "다음으로"}
        </S.Button>
      </S.Footer>
    </>
  );
}
