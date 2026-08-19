import { SITE } from "./site";

export type SponsorStatus = "RECRUITING" | "ACTIVE";

export type SiteSponsor = {
  id: number;
  status: SponsorStatus;
  sponsor_name: string;
  phone_number: string;
  link_url: string;
  homepage_url: string;
  recruiting_notice: string;
  rental_price: string;
  highlight_points: string[];
};

export const GLOBAL_SPONSOR_TAG = "global-sponsor";

export const DEFAULT_SPONSOR: SiteSponsor = {
  id: 1,
  status: "RECRUITING",
  sponsor_name: "",
  phone_number: "",
  link_url: SITE.kakaoOpenChatUrl,
  homepage_url: "",
  recruiting_notice: "전국 안심 장례식장 입점 제휴 · 사이트 임대 모집 중",
  rental_price: "30만원",
  highlight_points: [
    "24시 긴급 픽업 가능",
    "개별 추모 가능",
    "전국 상담 가능",
    "예약 진행 가능",
    "화장·추모 안내",
  ],
};

export function phoneToTel(_phone: string): string {
  const digits = _phone.replace(/\D/g, "");
  return digits ? `tel:${digits}` : SITE.kakaoOpenChatUrl;
}

export function isKakaoLink(url: string) {
  return /open\.kakao\.com|kakao\.com/i.test(url);
}

export function sponsorKakaoUrl(sponsor: SiteSponsor): string {
  const url = (sponsor.link_url || "").trim();
  if (url && isKakaoLink(url)) return url;
  return "";
}

export function sponsorHomepageUrl(sponsor: SiteSponsor): string {
  const home = (sponsor.homepage_url || "").trim();
  if (home) return home;
  const url = (sponsor.link_url || "").trim();
  if (url && !isKakaoLink(url)) return url;
  return "";
}
