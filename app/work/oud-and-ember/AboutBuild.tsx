"use client";

import { motion } from "motion/react";

const EASE = [0.19, 1, 0.22, 1] as const;

const CAPABILITIES = [
  "Custom quiz engine",
  "AI bottle personalization",
  "Catalog with story pages",
  "WhatsApp atelier handoff",
  "Stripe checkout",
  "Inventory sync",
];

export default function AboutBuild() {
  return (
    <section style={{ paddingBlock: 144 }}>
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, ease: EASE }}
          className="oe-about-grid"
        >
          <div>
            <p
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                color: "var(--page-accent)",
                margin: 0,
                marginBottom: 28,
              }}
            >
              ABOUT THIS BUILD
            </p>
            <p
              style={{
                fontSize: 16,
                color: "var(--page-text-2)",
                lineHeight: 1.8,
                margin: 0,
                maxWidth: 540,
              }}
            >
              Built in 18 days. A custom quiz engine, an AI-generated
              bottle visualisation for each customer, a WhatsApp handoff
              for atelier bookings, and Stripe for direct purchases.
              Designed closely with Nadia, to honour the heritage of the
              house while opening a digital front door.
            </p>

            <dl
              style={{
                marginTop: 40,
                display: "grid",
                gridTemplateColumns: "max-content 1fr",
                columnGap: 28,
                rowGap: 14,
                maxWidth: 540,
              }}
            >
              {[
                ["Client", "Oud & Ember"],
                ["Industry", "Bespoke Perfumery"],
                ["Location", "Al Quoz, Dubai, UAE"],
                ["Timeline", "18 days"],
                ["Year", "2025"],
              ].map(([k, v]) => (
                <div
                  key={k}
                  style={{ display: "contents" }}
                >
                  <dt
                    style={{
                      fontFamily: "var(--font-geist-mono), monospace",
                      fontSize: 11,
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                      color: "var(--page-text-3)",
                    }}
                  >
                    {k}
                  </dt>
                  <dd
                    style={{
                      margin: 0,
                      fontSize: 14,
                      color: "var(--page-text)",
                      fontFamily:
                        "var(--font-cormorant-display), Cormorant, Georgia, serif",
                      fontWeight: 400,
                    }}
                  >
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <p
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                color: "var(--page-text-3)",
                margin: 0,
                marginBottom: 24,
              }}
            >
              Capabilities
            </p>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              {CAPABILITIES.map((c) => (
                <li
                  key={c}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    fontFamily: "var(--font-geist-mono), monospace",
                    fontSize: 13,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    color: "var(--page-text)",
                  }}
                >
                  <span
                    aria-hidden
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: 9999,
                      background: "var(--page-accent)",
                      flexShrink: 0,
                    }}
                  />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .oe-about-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 56px;
        }
        @media (min-width: 1024px) {
          .oe-about-grid {
            grid-template-columns: 1.6fr 1fr;
            gap: 96px;
            align-items: start;
          }
        }
      `}</style>
    </section>
  );
}
