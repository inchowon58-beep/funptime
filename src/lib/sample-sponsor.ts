import type { SiteSponsor } from "./site-sponsor-shared";

/** 입점 샘플 페이지용 ACTIVE 상태 예시 (실제 업체와 무관) */
export const SAMPLE_ACTIVE_SPONSOR: SiteSponsor = {
  id: 1,
  status: "ACTIVE",
  sponsor_name: "오케이독 안심장례 (샘플)",
  phone_number: "010-1234-5678",
  link_url: "https://open.kakao.com/o/sxelLqJi",
  homepage_url: "https://www.naver.com",
  recruiting_notice: "",
  rental_price: "30만원",
  highlight_points: [
    "24시 긴급 픽업 가능",
    "개별 추모 가능",
    "전국 상담 가능",
    "예약 진행 가능",
    "화장·추모 안내",
  ],
};

/** 관리자 설정(rental_price 등)을 반영한 샘플 스폰서 쌍 */
export function buildSampleSponsors(current: SiteSponsor): {
  recruiting: SiteSponsor;
  active: SiteSponsor;
} {
  return {
    recruiting: {
      ...current,
      status: "RECRUITING",
    },
    active: {
      ...SAMPLE_ACTIVE_SPONSOR,
      rental_price: current.rental_price || SAMPLE_ACTIVE_SPONSOR.rental_price,
      highlight_points:
        current.highlight_points?.length > 0
          ? current.highlight_points
          : SAMPLE_ACTIVE_SPONSOR.highlight_points,
      link_url: SAMPLE_ACTIVE_SPONSOR.link_url,
      homepage_url: SAMPLE_ACTIVE_SPONSOR.homepage_url,
    },
  };
}

export const SAMPLE_PAGE_KEYWORD = "분당 강아지장례식장";
export const SAMPLE_PAGE_H1 = "분당 강아지장례식장 · 안치·개별 화장 일정 안내";
export const SAMPLE_PAGE_SUBTITLE = "체중과 도착 시간만 알려 주시면 식장 동선을 먼저 잡아 드립니다.";

export const SAMPLE_SECTIONS = [
  {
    h2: "강남 지역 반려동물 장례 안내",
    paragraphs: [
      "강남·역삼·삼성 일대에서 반려견 장례를 준비하실 때, 24시 긴급 픽업부터 화장·추모 절차까지 한곳에서 안내받을 수 있습니다.",
      "장례 비용, 소요 시간, 필요 서류 등 궁금한 점은 카카오톡 오픈채팅으로 편하게 문의해 주세요.",
    ],
  },
  {
    h2: "장례 절차와 비용",
    paragraphs: [
      "픽업 → 안치 → 추모 → 화장 → 유골 수습 순으로 진행됩니다. 견종·체중·선택 옵션에 따라 비용이 달라질 수 있습니다.",
    ],
  },
] as const;
