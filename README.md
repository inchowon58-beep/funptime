# 안심강아지장례식장 (ansim-pet-funeral-hall)

Next.js 15 기반 **안심강아지장례식장** 사이트입니다.
도메인 기준은 `https://funeral.puppytimes.co.kr` 입니다.

## 배포 대상

- GitHub: `inchowon58-beep/funptime`
- 도메인: `funeral.puppytimes.co.kr`
- 배포 확인: `npm run check:deploy-target`

## 로컬 개발

```bash
npm install
npm run dev
```

## 주요 기능

- 메인: 안치 · 개별 화장 · 24시 픽업 상담 안내
- `/guide/[slug]`: 지역별 SEO 웹문서
- `/admin/sponsor`: 전국 단일 스폰서/임대 관리
- `tools/webdoc/`: 웹문서 생성기

## 환경 변수

`.env.example` 참고:

- `NEXT_PUBLIC_SITE_URL`
- `BLOB_READ_WRITE_TOKEN`
- `ADMIN_JWT_SECRET`
- `GEMINI_API_KEY`
