import { SITE } from "@/lib/site";

const REVIEWS = [
  {
    quote: "체중만 말씀드렸는데 견적 구간을 바로 알려 주셔서, 밤에 혼자 검색하지 않아도 됐습니다.",
    name: "김○○ 보호자",
    course: "야간 상담",
  },
  {
    quote: "안치실 위치와 추모 시간을 미리 설명해 주셔서, 식장에 도착해서 헤매지 않았습니다.",
    name: "이○○ 보호자",
    course: "안치·추모",
  },
  {
    quote: "개별 화장인지 먼저 확인해 주셔서 마음이 놓였습니다. 수습까지 같은 담당이 이어 주셨어요.",
    name: "박○○ 보호자",
    course: "개별 화장",
  },
  {
    quote: "픽업 시간만 맞추면 됐어서, 가족은 인사에만 집중할 수 있었습니다.",
    name: "최○○ 보호자",
    course: "픽업 일정",
  },
  {
    quote: "유골함 선택지를 강요하지 않고, 필요한 것만 골라 설명해 주셨습니다.",
    name: "정○○ 보호자",
    course: "수습 안내",
  },
  {
    quote: "오픈채팅으로도 식장 진행 순서가 그림처럼 정리돼 이해가 빨랐습니다.",
    name: "한○○ 보호자",
    course: "오픈채팅",
  },
];

export default function Reviews() {
  return (
    <section id="reviews" className="section bg-white/40">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold tracking-[0.2em] text-[var(--sky)]">VOICE</p>
          <h2 className="mt-3 text-3xl font-bold text-[var(--navy)] md:text-4xl">
            보호자가 남긴 짧은 기록
          </h2>
          <p className="mt-3 text-[var(--muted)]">
            {SITE.brand} 상담·식장 안내를 경험하신 분의 이야기입니다.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((r) => (
            <blockquote key={r.name + r.course} className="border border-[var(--line)] bg-[var(--bg-warm)] p-6">
              <p className="leading-relaxed text-[var(--ink)]">&ldquo;{r.quote}&rdquo;</p>
              <footer className="mt-4 border-t border-[var(--line)] pt-3">
                <p className="text-sm font-bold text-[var(--navy)]">{r.name}</p>
                <p className="text-xs text-[var(--coral-deep)]">{r.course}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
