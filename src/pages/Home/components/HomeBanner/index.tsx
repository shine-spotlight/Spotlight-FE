import React, { useEffect, useState } from "react";
import * as S from "./index.styles";
import banner1 from "@assets/image/banner1.png";
import banner2 from "@assets/image/banner2.png";
import banner3 from "@assets/image/banner3.png";

const images = [banner1, banner2, banner3];

export const HomeBanner: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  const goToSlide = (index: number) => setCurrentIndex(index);

  return (
    <S.BannerContainer>
      <S.SliderWrapper $currentIndex={currentIndex} $count={images.length}>
        {images.map((img, i) => (
          <S.Slide key={i}>
            <img src={img} alt={`banner-${i}`} />
          </S.Slide>
        ))}
      </S.SliderWrapper>

      <S.BannerDots>
        {images.map((_, i) => (
          <S.Dot
            key={i}
            $active={i === currentIndex}
            onClick={() => goToSlide(i)}
          />
        ))}
      </S.BannerDots>
    </S.BannerContainer>
  );
};
