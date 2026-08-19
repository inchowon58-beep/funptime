import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { SITE, CTA_KAKAO } from "@/lib/site";
import { imageUrl } from "@/lib/images";

const SERVICES = [
  {
    title: "긴급 픽업·안치",
    desc: "야간에도 안치 일정부터 잡아 드립니다",
    image: imageUrl(2),
    tag: "픽업",
  },
  {
    title: "식장 추모 시간",
    desc: "보호자가 아이와 인사할 공간을 안내합니다",
    image: imageUrl(4),
    tag: "추모",
  },
  {
    title: "개별 화장",
    desc: "화장 후 유골 수습까지 같은 흐름으로",
    image: imageUrl(6),
    tag: "화장",
  },
  {
    title: "유골함·기념",
    desc: "수습 이후 선택 항목만 필요한 만큼 안내",
    image: imageUrl(9),
    tag: "마무리",
  },
];

export default function Services() {
  return (
    <section id="services" className="section bg-[var(--navy)] text-white">
      <div className="container">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-[var(--coral)]">SERVICE</p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">식장에서 이어지는 네 가지</h2>
            <p className="mt-3 max-w-xl text-white/70">
              픽업부터 수습까지, 보호자가 중간에 길을 잃지 않도록 한 줄로 연결합니다.
            </p>
          </div>
          <a
            href={SITE.kakaoOpenChatUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary shrink-0 inline-flex items-center gap-2"
          >
            <MessageCircle size={18} />
            {CTA_KAKAO}
          </a>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {SERVICES.map((item) => (
            <article key={item.title} className="overflow-hidden rounded-[var(--radius-lg)] bg-[#24332c]">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={item.image}
                  alt={`${item.title} — ${SITE.name}`}
                  fill
                  unoptimized
                  className="object-cover transition duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
                <span className="absolute left-3 top-3 rounded-sm bg-[var(--bg-warm)] px-2 py-0.5 text-[0.65rem] font-bold text-[var(--navy)]">
                  {item.tag}
                </span>
              </div>
              <div className="p-4">
                <h3 className="text-base font-bold sm:text-lg">{item.title}</h3>
                <p className="mt-1 text-xs text-white/65 sm:text-sm">{item.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
