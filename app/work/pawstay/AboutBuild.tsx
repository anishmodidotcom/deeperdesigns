"use client";

import Image from "next/image";
import { motion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

const INFO: [string, string][] = [
  ["Client", "PawStay"],
  ["Industry", "Pet care, boarding, daycare"],
  ["Location", "Chattarpur, New Delhi"],
  ["Timeline", "19 days"],
  ["Year", "2025"],
];

const CAPABILITIES = [
  "Live camera streaming",
  "Activity tracker",
  "OTP authentication",
  "Booking and capacity logic",
  "Razorpay integration",
  "Addon ordering",
  "Automated email digests",
];

export default function AboutBuild() {
  return (
    <section style={{ paddingBlock: 144 }}>
      <div className="container-x">
        <div className="ps-about-grid">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: EASE }}
            style={{
              position: "relative",
              aspectRatio: "4 / 5",
              overflow: "hidden",
              borderRadius: 12,
              border: "1px solid var(--page-border)",
            }}
          >
            <Image
              src="/images/pawstay/pooja-portrait.webp"
              alt="Pooja sitting with her arm around a golden retriever in the daycare"
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              style={{ objectFit: "cover" }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          >
            <p
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                color: "var(--page-accent)",
                margin: 0,
                marginBottom: 24,
              }}
            >
              ABOUT THIS BUILD
            </p>
            <p
              style={{
                fontSize: 17,
                color: "var(--page-text-2)",
                lineHeight: 1.75,
                margin: 0,
                maxWidth: 560,
              }}
            >
              Built in 19 days. Live camera streaming via Twilio Video,
              real-time activity tracker with WebSockets, phone-number OTP
              auth, dog and owner profile system, booking calendar with
              capacity logic, Razorpay for deposits, addon ordering, and
              automated daily summary emails. Replaced the WhatsApp chaos
              with a portal that respects how much parents actually love
              their dogs.
            </p>

            <dl
              style={{
                marginTop: 36,
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
                        "var(--font-jakarta), var(--font-geist-sans), system-ui, sans-serif",
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
                marginTop: 36,
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
        .ps-about-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
          align-items: start;
        }
        @media (min-width: 1024px) {
          .ps-about-grid {
            grid-template-columns: 1fr 1.3fr;
            gap: 80px;
          }
        }
      `}</style>
    </section>
  );
}
