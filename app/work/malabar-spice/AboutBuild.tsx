"use client";

import Image from "next/image";
import { motion } from "motion/react";

const EASE = [0.25, 1, 0.5, 1] as const;

const INFO: [string, string][] = [
  ["Client", "Malabar Spice House"],
  ["Industry", "Spice export"],
  ["Location", "Kochi, Kerala"],
  ["Timeline", "14 days"],
  ["Year", "2025"],
];

const CAPABILITIES = [
  "Editorial brand site",
  "Heritage archive",
  "Catalog with origin stories",
  "Contact form",
  "Multilingual support (EN / ML / AR / DE)",
  "Press kit and exporter credentials",
];

export default function AboutBuild() {
  return (
    <section style={{ paddingBlock: 144 }}>
      <div className="container-x">
        <div className="ms-about-grid">
          <motion.div
            initial={{ opacity: 0, scale: 1.02, y: 24 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.2, ease: EASE }}
            style={{
              position: "relative",
              aspectRatio: "4 / 5",
              overflow: "hidden",
              borderRadius: 4,
              boxShadow:
                "0 40px 80px -40px rgba(232,155,45,0.18), 0 0 0 1px rgba(232,155,45,0.05)",
            }}
          >
            <Image
              src="/images/malabar-spice/rashid-portrait.webp"
              alt="Rashid, third-generation spice trader, in his Kochi warehouse"
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              style={{ objectFit: "cover" }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, delay: 0.1, ease: EASE }}
          >
            <p
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.18em",
                color: "var(--page-accent)",
                margin: 0,
                marginBottom: 28,
              }}
            >
              ABOUT THIS BUILD
            </p>
            <p
              style={{
                fontSize: 17,
                color: "var(--page-text-2)",
                lineHeight: 1.8,
                margin: 0,
                maxWidth: 560,
              }}
            >
              Built in 14 days. A beautifully designed marketing website with
              the catalog, the heritage archive, and a single contact form
              that emails Rashid directly. No CRM. No analytics dashboard.
              No automation. Some businesses are not broken. We just gave
              this one its rightful presence online.
            </p>

            <dl
              style={{
                marginTop: 40,
                display: "grid",
                gridTemplateColumns: "max-content 1fr",
                columnGap: 28,
                rowGap: 12,
                maxWidth: 560,
              }}
            >
              {INFO.map(([k, v]) => (
                <div key={k} style={{ display: "contents" }}>
                  <dt
                    style={{
                      fontFamily:
                        "var(--font-geist-mono), monospace",
                      fontSize: 11,
                      textTransform: "uppercase",
                      letterSpacing: "0.15em",
                      color: "var(--page-text-3)",
                    }}
                  >
                    {k}
                  </dt>
                  <dd
                    style={{
                      margin: 0,
                      fontFamily:
                        "var(--font-fraunces), Georgia, serif",
                      fontWeight: 400,
                      fontSize: 16,
                      color: "var(--page-text)",
                      fontVariationSettings: "'opsz' 144",
                    }}
                  >
                    {v}
                  </dd>
                </div>
              ))}
            </dl>

            <p
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                color: "var(--page-text-3)",
                margin: 0,
                marginTop: 40,
                marginBottom: 18,
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
                gap: 10,
              }}
            >
              {CAPABILITIES.map((c) => (
                <li
                  key={c}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    fontFamily:
                      "var(--font-geist-mono), monospace",
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

            <motion.figure
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1, ease: EASE }}
              style={{
                margin: 0,
                marginTop: 56,
                padding: 28,
                background:
                  "linear-gradient(160deg, rgba(232,155,45,0.1), rgba(232,155,45,0.02))",
                border: "1px solid rgba(232,155,45,0.25)",
                borderRadius: 8,
                maxWidth: 620,
              }}
            >
              <blockquote
                style={{
                  margin: 0,
                  fontFamily:
                    "var(--font-fraunces), Georgia, serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: 18,
                  color: "var(--page-accent-2)",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.55,
                  fontVariationSettings: "'opsz' 144",
                }}
              >
                Sometimes the best build is a small one. We say no to
                projects that need a team, not a tool.
              </blockquote>
            </motion.figure>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .ms-about-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
          align-items: start;
        }
        @media (min-width: 1024px) {
          .ms-about-grid {
            grid-template-columns: 40fr 60fr;
            gap: 96px;
          }
        }
      `}</style>
    </section>
  );
}
