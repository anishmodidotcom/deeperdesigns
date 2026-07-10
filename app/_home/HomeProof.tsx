"use client";

import { Link } from "next-view-transitions";
import { motion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

// v22 A3 (amended): products as proof, four live products. This section is
// the homepage live-products row (the B4 choice: one row, not two). Copy is
// final per the v22 spec and its amendment.
const PRODUCTS = [
  {
    name: "Outpost",
    line: "Finds the businesses that need you and starts the conversation. Verified contacts, personal outreach, every reply in one inbox.",
    href: "/work/outpost",
    accent: "#6366F1",
  },
  {
    name: "Oviya Studio",
    line: "Upload one photo of your product. Get magazine-grade shoots back, your exact piece, no photographer.",
    href: "/work/oviya-studio",
    accent: "#C4485C",
  },
  {
    name: "Deeper Content",
    line: "A content engine that learns your brand and keeps your pages alive without you writing a word.",
    href: "/work/deeper-content",
    accent: "#7C6CFF",
  },
  {
    name: "Maple Lens",
    line: "Built for a furniture client: their whole catalogue, searchable and shoppable from one link. Live and in use.",
    href: "/work/maplelens",
    accent: "#C8956D",
  },
];

export default function HomeProof() {
  return (
    <section style={{ padding: "var(--section-py) 0" }}>
      <div className="container">
        <h2
          style={{
            fontSize: "var(--fs-h2)",
            fontWeight: 500,
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            margin: "0 0 16px",
            maxWidth: "760px",
          }}
        >
          We run our own products{" "}
          <span
            style={{
              fontFamily: "var(--font-instrument-serif), 'Instrument Serif', Georgia, serif",
              fontStyle: "italic",
              fontWeight: 400,
            }}
          >
            on the same systems we sell.
          </span>
        </h2>
        <p style={{ fontSize: "17px", color: "var(--fg-muted)", margin: "0 0 40px", maxWidth: "600px" }}>
          Not slides. Not demos. Live products, built here, running right now.
        </p>

        <div className="hproof-grid">
          {PRODUCTS.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3, margin: "0px 0px -8% 0px" }}
              transition={{ duration: 0.55, delay: (i % 4) * 0.06, ease: EASE }}
            >
              <Link href={p.href} className="hproof-card" style={{ ["--card-accent" as string]: p.accent }}>
                <p className="hproof-live">
                  <span aria-hidden style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--dd-accent-signal)", boxShadow: "0 0 6px var(--dd-accent-signal)", display: "inline-block" }} />
                  LIVE
                </p>
                <p className="hproof-name">{p.name}</p>
                <p className="hproof-line">{p.line}</p>
                <p className="hproof-more">
                  See the product
                  <span aria-hidden className="hproof-arrow">→</span>
                </p>
              </Link>
            </motion.div>
          ))}
        </div>

        <p
          style={{
            marginTop: "36px",
            fontSize: "17px",
            color: "var(--fg)",
            fontFamily: "var(--font-instrument-serif), 'Instrument Serif', Georgia, serif",
            fontStyle: "italic",
          }}
        >
          If we can build and run these, we can build yours.
        </p>
      </div>

      <style>{`
        .hproof-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
        }
        .hproof-card {
          display: flex;
          flex-direction: column;
          height: 100%;
          background: var(--dd-surface);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 12px;
          padding: 24px;
          text-decoration: none;
          transition: transform 180ms var(--ease-out), border-color 180ms var(--ease-out);
        }
        .hproof-card:hover {
          transform: translateY(-2px);
          border-color: var(--card-accent);
        }
        .hproof-live {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-family: var(--font-geist-mono), ui-monospace, monospace;
          font-size: 10px;
          letter-spacing: 0.1em;
          color: var(--dd-eyebrow-on-dark);
          margin: 0 0 14px;
        }
        .hproof-name {
          font-size: 19px;
          font-weight: 600;
          letter-spacing: -0.01em;
          color: var(--fg);
          margin: 0 0 10px;
        }
        .hproof-line {
          flex: 1;
          font-size: 14.5px;
          line-height: 1.55;
          color: var(--fg-muted);
          margin: 0 0 18px;
        }
        .hproof-more {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 13.5px;
          font-weight: 500;
          color: var(--card-accent);
          margin: 0;
        }
        .hproof-arrow {
          display: inline-block;
          transition: transform 250ms var(--ease-out);
        }
        .hproof-card:hover .hproof-arrow { transform: translateX(4px); }

        @media (max-width: 1023px) {
          .hproof-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 639px) {
          .hproof-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
