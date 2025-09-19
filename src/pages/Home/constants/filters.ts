export const AGE_OPTIONS = [
  { value: -1, label: "전체" },
  { value: 10, label: "10대" },
  { value: 20, label: "20대" },
  { value: 30, label: "30대" },
  { value: 40, label: "40대" },
  { value: 50, label: "50대" },
  { value: 60, label: "60대 이상" },
  { value: 70, label: "70대 이상" },
  { value: 80, label: "80대 이상" },
] as const;

export const GENDER_OPTIONS = [
  { value: -1, label: "전체" },
  { value: 1, label: "남성" },
  { value: 2, label: "여성" },
  { value: 0, label: "알 수 없음" },
] as const;

// 지역 매핑
export const REGION_OPTIONS = [
  { value: "(ALL)", label: "전체" },
  { value: "서울특별시", label: "서울" },
  { value: "경기도", label: "경기" },
  { value: "강원특별자치도", label: "강원" },
  { value: "경상도", label: "경상" },
  { value: "전라도", label: "전라" },
  { value: "제주특별자치도", label: "제주" },
  { value: "충청도", label: "충청" },
] as const;

// 장르 옵션
export const GENRE_OPTIONS = [
  { value: "(ALL)", label: "전체" },
  { value: "대중무용", label: "대중무용" },
  { value: "대중음악", label: "대중음악" },
  { value: "무용(서양/한국무용)", label: "무용(서양/한국무용)" },
  { value: "뮤지컬", label: "뮤지컬" },
  { value: "복합", label: "복합" },
  { value: "서양음악(클래식)", label: "서양음악(클래식)" },
  { value: "서커스/마술", label: "서커스/마술" },
  { value: "연극", label: "연극" },
  { value: "한국음악(국악)", label: "한국음악(국악)" },
] as const;
