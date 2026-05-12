"use client";

import { motion } from "motion/react";
import { Link } from "next-view-transitions";

const EASE = [0.16, 1, 0.3, 1] as const;

const TIERS = [
  {
    name: "Free",
    price: "₹0",
    cadence: "to start",
    features: ["A handful of renders", "All scenes available", "Best for trying it"],
    cta: "Try it free",
    primary: false,
  },
  {
    name: "Studio",
    price: "₹999",
    cadence: "per month",
    features: [
      "Catalog volume for a maker",
      "All scenes plus weekly drops",
      "Catalog and social ratios",
    ],
    cta: "Start Studio",
    primary: true,
  },
  {
    name: "Atelier",
    price: "₹2,999",
    cadence: "per month",
    features: [
      "Higher render volume",
      "Priority queue",
      "Custom scene requests",
    ],
    cta: "Start Atelier",
    primary: false,
  },
];

export default function Pricing() {
  return (
    <section
      style={{
        paddingBlock: 144,
        borderTop: "1px solid var(--page-border)",
        background: "var(--page-surface)",
      }}
    >
      <div
        className="container-x"
        style={{ maxWidth: 1180, marginInline: "auto" }}
      >
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: EASE }}
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 11,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--page-accent)",
            margin: 0,
            marginBottom: 24,
          }}
        >
          § PRICING
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE }}
          style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontWeight: 600,
            fontSize: "clamp(28px, 4vw, 48px)",
            letterSpacing: "-0.03em",
            color: "var(--page-text)",
            lineHeight: 1.05,
            margin: 0,
            marginBottom: 56,
            maxWidth: 640,
          }}
        >
          Less than the cost of one studio shoot.
        </motion.h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 16,
          }}
          className="ml-tiers"
        >
          {TIERS.map((t, i) => (
            <motion.article
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
              style={{
                background: t.primary
                  ? "var(--page-surface-2)"
                  : "var(--page-bg)",
                border: `1px solid ${
                  t.primary ? "var(--page-accent)" : "var(--page-border)"
                }`,
                borderRadius: 14,
                padding: "32px 28px",
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: 11,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: t.primary
                    ? "var(--page-accent)"
                    : "var(--page-text-3)",
                  margin: 0,
                }}
              >
                {t.name}
              </p>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                <span
                  style={{
                    fontFamily: "var(--font-inter), system-ui, sans-serif",
                    fontWeight: 600,
                    fontSize: 36,
                    letterSpacing: "-0.03em",
                    color: "var(--page-text)",
                  }}
                >
                  {t.price}
                </span>
                <span
                  style={{
                    fontSize: 14,
                    color: "var(--page-text-3)",
                  }}
                >
                  {t.cadence}
                </span>
              </div>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  flex: 1,
                }}
              >
                {t.features.map((f) => (
                  <li
                    key={f}
                    style={{
                      fontSize: 15,
                      color: "var(--page-text-2)",
                      lineHeight: 1.55,
                      paddingLeft: 18,
                      position: "relative",
                    }}
                  >
                    <span
                      aria-hidden
                      style={{
                        position: "absolute",
                        left: 0,
                        top: 8,
                        width: 8,
                        height: 1,
                        background: "var(--page-accent)",
                      }}
                    />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="https://maplelens.vercel.app/app"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="pointer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                  paddingInline: 18,
                  paddingBlock: 12,
                  background: t.primary
                    ? "var(--page-accent)"
                    : "transparent",
                  color: t.primary ? "#1A1612" : "var(--page-text)",
                  border: t.primary
                    ? "none"
                    : "1px solid var(--page-border)",
                  borderRadius: 9999,
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  fontSize: 13,
                  fontWeight: 600,
                  textDecoration: "none",
                  marginTop: 8,
                }}
              >
                {t.cta} ↗
              </a>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE }}
          style={{
            marginTop: 80,
            paddingTop: 32,
            borderTop: "1px solid var(--page-border)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: 12,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--page-accent)",
              margin: 0,
              marginBottom: 16,
            }}
          >
            Want this for your business?
          </p>
          <p
            style={{
              fontSize: 18,
              color: "var(--page-text-2)",
              margin: 0,
              marginBottom: 24,
              maxWidth: 640,
              lineHeight: 1.6,
            }}
          >
            We can build a Maple Lens for your category. Skincare brands.
            Apparel labels. Jewellers. Any business whose product needs to
            look better than the workshop light allows.
          </p>
          <Link
            href="/start-your-study?industry=Retail+%2F+D2C&objective=Customer+Experience"
            data-cursor="pointer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              paddingInline: 24,
              paddingBlock: 14,
              background: "var(--page-text)",
              color: "var(--page-bg)",
              borderRadius: 9999,
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: 14,
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Let&apos;s explore possibilities →
          </Link>
        </motion.div>
      </div>

      <style jsx>{`
        @media (min-width: 900px) {
          :global(.ml-tiers) {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
