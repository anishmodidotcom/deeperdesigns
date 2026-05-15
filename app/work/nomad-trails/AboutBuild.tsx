"use client";

import Image from "next/image";
import { motion } from "motion/react";

const SOFT = [0.4, 0, 0.6, 1] as const;

const CAPABILITIES = [
  "Brand identity: mountain editorial, not adventure-sports",
  "Trip-detail page architecture with day-by-day briefs",
  "Pre-trip kit and prep flow via WhatsApp Business",
  "Trip enquiry that opens with a phone call, not a form",
  "Photography direction: real altitude, real weather",
];

const META = [
  { key: "Year", value: "2025" },
  { key: "Sector", value: "Travel · Adventure" },
  { key: "Region", value: "Leh · India" },
  { key: "Engagement", value: "Brand and site, 8 weeks" },
];

export default function AboutBuild() {
  return (
    <section
      style={{
        paddingBlock: 144,
        background: "var(--page-surface-1)",
        borderTop: "1px solid var(--page-border)",
        position: "relative",
      }}
    >
      <div
        className="container-x"
        style={{ maxWidth: 1280, marginInline: "auto" }}
      >
        <div className="nt-about-grid">
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
                borderRadius: 4,
              }}
            >
              <Image
                src="/images/nomad-trails/base-camp.webp"
                alt="A high-altitude base camp at sunrise with several yellow tents below a rocky peak"
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "4 / 3",
                overflow: "hidden",
                borderRadius: 4,
              }}
            >
              <Image
                src="/images/nomad-trails/camping-night.webp"
                alt="A trekking tent at night with the milky way visible above"
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
                fontFamily: "var(--font-mono-tech), 'IBM Plex Mono', monospace",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.22em",
                color: "var(--page-accent-deep)",
                margin: 0,
                marginBottom: 28,
              }}
            >
              SECTION 07 · THE BUILD
            </p>

            <h2
              style={{
                fontFamily:
                  "var(--font-display-editorial), 'Bodoni Moda', 'Didot', serif",
                fontWeight: 500,
                fontSize: "clamp(34px, 5vw, 56px)",
                letterSpacing: "-0.02em",
                lineHeight: 1.04,
                color: "var(--page-text)",
                margin: 0,
                marginBottom: 32,
              }}
            >
              An editorial site,
              <br />
              <em
                style={{
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: "var(--page-accent-deep)",
                }}
              >
                not a booking funnel.
              </em>
            </h2>

            <p
              style={{
                fontFamily:
                  "var(--font-body-clean), 'Inter', system-ui, sans-serif",
                fontSize: 18,
                lineHeight: 1.75,
                color: "var(--page-text-2)",
                margin: 0,
                marginBottom: 44,
                maxWidth: 540,
              }}
            >
              We rebuilt Nomad Trails around its constraint. Small
              groups, long phone calls, three trips a year. The site
              sells the constraint as the offer, the photography earns
              the price, and the enquiry form opens a conversation
              instead of a checkout.
            </p>

            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                marginBottom: 48,
                display: "flex",
                flexDirection: "column",
                gap: 0,
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
                      "var(--font-body-clean), 'Inter', system-ui, sans-serif",
                    fontSize: 16,
                    color: "var(--page-text)",
                  }}
                >
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
              }}
            >
              {META.map((row) => (
                <div key={row.key}>
                  <dt
                    style={{
                      fontFamily:
                        "var(--font-mono-tech), 'IBM Plex Mono', monospace",
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
                        "var(--font-body-clean), 'Inter', system-ui, sans-serif",
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
        .nt-about-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 56px;
        }
        @media (min-width: 1024px) {
          .nt-about-grid {
            grid-template-columns: 42fr 58fr;
            gap: 96px;
            align-items: start;
          }
        }
      `}</style>
    </section>
  );
}
