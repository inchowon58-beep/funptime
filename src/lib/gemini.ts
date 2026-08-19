import { GoogleGenAI } from "@google/genai";
import { SITE } from "./site";
import { pickImages } from "./images";
import type { SeoPage } from "./seo-pages";
import { slugifyKeyword } from "./seo-pages";

const MODEL = process.env.GEMINI_MODEL || "gemini-3.5-flash-lite";

function buildPrompt(keyword: string): string {
  return `당신은 '${SITE.name}' 장례식장의 SEO 웹문서 작성자입니다.
업체명은 반드시 '${SITE.brand}'만 사용하세요. '정보센터'라는 표현은 쓰지 마세요.

메인 키워드: ${keyword}
핵심 키워드: 안심강아지장례식장, 개별화장, 강아지안치
상담: 카카오톡 오픈채팅 (${SITE.kakaoOpenChatUrl})
범위: ${SITE.areaServed}

주제 각도(기존 정보센터 문서와 다르게): 식장 동선, 안치실, 개별 화장 여부, 체중 구간 견적, 픽업 시간, 유골 수습 시각.
정보 나열형 가이드 금지. 보호자가 식장에 도착했을 때 헷갈리지 않게 쓰는 실무 안내문.

아래 JSON만 출력. 설명 금지.

{
  "title": "60자 내. '{keyword}' + 개별화장 또는 안치 또는 ${SITE.brand}",
  "metaDescription": "140~160자. '{keyword}', 안치·개별화장, 체중 구간, 카카오톡 유도",
  "metaKeywords": "{keyword}, 안심강아지장례식장, 개별화장, 강아지안치 등 8~12개",
  "h1": "키워드 '{keyword}' 포함 H1",
  "heroSubtitle": "반드시 자연스러운 한글 부제 1문장 (영문 금지)",
  "sections": [
    {"h2": "식장 동선·안치 관련 소제목(키워드 포함)", "paragraphs": ["180자+", "160자+", "160자+"]},
    {"h2": "개별 화장·견적 구간 소제목", "paragraphs": ["180자+", "160자+", "140자+"]},
    {"h2": "픽업·수습 다음 단계 소제목", "paragraphs": ["160자+", "160자+"]}
  ],
  "faqs": [
    {"q": "체중·일정 관련 질문", "a": "답변 80자+"},
    {"q": "개별 화장 관련 질문", "a": "답변 80자+"},
    {"q": "야간 픽업 관련 질문", "a": "답변 80자+"}
  ],
  "ctaText": "카카오톡으로 안치·개별화장 일정 상담 문장"
}

요구: 과장·허위 금지. 영문·외래어 남용 금지. 'dignified' 같은 표현 금지.`;
}

export async function generateWithGemini(
  keyword: string,
  apiKey?: string
): Promise<
  Omit<SeoPage, "slug" | "images" | "createdAt" | "updatedAt"> & { keyword: string }
> {
  const key = apiKey || process.env.GEMINI_API_KEY;
  if (!key) throw new Error("GEMINI_API_KEY가 없습니다.");

  const ai = new GoogleGenAI({ apiKey: key });
  const response = await ai.models.generateContent({
    model: MODEL,
    contents: buildPrompt(keyword),
    config: {
      responseMimeType: "application/json",
    },
  });
  const text = response.text ?? "";
  const fence = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const jsonStr = (fence ? fence[1] : text).trim();
  const data = JSON.parse(jsonStr);

  return {
    keyword,
    title: String(data.title || `${keyword} | ${SITE.name}`),
    metaDescription: String(data.metaDescription || SITE.description),
    metaKeywords: String(data.metaKeywords || keyword),
    h1: String(data.h1 || keyword),
    heroSubtitle: String(data.heroSubtitle || SITE.tagline),
    sections: Array.isArray(data.sections) ? data.sections : [],
    faqs: Array.isArray(data.faqs) ? data.faqs : [],
    ctaText: String(data.ctaText || `카카오톡 오픈채팅으로 안치·개별화장 상담`),
  };
}

export function assembleSeoPage(
  partial: Awaited<ReturnType<typeof generateWithGemini>>,
  slug?: string
): SeoPage {
  const now = new Date().toISOString();
  return {
    slug: slug || slugifyKeyword(partial.keyword),
    keyword: partial.keyword,
    title: partial.title,
    metaDescription: partial.metaDescription,
    metaKeywords: partial.metaKeywords,
    h1: partial.h1,
    heroSubtitle: partial.heroSubtitle,
    heroBadge: "24시 긴급 상담",
    heroTitleLine1: partial.keyword,
    heroTitleLine2: "장례 · 화장 · 추모",
    heroBar: "존중받는 마지막 길 안내",
    sections: partial.sections,
    faqs: partial.faqs,
    images: pickImages(3, Date.now() % 100000),
    ctaText: partial.ctaText,
    createdAt: now,
    updatedAt: now,
  };
}
