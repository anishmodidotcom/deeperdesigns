"use client";

import { useEffect, useRef, useState } from "react";

const CARDS = [
  { n: "01", t: "Taste",            sub: "AI gives wireframes. We ship products you'd actually pay for." },
  { n: "02", t: "Judgment",         sub: "Ten years of running businesses tells us what's worth building." },
  { n: "03", t: "Systems thinking", sub: "Tools that fit how your business actually works. Not the other way." },
  { n: "04", t: "Ownership",        sub: "Code you own. Documented. Built to grow." },
];

export default function HomeBrings() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) { setVisible(true); io.disconnect(); break; }
      }
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.05 });
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} style={{ padding: "calc(var(--section-py) * 0.6) 0" }}>
      <div className="container">
        <h2 style={{ fontSize: "var(--fs-h1)", fontWeight: 500, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "48px", maxWidth: "880px" }}>
          What we bring that AI alone doesn&apos;t.
        </h2>
        <div className="brings-grid">
          {CARDS.map((c, i) => (
            <article
              key={c.n}
              className="brings-card"
              style={{
                transitionDelay: visible ? `${i * 80}ms` : "0ms",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
              }}
            >
              <p className="brings-num">{c.n}</p>
              <h3 className="brings-headline">{c.t}</h3>
              <p className="brings-sub">{c.sub}</p>
            </article>
          ))}
        </div>
      </div>
      <style>{`
        .brings-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: var(--border);
          border: 1px solid var(--border);
        }
        .brings-card {
          background: var(--bg);
          padding: 28px 24px;
          transition: opacity 600ms var(--ease-out), transform 600ms var(--ease-out);
        }
        .brings-num {
          font-family: var(--font-geist-mono), ui-monospace, monospace;
          font-size: 11px;
          letter-spacing: 0.12em;
          color: var(--accent);
          margin-bottom: 16px;
        }
        .brings-headline {
          font-size: var(--fs-h3);
          font-weight: 500;
          margin-bottom: 8px;
        }
        .brings-sub {
          font-size: 15px;
          color: var(--fg-muted);
          line-height: 1.5;
        }
        @media (max-width: 1024px) {
          .brings-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .brings-grid { grid-template-columns: 1fr; }
        }
        @media (prefers-reduced-motion: reduce) {
          .brings-card { transition: none !important; opacity: 1 !important; transform: none !important; }
        }
      `}</style>
    </section>
  );
}
