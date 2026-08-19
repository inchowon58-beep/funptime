const STATS = [
  { value: "24시", label: "긴급 픽업 상담" },
  { value: "개별", label: "화장·안치 안내" },
  { value: "전국", label: "일정 조율 가능" },
];

export default function Stats() {
  return (
    <section className="border-y border-[var(--line)] bg-[var(--navy)] py-10 text-white md:py-14">
      <div className="container">
        <p className="text-center text-sm tracking-wide text-white/55">
          시설 기준의 안심 장례 — 숫자보다 절차가 먼저입니다
        </p>
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="font-serif text-2xl font-bold text-[var(--coral)] md:text-4xl">{s.value}</p>
              <p className="mt-2 text-xs text-white/70 md:text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
