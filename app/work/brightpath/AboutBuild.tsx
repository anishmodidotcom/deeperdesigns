"use client";

import Image from "next/image";
import { motion } from "motion/react";

const SOFT = [0.4, 0, 0.6, 1] as const;

const CAPABILITIES = [
  "Brand identity: serious, academic, gold-on-navy restraint",
  "Parent portal: per-lesson logging with topic, mood, homework, score",
  "Auto-summary engine: weekly email in the parent’s preferred language",
  "Score-trend charts anonymised against a cohort baseline",
  "Programme structure with waitlist and trusted-tutor referral fallback",
];

const META = [
  { key: "Year", value: "2025" },
  { key: "Sector", value: "Education · Tutoring" },
  { key: "Region", value: "Al Ain · UAE" },
  { key: "Engagement", value: "Brand and platform, 9 weeks" },
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
        <div className="bp-about-grid">
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
              SECTION 06 · THE BUILD
            </p>

            <h2
              style={{
                fontFamily:
                  "var(--font-display-academic), 'Source Serif 4', 'Times New Roman', serif",
                fontWeight: 500,
                fontSize: "clamp(36px, 5.4vw, 60px)",
                letterSpacing: "-0.02em",
                lineHeight: 1.04,
                color: "var(--page-text)",
                margin: 0,
                marginBottom: 32,
              }}
            >
              A tutoring practice
              <br />
              <em
                style={{
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: "var(--page-accent)",
                }}
              >
                that runs itself.
              </em>
            </h2>

            <p
              style={{
                fontFamily:
                  "var(--font-body-soft), 'Source Sans 3', system-ui, sans-serif",
                fontSize: 18,
                lineHeight: 1.75,
                color: "var(--page-text-2)",
                margin: 0,
                marginBottom: 44,
                maxWidth: 540,
              }}
            >
              We took Omar&rsquo;s handwritten habit and turned it into
              a system. The portal does the talking. The weekly summary
              does the reassurance. Omar gets back the hours he used to
              lose to reports and status checks. The roster stays full,
              and the renewals are silent.
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
                    paddingBlock: 18,
                    borderBottom: "1px solid var(--page-border)",
                    fontFamily:
                      "var(--font-body-soft), 'Source Sans 3', sans-serif",
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
                        "var(--font-display-academic), 'Source Serif 4', serif",
                      fontWeight: 500,
                      fontSize: 18,
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
                src="/images/brightpath/tutor-detail.webp"
                alt="A close-up of Omar&rsquo;s hand showing a worked example to a student in a notebook"
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
                src="/images/brightpath/parent-phone.webp"
                alt="A parent looking at the BrightPath portal on their phone while sitting at a kitchen table"
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .bp-about-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 56px;
        }
        @media (min-width: 1024px) {
          .bp-about-grid {
            grid-template-columns: 55fr 45fr;
            gap: 96px;
            align-items: start;
          }
        }
      `}</style>
    </section>
  );
}
