import { SITE } from "@/lib/site";

const STEPS = [
  {
    n: "01",
    title: "상황 확인",
    desc: "체중·지역·희망 시간을 먼저 받습니다. 야간에도 오픈채팅으로 접수합니다.",
  },
  {
    n: "02",
    title: "픽업 또는 방문",
    desc: "식장으로 모시거나, 일정을 맞춰 방문합니다. 동선은 미리 안내합니다.",
  },
  {
    n: "03",
    title: "안치·추모",
    desc: "보호자가 인사할 시간을 확보한 뒤, 화장 일정을 확정합니다.",
  },
  {
    n: "04",
    title: "화장·수습",
    desc: "개별 화장 후 유골함을 전달하고, 이후 선택 사항만 짧게 안내합니다.",
  },
];

export default function Process() {
  return (
    <section id="process" className="section">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold tracking-[0.2em] text-[var(--sky)]">PROCESS</p>
          <h2 className="mt-3 text-3xl font-bold text-[var(--navy)] md:text-4xl">
            처음이어도 순서는 짧습니다
          </h2>
          <p className="mt-3 text-[var(--muted)]">
            {SITE.brand}는 네 단계로만 나눕니다. 급할수록 설명은 더 짧게 합니다.
          </p>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius-lg)] border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s) => (
            <div key={s.n} className="bg-[var(--bg-warm)] p-7">
              <p className="font-serif text-2xl text-[var(--coral)]">{s.n}</p>
              <h3 className="mt-3 text-lg font-bold text-[var(--navy)]">{s.title}</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
