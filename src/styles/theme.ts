const palette = {
  sky: {
    50: "#E0F2FF",
    100: "#C7E8FF",
    200: "#AFE0FF",
    300: "#6CC4FF",
    400: "#49B5FF",
    500: "#2FA4FF",
    600: "#1E8BE6",
    700: "#0E6FB3",
    800: "#0A5290",
    900: "#083B6B",
  },
  gray: {
    50: "#F8F9FA",
    100: "#F1F3F5",
    200: "#EDEEF1",
    300: "#E9ECEF",
    400: "#CED4DA",
    500: "#AEB5BD",
    600: "#868E96",
    700: "#495057",
    800: "#343A40",
    900: "#212529",
  },
  red: {
    50: "#FDECEE",
    100: "#F8D7DA",
    200: "#F1AEB5",
    300: "#EA8A93",
    400: "#E35B6C",
    500: "#DC3545",
    600: "#C12D3A",
    700: "#C82333",
    800: "#9F1E2A",
    900: "#7A1620",
  },
  blue: {
    50: "#E7F2FF",
    100: "#E3F2FD",
    200: "#BBDDFB",
    300: "#90C5F7",
    400: "#64A9F3",
    500: "#3D8BF0",
    600: "#1976D2",
    700: "#155FA8",
    800: "#104A82",
    900: "#0B355E",
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
      surfaceAlt: palette.gray[100], // 살짝 구분되는 표면
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
      disabledBg: palette.gray[200],
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
    h1: { size: "24px", weight: 700, lineHeight: "28px" },
    h2: { size: "20px", weight: 600, lineHeight: "24px" },
    h3: { size: "16px", weight: 600, lineHeight: "20px" },
    body1: { size: "18px", weight: 500, lineHeight: "22px" },
    body2: { size: "16px", weight: 400, lineHeight: "20px" },
    body3: { size: "14px", weight: 400, lineHeight: "18px" },
    caption: { size: "12px", weight: 400, lineHeight: "16px" },
    buttonLg: { size: "16px", weight: 600, lineHeight: "20px" },
    buttonMd: { size: "14px", weight: 600, lineHeight: "18px" },
    buttonSm: { size: "12px", weight: 600, lineHeight: "16px" },
  },
} as const;

export type AppTheme = typeof theme;
