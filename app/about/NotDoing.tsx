"use client";

import { motion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

const ITEMS = [
  {
    title: "Enterprise SaaS at $500K per seat",
    body: "We do not compete with Salesforce, ServiceNow, or Workday. If your problem is a $500K seat licence for a 5,000-person company, we are not it.",
  },
  {
    title: "Big-4-style strategy decks",
    body: "We do not write 80-slide strategy presentations. We do a one-day brief and then start building. The deck is the live tool.",
  },
  {
    title: "Template Shopify stores",
    body: "We do not stand up Shopify themes or rebrand Wix templates. If a template fits, you do not need us. We are useful when the requirement is bespoke.",
  },
  {
    title: "Long-tail maintenance contracts",
    body: "We ship a tool and stay close for the first 30 days. After that we hand off cleanly. We are not a retainer agency.",
  },
];

export default function NotDoing() {
  return (
    <section
      style={{
        paddingBlock: 144,
        borderTop: "1px solid var(--border)",
        background: "var(--surface-1)",
      }}
    >
      <div className="container-x" style={{ maxWidth: 1320, marginInline: "auto" }}>
        <div className="abt-not-grid">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <p
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.22em",
                color: "var(--accent)",
                margin: 0,
                marginBottom: 24,
              }}
            >
              06 · WHAT WE DO NOT DO
            </p>
            <h2
              style={{
                fontFamily: "var(--font-fraunces), Georgia, serif",
                fontWeight: 400,
                fontStyle: "italic",
                fontSize: "clamp(32px, 5vw, 56px)",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                color: "var(--text)",
                margin: 0,
                marginBottom: 28,
                maxWidth: 460,
              }}
            >
              Clarity about what we are not.
            </h2>
            <p
              style={{
                fontSize: 17,
                color: "var(--text-2)",
                margin: 0,
                lineHeight: 1.75,
                maxWidth: 460,
              }}
            >
              The shape of the work is unusual enough that this list
              shortens enquiries on both sides.
            </p>
          </motion.div>

          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: 0,
              borderTop: "1px solid var(--border)",
            }}
          >
            {ITEMS.map((item, i) => (
              <motion.li
                key={item.title}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
                style={{
                  paddingBlock: 28,
                  borderBottom: "1px solid var(--border)",
                  display: "grid",
                  gridTemplateColumns: "auto 1fr",
                  gap: 24,
                  alignItems: "baseline",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-geist-mono), monospace",
                    fontSize: 11,
                    letterSpacing: "0.18em",
                    color: "var(--text-3)",
                  }}
                >
                  0{i + 1}
                </span>
                <div>
                  <p
                    style={{
                      fontFamily:
                        "var(--font-fraunces), Georgia, serif",
                      fontWeight: 500,
                      fontSize: 22,
                      color: "var(--text)",
                      margin: 0,
                      marginBottom: 8,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {item.title}
                  </p>
                  <p
                    style={{
                      fontSize: 16,
                      color: "var(--text-2)",
                      margin: 0,
                      lineHeight: 1.65,
                      maxWidth: 540,
                    }}
                  >
                    {item.body}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      <style jsx>{`
        .abt-not-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 56px;
        }
        @media (min-width: 900px) {
          .abt-not-grid {
            grid-template-columns: 40fr 60fr;
            gap: 96px;
            align-items: start;
          }
        }
      `}</style>
    </section>
  );
}
