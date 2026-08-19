import Image from "next/image";
import { SITE } from "@/lib/site";
import { imageUrl } from "@/lib/images";

const PROMISES = [
  {
    n: "01",
    title: "시설 흐름이 한눈에",
    desc: "안치실·추모실·화장 일정까지, 보호자가 동선을 미리 알 수 있게 안내합니다.",
  },
  {
    n: "02",
    title: "개별 화장 기준",
    desc: "혼동화장이 아닌 개별 진행을 기본으로 설명합니다. 확인이 필요한 부분은 상담에서 먼저 정리합니다.",
  },
  {
    n: "03",
    title: "견적은 숨기지 않습니다",
    desc: "체중·옵션·일정에 따른 차이를 먼저 말씀드립니다. 카카오톡으로도 같은 기준으로 안내합니다.",
  },
];

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container grid items-center gap-12 md:grid-cols-2">
        <div className="rounded-media relative aspect-[4/5] overflow-hidden shadow-[0_24px_50px_rgba(30,42,36,0.14)] md:aspect-[5/6]">
          <Image
            src={imageUrl(8)}
            alt={`${SITE.name} 추모 공간`}
            fill
            unoptimized
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div>
          <p className="text-xs font-bold tracking-[0.2em] text-[var(--sky)]">HALL</p>
          <h2 className="mt-3 text-3xl font-bold text-[var(--navy)] md:text-[2.6rem]">
            멀리 옮기지 않아도
            <br />
            절차는 분명하게
          </h2>
          <p className="mt-5 leading-relaxed text-[var(--muted)]">
            {SITE.brand}는 정보만 모아 두는 곳이 아니라, 식장에서 실제로 진행되는 순서를
            기준으로 상담합니다. 처음이어도 선택지가 헷갈리지 않도록 단계를 나눠 설명합니다.
          </p>
          <div className="mt-9 space-y-4">
            {PROMISES.map((p) => (
              <div key={p.n} className="border-l-[3px] border-[var(--coral)] bg-white/70 py-4 pl-5 pr-4">
                <p className="text-xs font-bold tracking-wider text-[var(--coral-deep)]">{p.n}</p>
                <h3 className="mt-1 text-lg font-bold text-[var(--navy)]">{p.title}</h3>
                <p className="mt-1 text-sm text-[var(--muted)]">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
