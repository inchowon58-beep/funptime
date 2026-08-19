# -*- coding: utf-8 -*-
"""문서 본문 생성 (템플릿) — 안심강아지장례식장.
식장 동선·안치·개별 화장 중심으로 SeoPage를 만듭니다.
"""

from __future__ import annotations

import hashlib
import json
import os
import random
import string
import time
from datetime import datetime
from typing import Any, Dict, List
from urllib.parse import quote

from nearby_geo import extract_region, extract_theme, nearby_areas, nearby_html_blocks, nearby_keyword_csv, nearby_stations
from gemini_gen import DEFAULT_MODEL, build_gemini_page

BRAND = "안심강아지장례식장"
FARM = "반려동물 장례식장"
SITE_NAME = "안심강아지장례식장"
PHONE = "0505-300-7779"
PHONE_TEL = "05053007779"
LOCATION = "대한민국 전국"
IMAGE_BASE = "https://image.cattery.co.kr/petfuneral"
IMAGE_COUNT = 17
IMAGE_USE = 3  # 히어로 1 + 본문 2


def _rng(keyword: str, idx: int) -> random.Random:
    seed = int(hashlib.md5(f"{keyword}|{idx}|cloud".encode()).hexdigest()[:8], 16)
    return random.Random(seed)


def image_urls(count: int, seed: int) -> List[str]:
    rng = random.Random(seed)
    pool = [f"{IMAGE_BASE}/{i:02d}.webp" for i in range(1, IMAGE_COUNT + 1)]
    rng.shuffle(pool)
    return pool[:count]


def slugify(keyword: str, idx: int) -> str:
    base = "".join(
        c if c.isalnum() or c in "-_" else "-" for c in keyword.lower().replace(" ", "-")
    )
    base = base.strip("-")[:36] or "petfuneral"
    tail = f"{idx:02d}{''.join(random.choices(string.ascii_lowercase + string.digits, k=4))}"
    return f"{base}-{tail}"


def _page_to_summary(page: Dict[str, Any]) -> Dict[str, str]:
    return {
        "slug": page["slug"],
        "keyword": page.get("keyword") or "",
        "title": page.get("title") or page.get("h1") or page["slug"],
        "metaDescription": page.get("metaDescription") or "",
        "h1": page.get("h1") or page.get("title") or page["slug"],
        "createdAt": page.get("createdAt") or "",
        "updatedAt": page.get("updatedAt") or page.get("createdAt") or "",
    }


def build_content(keyword: str, idx: int) -> Dict[str, Any]:
    rng = _rng(keyword, idx)
    kw = keyword.strip() or "강아지장례식장"
    heroes = [
        "안치부터 개별 화장까지 식장 기준으로",
        "체중·일정만 알려 주시면 동선을 잡아 드립니다",
        "급할수록 절차는 짧게, 인사는 천천히",
        "보호자가 길을 잃지 않는 장례식장 안내",
    ]
    line2_opts = [
        "안치 · 개별 화장",
        "24시 픽업 상담",
        "식장 동선 안내",
        "체중 구간 견적",
    ]
    bar_opts = [
        "체중만 알려 주셔도 됩니다",
        "안치 가능 여부부터 확인합니다",
        "개별 화장을 기본으로 안내합니다",
        "픽업 시간을 먼저 맞춥니다",
    ]
    intro_h2 = [
        f"{kw}, 식장에서 먼저 확인할 세 가지",
        f"{kw} 검색 전에 안치·화장 구분하기",
        f"{kw}와 개별 화장, 보호자가 묻는 점",
        f"{BRAND}가 {kw} 일정을 잡는 방식",
    ]

    title = f"{kw} | {BRAND} 안치·개별화장"
    if len(title) > 60:
        title = f"{kw} | {BRAND}"
    region = extract_region(kw)
    theme = extract_theme(kw)
    areas = nearby_areas(region)
    stations = nearby_stations(region)
    meta_desc = (
        f"{kw} — {BRAND}에서 안치, 개별 화장, 24시 픽업을 식장 기준으로 안내합니다. "
        f"체중 구간 견적. 문의 {PHONE}."
    )
    if areas or stations:
        near_bits = " · ".join((areas[:3] + stations[:3])[:4])
        meta_desc = f"{meta_desc} 근방·인근({near_bits}) {theme} 검색 안내."
    if len(meta_desc) > 160:
        meta_desc = meta_desc[:157] + "..."

    variants = ["차분히", "꼼꼼히", "따뜻하게"]
    tone = variants[idx % len(variants)]
    h2_0 = intro_h2[idx % len(intro_h2)]

    sections = [
        {
            "h2": h2_0,
            "paragraphs": [
                f"{kw}를 찾을 때 보호자가 먼저 묻는 것은 안치 가능 여부와 개별 화장입니다. "
                f"{BRAND}는 {tone} 식장 동선(안치→추모→화장→수습)으로 설명합니다.",
                f"갑작스러운 이별 앞에서는 검색어보다 체중·도착 시간이 더 중요합니다. "
                f"두 가지만 알려 주시면 픽업과 안치 일정을 먼저 잡아 드립니다.",
                f"상담은 전화({PHONE}) 또는 카카오톡으로 가능합니다. "
                f"견적은 체중 구간을 숨기지 않고 말씀드립니다.",
            ],
        },
        {
            "h2": f"{BRAND}가 {kw} 일정에서 지키는 기준",
            "paragraphs": [
                f"개별 화장을 기본으로 안내하고, 확인이 필요한 항목은 상담에서 먼저 정리합니다. "
                f"보호자가 식장에서 헤매지 않도록 추모 시간과 대기 위치도 미리 알려 드립니다.",
                f"상담 범위는 {LOCATION}입니다. 야간 픽업이 필요하면 24시로 연결합니다.",
                f"{kw}로 들어오셨다면 비용·준비물·수습 시각을 짧게 확인한 뒤 "
                f"전화({PHONE})로 확정하는 것을 권합니다.",
            ],
        },
        {
            "h2": f"{kw} 다음 단계 — 문의 전에 준비할 것",
            "paragraphs": [
                f"상담 전에 아이 체중, 현재 위치, 희망 도착 시간만 적어두시면 됩니다. "
                f"{kw} 문의는 홈페이지 또는 {PHONE}입니다.",
                f"{BRAND}는 식장 진행을 네 단계로만 나눕니다. 지금 바로 일정을 확인해 주세요.",
            ],
        },
    ]
    faqs = [
        {
            "q": f"{kw} 상담 시 무엇을 말하면 되나요?",
            "a": f"체중, 지역, 희망 시간만 남겨 주시면 {BRAND}가 안치·픽업 가능 여부를 회신합니다. "
            f"전화 {PHONE}.",
        },
        {
            "q": "개별 화장으로 진행되나요?",
            "a": f"네. {BRAND}는 개별 화장을 기본으로 안내합니다. 일정 확인이 필요하면 미리 말씀드립니다.",
        },
        {
            "q": f"밤에 급히 {kw} 일정이 필요할 때는요?",
            "a": f"24시 픽업·안치 상담이 가능합니다. 현재 위치를 알려 주세요. {PHONE}",
        },
        {
            "q": f"{BRAND} 문의 전화번호는?",
            "a": f"{PHONE}입니다.",
        },
    ]
    now = datetime.utcnow().isoformat() + "Z"
    line2 = line2_opts[idx % len(line2_opts)]
    geo_kw = nearby_keyword_csv(kw)
    meta_keywords = (
        f"{kw}, 안심강아지장례식장, 개별화장, 강아지안치, 강아지장례식장, "
        f"24시픽업, 반려동물화장"
    )
    if geo_kw:
        meta_keywords = f"{meta_keywords}, {geo_kw}"
    return {
        "slug": slugify(kw, idx),
        "keyword": kw,
        "title": title,
        "metaDescription": meta_desc,
        "metaKeywords": meta_keywords,
        "h1": f"{kw} — {BRAND} 안치·개별 화장",
        "heroSubtitle": heroes[idx % len(heroes)],
        "heroBadge": "24시 픽업·안치",
        "heroTitleLine1": kw,
        "heroTitleLine2": line2,
        "heroBar": bar_opts[idx % len(bar_opts)],
        "sections": sections,
        "faqs": faqs,
        "images": image_urls(IMAGE_USE, rng.randint(1, 99999)),
        "ctaText": f"안치·개별화장 상담 {PHONE} — {BRAND}",
        "nearbyAreas": areas,
        "nearbyStations": stations,
        "regionLabel": region or "",
        "keywordTheme": theme,
        "createdAt": now,
        "updatedAt": now,
    }


def write_html(page: Dict[str, Any], site_url: str) -> str:
    imgs = page.get("images") or []
    hero = imgs[0] if imgs else ""
    sections = ""
    for i, sec in enumerate(page["sections"]):
        ps = "".join(f"<p>{p}</p>" for p in sec["paragraphs"])
        sections += f"<section><h2>{sec['h2']}</h2>{ps}</section>"
        if i < 2 and i + 1 < len(imgs):
            sections += (
                f'<figure><img src="{imgs[i+1]}" alt="{page["keyword"]} 장례 {i+2}" '
                f'loading="lazy"/></figure>'
            )
    faqs = "".join(
        f"<details><summary>{f['q']}</summary><p>{f['a']}</p></details>" for f in page["faqs"]
    )
    nearby = nearby_html_blocks(page.get("keyword") or "", page.get("regionLabel") or None)
    url = f"{site_url.rstrip('/')}/guide/{page['slug']}"
    og = hero or ""
    return f"""<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8"/>
<title>{page['title']}</title>
<meta name="description" content="{page['metaDescription']}"/>
<meta name="keywords" content="{page['metaKeywords']}"/>
<link rel="canonical" href="{url}"/>
<meta property="og:type" content="article"/>
<meta property="og:title" content="{page['title']}"/>
<meta property="og:description" content="{page['metaDescription']}"/>
<meta property="og:url" content="{url}"/>
<meta property="og:image" content="{og}"/>
<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:title" content="{page['title']}"/>
<meta name="twitter:description" content="{page['metaDescription']}"/>
<meta name="twitter:image" content="{og}"/>
</head>
<body>
<header><a href="{site_url}">{SITE_NAME}</a></header>
<article>
<h1>{page['h1']}</h1>
<p>{page['heroSubtitle']}</p>
{sections}
<section><h2>자주 묻는 질문</h2>{faqs}</section>
{nearby}
<p><a href="tel:{PHONE_TEL}">{page['ctaText']}</a></p>
</article>
</body>
</html>"""


def generate_batch(
    keywords: List[str],
    out_dir: str,
    site_url: str,
    sync_public: str = "",
    stop_requested=None,
    gen_mode: str = "template",
    gemini_api_key: str = "",
    gemini_model: str = DEFAULT_MODEL,
    gemini_prompt: str = "",
    on_log=None,
) -> List[str]:
    os.makedirs(out_dir, exist_ok=True)
    pages_dir = os.path.join(out_dir, "pages")
    os.makedirs(pages_dir, exist_ok=True)
    slugs: List[str] = []
    entries: List[Dict[str, str]] = []
    urls: List[str] = []
    n = len(keywords)
    gemini_gap = 2.8
    for i, kw in enumerate(keywords, 1):
        if stop_requested and stop_requested():
            break
        use_gemini = (gen_mode or "template").strip().lower() == "gemini"
        if use_gemini:
            if on_log:
                on_log(f"[{i}/{n}] 제미나이 생성 시작: {kw}")
            try:
                page = build_gemini_page(
                    kw,
                    i,
                    api_key=gemini_api_key,
                    model=gemini_model or DEFAULT_MODEL,
                    user_prompt=gemini_prompt or "",
                    slugify_fn=slugify,
                    image_urls_fn=image_urls,
                    on_log=on_log,
                )
                if on_log:
                    on_log(f"[{i}/{n}] 제미나이 완료: {page.get('slug')}")
            except Exception as exc:
                if on_log:
                    on_log(f"[{i}/{n}] 제미나이 실패 → 기본 양식: {kw} · {exc}")
                page = build_content(kw, i)
                page["generatedBy"] = "template-fallback"
        else:
            page = build_content(kw, i)
            page["generatedBy"] = "template"
        slugs.append(page["slug"])
        entries.append(_page_to_summary(page))
        with open(os.path.join(pages_dir, f"{page['slug']}.json"), "w", encoding="utf-8") as f:
            json.dump(page, f, ensure_ascii=False, indent=2)
        html = write_html(page, site_url)
        with open(os.path.join(out_dir, f"{page['slug']}.html"), "w", encoding="utf-8") as f:
            f.write(html)
        urls.append(f"{site_url.rstrip('/')}/guide/{quote(page['slug'])}")
        index = {
            "slugs": slugs,
            "entries": entries,
            "updatedAt": datetime.utcnow().isoformat() + "Z",
        }
        with open(os.path.join(out_dir, "index.json"), "w", encoding="utf-8") as f:
            json.dump(index, f, ensure_ascii=False, indent=2)
        if use_gemini and i < n:
            if on_log:
                on_log(f"[{i}/{n}] 다음 글까지 {gemini_gap:.0f}초 대기")
            left = float(gemini_gap)
            while left > 0:
                if stop_requested and stop_requested():
                    break
                step = min(0.5, left)
                time.sleep(step)
                left -= step
    if not urls:
        return []
    index = {
        "slugs": slugs,
        "entries": entries,
        "updatedAt": datetime.utcnow().isoformat() + "Z",
    }
    with open(os.path.join(out_dir, "index.json"), "w", encoding="utf-8") as f:
        json.dump(index, f, ensure_ascii=False, indent=2)
    with open(os.path.join(out_dir, "urls.txt"), "w", encoding="utf-8") as f:
        f.write("\n".join(urls))
    if sync_public:
        pub_pages = os.path.join(sync_public, "pages")
        os.makedirs(pub_pages, exist_ok=True)
        existing: Dict[str, Any] = {"slugs": [], "entries": [], "updatedAt": ""}
        idx_path = os.path.join(sync_public, "index.json")
        if os.path.isfile(idx_path):
            with open(idx_path, encoding="utf-8") as f:
                existing = json.load(f)
        by_slug = {e["slug"]: e for e in (existing.get("entries") or []) if e.get("slug")}
        for slug, entry in zip(slugs, entries):
            if stop_requested and stop_requested():
                break
            src = os.path.join(pages_dir, f"{slug}.json")
            dst = os.path.join(pub_pages, f"{slug}.json")
            with open(src, encoding="utf-8") as f:
                data = f.read()
            with open(dst, "w", encoding="utf-8") as f:
                f.write(data)
            by_slug[slug] = entry
            if slug in existing.get("slugs", []):
                existing["slugs"].remove(slug)
            existing.setdefault("slugs", []).insert(0, slug)
        existing["entries"] = [by_slug[s] for s in existing["slugs"] if s in by_slug]
        existing["updatedAt"] = datetime.utcnow().isoformat() + "Z"
        with open(idx_path, "w", encoding="utf-8") as f:
            json.dump(existing, f, ensure_ascii=False, indent=2)
    return urls
