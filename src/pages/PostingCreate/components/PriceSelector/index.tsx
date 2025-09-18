import * as S from "./index.styles";

interface PriceSelectorProps {
  priceType: "free" | "paid" | "negotiable";
  priceAmount?: number;
  onPriceTypeChange: (type: "free" | "paid" | "negotiable") => void;
  onPriceAmountChange: (amount: number) => void;
}

export default function PriceSelector({
  priceType,
  priceAmount,
  onPriceTypeChange,
  onPriceAmountChange,
}: PriceSelectorProps) {
  const currentType: "free" | "paid" | "negotiable" = priceType ?? "free";
  const isNegotiable = currentType === "negotiable";

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value.replace(/[^\d]/g, ""); // 숫자만
    onPriceAmountChange(v ? parseInt(v, 10) : 0);
  };

  const toggleNegotiable = () => {
    onPriceTypeChange(isNegotiable ? "paid" : "negotiable");
  };

  return (
    <>
      <S.PriceRow>
        <S.InputWrapper>
          <S.InputPrefix>₩</S.InputPrefix>
          {isNegotiable ? (
            <S.NegotiableDisplay>협의 가능</S.NegotiableDisplay>
          ) : (
            <S.PriceInput
              type="text"
              inputMode="numeric"
              placeholder="가격"
              value={priceAmount ?? ""}
              onChange={handleAmountChange}
              aria-label="공연 페이"
            />
          )}
        </S.InputWrapper>

        <S.NegotiableButton
          type="button"
          data-active={isNegotiable ? "true" : "false"}
          onClick={toggleNegotiable}
          aria-pressed={isNegotiable}
        >
          <S.CheckIcon viewBox="0 0 16 16" aria-hidden>
            <path d="M6.2 10.4 3.8 8l-1 1 3.4 3.4L13.2 5.4l-1-1z" />
          </S.CheckIcon>
          협의 가능
        </S.NegotiableButton>
      </S.PriceRow>
    </>
  );
}
