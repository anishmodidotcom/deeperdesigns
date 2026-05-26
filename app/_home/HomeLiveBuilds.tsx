"use client";

import { motion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

type Build = { body: string; tag: string };

const BUILDS: Build[] = [
  {
    body: "A pricing engine that takes overnight market data and prices 60+ SKUs by the time the team arrives at 9am.",
    tag: "B2B TRADE · MUMBAI",
  },
  {
    body: "A WhatsApp agent that takes catering inquiries, qualifies the event, and quotes within the same conversation.",
    tag: "QSR · DUBAI",
  },
  {
    body: "A founder dashboard that pulls revenue, costs, and inventory across three locations into one screen, updated hourly.",
    tag: "WELLNESS · BANGALORE",
  },
];

export default function HomeLiveBuilds() {
  return (
    <section style={{ padding: "var(--section-py) 0" }}>
      <div className="container">
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
            marginBottom: "16px",
          }}
        >
          <p
            className="eyebrow"
            style={{ color: "var(--dd-accent-signal)", margin: 0 }}
          >
            CURRENTLY BUILDING
          </p>
          <p
            style={{
              fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
              fontSize: "11px",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--dd-text-faint)",
              margin: 0,
            }}
          >
            UPDATED MONTHLY
          </p>
        </div>
        <h3
          style={{
            fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
            fontSize: "22px",
            fontWeight: 500,
            color: "var(--dd-text-high)",
            margin: "0 0 32px",
            letterSpacing: "-0.01em",
          }}
        >
          What&apos;s on the workbench this month.
        </h3>

        <div className="hlb-grid">
          {BUILDS.map((b, i) => (
            <motion.article
              key={i}
              className="hlb-card"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
            >
              <p className="hlb-status">IN PROGRESS</p>
              <p className="hlb-body">{b.body}</p>
              <p className="hlb-tag">{b.tag}</p>
            </motion.article>
          ))}
        </div>
      </div>

      <style>{`
        .hlb-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
        }
        .hlb-card {
          background: var(--dd-surface);
          padding: 24px;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.06);
          transition: transform 180ms var(--ease-out), border-color 180ms var(--ease-out), background 180ms var(--ease-out);
        }
        .hlb-card:hover {
          transform: translateY(-2px);
          border-color: rgba(99, 102, 241, 0.3);
        }
        .hlb-status {
          font-family: var(--font-geist-mono), ui-monospace, monospace;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--dd-text-faint);
          margin: 0 0 12px;
        }
        .hlb-body {
          font-family: var(--font-geist-sans), system-ui, sans-serif;
          font-size: 15px;
          line-height: 1.5;
          color: var(--dd-text-high);
          margin: 0 0 20px;
        }
        .hlb-tag {
          font-family: var(--font-geist-mono), ui-monospace, monospace;
          font-size: 10px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--dd-text-faint);
          margin: 0;
        }

        @media (max-width: 1023px) {
          .hlb-grid {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 639px) {
          .hlb-grid {
            display: flex;
            gap: 12px;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
            margin-inline: calc(var(--container-px) * -1);
            padding-inline: var(--container-px);
            scroll-padding-inline: var(--container-px);
            scrollbar-width: none;
          }
          .hlb-grid::-webkit-scrollbar {
            display: none;
          }
          .hlb-card {
            flex: 0 0 78vw;
            max-width: 320px;
            scroll-snap-align: start;
          }
        }
      `}</style>
    </section>
  );
}
