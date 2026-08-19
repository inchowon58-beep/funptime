# -*- coding: utf-8 -*-
"""Gemini API로 SeoPage JSON 생성 — 웹문서생성기 전용."""

from __future__ import annotations

import json
import re
import time
from typing import Any, Callable, Dict, List, Optional, Tuple

from google import genai

from nearby_geo import extract_region, extract_theme, nearby_areas, nearby_keyword_csv, nearby_stations

BRAND = "안심강아지장례식장"
FARM = "반려동물 장례식장"
SITE_NAME = "안심강아지장례식장"
PHONE = "0505-300-7779"
LOCATION = "대한민국 전국"

GEMINI_MODELS: List[Dict[str, str]] = [
    {"id": "gemini-3.5-flash-lite", "label": "gemini-3.5-flash-lite · 대량 발행/초저비용"},
    {"id": "gemini-3.6-flash", "label": "gemini-3.6-flash · 속도·문장 균형 주력"},
    {"id": "gemini-3.7-flash", "label": "gemini-3.7-flash · 최신 고성능 Flash"},
    {"id": "gemini-3.1-pro", "label": "gemini-3.1-pro · 고품질 장문·추론"},
]

DEFAULT_MODEL = "gemini-3.5-flash-lite"

DEFAULT_USER_PROMPT = """톤: 식장 실무 안내. 안치·개별 화장·체중 구간 견적 중심. 과장·허위 금지.
'정보센터'라는 표현은 쓰지 마세요. 보호자가 식장에 도착했을 때 헷갈리지 않게 쓰세요.
{keyword}를 제목·H1·본문·FAQ에 자연스럽게 넣으세요.
"""

SYSTEM_SEO_RULES = f"""당신은 '{SITE_NAME}' 장례식장의 SEO 웹문서 작성자입니다.
업체명은 반드시 '{BRAND}'만 사용하세요. 다른 업체·정보센터 이름을 만들지 마세요.

전화: {PHONE}
서비스: 안치, 개별 화장, 24시 픽업, 체중 구간 견적
범위: {LOCATION}

[SEO]
- title 50~60자. 키워드 + 개별화장 또는 안치 또는 브랜드.
- metaDescription 140~160자. 키워드 + 안치·개별화장 + 체중 구간 + 전화.
- metaKeywords 8~12개. 안심강아지장례식장, 개별화장, 강아지안치 포함.
- 본문 3개 섹션 각도는 식장 동선 / 개별화장·견적 / 픽업·수습.
- 각 문단 140자 이상. 키워드 스터핑 금지.

[OG]
- heroSubtitle는 한글만. 영문 금지.

[AEO]
- FAQ 4개. 체중, 개별화장, 야간픽업, 전화.
- 답변 80자 이상.

[금지]
- 가격 단정, 치료 보장, 영문 남용, 정보센터라는 표현.
- JSON 이외 설명·마크다운 금지.

아래 JSON 스키마만 출력하세요.
{{
  "title": "문자열",
  "metaDescription": "문자열",
  "metaKeywords": "쉼표 구분 문자열",
  "h1": "문자열",
  "heroSubtitle": "문자열",
  "sections": [
    {{"h2": "소제목1", "paragraphs": ["문단","문단","문단"]}},
    {{"h2": "소제목2", "paragraphs": ["문단","문단","문단"]}},
    {{"h2": "소제목3", "paragraphs": ["문단","문단"]}}
  ],
  "faqs": [
    {{"q": "질문1", "a": "답변"}},
    {{"q": "질문2", "a": "답변"}},
    {{"q": "질문3", "a": "답변"}},
    {{"q": "질문4", "a": "답변"}}
  ],
  "ctaText": "안치·개별화장 상담 안내 문장"
}}
"""


def default_user_prompt() -> str:
    return DEFAULT_USER_PROMPT.strip() + "\n"


def model_choices() -> List[Dict[str, str]]:
    return list(GEMINI_MODELS)


def _extract_json(text: str) -> Dict[str, Any]:
    raw = (text or "").strip()
    fence = re.search(r"```(?:json)?\s*([\s\S]*?)```", raw)
    if fence:
        raw = fence.group(1).strip()
    start = raw.find("{")
    end = raw.rfind("}")
    if start < 0 or end <= start:
        raise ValueError("제미나이 응답에서 JSON을 찾지 못했습니다.")
    return json.loads(raw[start : end + 1])


class GeminiRateLimitError(RuntimeError):
    """429 / quota 초과 — 잠시 후 재시도."""


def generate_gemini_json(
    keyword: str,
    api_key: str,
    model: str = DEFAULT_MODEL,
    user_prompt: str = "",
    timeout: int = 90,
) -> Dict[str, Any]:
    key = (api_key or "").strip()
    if not key:
        raise ValueError("제미나이 API 키가 없습니다.")
    kw = (keyword or "").strip() or "강아지장례식장"
    extra = (user_prompt or "").replace("{keyword}", kw).strip()
    user_text = f"메인 키워드: {kw}\n"
    if extra:
        user_text += "\n[추가 작성 지시]\n" + extra + "\n"
    user_text += "\n위 규칙과 스키마에 맞는 JSON만 출력하세요."
    mid = (model or "").strip() or DEFAULT_MODEL

    client = genai.Client(api_key=key)
    try:
        response = client.models.generate_content(
            model=mid,
            contents=user_text,
            config={
                "system_instruction": SYSTEM_SEO_RULES,
                "response_mime_type": "application/json",
                "max_output_tokens": 8192,
            },
        )
    except Exception as exc:
        raw = str(exc)
        if "429" in raw or "RESOURCE_EXHAUSTED" in raw or "quota" in raw.lower():
            raise GeminiRateLimitError(raw) from exc
        raise

    text = getattr(response, "text", None) or ""
    if not str(text).strip():
        raise RuntimeError("제미나이 본문이 비었습니다.")
    return _extract_json(str(text))


def test_gemini_key(api_key: str, model: str = DEFAULT_MODEL) -> Tuple[bool, str]:
    key = (api_key or "").strip()
    if not key:
        return False, "API 키가 비어 있습니다. 제미나이 탭에 키를 붙여 넣은 뒤 다시 테스트하세요."
    mid = (model or "").strip() or DEFAULT_MODEL
    try:
        client = genai.Client(api_key=key)
        client.models.generate_content(
            model=mid,
            contents="Reply with the single word OK.",
            config={"max_output_tokens": 16},
        )
        return True, f"연결 성공 · 모델 {mid}"
    except Exception as exc:
        return False, str(exc)


def assemble_from_gemini(
    keyword: str,
    data: Dict[str, Any],
    *,
    slugify_fn: Callable[..., str],
    image_urls_fn: Callable[[int, int], List[str]],
    idx: int,
) -> Dict[str, Any]:
    from datetime import datetime

    kw = (keyword or "").strip() or "강아지장례식장"
    region = extract_region(kw)
    theme = extract_theme(kw)
    areas = nearby_areas(region)
    stations = nearby_stations(region)
    geo_kw = nearby_keyword_csv(kw)

    title = str(data.get("title") or f"{kw} | {FARM} {BRAND}")[:80]
    meta_desc = str(data.get("metaDescription") or "")
    if not meta_desc:
        meta_desc = (
            f"{kw} 안내 — {BRAND}는 24시 긴급 픽업, 장례·화장·추모를 상담합니다. 문의 {PHONE}."
        )
    if areas or stations:
        near_bits = " · ".join((areas[:3] + stations[:3])[:4])
        if near_bits not in meta_desc:
            meta_desc = f"{meta_desc} 근방·인근({near_bits}) {theme} 검색 안내."
    meta_kw = str(data.get("metaKeywords") or "")
    if geo_kw and geo_kw not in meta_kw:
        meta_kw = f"{meta_kw}, {geo_kw}" if meta_kw else geo_kw

    sections = []
    for sec in data.get("sections") or []:
        if not isinstance(sec, dict):
            continue
        h2 = str(sec.get("h2") or "").strip()
        paras = [str(p).strip() for p in (sec.get("paragraphs") or []) if str(p).strip()]
        if h2 and paras:
            sections.append({"h2": h2, "paragraphs": paras})
    faqs = []
    for f in data.get("faqs") or []:
        if not isinstance(f, dict):
            continue
        q, a = str(f.get("q") or "").strip(), str(f.get("a") or "").strip()
        if q and a:
            faqs.append({"q": q, "a": a})

    now = datetime.utcnow().isoformat() + "Z"
    seed = abs(hash(f"{kw}|{idx}|gemini")) % 99999 + 1
    return {
        "slug": slugify_fn(kw, idx),
        "keyword": kw,
        "title": title,
        "metaDescription": meta_desc[:180],
        "metaKeywords": meta_kw,
        "h1": str(data.get("h1") or f"{kw} — {BRAND} 장례·화장·추모"),
        "heroSubtitle": str(data.get("heroSubtitle") or "전국 24시 반려동물 장례 안내"),
        "heroBadge": "24시 긴급 상담",
        "heroTitleLine1": kw,
        "heroTitleLine2": "장례 · 화장 · 추모",
        "heroBar": "존중받는 마지막 길 안내",
        "sections": sections,
        "faqs": faqs,
        "images": image_urls_fn(3, seed),
        "ctaText": str(data.get("ctaText") or f"24시 장례 상담 {PHONE} — {BRAND}"),
        "nearbyAreas": areas,
        "nearbyStations": stations,
        "regionLabel": region or "",
        "keywordTheme": theme,
        "generatedBy": "gemini",
        "geminiModel": "",
        "createdAt": now,
        "updatedAt": now,
    }


def build_gemini_page(
    keyword: str,
    idx: int,
    *,
    api_key: str,
    model: str,
    user_prompt: str,
    slugify_fn: Callable[..., str],
    image_urls_fn: Callable[[int, int], List[str]],
    retries: int = 3,
    on_log: Optional[Callable[[str], None]] = None,
) -> Dict[str, Any]:
    last_err: Optional[Exception] = None
    for attempt in range(1, max(1, retries) + 1):
        try:
            data = generate_gemini_json(keyword, api_key, model=model, user_prompt=user_prompt)
            page = assemble_from_gemini(
                keyword, data, slugify_fn=slugify_fn, image_urls_fn=image_urls_fn, idx=idx
            )
            page["geminiModel"] = model
            if not page["sections"] or not page["faqs"]:
                raise ValueError("섹션 또는 FAQ가 비었습니다.")
            return page
        except GeminiRateLimitError as exc:
            last_err = exc
            wait = min(45.0, 8.0 * attempt)
            if on_log:
                on_log(f"제미나이 한도 — {wait:.0f}초 대기 후 재시도 ({keyword} · {attempt}/{retries})")
            time.sleep(wait)
        except Exception as exc:
            last_err = exc
            if on_log:
                on_log(f"제미나이 실패 ({keyword} · {attempt}/{retries}): {exc}")
            if attempt < retries:
                time.sleep(1.6 * attempt)
    raise RuntimeError(str(last_err) if last_err else "제미나이 생성 실패")
