const palette = {
  sky: {
    50: "#EDF8FF",
    100: "#C7EAFF",
    200: "#ABE0FF",
    300: "#85D2FF",
    400: "#6DC9FF",
    500: "#49BCFF",
    600: "#42ABE8",
    700: "#3485B5",
    800: "#28678C",
    900: "#1F4F6B",
  },
  gray: {
    50: "#F0F1F3",
    100: "#CFD2DB",
    200: "#B8BCCA",
    300: "#979EB1",
    400: "#838BA2",
    500: "#646E8B",
    600: "#5B647E",
    700: "#474E63",
    800: "#373D4C",
    900: "#2A2E3A",
  },
  red: {
    50: "#FEEEF2",
    100: "#FCCBD7",
    200: "#FAB2C4",
    300: "#F88EA9",
    400: "#F67999",
    500: "#F4577F",
    600: "#DE4F74",
    700: "#AD3E5A",
    800: "#863046",
    900: "#662535",
  },
  blue: {
    50: "#ECF2FE",
    100: "#C5D6FD",
    200: "#A9C2FB",
    300: "#82A6FA",
    400: "#6995F9",
    500: "#447AF7",
    600: "#3E6FE1",
    700: "#3057AF",
    800: "#254388",
    900: "#1D3368",
  },

  white: "#FFFFFF",
  black: "#000000",
};

export const theme = {
  palette,
  color: {
    background: {
      app: palette.white, // 앱 기본 배경
      surface: palette.white, // 카드/모달 표면
      surfaceAlt: palette.gray[50], // 살짝 구분되는 표면
      muted: palette.gray[100], // 입력/비활성 배경
      subtle: palette.gray[50], // 섹션 배경
      // 정보성 영역(안내 배경)
      infoSubtle: palette.sky[50],
      dangerSubtle: palette.red[100],
    },

    text: {
      primary: palette.gray[800], // 본문
      secondary: palette.gray[600], // 보조 텍스트
      muted: palette.gray[700], // 서브 타이틀/라벨
      placeholder: palette.gray[500], // 입력 placeholder
      inverse: palette.white, // 컬러 반전(버튼 등)
      link: palette.sky[700], // 링크/액션
      linkHover: palette.sky[800],
      disabled: palette.gray[400],
    },

    border: {
      subtle: palette.gray[100], // 섹션 구분선
      default: palette.gray[300], // 일반 보더
      strong: palette.gray[400], // 진한 보더
      focus: palette.sky[500], // 포커스 링/보더
      warning: palette.red[300],
    },

    // 브랜드/버튼 계열
    brand: {
      solid: palette.sky[500],
      solidHover: palette.sky[600],
      solidActive: palette.sky[700],
      tint: palette.sky[50],
      outline: palette.sky[500],
      subtleText: palette.sky[700],
      disabled: palette.gray[300],
      disabledText: palette.gray[500],
    },
  },
  radius: {
    xs: "4px",
    sm: "8px",
    md: "12px",
    lg: "20px",
    pill: "9999px",
  },
  shadow: {
    sm: "0 0 5px rgba(0,0,0,0.10)",
    md: "0 0 10px rgba(0,0,0,0.20)",
  },
  typography: {
    h1: { fontSize: "24px", fontWeight: 700, lineHeight: "28px" },
    h2: { fontSize: "20px", fontWeight: 600, lineHeight: "24px" },
    h3: { fontSize: "16px", fontWeight: 600, lineHeight: "20px" },
    body1: { fontSize: "18px", fontWeight: 500, lineHeight: "22px" },
    body2: { fontSize: "16px", fontWeight: 400, lineHeight: "20px" },
    body3: { fontSize: "14px", fontWeight: 400, lineHeight: "18px" },
    body4: { fontSize: "12px", fontWeight: 400, lineHeight: "16px" },

    caption: { fontSize: "8px", fontWeight: 400, lineHeight: "12px" },
    buttonLg: { fontSize: "16px", fontWeight: 600, lineHeight: "20px" },
    buttonMd: { fontSize: "14px", fontWeight: 600, lineHeight: "18px" },
    buttonSm: { fontSize: "12px", fontWeight: 600, lineHeight: "16px" },
  },
} as const;

export type AppTheme = typeof theme;
