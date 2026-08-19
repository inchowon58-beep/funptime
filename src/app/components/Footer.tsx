import Link from "next/link";
import { MapPin, MessageCircle } from "lucide-react";
import { SITE, CTA_KAKAO } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#15201c] py-14 text-white">
      <div className="container grid gap-10 md:grid-cols-[1.3fr_1fr]">
        <div>
          <Link href="/" className="inline-block">
            <p className="text-[0.7rem] font-semibold tracking-[0.22em] text-[var(--coral)]">ANSIM</p>
            <h2 className="mt-2 font-serif text-2xl font-bold hover:text-[var(--coral-soft)]">{SITE.brand}</h2>
          </Link>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/65">{SITE.tagline}</p>
        </div>

        <div className="space-y-3 text-sm text-white/80">
          <a
            href={SITE.kakaoOpenChatUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-white"
          >
            <MessageCircle size={16} className="text-[var(--coral)]" />
            {CTA_KAKAO}
          </a>
          <p className="flex items-start gap-2">
            <MapPin size={16} className="mt-0.5 shrink-0 text-[var(--coral)]" />
            {SITE.location} · {SITE.address}
          </p>
          <p className="text-xs text-white/45">도메인 · funeral.puppytimes.co.kr</p>
          <div className="flex flex-wrap items-center gap-3 pt-3">
            <Link
              href="/admin"
              className="inline-flex rounded-md border border-white/20 px-3 py-2 text-xs font-semibold text-white/80 transition hover:border-white/50 hover:bg-white/10 hover:text-white"
            >
              관리자 로그인
            </Link>
            <Link
              href="/admin/sponsor"
              className="inline-flex rounded-md border border-white/20 px-3 py-2 text-xs font-semibold text-white/80 transition hover:border-white/50 hover:bg-white/10 hover:text-white"
            >
              스폰서 관리
            </Link>
          </div>
          <p className="pt-2 text-xs text-white/40">
            © {new Date().getFullYear()} {SITE.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
