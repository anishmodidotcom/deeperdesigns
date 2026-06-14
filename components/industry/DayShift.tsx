"use client";

import { motion } from "motion/react";
import type { DayItem } from "@/lib/industries";
import { renderSerif } from "./text";

const EASE = [0.16, 1, 0.3, 1] as const;

type Props = {
  nowHeadline: string;
  nowIntro: string;
  nowItems: DayItem[];
  aiHeadline: string;
  aiIntro: string;
  aiItems: DayItem[];
};

export default function DayShift({
  nowHeadline,
  nowIntro,
  nowItems,
  aiHeadline,
  aiIntro,
  aiItems,
}: Props) {
  return (
    <section
      style={{ paddingBlock: "var(--dd-section-py, 120px)" }}
      aria-label="The day now versus the day with the system"
    >
      <div className="container" style={{ maxWidth: "var(--dd-container-max, 1280px)" }}>
        <Panel
          variant="now"
          headline={nowHeadline}
          intro={nowIntro}
          items={nowItems}
        />
        <div style={{ height: 72 }} />
        <Panel
          variant="ai"
          headline={aiHeadline}
          intro={aiIntro}
          items={aiItems}
        />
      </div>
    </section>
  );
}

function Panel({
  variant,
  headline,
  intro,
  items,
}: {
  variant: "now" | "ai";
  headline: string;
  intro: string;
  items: DayItem[];
}) {
  const isAi = variant === "ai";
  const tag = isAi ? "THE DAY WITH THE SYSTEM" : "THE DAY NOW";
  return (
    <div>
      <div style={{ maxWidth: 760, marginBottom: 44 }}>
        <p
          className="mono"
          style={{
            fontSize: 11,
            letterSpacing: "0.16em",
            color: isAi ? "var(--page-accent)" : "var(--dd-text-low, #6B6B6B)",
            margin: "0 0 18px",
          }}
        >
          {tag}
        </p>
        <h2
          style={{
            fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
            fontWeight: 600,
            fontSize: "var(--dd-fs-h2, clamp(28px, 3.5vw, 44px))",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: isAi
              ? "var(--dd-text-high, #F5F5F5)"
              : "var(--dd-text-mid, #A8A8A8)",
            margin: 0,
          }}
        >
          {renderSerif(headline)}
        </h2>
        <p
          style={{
            marginTop: 18,
            fontSize: 17,
            lineHeight: 1.6,
            color: "var(--dd-text-mid, #A8A8A8)",
          }}
        >
          {intro}
        </p>
      </div>

      <div className="ind-dayshift__rows">
        {items.map((it, i) => (
          <motion.div
            key={it.label}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.6, delay: i * 0.05, ease: EASE }}
            style={{
              position: "relative",
              padding: "22px 0 22px 24px",
              borderTop: "1px solid var(--dd-border, rgba(255,255,255,0.08))",
            }}
          >
            {/* Left accent rule, only on the AI panel */}
            <span
              aria-hidden
              style={{
                position: "absolute",
                left: 0,
                top: 22,
                bottom: 22,
                width: isAi ? 2 : 1,
                background: isAi
                  ? "var(--page-accent)"
                  : "var(--dd-border-strong, rgba(255,255,255,0.16))",
              }}
            />
            <p
              className="mono"
              style={{
                fontSize: 10.5,
                letterSpacing: "0.14em",
                color: isAi
                  ? "var(--page-accent)"
                  : "var(--dd-text-low, #6B6B6B)",
                margin: "0 0 10px",
              }}
            >
              {it.label}
            </p>
            <h3
              style={{
                fontSize: 20,
                fontWeight: 600,
                letterSpacing: "-0.01em",
                color: isAi
                  ? "var(--dd-text-high, #F5F5F5)"
                  : "var(--dd-text-mid, #A8A8A8)",
                margin: "0 0 10px",
              }}
            >
              {it.title}
            </h3>
            <p
              style={{
                fontSize: 15,
                lineHeight: 1.6,
                color: "var(--dd-text-mid, #A8A8A8)",
                margin: 0,
                maxWidth: 460,
              }}
            >
              {it.body}
            </p>
            <p
              style={{
                marginTop: 14,
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: 12,
                letterSpacing: "0.04em",
                color: isAi
                  ? "var(--page-accent)"
                  : "var(--dd-text-low, #6B6B6B)",
              }}
            >
              {it.stat}
            </p>
          </motion.div>
        ))}
      </div>

      <style>{`
        .ind-dayshift__rows {
          display: grid;
          grid-template-columns: 1fr;
          column-gap: 48px;
        }
        @media (min-width: 768px) {
          .ind-dayshift__rows {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>
    </div>
  );
}
