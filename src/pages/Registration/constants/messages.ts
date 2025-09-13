import { ARTIST_STEP, SPACE_STEP } from "../types/steps";

export const ARTIST_STEP_MESSAGES: Record<keyof typeof ARTIST_STEP, string> = {
  Basic: "개인 혹은 팀의 활동 정보를 작성해주세요!",
  RegionCategory: "활동 지역은 어디인가요?",
  Portfolio: "소개할 수 있는 \n포트폴리오를 등록해보세요!",
  Pay: "희망 페이를 선택해주세요!",
};

export const SPACE_STEP_MESSAGES: Record<keyof typeof SPACE_STEP, string> = {
  Business: "사업자등록번호를 입력해주세요!",
  AddressCapacity: "등록할 공연 공간을 선택해주세요!",
  VenueBasic: "공에 대한 정보를 입력해주세요!",
  Category: "원하는 공연 형태를 선택해주세요!",
};
