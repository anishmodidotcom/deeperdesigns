"use client";

import { motion } from "motion/react";

export default function CoreProblem() {
  return (
    <section style={{ paddingBlock: 128 }}>
      <div
        className="container-x"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
            fontWeight: 500,
            fontSize: "clamp(24px, 3.5vw, 40px)",
            color: "var(--page-text)",
            maxWidth: 700,
            lineHeight: 1.3,
            letterSpacing: "-0.02em",
            margin: 0,
          }}
        >
          His garlic sauce chicken wrap is the most popular item on the menu.
          It might also be losing money.
        </h2>

        <p
          style={{
            fontSize: 16,
            color: "var(--page-text-2)",
            maxWidth: 560,
            marginTop: 24,
            margin: 0,
            marginBlockStart: 24,
            lineHeight: 1.6,
          }}
        >
          Without unit economics data, Faisal is flying blind. He knows
          monthly profit but cannot tell you which dish earns and which dish
          bleeds.
        </p>

        <div
          className="zr-compare"
          style={{
            display: "grid",
            gap: 16,
            marginTop: 48,
            width: "100%",
            maxWidth: 700,
            textAlign: "left",
          }}
        >
          <motion.div
            initial={{ opacity: 0, rotateY: 5 }}
            whileInView={{ opacity: 1, rotateY: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              transformPerspective: 1000,
              background: "var(--page-surface)",
              borderRadius: 8,
              padding: 24,
            }}
          >
            <Badge color="#22C55E">Best Seller</Badge>
            <h3 style={titleStyle}>Garlic Sauce Chicken Wrap</h3>
            <Stat label="Sold" value="340 / week" />
            <Stat label="Revenue" value="AED 4,760" />
            <Stat
              label="Cost"
              value="AED 4,200 (imported garlic sauce)"
              color="#EF4444"
            />
            <p style={{ ...marginStyle, color: "#EF4444" }}>
              Actual Margin: 11.8%
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, rotateY: 5 }}
            whileInView={{ opacity: 1, rotateY: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{
              transformPerspective: 1000,
              background: "var(--page-surface)",
              borderRadius: 8,
              padding: 24,
            }}
          >
            <Badge color="var(--page-text-2)" muted>
              3rd Most Popular
            </Badge>
            <h3 style={titleStyle}>Classic Beef Shawarma</h3>
            <Stat label="Sold" value="180 / week" />
            <Stat label="Revenue" value="AED 2,700" />
            <Stat label="Cost" value="AED 1,350" color="#22C55E" />
            <p style={{ ...marginStyle, color: "#22C55E" }}>
              Actual Margin: 50%
            </p>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 720px) {
          .zr-compare {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

function Badge({
  children,
  color,
  muted,
}: {
  children: React.ReactNode;
  color: string;
  muted?: boolean;
}) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        background: muted
          ? "rgba(168,144,128,0.12)"
          : "rgba(34,197,94,0.12)",
        color,
        fontFamily: "var(--font-geist-mono), monospace",
        fontSize: 11,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        paddingInline: 10,
        paddingBlock: 4,
        borderRadius: 4,
      }}
    >
      {children}
    </span>
  );
}

function Stat({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color?: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        gap: 12,
        paddingBlock: 6,
        fontSize: 14,
        color: "var(--page-text-2)",
        borderBottom: "1px solid rgba(232,93,42,0.08)",
      }}
    >
      <span style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 12 }}>
        {label}
      </span>
      <span
        style={{
          fontFamily: "var(--font-geist-mono), monospace",
          color: color ?? "var(--page-text)",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {value}
      </span>
    </div>
  );
}

const titleStyle: React.CSSProperties = {
  fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
  fontWeight: 700,
  fontSize: 18,
  color: "var(--page-text)",
  margin: 0,
  marginTop: 12,
  marginBottom: 12,
  letterSpacing: "-0.01em",
};

const marginStyle: React.CSSProperties = {
  fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
  fontWeight: 700,
  fontSize: 22,
  margin: 0,
  marginTop: 16,
  letterSpacing: "-0.02em",
};
