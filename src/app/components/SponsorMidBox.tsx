import Link from "next/link";
import { BadgeCheck, Eye, Globe, MessageCircle, PhoneCall } from "lucide-react";
import type { SiteSponsor } from "@/lib/site-sponsor-shared";
import { phoneToTel, sponsorKakaoUrl, sponsorHomepageUrl } from "@/lib/site-sponsor-shared";
import { SITE, CTA_KAKAO } from "@/lib/site";

type Props = { sponsor: SiteSponsor; showPreviewLink?: boolean };

export default function SponsorMidBox({ sponsor, showPreviewLink = true }: Props) {
  const kakaoUrl = sponsorKakaoUrl(sponsor) || SITE.kakaoOpenChatUrl;
  const homepageUrl = sponsorHomepageUrl(sponsor);
  const phoneHref = sponsor.phone_number ? phoneToTel(sponsor.phone_number) : "";

  if (sponsor.status === "RECRUITING") {
    return (
      <aside className="my-10 rounded-[1.75rem] border border-[var(--sky)] bg-[var(--sky-soft)] p-6 text-center md:p-8">
        <p className="text-lg font-extrabold text-[var(--navy)] md:text-xl">
          📢 전국 안심 장례식장 입점 제휴 / 사이트 임대 모집 중
        </p>
        <p className="mt-2 text-sm text-[var(--muted)]">{sponsor.recruiting_notice}</p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          {sponsor.phone_number && (
            <a href={phoneHref} className="btn-primary inline-flex">
              <PhoneCall size={18} />
              전화 제휴문의
            </a>
          )}
          <a
            href={kakaoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex"
          >
            <MessageCircle size={18} />
            카카오톡 제휴 문의하기 {sponsor.rental_price ? `· 비용 ${sponsor.rental_price}` : ""}
          </a>
          {homepageUrl && (
            <a
              href={homepageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-[var(--sky)] px-4 py-3 text-sm font-bold text-[var(--sky)]"
            >
              <Globe size={18} />
              홈페이지
            </a>
          )}
          {showPreviewLink && (
            <Link
              href="/sample"
              className="inline-flex items-center gap-1.5 rounded-full border border-[var(--line)] bg-white px-4 py-3 text-sm font-bold text-[var(--navy)]"
            >
              <Eye size={18} />
              입점 후 미리보기
            </Link>
          )}
        </div>
      </aside>
    );
  }

  const points = (sponsor.highlight_points || []).slice(0, 5);

  return (
    <aside className="relative my-10 rounded-[1.75rem] border border-[var(--coral)] bg-[var(--coral-soft)] p-6 md:p-8">
      <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-bold text-[var(--coral-deep)] shadow-sm">
        <BadgeCheck size={14} />
        인증 확인
      </span>
      <p className="pt-6 text-center text-lg font-extrabold text-[var(--navy)] md:text-xl">
        📍 검증된 안심 반려동물 장례식장
      </p>
      <div className="mt-4 flex flex-col items-center gap-3 text-center">
        {sponsor.sponsor_name && (
          <p className="text-xl font-bold text-[var(--sky-deep)]">{sponsor.sponsor_name}</p>
        )}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {points.map((point) => (
            <p
              key={point}
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[var(--navy)]"
            >
              {point}
            </p>
          ))}
        </div>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
          {sponsor.phone_number && (
            <a href={phoneHref} className="btn-primary inline-flex">
              <PhoneCall size={18} />
              장례상담
            </a>
          )}
          {homepageUrl && (
            <a
              href={homepageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-[var(--sky)] px-4 py-3 text-sm font-bold text-[var(--sky)]"
            >
              <Globe size={18} />
              홈페이지
            </a>
          )}
          <a
            href={kakaoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex"
          >
            <MessageCircle size={18} />
            {CTA_KAKAO}
          </a>
        </div>
      </div>
    </aside>
  );
}
