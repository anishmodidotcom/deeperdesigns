"use client";

import Image from "next/image";
import { motion } from "motion/react";

const EASE = [0.4, 0, 0.2, 1] as const;

const INFO: [string, string][] = [
  ["Client", "Sahaja Farms"],
  ["Industry", "Organic agriculture, D2C, wholesale"],
  ["Location", "Near Mysore, Karnataka"],
  ["Timeline", "28 days"],
  ["Year", "2025"],
];

const CAPABILITIES = [
  "Farm management dashboard",
  "Crop planting algorithms",
  "Subscription CRM with churn scoring",
  "Wholesale order portal",
  "Restaurant inventory tracking",
  "Weather and seasonal forecasts",
  "Daily summary push to mobile",
];

export default function AboutBuild() {
  return (
    <section style={{ paddingBlock: 144 }}>
      <div className="container-x">
        <div className="sf-about-grid">
          <motion.div
            initial={{ opacity: 0, scale: 1.02, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.1, ease: EASE }}
            style={{
              position: "relative",
              aspectRatio: "4 / 5",
              overflow: "hidden",
              borderRadius: 8,
              boxShadow:
                "0 40px 80px -40px rgba(212,165,55,0.22), 0 0 0 1px rgba(212,165,55,0.06)",
            }}
          >
            <Image
              src="/images/sahaja-farms/farm-dawn.webp"
              alt="An organic farm at dawn with mist over the fields and a banyan tree silhouetted"
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              style={{ objectFit: "cover" }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
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
              Built in 28 days. A farm management dashboard, a crop
              calendar with planting algorithms, a subscription CRM with
              churn scoring, a wholesale order portal, restaurant
              inventory tracking, weather and seasonal forecasts, and a
              6 AM summary to her phone. Built from her own notebooks.
              The model learns from her decisions, not the other way
              around.
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
                      letterSpacing: "0.12em",
                      color: "var(--page-text-3)",
                    }}
                  >
                    {k}
                  </dt>
                  <dd
                    style={{
                      margin: 0,
                      fontFamily:
                        "var(--font-bricolage), Georgia, serif",
                      fontWeight: 500,
                      fontSize: 15,
                      color: "var(--page-text)",
                      letterSpacing: "-0.015em",
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
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .sf-about-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 56px;
          align-items: start;
        }
        @media (min-width: 1024px) {
          .sf-about-grid {
            grid-template-columns: 40fr 60fr;
            gap: 96px;
          }
        }
      `}</style>
    </section>
  );
}
