"use client";

import Link from "next/link";
import { motion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

// v23: the founders community block. Quiet and in-shell, matching the
// editorial reveal of HomeConfusion. Sits between the FAQ and the final
// CTA so the homepage ends: FAQ, community, final CTA. No icon tiles, one
// CTA to the dedicated /community page.
export default function HomeCommunity() {
  return (
    <section
      id="community"
      style={{ padding: "var(--section-py) 0", scrollMarginTop: "80px" }}
    >
      <div className="container" style={{ maxWidth: "820px" }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <h2
            style={{
              fontSize: "var(--fs-h2)",
              fontWeight: 500,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              margin: "0 0 24px",
            }}
          >
            Figuring out AI for your business?{" "}
            <span
              style={{
                fontFamily:
                  "var(--font-instrument-serif), 'Instrument Serif', Georgia, serif",
                fontStyle: "italic",
                fontWeight: 400,
              }}
            >
              You are not doing it alone.
            </span>
          </h2>
          <p
            style={{
              fontSize: "18px",
              lineHeight: 1.65,
              color: "var(--fg-muted)",
              margin: "0 0 36px",
              maxWidth: "680px",
            }}
          >
            We are building a room of founders, directors and CXOs helping each
            other work out what AI actually does for a business. Real questions,
            real answers, no noise. It is free, and Anish curates who gets in.
          </p>
          <Link href="/community" className="btn-whatsapp">
            Join the community
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
