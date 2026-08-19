import { SITE, KAKAO_CTA_HINT } from "./site";

export type FaqItem = { q: string; a: string };

/** 메인·AEO용 자주 묻는 질문 */
export const HOME_FAQS: FaqItem[] = [
  {
    q: "식장에 도착하면 어떤 순서로 진행되나요?",
    a: `${SITE.name}은 안치 확인 → 추모 시간 → 개별 화장 → 유골 수습 순으로 안내합니다. 카카오톡 오픈채팅으로 체중과 도착 가능 시간을 알려 주시면 동선을 먼저 잡아 드립니다.`,
  },
  {
    q: "개별 화장인가요, 합동 화장인가요?",
    a: "상담 시 개별 화장을 기본으로 설명합니다. 시설·일정에 따라 확인이 필요한 부분은 오픈채팅에서 먼저 정리해 드립니다.",
  },
  {
    q: "밤에 급하게 픽업이 필요할 때는요?",
    a: "24시 픽업 상담이 가능합니다. 거주 지역과 아이 체중만 남겨 주시면 가장 가까운 일정부터 안내합니다.",
  },
  {
    q: "비용은 어떻게 나오나요?",
    a: "체중, 안치 시간, 화장 방식, 유골함 선택에 따라 구간이 달라집니다. 상담 시 숨기지 않고 구간을 먼저 말씀드립니다.",
  },
  {
    q: "유골은 언제 받을 수 있나요?",
    a: "개별 화장이 끝나면 같은 흐름으로 수습·전달을 안내합니다. 희망하시는 보관 방식을 미리 말씀해 주세요.",
  },
  {
    q: "상담은 어디로 하면 되나요?",
    a: `카카오톡 오픈채팅으로 식장 일정·픽업·화장 상담이 가능합니다. ${KAKAO_CTA_HINT}`,
  },
];

export function faqJsonLd(faqs: FaqItem[] = HOME_FAQS) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function orgJsonLd(url?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE.name,
    alternateName: [SITE.brand, "안심 반려견 장례식장"],
    description: SITE.description,
    url: url || SITE.siteUrl,
    image: SITE.logo,
    address: {
      "@type": "PostalAddress",
      addressCountry: "KR",
      streetAddress: SITE.address,
    },
    areaServed: SITE.areaServed,
    priceRange: "안치·화장 상담",
    keywords: SITE.keywords.join(", "),
  };
}
