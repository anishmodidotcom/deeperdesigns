"use client";

import FastMarquee from "react-fast-marquee";

const ITEMS = [
  "Websites",
  "Dashboards",
  "AI Tools",
  "Chatbots",
  "Portals",
  "Quizzes",
  "Calculators",
  "E-commerce",
  "CRMs",
  "Visualizers",
  "Lead Magnets",
  "Sales Agents",
  "Brand Experiences",
  "Voice Agents",
];

export default function Marquee() {
  const content = ITEMS.join(" ◆ ");

  return (
    <section
      aria-label="What we build"
      style={{
        background: "var(--surface-1)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        paddingBlock: 16,
      }}
    >
      <FastMarquee speed={40} gradient={false} pauseOnHover={false}>
        <span
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            textTransform: "uppercase",
            fontSize: 14,
            letterSpacing: "0.12em",
            color: "var(--text-3)",
            paddingInline: 24,
          }}
        >
          {content} ◆&nbsp;
        </span>
        <span
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            textTransform: "uppercase",
            fontSize: 14,
            letterSpacing: "0.12em",
            color: "var(--text-3)",
            paddingInline: 24,
          }}
        >
          {content} ◆&nbsp;
        </span>
      </FastMarquee>
    </section>
  );
}
