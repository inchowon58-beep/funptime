import { SITE } from "@/lib/site";
import { HOME_FAQS } from "@/lib/faq-data";

export default function FAQ() {
  return (
    <section id="faq" className="section">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold tracking-[0.2em] text-[var(--sky)]">FAQ</p>
          <h2 className="mt-3 text-2xl font-bold text-[var(--navy)] md:text-4xl">
            식장 상담 전에 많이 묻는 질문
          </h2>
          <p className="mt-4 text-[var(--muted)]">
            안치·개별 화장·픽업 일정을 중심으로 정리했습니다.
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-2xl space-y-3">
          {HOME_FAQS.map((f) => (
            <details
              key={f.q}
              className="soft-card px-5 py-4"
            >
              <summary className="cursor-pointer font-bold text-[var(--navy)]">{f.q}</summary>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
