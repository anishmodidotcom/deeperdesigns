"use client";

import { Link } from "next-view-transitions";
import { motion } from "motion/react";
import type { Industry } from "@/lib/industries";
import { renderSerif } from "./text";
import IndustrySwitcher from "./IndustrySwitcher";

const EASE = [0.16, 1, 0.3, 1] as const;

// The scaffold render for industries where live === false: a hero, a short
// "we are building this page" line in DD voice, and the industry switcher.
export default function IndustryScaffold({ industry }: { industry: Industry }) {
  return (
    <>
      <section
        style={{
          minHeight: "82vh",
          display: "flex",
          alignItems: "center",
          paddingTop: 168,
          paddingBottom: "var(--dd-section-py, 120px)",
        }}
      >
        <div
          className="container"
          style={{ maxWidth: "var(--dd-container-max, 1280px)" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <p
              className="mono"
              style={{
                fontSize: 12,
                letterSpacing: "0.2em",
                color: "var(--page-accent)",
                margin: 0,
              }}
            >
              {industry.heroEyebrow}
            </p>
            <p
              style={{
                margin: "8px 0 0",
                fontSize: 13,
                color: "var(--dd-text-low, #808080)",
              }}
            >
              {industry.heroEyebrowNote}
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
            style={{
              fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
              fontWeight: 600,
              fontSize: "var(--dd-fs-h1, clamp(40px, 5vw, 64px))",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "var(--dd-text-high, #F5F5F5)",
              margin: "36px 0 0",
              maxWidth: 760,
            }}
          >
            {renderSerif(industry.heroHeadline)}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16, ease: EASE }}
            style={{
              marginTop: 28,
              maxWidth: 560,
              fontSize: 18,
              lineHeight: 1.6,
              color: "var(--dd-text-mid, #A8A8A8)",
            }}
          >
            {industry.heroSub}
          </motion.p>

          {/* In-progress line, DD voice. */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24, ease: EASE }}
            style={{
              marginTop: 44,
              paddingTop: 28,
              borderTop: "1px solid var(--dd-border, rgba(255,255,255,0.08))",
              maxWidth: 620,
            }}
          >
            <p
              className="mono"
              style={{
                fontSize: 11,
                letterSpacing: "0.16em",
                color: "var(--dd-text-low, #808080)",
                margin: "0 0 14px",
              }}
            >
              THIS PAGE IS ON THE BENCH
            </p>
            <p
              style={{
                fontSize: 17,
                lineHeight: 1.6,
                color: "var(--dd-text-mid, #A8A8A8)",
                margin: "0 0 28px",
              }}
            >
              We are building the full {industry.name} page right now, with the
              real working demos, the same way we built the D2C one. Want it
              sooner? Tell us what is leaking and we will show you the build for
              it first.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
              <Link
                href="/start-your-study"
                style={{
                  background: "var(--page-accent)",
                  color: "#0A0A0A",
                  padding: "14px 26px",
                  borderRadius: 999,
                  fontWeight: 600,
                  fontSize: 15,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                Tell us what is leaking
              </Link>
              <Link
                href="/for/d2c-brands"
                style={{
                  border: "1px solid var(--dd-border-strong, rgba(255,255,255,0.16))",
                  color: "var(--dd-text-high, #F5F5F5)",
                  padding: "14px 26px",
                  borderRadius: 999,
                  fontSize: 15,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                See a finished one
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <IndustrySwitcher currentSlug={industry.slug} />
    </>
  );
}
