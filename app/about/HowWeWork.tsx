"use client";

import { motion } from "motion/react";
import { Link } from "next-view-transitions";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function HowWeWork() {
  return (
    <section
      style={{
        paddingBlock: 144,
        borderTop: "1px solid var(--border)",
      }}
    >
      <div className="container-x" style={{ maxWidth: 1320, marginInline: "auto" }}>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.22em",
            color: "var(--accent)",
            margin: 0,
            marginBottom: 28,
          }}
        >
          02 · HOW WE WORK
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: EASE }}
          style={{
            fontFamily: "var(--font-fraunces), Georgia, serif",
            fontWeight: 400,
            fontSize: "clamp(32px, 5vw, 60px)",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            color: "var(--text)",
            margin: 0,
            marginBottom: 40,
            maxWidth: 1000,
          }}
        >
          We work fast because we work small.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          style={{
            fontSize: 18,
            color: "var(--text-2)",
            lineHeight: 1.7,
            margin: 0,
            marginBottom: 56,
            maxWidth: 720,
          }}
        >
          First call is usually a long conversation about what is actually
          slowing the business down. We pick one thing worth building. A
          rough idea comes back the next day. We sharpen it together, then
          start building. You stay in the loop the whole time. No long
          brief. No waiting around.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
          style={{ marginTop: 48 }}
        >
          <Link
            href="/process"
            data-cursor="pointer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: 12,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--accent)",
              paddingBottom: 4,
              borderBottom: "1px solid var(--accent)",
              fontWeight: 600,
            }}
          >
            See the four-step process →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
