"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, MessageCircle, X } from "lucide-react";
import { SITE, CTA_KAKAO } from "@/lib/site";

const NAV = [
  { href: "/#about", label: "식장 소개" },
  { href: "/#services", label: "서비스" },
  { href: "/#process", label: "진행 순서" },
  { href: "/#reviews", label: "후기" },
  { href: "/guide", label: "지역안내" },
  { href: "/#contact", label: "문의" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[rgba(250,246,238,0.94)] backdrop-blur-md">
      <div className="flex items-center justify-center gap-2 bg-[var(--navy)] px-3 py-2 text-center text-[0.75rem] font-medium tracking-wide text-[var(--coral-soft)] md:text-sm">
        <span>24시 픽업 상담 · 안치 · 개별 화장 · 카카오톡 오픈채팅</span>
      </div>

      <div className="container flex h-14 items-center justify-between md:h-[4.25rem]">
        <Link href="/" className="flex flex-col leading-tight">
          <span className="text-[0.65rem] font-semibold tracking-[0.16em] text-[var(--sky)]">
            ANSIM
          </span>
          <span className="font-serif text-lg font-bold tracking-tight text-[var(--navy)] md:text-xl">
            {SITE.brand}
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-[0.92rem] font-medium text-[var(--muted)] lg:flex">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-[var(--coral-deep)]">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={SITE.kakaoOpenChatUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 rounded-md bg-[var(--sky)] px-3 py-2 text-sm font-semibold text-white sm:inline-flex"
          >
            <MessageCircle size={16} />
            {CTA_KAKAO}
          </a>
          <Link
            href="/#contact"
            className="hidden rounded-md bg-[var(--coral)] px-3.5 py-2 text-sm font-bold text-white md:inline-flex"
          >
            상담 신청
          </Link>
          <button
            type="button"
            className="inline-flex rounded-lg p-2 text-[var(--navy)] lg:hidden"
            aria-label="메뉴"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-[var(--line)] bg-[var(--bg-warm)] px-4 py-3 lg:hidden">
          <nav className="flex flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl px-3 py-2.5 text-sm font-medium text-[var(--navy)] hover:bg-[var(--sky-soft)]"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={SITE.kakaoOpenChatUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center gap-2 rounded-md bg-[var(--sky)] px-3 py-2.5 text-sm font-semibold text-white"
              onClick={() => setOpen(false)}
            >
              <MessageCircle size={16} />
              {CTA_KAKAO}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
