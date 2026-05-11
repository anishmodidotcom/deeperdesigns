"use client";

import Image from "next/image";
import { motion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

const INFO: [string, string][] = [
  ["Client", "HiveDesk · Indiranagar HQ"],
  ["Industry", "Coworking"],
  ["Location", "Bangalore"],
  ["Timeline", "22 days"],
  ["Year", "2025"],
];

const CAPABILITIES = [
  "Custom dashboard",
  "Member CRM",
  "Room booking system",
  "Churn scoring model",
  "WhatsApp Business API",
  "Razorpay integration",
];

export default function AboutBuild() {
  return (
    <section style={{ paddingBlock: 144 }}>
      <div className="container-x">
        <div className="hd-about-grid">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, ease: EASE }}
            style={{
              position: "relative",
              aspectRatio: "4 / 5",
              overflow: "hidden",
              borderRadius: 12,
              border: "1px solid var(--page-border)",
            }}
          >
            <Image
              src="/images/hivedesk/amit-portrait.webp"
              alt="Amit, the owner of HiveDesk, standing in his coworking space"
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              style={{ objectFit: "cover" }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: 0.08, ease: EASE }}
          >
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
                fontSize: 17,
                color: "var(--page-text-2)",
                lineHeight: 1.7,
                margin: 0,
                maxWidth: 560,
              }}
            >
              Built in 22 days. Custom dashboard, member CRM, room booking
              with capacity logic, churn scoring model trained on 18 months
              of his old Excel exports, Razorpay integration for renewals,
              WhatsApp Business API for nudges. Replaced six tools and a
              whiteboard. The hardest part was the data import. The most
              useful part was the at-risk list.
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
                        "var(--font-inter), system-ui, sans-serif",
                      fontSize: 14,
                      color: "var(--page-text)",
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
                marginBottom: 16,
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
                gap: 8,
              }}
            >
              {CAPABILITIES.map((c) => (
                <li
                  key={c}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
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
        .hd-about-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
        }
        @media (min-width: 1024px) {
          .hd-about-grid {
            grid-template-columns: 1fr 1.3fr;
            gap: 80px;
            align-items: start;
          }
        }
      `}</style>
    </section>
  );
}
