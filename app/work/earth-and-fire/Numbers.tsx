"use client";

import { motion } from "motion/react";
import { PaisleyBullet, LotusBorder } from "./illustrations";

const SOFT = [0.4, 0, 0.6, 1] as const;

const STATS: { value: string; label: string; note: string }[] = [
  {
    value: "+340%",
    label: "Average order value",
    note: "From Rs. 1,400 to Rs. 6,200 per piece.",
  },
  {
    value: "12 weeks",
    label: "Lead time, by design",
    note: "Wait builds value. Drops created scarcity panic.",
  },
  {
    value: "0",
    label: "Fast-followers copying live drops",
    note: "Custom builds are not in catalogue. Cannot be scraped.",
  },
  {
    value: "98%",
    label: "Customer completion rate",
    note: "Builder UI converts on first session, not third.",
  },
];

export default function Numbers() {
  return (
    <section
      style={{
        paddingBlock: 144,
        position: "relative",
        background: "var(--page-bg)",
      }}
    >
      <div
        className="container-x"
        style={{ maxWidth: 1080, marginInline: "auto" }}
      >
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: SOFT }}
          style={{
            fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
            fontWeight: 500,
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.22em",
            color: "var(--page-border)",
            margin: 0,
            marginBottom: 28,
          }}
        >
          THE OUTCOMES
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: SOFT }}
          style={{
            fontFamily:
              "var(--font-display-script), 'DM Serif Display', Georgia, serif",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(36px, 5.4vw, 60px)",
            letterSpacing: "-0.01em",
            lineHeight: 1.05,
            color: "var(--page-text)",
            margin: 0,
            marginBottom: 80,
            maxWidth: 720,
          }}
        >
          Slower drops. Higher prices. Quieter feed. Better business.
        </motion.h2>

        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "flex",
            flexDirection: "column",
            gap: 0,
            borderTop: "1px solid var(--page-border)",
          }}
        >
          {STATS.map((stat, i) => (
            <motion.li
              key={stat.label}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: SOFT }}
              style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr",
                gap: 32,
                alignItems: "center",
                paddingBlock: 32,
                borderBottom: "1px solid var(--page-border)",
              }}
            >
              <div style={{ color: "var(--page-accent)" }}>
                <PaisleyBullet width={20} />
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gap: 8,
                }}
                className="ef-stat-row"
              >
                <div>
                  <span
                    style={{
                      fontFamily:
                        "var(--font-display-script), 'DM Serif Display', Georgia, serif",
                      fontStyle: "italic",
                      fontWeight: 400,
                      fontSize: "clamp(40px, 5.6vw, 64px)",
                      color: "var(--page-accent)",
                      letterSpacing: "-0.01em",
                      lineHeight: 1,
                    }}
                  >
                    {stat.value}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                  }}
                >
                  <p
                    style={{
                      fontFamily:
                        "var(--font-serif), 'Fraunces', Georgia, serif",
                      fontWeight: 500,
                      fontSize: 17,
                      color: "var(--page-text)",
                      margin: 0,
                    }}
                  >
                    {stat.label}
                  </p>
                  <p
                    style={{
                      fontSize: 14,
                      color: "var(--page-text-2)",
                      margin: 0,
                      lineHeight: 1.5,
                    }}
                  >
                    {stat.note}
                  </p>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.0, ease: SOFT }}
          aria-hidden
          style={{
            display: "flex",
            justifyContent: "center",
            color: "var(--page-border)",
            marginTop: 64,
          }}
        >
          <LotusBorder width={180} />
        </motion.div>
      </div>

      <style jsx>{`
        @media (min-width: 700px) {
          :global(.ef-stat-row) {
            grid-template-columns: 200px 1fr !important;
            gap: 40px !important;
            align-items: baseline !important;
          }
        }
      `}</style>
    </section>
  );
}
