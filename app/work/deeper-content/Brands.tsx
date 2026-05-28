"use client";

import Image from "next/image";
import { motion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

type Brand = {
  name: string;
  category: string;
  voice: string;
  codes: string[];
};

const BRANDS: Brand[] = [
  {
    name: "FORREST ROASTERY",
    category: "Specialty coffee, modern craftsman",
    voice: "Direct, technical, no hype.",
    codes: ["FR-01", "FR-02", "FR-03", "FR-04"],
  },
  {
    name: "BOMBAY ATELIER",
    category: "Contemporary Indian menswear",
    voice: "Tailored, restrained, materials-led.",
    codes: ["BA-01", "BA-02", "BA-03", "BA-04"],
  },
  {
    name: "SAFFRON SUPPER CLUB",
    category: "F&B home dining, warm-festive",
    voice: "Hosting-led, ingredient-driven.",
    codes: ["SS-01", "SS-02", "SS-03", "SS-04"],
  },
];

export default function Brands() {
  return (
    <section
      style={{
        paddingBlock: 144,
        borderTop: "1px solid var(--page-border)",
      }}
    >
      <div
        className="container-x"
        style={{
          maxWidth: 1280,
          marginInline: "auto",
          paddingInline: "clamp(20px, 4vw, 48px)",
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: EASE }}
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 11,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--page-accent-2)",
            margin: 0,
            marginBottom: 24,
          }}
        >
          THREE BRANDS, ONE ENGINE
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{
            fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
            fontWeight: 600,
            fontSize: "clamp(36px, 5vw, 64px)",
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
            color: "var(--page-text)",
            margin: 0,
            marginBottom: 16,
            maxWidth: 920,
          }}
        >
          Different categories. Different aesthetics. Same level of finish.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          style={{
            fontSize: 19,
            lineHeight: 1.6,
            color: "var(--page-text-2)",
            margin: 0,
            marginBottom: 72,
            maxWidth: 680,
          }}
        >
          Each set is the output of one CGE session, with that brand’s locked layer.
        </motion.p>

        <div className="dc-brands-stack">
          {BRANDS.map((b, i) => (
            <motion.article
              key={b.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
              className="dc-brand"
            >
              <header className="dc-brand-head">
                <p className="dc-brand-name">{b.name}</p>
                <p className="dc-brand-cat">{b.category}</p>
                <p className="dc-brand-voice">
                  <span aria-hidden>“</span>
                  {b.voice}
                  <span aria-hidden>”</span>
                </p>
              </header>
              <div className="dc-brand-grid">
                {b.codes.map((code) => (
                  <div key={code} className="dc-brand-tile">
                    <Image
                      src={`/images/deeper-content/samples/${code}.jpg`}
                      alt={`${b.name} ${code}`}
                      fill
                      sizes="(min-width: 1024px) 22vw, 45vw"
                      style={{ objectFit: "cover" }}
                    />
                    <span className="dc-brand-code">{code}</span>
                  </div>
                ))}
              </div>
            </motion.article>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{
            fontFamily: "var(--font-instrument-serif), 'Instrument Serif', Georgia, serif",
            fontStyle: "italic",
            fontSize: "clamp(22px, 2.4vw, 30px)",
            lineHeight: 1.35,
            color: "var(--page-text-2)",
            margin: 0,
            marginTop: 80,
            maxWidth: 720,
          }}
        >
          Twelve outputs. Three completely different aesthetics. Zero drift
          inside each set.
        </motion.p>
      </div>

      <style>{`
        .dc-brands-stack {
          display: flex;
          flex-direction: column;
          gap: 80px;
        }
        .dc-brand {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
        }
        .dc-brand-head {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .dc-brand-name {
          font-family: var(--font-geist-mono), monospace;
          font-size: 12px;
          letter-spacing: 0.22em;
          color: var(--page-accent-2);
          margin: 0;
        }
        .dc-brand-cat {
          font-family: var(--font-geist-sans), system-ui, sans-serif;
          font-weight: 600;
          font-size: 26px;
          line-height: 1.2;
          letter-spacing: -0.01em;
          color: var(--page-text);
          margin: 0;
        }
        .dc-brand-voice {
          font-family: var(--font-instrument-serif), 'Instrument Serif', Georgia, serif;
          font-style: italic;
          font-size: 19px;
          line-height: 1.4;
          color: var(--page-text-2);
          margin: 0;
        }
        .dc-brand-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
        }
        .dc-brand-tile {
          position: relative;
          aspect-ratio: 4 / 5;
          overflow: hidden;
          border-radius: 10px;
          border: 1px solid var(--page-border);
        }
        .dc-brand-code {
          position: absolute;
          left: 10px;
          bottom: 10px;
          font-family: var(--font-geist-mono), monospace;
          font-size: 10px;
          letter-spacing: 0.16em;
          color: rgba(255,255,255,0.85);
          padding: 4px 8px;
          border-radius: 6px;
          background: rgba(0,0,0,0.5);
          backdrop-filter: blur(6px);
        }
        @media (min-width: 900px) {
          .dc-brand {
            grid-template-columns: 0.6fr 1.4fr;
            gap: 48px;
            align-items: start;
          }
          .dc-brand-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 12px;
          }
        }
      `}</style>
    </section>
  );
}
