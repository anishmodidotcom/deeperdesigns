"use client";

import { useEffect, useRef, useState } from "react";

// v15 audience axis, max 4 categories: FOUNDERS, OPERATORS, TEAMS, STUDIOS.
// Picked the strongest line per bucket from the v14 9-card set; the rest are
// covered by individual showcase pages and the live products.
const CARDS = [
  { label: "FOR FOUNDERS", headline: "You see the bottleneck before it costs you.",  sub: "Real signals from the floor, surfaced before they become problems." },
  { label: "FOR OPERATORS", headline: "Your inventory updates itself.",              sub: "No more 9 PM stock counts. No more guess-orders." },
  { label: "FOR TEAMS",    headline: "Your team stops chasing the same 6 things.",   sub: "One dashboard. One view. One source of truth." },
  { label: "FOR STUDIOS",  headline: "A site that actually sells.",                   sub: "Built around how your buyer decides, not a template." },
];

export default function HomeOutcomes() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            io.disconnect();
            break;
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <section id="outcomes" ref={sectionRef} style={{ padding: "var(--section-py) 0" }}>
      <div className="container">
        <h2 style={{ fontSize: "var(--fs-h1)", fontWeight: 500, lineHeight: 1.1, letterSpacing: "-0.02em", maxWidth: "880px", marginBottom: "64px" }}>
          What if a custom tool could quietly run the most exhausting part of your business?
        </h2>
        <div className="outcomes-grid">
          {CARDS.map((c, i) => (
            <article
              key={c.label}
              className="outcome-card"
              style={{
                transitionDelay: visible ? `${i * 80}ms` : "0ms",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
              }}
            >
              <p className="outcome-label">{c.label}</p>
              <h3 className="outcome-headline">{c.headline}</h3>
              <p className="outcome-sub">{c.sub}</p>
            </article>
          ))}
        </div>
      </div>
      <style>{`
        .outcomes-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: var(--border);
          border: 1px solid var(--border);
        }
        .outcome-card {
          background: var(--bg);
          padding: 32px 24px;
          border: 1px solid transparent;
          transition: opacity 600ms var(--ease-out), transform 600ms var(--ease-out), background-color 300ms var(--ease-out), border-color 300ms var(--ease-out);
        }
        .outcome-card:hover {
          background: var(--bg-elev);
          border-color: var(--accent);
        }
        .outcome-card:hover .outcome-headline {
          text-shadow: 0 0 24px rgba(124, 108, 255, 0.45);
        }
        .outcome-label {
          font-family: var(--font-geist-mono), ui-monospace, monospace;
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 16px;
        }
        .outcome-headline {
          font-size: var(--fs-h3);
          font-weight: 500;
          line-height: 1.3;
          margin-bottom: 12px;
          transition: text-shadow 300ms var(--ease-out);
        }
        .outcome-sub {
          font-size: 15px;
          color: var(--fg-muted);
          line-height: 1.6;
        }
        @media (max-width: 1024px) {
          .outcomes-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .outcomes-grid { grid-template-columns: 1fr; }
        }
        @media (prefers-reduced-motion: reduce) {
          .outcome-card { transition: none !important; opacity: 1 !important; transform: none !important; }
        }
      `}</style>
    </section>
  );
}
