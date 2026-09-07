"use client";

import { motion } from "motion/react";

const monoLabelStyle: React.CSSProperties = {
  fontFamily: "var(--font-geist-mono), monospace",
  fontSize: 11,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  color: "var(--page-text-2)",
  margin: 0,
};

const cardTitle: React.CSSProperties = {
  fontFamily:
    "var(--font-outfit), var(--font-geist-sans), system-ui, sans-serif",
  fontSize: 14,
  fontWeight: 600,
  color: "var(--page-text)",
  margin: 0,
  marginBottom: 14,
  letterSpacing: "-0.005em",
};

function Row({
  label,
  value,
  color,
  bold,
}: {
  label: string;
  value: string;
  color?: string;
  bold?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        gap: 12,
        paddingBlock: 6,
        fontSize: 13,
        color: "var(--page-text-2)",
        borderBottom: "1px solid rgba(34,211,238,0.06)",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-geist-mono), monospace",
          fontSize: 11,
        }}
      >
        {label}
      </span>
      <span
        style={{
          color: color ?? "var(--page-text)",
          fontFamily:
            "var(--font-outfit), var(--font-geist-sans), system-ui, sans-serif",
          fontWeight: bold ? 700 : 400,
        }}
      >
        {value}
      </span>
    </div>
  );
}

export default function Pricing() {
  return (
    <section style={{ paddingBlock: 128 }}>
      <div
        className="container-x"
        style={{
          maxWidth: 900,
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontFamily:
              "var(--font-outfit), var(--font-geist-sans), system-ui, sans-serif",
            fontWeight: 400,
            fontSize: 28,
            color: "var(--page-text)",
            lineHeight: 1.3,
            letterSpacing: "-0.02em",
            margin: 0,
            marginBottom: 48,
            maxWidth: 700,
            marginInline: "auto",
          }}
        >
          He prices based on gut feel and what the guy next door is charging.
        </h2>

        <div className="ab-compare">
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background: "var(--page-surface)",
              borderRadius: 8,
              padding: 28,
              textAlign: "left",
              border: "1px solid rgba(120,126,140,0.18)",
            }}
          >
            <p style={{ ...monoLabelStyle, marginBottom: 8 }}>OLD WAY</p>
            <h3 style={cardTitle}>2019 Toyota Camry</h3>
            <div
              style={{
                fontFamily:
                  "var(--font-outfit), var(--font-geist-sans), system-ui, sans-serif",
                fontWeight: 800,
                fontSize: 24,
                color: "var(--page-text)",
                letterSpacing: "-0.03em",
                margin: 0,
                marginBottom: 4,
              }}
            >
              Tariq&apos;s price: AED 52,000
            </div>
            <p
              style={{
                fontSize: 13,
                color: "var(--page-text-2)",
                margin: 0,
                marginBottom: 14,
              }}
            >
              Based on: gut feel
            </p>
            <Row label="Days on Lot" value="67" color="#EF4444" />
            <Row label="Competitor A" value="AED 48,000" />
            <Row label="Competitor B" value="AED 49,500" />
            <p
              style={{
                fontSize: 13,
                color: "#EF4444",
                margin: 0,
                marginTop: 16,
                fontFamily:
                  "var(--font-outfit), var(--font-geist-sans), system-ui, sans-serif",
                fontWeight: 600,
              }}
            >
              Overpriced. Not selling.
            </p>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.7,
              delay: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              background:
                "linear-gradient(160deg, rgba(34,211,238,0.06), var(--page-surface))",
              borderRadius: 8,
              padding: 28,
              textAlign: "left",
              border: "1px solid rgba(34,211,238,0.4)",
              boxShadow:
                "0 0 0 1px rgba(34,211,238,0.08) inset, 0 0 40px rgba(34,211,238,0.12)",
            }}
          >
            <p
              style={{
                ...monoLabelStyle,
                marginBottom: 8,
                color: "var(--page-accent)",
              }}
            >
              NEW WAY
            </p>
            <h3 style={cardTitle}>2019 Toyota Camry</h3>
            <div
              style={{
                fontFamily:
                  "var(--font-outfit), var(--font-geist-sans), system-ui, sans-serif",
                fontWeight: 800,
                fontSize: 24,
                color: "var(--page-accent)",
                letterSpacing: "-0.03em",
                margin: 0,
                marginBottom: 4,
              }}
            >
              AI price: AED 47,800
            </div>
            <p
              style={{
                fontSize: 13,
                color: "var(--page-text-2)",
                margin: 0,
                marginBottom: 14,
                lineHeight: 1.5,
              }}
            >
              Based on: market data + depreciation curve + days on lot +
              competitor analysis
            </p>
            <Row
              label="Time to Sell"
              value="8 days projected"
              color="#22C55E"
            />
            <Row label="Margin" value="14.2%" color="#22C55E" />
            <Row label="Status" value="Action ready" />
            <p
              style={{
                fontSize: 13,
                color: "var(--page-accent)",
                margin: 0,
                marginTop: 16,
                fontFamily:
                  "var(--font-outfit), var(--font-geist-sans), system-ui, sans-serif",
                fontWeight: 600,
              }}
            >
              Competitively priced. Will move.
            </p>
          </motion.article>
        </div>
      </div>

      <style jsx>{`
        .ab-compare {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }
        @media (min-width: 720px) {
          .ab-compare {
            grid-template-columns: 1fr 1fr;
            gap: 24px;
          }
        }
      `}</style>
    </section>
  );
}
