"use client";

import { motion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

// v22 A2: name the confusion. A quiet editorial block directly under the
// hero. No decoration, no cards. Copy is final per the v22 spec.
export default function HomeConfusion() {
  return (
    <section id="confusion" style={{ padding: "var(--section-py) 0", scrollMarginTop: "80px" }}>
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
            Hearing about AI everywhere{" "}
            <span
              style={{
                fontFamily: "var(--font-instrument-serif), 'Instrument Serif', Georgia, serif",
                fontStyle: "italic",
                fontWeight: 400,
              }}
            >
              and not sure what it means for you?
            </span>
          </h2>
          <p
            style={{
              fontSize: "18px",
              lineHeight: 1.65,
              color: "var(--fg-muted)",
              margin: 0,
              maxWidth: "680px",
            }}
          >
            That is normal. Most owners we meet feel exactly the same. Here is
            the honest version: you do not need to understand AI. You need to
            see what it does for your business, in plain terms, with a price
            and a payback. That is our job. Yours is running the business.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
