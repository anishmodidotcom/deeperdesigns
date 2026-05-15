"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { PaisleyBullet } from "./illustrations";

const SOFT = [0.4, 0, 0.6, 1] as const;

const CAPABILITIES = [
  "Brand world: Rajasthani heritage, soft modernism",
  "Custom builder UI: shape, size, pattern, glaze",
  "Inventory queue: lead time as a feature, not a bug",
  "Story-led copy: maker before merchandise",
  "Photography direction: process over polish",
];

const META = [
  { key: "Year", value: "2025" },
  { key: "Sector", value: "Ceramics · D2C" },
  { key: "Region", value: "Jaipur · India" },
  { key: "Engagement", value: "Brand and product, 9 weeks" },
];

export default function AboutBuild() {
  return (
    <section
      style={{
        paddingBlock: 144,
        position: "relative",
        background: "var(--page-surface-1)",
        borderTop: "1px solid var(--page-border)",
      }}
    >
      <div
        className="container-x"
        style={{ maxWidth: 1280, marginInline: "auto" }}
      >
        <div className="ef-about-grid">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: SOFT }}
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "4 / 5",
              overflow: "hidden",
              borderRadius: 4,
            }}
          >
            <Image
              src="/images/earth-and-fire/kiln-glow.webp"
              alt="The kiln glowing orange at night, with one finished piece in front"
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              style={{ objectFit: "cover" }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.1, ease: SOFT }}
          >
            <p
              style={{
                fontFamily:
                  "var(--font-geist-sans), system-ui, sans-serif",
                fontWeight: 500,
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.22em",
                color: "var(--page-border)",
                margin: 0,
                marginBottom: 28,
              }}
            >
              THE BUILD
            </p>

            <h2
              style={{
                fontFamily:
                  "var(--font-display-script), 'DM Serif Display', Georgia, serif",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(34px, 5vw, 56px)",
                letterSpacing: "-0.01em",
                lineHeight: 1.05,
                color: "var(--page-text)",
                margin: 0,
                marginBottom: 28,
              }}
            >
              Brand and store, in nine weeks.
            </h2>

            <p
              style={{
                fontSize: 17,
                lineHeight: 1.75,
                color: "var(--page-text-2)",
                margin: 0,
                marginBottom: 44,
                maxWidth: 540,
              }}
            >
              We built Earth and Fire as a heritage-first ceramics brand,
              with a custom builder, a queue-based ordering system, and a
              story-led site. Nia spends her hours at the wheel, not in
              the comments. The drops are quieter. The work is louder.
            </p>

            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                marginBottom: 48,
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
            >
              {CAPABILITIES.map((capability) => (
                <li
                  key={capability}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    fontFamily:
                      "var(--font-serif), 'Fraunces', Georgia, serif",
                    fontSize: 16,
                    color: "var(--page-text)",
                  }}
                >
                  <span style={{ color: "var(--page-accent)" }}>
                    <PaisleyBullet width={14} />
                  </span>
                  {capability}
                </li>
              ))}
            </ul>

            <dl
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 28,
                margin: 0,
                paddingTop: 32,
                borderTop: "1px solid var(--page-border)",
              }}
            >
              {META.map((row) => (
                <div key={row.key}>
                  <dt
                    style={{
                      fontFamily:
                        "var(--font-geist-sans), system-ui, sans-serif",
                      fontSize: 10,
                      fontWeight: 500,
                      textTransform: "uppercase",
                      letterSpacing: "0.16em",
                      color: "var(--page-text-3)",
                      margin: 0,
                      marginBottom: 8,
                    }}
                  >
                    {row.key}
                  </dt>
                  <dd
                    style={{
                      fontFamily:
                        "var(--font-serif), 'Fraunces', Georgia, serif",
                      fontWeight: 500,
                      fontSize: 16,
                      color: "var(--page-text)",
                      margin: 0,
                    }}
                  >
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .ef-about-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 56px;
        }
        @media (min-width: 1024px) {
          .ef-about-grid {
            grid-template-columns: 40fr 60fr;
            gap: 96px;
            align-items: start;
          }
        }
      `}</style>
    </section>
  );
}
