import Image from "next/image";
import { ArrowDown, MessageCircle } from "lucide-react";
import { SITE, CTA_KAKAO } from "@/lib/site";
import { imageUrl } from "@/lib/images";

export default function Hero() {
  const heroImage = imageUrl(1);

  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden text-white">
      <div className="absolute inset-0 hero-media">
        <Image
          src={heroImage}
          alt={`${SITE.name} 전경`}
          fill
          unoptimized
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(30,42,36,0.62)_0%,rgba(30,42,36,0.28)_42%,rgba(30,42,36,0.78)_100%)]" />
      </div>

      <div className="container relative flex min-h-[100svh] flex-col justify-end pb-32 pt-32 md:justify-center md:pb-24 md:pt-28">
        <p className="animate-rise text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[var(--coral-soft)]">
          {SITE.farm}
        </p>
        <h1 className="animate-rise-delay mt-5 max-w-3xl font-serif text-[2.15rem] font-bold leading-[1.22] sm:text-5xl md:text-6xl">
          익숙한 숨결이 머문 자리에서
          <span className="mt-3 block text-[0.72em] font-medium text-white/92">
            흔들리지 않게, 안심하고 배웅합니다
          </span>
        </h1>
        <p className="animate-rise-delay-2 mt-6 max-w-xl text-base leading-relaxed text-white/88 md:text-lg">
          안치·개별 화장·추모 공간을 한 시설 흐름으로 안내합니다. 급할수록 절차를 짧게, 마음은 천천히.
        </p>
        <div className="animate-rise-delay-2 mt-10 flex flex-wrap gap-3">
          <a href="#process" className="btn-primary">
            진행 순서 보기
            <ArrowDown size={18} />
          </a>
          <a
            href={SITE.kakaoOpenChatUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary !border-white/75 !bg-white/10 backdrop-blur-sm"
          >
            <MessageCircle size={18} />
            {CTA_KAKAO}
          </a>
        </div>
      </div>
    </section>
  );
}
