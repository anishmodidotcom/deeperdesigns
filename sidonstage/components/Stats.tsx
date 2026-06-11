import CountUp from "./CountUp";
import RevealOnScroll from "./RevealOnScroll";

export default function Stats() {
  return (
    <section
      className="relative py-24 md:py-32"
      style={{ background: "var(--stage-black)" }}
      aria-label="By the numbers"
    >
      <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
        <RevealOnScroll selector="[data-stat]" stagger={0.15}>
          <div className="grid grid-cols-1 md:grid-cols-3">
            <Stat data-stat number={<><CountUp to={8} />+</>} label="Years on stage" />
            <Stat data-stat number={<><CountUp to={1290} />+</>} label="Stage appearances" />
            <Stat data-stat number={<>10 to 10,000+</>} label="Audience sizes hosted, ages 5 to 75" last />
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

function Stat({
  number,
  label,
  last,
  ...rest
}: {
  number: React.ReactNode;
  label: string;
  last?: boolean;
  [k: string]: unknown;
}) {
  return (
    <div
      {...rest}
      className={`px-6 py-8 md:py-6 text-center md:text-left md:px-10 ${
        last ? "" : "border-b md:border-b-0 md:border-r"
      } border-[color:var(--navy-line)]`}
    >
      <div
        className="font-display text-[64px] md:text-[88px] leading-none text-white"
        style={{ textShadow: "0 0 36px rgba(94,168,255,0.35)" }}
      >
        {number}
      </div>
      <div className="mt-3 font-kicker text-[12px] uppercase text-[color:var(--mist)]">
        {label}
      </div>
    </div>
  );
}
