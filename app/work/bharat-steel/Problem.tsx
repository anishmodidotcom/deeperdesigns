"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

const ICON_PROPS = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "var(--page-accent)",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const PhoneIcon = (
  <svg {...ICON_PROPS} aria-hidden>
    <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
  </svg>
);

const ArrowIcon = (
  <svg {...ICON_PROPS} aria-hidden>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="13 6 19 12 13 18" />
  </svg>
);

const TableIcon = (
  <svg {...ICON_PROPS} aria-hidden>
    <rect x="4" y="4" width="16" height="16" rx="1" />
    <line x1="4" y1="10" x2="20" y2="10" />
    <line x1="4" y1="15" x2="20" y2="15" />
    <line x1="10" y1="4" x2="10" y2="20" />
  </svg>
);

const ClockIcon = (
  <svg {...ICON_PROPS} aria-hidden>
    <circle cx="12" cy="12" r="9" />
    <polyline points="12 7 12 12 15 14" />
  </svg>
);

type Step = { label: string; icon: ReactNode };

const STEPS: Step[] = [
  { label: "Buyer calls", icon: PhoneIcon },
  { label: "Rahul calls office", icon: ArrowIcon },
  { label: "Staff checks Excel", icon: TableIcon },
  { label: "Staff calls back", icon: PhoneIcon },
  { label: "Quote sent (maybe)", icon: ClockIcon },
];

export default function Problem() {
  return (
    <section style={{ paddingBlock: 128 }}>
      <div className="container-x">
        <p
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 13,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            color: "var(--page-accent)",
            margin: 0,
            marginBottom: 64,
          }}
        >
          THE PROBLEM
        </p>

        <div className="bs-timeline-wrap">
          <div className="bs-timeline">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.label}
                className="bs-step"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="bs-circle">{step.icon}</div>
                <span className="bs-step-label">{step.label}</span>
                {i < STEPS.length - 1 && (
                  <span aria-hidden className="bs-connector" />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <p
          style={{
            fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
            fontSize: 24,
            fontWeight: 300,
            color: "var(--page-text-2)",
            lineHeight: 1.4,
            maxWidth: 600,
            marginTop: 80,
            margin: 0,
            marginBlockStart: 80,
            letterSpacing: "-0.01em",
          }}
        >
          By the time Rahul calls back, the buyer has already called the
          next trader.
        </p>
      </div>

      <style jsx>{`
        .bs-timeline-wrap {
          width: 100%;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }
        .bs-timeline {
          display: flex;
          align-items: flex-start;
          gap: 0;
          min-width: max-content;
          padding-block: 8px;
        }
        .bs-step {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          flex: 1 0 auto;
          min-width: 140px;
          padding-inline: 12px;
        }
        .bs-circle {
          width: 32px;
          height: 32px;
          border-radius: 9999px;
          border: 1px solid var(--page-accent);
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--page-bg);
          z-index: 2;
        }
        .bs-step-label {
          margin-top: 16px;
          font-size: 14px;
          color: var(--page-text);
          text-align: center;
          font-family: var(--font-geist-sans), system-ui, sans-serif;
        }
        .bs-connector {
          position: absolute;
          top: 16px;
          left: calc(50% + 16px);
          right: calc(-50% + 16px);
          height: 1px;
          border-top: 1px dashed var(--page-text-2);
          opacity: 0.4;
          z-index: 1;
        }
        @media (min-width: 900px) {
          .bs-timeline {
            justify-content: space-between;
            min-width: 0;
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
