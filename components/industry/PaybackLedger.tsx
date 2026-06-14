"use client";

import { motion } from "motion/react";
import type { Industry } from "@/lib/industries";

const EASE = [0.16, 1, 0.3, 1] as const;
const WARNING = "#E5847C";
const POSITIVE = "#5BC48A";

export default function PaybackLedger({
  payback,
}: {
  payback: NonNullable<Industry["payback"]>;
}) {
  return (
    <section style={{ paddingBlock: "var(--dd-section-py, 120px)" }} aria-label="The payback">
      <div className="container" style={{ maxWidth: "var(--dd-container-max, 1280px)" }}>
        <p
          className="mono"
          style={{
            fontSize: 11,
            letterSpacing: "0.16em",
            color: "var(--page-accent)",
            margin: "0 0 16px",
          }}
        >
          THE PAYBACK
        </p>
        <p
          style={{
            fontSize: 17,
            lineHeight: 1.6,
            color: "var(--dd-text-mid, #A8A8A8)",
            margin: "0 0 44px",
            maxWidth: 720,
          }}
        >
          {payback.intro}
        </p>

        <div className="ind-ledger">
          <Column
            tag="WITHOUT THE SYSTEM"
            rows={payback.before}
            total={payback.beforeTotal}
            tone={WARNING}
          />
          <Column
            tag="WITH THE SYSTEM"
            rows={payback.after}
            total={payback.afterTotal}
            tone={POSITIVE}
            accentBorder
          />
        </div>

        <p
          style={{
            marginTop: 28,
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 11.5,
            letterSpacing: "0.04em",
            lineHeight: 1.6,
            color: "var(--dd-text-low, #6B6B6B)",
            maxWidth: 720,
          }}
        >
          {payback.note}
        </p>
      </div>

      <style>{`
        .ind-ledger {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }
        @media (min-width: 768px) {
          .ind-ledger { grid-template-columns: 1fr 1fr; gap: 24px; }
        }
      `}</style>
    </section>
  );
}

function Column({
  tag,
  rows,
  total,
  tone,
  accentBorder = false,
}: {
  tag: string;
  rows: { k: string; v: string }[];
  total: { k: string; v: string };
  tone: string;
  accentBorder?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: EASE }}
      style={{
        background: "var(--dd-surface-1, #111111)",
        border: accentBorder
          ? "1px solid var(--page-accent)"
          : "1px solid var(--dd-border, rgba(255,255,255,0.08))",
        borderRadius: 16,
        padding: "26px 26px 24px",
      }}
    >
      <p
        className="mono"
        style={{
          fontSize: 10.5,
          letterSpacing: "0.14em",
          color: "var(--dd-text-low, #6B6B6B)",
          margin: "0 0 22px",
        }}
      >
        {tag}
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {rows.map((r) => (
          <div
            key={r.k}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              gap: 16,
            }}
          >
            <span style={{ fontSize: 14.5, color: "var(--dd-text-mid, #A8A8A8)" }}>
              {r.k}
            </span>
            <span
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: 14,
                color: tone,
                whiteSpace: "nowrap",
              }}
            >
              {r.v}
            </span>
          </div>
        ))}
      </div>
      <div
        style={{
          marginTop: 20,
          paddingTop: 18,
          borderTop: "1px solid var(--dd-border-strong, rgba(255,255,255,0.16))",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          gap: 16,
        }}
      >
        <span
          style={{
            fontSize: 15,
            fontWeight: 600,
            color: "var(--dd-text-high, #F5F5F5)",
          }}
        >
          {total.k}
        </span>
        <span
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 20,
            fontWeight: 600,
            letterSpacing: "-0.01em",
            color: tone,
            whiteSpace: "nowrap",
          }}
        >
          {total.v}
        </span>
      </div>
    </motion.div>
  );
}
