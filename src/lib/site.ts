/** 안심강아지장례식장 — 사이트 공통 설정 */

export const SITE = {
  name: "안심강아지장례식장",
  brand: "안심강아지장례식장",
  farm: "반려동물 장례식장",
  tagline: "개별 화장 · 안치 · 24시 픽업 상담",
  taglineEn: "Ansim Pet Funeral Hall",
  description:
    "안심강아지장례식장은 반려견의 마지막 길을 시설 기준으로 안내합니다. 24시 픽업, 안치, 개별 화장, 추모 공간까지 절차와 비용을 투명하게 상담합니다.",
  keywords: [
    "안심강아지장례식장",
    "강아지장례식장",
    "개별화장",
    "반려동물화장",
    "애견장례식장",
    "강아지안치",
    "펫장례식장",
    "24시장례식장",
    "강아지화장장",
    "반려견장례식장",
  ],
  kakaoOpenChatUrl: "https://open.kakao.com/o/sxelLqJi",
  logo: "https://image.cattery.co.kr/petfuneral/01.webp",
  imageBase: "https://image.cattery.co.kr/petfuneral",
  imageCount: 17,
  location: "대한민국 전국",
  address: "전국 24시 상담 · 카카오톡 오픈채팅",
  areaServed: "대한민국 전국",
  domain: "puppytimes-funeral",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://funeral.puppytimes.co.kr",
  infocsUrl: "https://www.infocs.co.kr/",
} as const;

export const CTA_LABEL = "카카오톡 오픈채팅 상담";
export const CTA_KAKAO = "카카오톡 상담하기";
export const CTA_RENTAL = "사이트 임대 · 제휴 문의";
export const CTA_EMERGENCY = "긴급 상담";
export const CTA_MEMORIAL = "화장·추모 안내";
export const CTA_BUILD = "자동화사이트구축/렌탈문의";

/** 본문·CTA 공통 안내 문구 */
export const KAKAO_CTA_HINT = "카카오톡 오픈채팅으로 상담해 주세요.";
