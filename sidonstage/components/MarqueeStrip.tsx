"use client";

import Marquee from "react-fast-marquee";

const WORDS = [
  "Emcee Extraordinaire",
  "The Voice of Your Event",
  "Corporate Stages",
  "Leadership Summits",
  "Product Launches",
  "Gala Nights",
];

export default function MarqueeStrip() {
  const items = Array.from({ length: 4 }, () => WORDS).flat();
  return (
    <div
      className="relative border-y border-[color:var(--navy-line)] bg-[color:var(--stage-black)] py-6"
      aria-hidden
    >
      <Marquee speed={42} gradient={false} pauseOnHover>
        {items.map((w, i) => (
          <span
            key={`${w}-${i}`}
            className="font-display uppercase text-[28px] md:text-[34px] tracking-[0.08em] mx-6"
            style={{ color: i % 2 === 0 ? "var(--white-pure)" : "var(--azure-bright)" }}
          >
            {w}
            <span className="mx-6 text-[color:var(--mist-dim)]">•</span>
          </span>
        ))}
      </Marquee>
    </div>
  );
}
