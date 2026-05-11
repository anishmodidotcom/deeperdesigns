"use client";

import Image from "next/image";
import { motion } from "motion/react";

const SOFT = [0.4, 0, 0.6, 1] as const;

const CAPABILITIES = [
  "Brand identity: tin packaging, Mumbai swagger, restraint",
  "Quiz funnel: three-tap blend recommender",
  "Direct subscription stack with skip and pause built in",
  "Photography direction: dark, warm, ritual-first",
  "Origin story copy from the sample-room outwards",
];

const META = [
  { key: "Year", value: "2025" },
  { key: "Sector", value: "Tea · D2C" },
  { key: "Region", value: "Mumbai · India" },
  { key: "Engagement", value: "Brand and store, 7 weeks" },
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
        <div className="kc-about-grid">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: SOFT }}
          >
            <p
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.22em",
                color: "var(--page-accent)",
                margin: 0,
                marginBottom: 28,
              }}
            >
              SECTION 07 · THE BUILD
            </p>

            <h2
              style={{
                fontFamily:
                  "var(--font-display-bold), 'Archivo Black', Impact, sans-serif",
                fontWeight: 400,
                fontSize: "clamp(40px, 6vw, 72px)",
                letterSpacing: "-0.03em",
                lineHeight: 0.95,
                color: "var(--page-text)",
                margin: 0,
                marginBottom: 32,
                textTransform: "uppercase",
              }}
            >
              Brand. Tin.
              <br />
              Store. Done.
            </h2>

            <p
              style={{
                fontFamily: "var(--font-body), 'Crimson Pro', Georgia, serif",
                fontSize: 18,
                lineHeight: 1.75,
                color: "var(--page-text-2)",
                margin: 0,
                marginBottom: 40,
                maxWidth: 540,
              }}
            >
              We took Kadak Chai from a wholesale supply chain into a
              direct-to-consumer brand in seven weeks. Tin design,
              illustrated typography, a quiz-led store, and a subscription
              loop. The blends did not change. Everything around them did.
            </p>

            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                marginBottom: 48,
                display: "flex",
                flexDirection: "column",
                gap: 12,
                borderTop: "1px solid var(--page-border)",
              }}
            >
              {CAPABILITIES.map((capability) => (
                <li
                  key={capability}
                  style={{
                    paddingBlock: 16,
                    borderBottom: "1px solid var(--page-border)",
                    fontFamily:
                      "var(--font-body), 'Crimson Pro', Georgia, serif",
                    fontSize: 17,
                    color: "var(--page-text)",
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                  }}
                >
                  <span
                    aria-hidden
                    style={{
                      width: 28,
                      height: 1,
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
                gap: 28,
                margin: 0,
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
                      fontFamily:
                        "var(--font-body), 'Crimson Pro', Georgia, serif",
                      fontWeight: 500,
                      fontSize: 17,
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

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.1, ease: SOFT }}
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
                borderRadius: 4,
              }}
            >
              <Image
                src="/images/kadak-chai/accessories-flatlay.webp"
                alt="Top-down flatlay of brass kettle, three kulhads, wooden strainer, tin, and ceramic milk pitcher"
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
                borderRadius: 4,
              }}
            >
              <Image
                src="/images/kadak-chai/spices-detail.webp"
                alt="Whole spices arranged on dark wood: cardamom, cinnamon, clove, ginger, pepper"
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .kc-about-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 56px;
        }
        @media (min-width: 1024px) {
          .kc-about-grid {
            grid-template-columns: 55fr 45fr;
            gap: 96px;
            align-items: start;
          }
        }
      `}</style>
    </section>
  );
}
