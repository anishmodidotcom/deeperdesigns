"use client";

import Image from "next/image";
import { motion } from "motion/react";

const SOFT = [0.4, 0, 0.6, 1] as const;

const CAPABILITIES = [
  "Brand identity: script-led warmth without becoming a sticker book",
  "Order studio: four-step brief with reference upload and date hold",
  "Deposit payment via Stripe with auto-refund inside the lead window",
  "Lead-time engine: reserved capacity per week, hidden when full",
  "Photography direction: pastel and natural light, not commercial gloss",
];

const META = [
  { key: "Year", value: "2025" },
  { key: "Sector", value: "F&B · Home bakery" },
  { key: "Region", value: "Abu Dhabi · UAE" },
  { key: "Engagement", value: "Brand and site, 6 weeks" },
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
        <div className="sl-about-grid">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: SOFT }}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "4 / 5",
                overflow: "hidden",
                borderRadius: 16,
              }}
            >
              <Image
                src="/images/sugar-lane/bakery-kitchen.webp"
                alt="Farah&rsquo;s home kitchen on a baking morning: stand mixer, parchment, eggs, butter"
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "16 / 10",
                overflow: "hidden",
                borderRadius: 16,
              }}
            >
              <Image
                src="/images/sugar-lane/signature-collection.webp"
                alt="A flat-lay of three signature cakes arranged on linen with fresh flowers"
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.1, ease: SOFT }}
          >
            <p
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.22em",
                color: "var(--page-accent)",
                margin: 0,
                marginBottom: 24,
              }}
            >
              SECTION 06 · THE BUILD
            </p>

            <h2
              style={{
                margin: 0,
                marginBottom: 32,
                fontFamily: "var(--font-body), 'DM Sans', sans-serif",
                fontWeight: 500,
                fontSize: "clamp(36px, 5.4vw, 56px)",
                letterSpacing: "-0.02em",
                lineHeight: 1.05,
                color: "var(--page-text)",
              }}
            >
              A bakery store{" "}
              <span
                style={{
                  fontFamily:
                    "var(--font-display-script), 'Yellowtail', cursive",
                  fontWeight: 400,
                  fontSize: "1.15em",
                  color: "var(--page-accent)",
                }}
              >
                that thinks like a brief.
              </span>
            </h2>

            <p
              style={{
                margin: 0,
                marginBottom: 40,
                fontFamily: "var(--font-body), 'DM Sans', sans-serif",
                fontSize: 18,
                color: "var(--page-text-2)",
                lineHeight: 1.7,
                maxWidth: 540,
              }}
            >
              We rebuilt Sugar Lane around the moment Farah lost the most
              time: WhatsApp. The Order Studio captures the brief
              upfront, takes a deposit, and lands a clean PDF in Farah&rsquo;s
              inbox. The site looks like a bakery. The plumbing thinks
              like a project tool.
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
                    fontFamily: "var(--font-body), 'DM Sans', sans-serif",
                    fontSize: 16,
                    color: "var(--page-text)",
                  }}
                >
                  <span
                    aria-hidden
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "var(--page-accent)",
                      flexShrink: 0,
                    }}
                  />
                  {capability}
                </li>
              ))}
            </ul>

            <dl
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 24,
                margin: 0,
                paddingTop: 32,
                borderTop: "1px solid var(--page-border)",
              }}
            >
              {META.map((row) => (
                <div key={row.key}>
                  <dt
                    style={{
                      fontFamily: "var(--font-geist-mono), monospace",
                      fontSize: 10,
                      fontWeight: 500,
                      textTransform: "uppercase",
                      letterSpacing: "0.18em",
                      color: "var(--page-text-3)",
                      margin: 0,
                      marginBottom: 8,
                    }}
                  >
                    {row.key}
                  </dt>
                  <dd
                    style={{
                      fontFamily: "var(--font-body), 'DM Sans', sans-serif",
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
        .sl-about-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 56px;
        }
        @media (min-width: 1024px) {
          .sl-about-grid {
            grid-template-columns: 40fr 60fr;
            gap: 96px;
            align-items: start;
          }
        }
      `}</style>
    </section>
  );
}
