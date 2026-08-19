import { SITE, KAKAO_CTA_HINT } from "./site";
import { pickImages } from "./images";
import type { SeoPage } from "./seo-pages";
import { slugifyKeyword } from "./seo-pages";
import { extractKeywordTheme, extractRegionFromKeyword } from "./region-parse";
import { getSubRegionNames } from "./sub-region-map";
import { getNearbyStationNames } from "./subway-map";

const HERO = [
  "안치부터 개별 화장까지 식장 기준으로",
  "체중·일정만 알려 주시면 동선을 잡아 드립니다",
  "급할수록 절차는 짧게, 인사는 천천히",
  "보호자가 길을 잃지 않는 장례식장 안내",
];

const INTRO_H2 = [
  "{kw}, 식장에서 먼저 확인할 세 가지",
  "{kw} 검색 전에 안치·화장 구분하기",
  "{kw}와 개별 화장, 보호자가 묻는 점",
  "{brand}가 {kw} 일정을 잡는 방식",
];

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function pick<T>(arr: T[], seed: number): T {
  return arr[seed % arr.length];
}

export function generateTemplateContent(keyword: string, pageIndex = 1): SeoPage {
  const seed = hash(`${keyword}|${pageIndex}|${SITE.brand}`);
  const kw = keyword.trim() || "강아지장례식장";
  const brand = SITE.brand;

  const title = `${kw} | ${brand} 안치·개별화장 안내`;
  const metaDescription = `${kw} — ${brand}에서 안치, 개별 화장, 24시 픽업 일정을 식장 기준으로 안내합니다. 체중만 알려 주셔도 견적 구간을 먼저 설명합니다. 카카오톡 오픈채팅 상담.`;
  const h1 = `${kw} — ${brand} 안치·개별 화장`;

  const sections = [
    {
      h2: pick(INTRO_H2, seed).replace(/\{kw\}/g, kw).replace(/\{brand\}/g, brand),
      paragraphs: [
        `${kw}를 찾을 때 보호자가 가장 먼저 묻는 것은 안치 가능 여부와 개별 화장 여부입니다. ${brand}는 정보 나열이 아니라 식장 동선(안치→추모→화장→수습)으로 설명합니다.`,
        `갑작스러운 이별 앞에서는 검색어보다 체중·도착 시간이 더 중요합니다. 카카오톡 오픈채팅으로 두 가지만 남겨 주시면, 픽업과 안치 일정을 먼저 잡아 드립니다.`,
        `${kw} 인근에서 방문이 어려우면 픽업 동선을 함께 조율합니다. 견적은 체중 구간을 숨기지 않고 말씀드립니다.`,
      ],
    },
    {
      h2: `${brand}가 ${kw} 일정에서 지키는 기준`,
      paragraphs: [
        `개별 화장을 기본으로 안내하고, 확인이 필요한 항목은 상담에서 먼저 정리합니다. 보호자가 식장에 도착해 헤매지 않도록 추모 시간과 대기 위치도 미리 알려 드립니다.`,
        `${SITE.areaServed} 범위에서 일정 조율이 가능합니다. 야간 픽업이 필요하면 24시 상담으로 연결합니다.`,
        `${kw}로 들어오신 경우, 비용·준비물·수습 시각을 짧게 확인한 뒤 오픈채팅으로 확정하는 것을 권합니다.`,
      ],
    },
    {
      h2: `${kw} 다음 단계 — 문의 전에 준비할 것`,
      paragraphs: [
        `상담 전에 아이 체중, 현재 위치, 희망 도착 시간만 적어두시면 됩니다. ${kw} 문의는 홈페이지 폼 또는 카카오톡 오픈채팅으로 접수합니다.`,
        `${brand}는 식장 진행 순서를 네 단계로만 나눕니다. 지금 바로 오픈채팅으로 일정을 확인해 주세요.`,
      ],
    },
  ];

  const faqs = [
    {
      q: `${kw} 상담 시 무엇을 말하면 되나요?`,
      a: `체중, 지역, 희망 시간만 남겨 주시면 ${brand}가 안치·픽업 가능 여부를 먼저 회신합니다. 사이트 문의 또는 카카오톡 오픈채팅으로 접수하세요.`,
    },
    {
      q: `개별 화장으로 진행되나요?`,
      a: `네. ${brand}는 개별 화장을 기본으로 안내합니다. 일정 확인이 필요한 부분은 오픈채팅에서 미리 말씀드립니다.`,
    },
    {
      q: `밤에 급히 ${kw} 일정이 필요할 때는요?`,
      a: `24시 픽업·안치 상담이 가능합니다. 오픈채팅으로 현재 위치와 상황을 알려 주세요.`,
    },
  ];

  const tweak = seed % 3;
  if (tweak === 1) {
    sections[0].paragraphs[0] = sections[0].paragraphs[0].replace("설명합니다", "안내합니다");
  } else if (tweak === 2) {
    sections[1].paragraphs[0] = sections[1].paragraphs[0].replace("알려 드립니다", "먼저 안내합니다");
  }

  const now = new Date().toISOString();
  const region = extractRegionFromKeyword(kw);
  const theme = extractKeywordTheme(kw);
  const areas = getSubRegionNames(region, 5);
  const stations = getNearbyStationNames(region, 5);
  const geoKw = [
    ...areas.map((a) => `${a} ${theme}`),
    ...stations.map((s) => `${s} ${theme}`),
  ].join(", ");
  let metaDescriptionFinal = metaDescription;
  if (areas.length || stations.length) {
    const nearBits = [...areas.slice(0, 3), ...stations.slice(0, 3)].slice(0, 4).join(" · ");
    metaDescriptionFinal = `${metaDescription} 근방·인근(${nearBits}) ${theme} 검색 안내.`;
  }
  return {
    slug: slugifyKeyword(kw, `t${pageIndex}${seed.toString(36).slice(0, 4)}`),
    keyword: kw,
    title,
    metaDescription: metaDescriptionFinal,
    metaKeywords: `${kw}, 안심강아지장례식장, 개별화장, 강아지안치, 강아지장례식장, 24시픽업, 반려동물화장${
      geoKw ? `, ${geoKw}` : ""
    }`,
    h1,
    heroSubtitle: pick(HERO, seed),
    heroBadge: "24시 픽업·안치",
    heroTitleLine1: kw,
    heroTitleLine2: "안치 · 개별 화장",
    heroBar: "식장 동선 기준으로 안내",
    sections,
    faqs,
    images: pickImages(3, seed),
    ctaText: `카카오톡 오픈채팅으로 안치·개별화장 일정 상담 — ${brand}`,
    createdAt: now,
    updatedAt: now,
  };
}
