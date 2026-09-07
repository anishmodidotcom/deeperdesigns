"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// v15 audience axis, max 4 categories: FOUNDERS, OPERATORS, TEAMS, STUDIOS.
// Picked the strongest line per bucket from the v14 9-card set; the rest are
// covered by individual showcase pages and the live products.
//
// v31: the fourth lane was FOR STUDIOS, the one card on this row speaking to
// a consumer brand rather than the businesses the rest of the site is written
// for. It is now FOR DISTRIBUTORS, and it is the only lane that links out,
// because it is the only one with a segment page behind it.
const CARDS: {
  label: string;
  headline: string;
  sub: string;
  href?: string;
}[] = [
  { label: "FOR FOUNDERS", headline: "You see the bottleneck before it costs you.",  sub: "The numbers that matter, in front of you every morning." },
  { label: "FOR OPERATORS", headline: "Your inventory updates itself.",              sub: "No more 9 PM stock counts. No more guess-orders." },
  { label: "FOR TEAMS",    headline: "Your team stops chasing the same 6 things.",   sub: "One place everyone checks. The same answer for everyone." },
  {
    label: "FOR DISTRIBUTORS",
    headline: "Secondary sales you can finally see",
    sub: "Retailer orders from the market, offline if needed, scheme claims reconciled with the principal, and one dashboard showing what the field actually did today.",
    href: "/business/distributors",
  },
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
          Which part of your business would you hand over first?
        </h2>
        <div className="outcomes-grid">
          {CARDS.map((c, i) => {
            const body = (
              <>
                <p className="outcome-label">{c.label}</p>
                <h3 className="outcome-headline">{c.headline}</h3>
                <p className="outcome-sub">{c.sub}</p>
              </>
            );
            const style = {
              transitionDelay: visible ? `${i * 80}ms` : "0ms",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
            };
            return c.href ? (
              <Link
                key={c.label}
                href={c.href}
                className="outcome-card outcome-card--link"
                style={style}
              >
                {body}
              </Link>
            ) : (
              <article key={c.label} className="outcome-card" style={style}>
                {body}
              </article>
            );
          })}
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
        .outcome-card--link {
          display: block;
          color: inherit;
          text-decoration: none;
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
