"use client";

import Image from "next/image";
import { motion } from "motion/react";

const SOFT = [0.4, 0, 0.6, 1] as const;

export default function Family() {
  return (
    <section
      style={{
        paddingBlock: 144,
        position: "relative",
        background: "var(--page-surface)",
        borderBlock: "1px solid rgba(122,138,158,0.12)",
      }}
    >
      <div className="container-x">
        <div className="bs-family-grid">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: SOFT }}
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "16 / 11",
              overflow: "hidden",
              borderRadius: 4,
            }}
          >
            <Image
              src="/images/bharat-steel/father-son-portrait.webp"
              alt="Rajesh and his son Rahul, second and third generation owners of Bharat Steel, in their Ahmedabad warehouse"
              fill
              sizes="(min-width: 1024px) 55vw, 90vw"
              style={{ objectFit: "cover" }}
            />
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
                marginBottom: 28,
              }}
            >
              THE FAMILY
            </p>
            <h2
              style={{
                fontFamily:
                  "var(--font-space-grotesk), system-ui, sans-serif",
                fontWeight: 700,
                fontSize: "clamp(36px, 5.4vw, 60px)",
                letterSpacing: "-0.02em",
                lineHeight: 1.05,
                color: "var(--page-text)",
                margin: 0,
                marginBottom: 28,
                textTransform: "uppercase",
              }}
            >
              Two generations.
              <br />
              <span style={{ color: "var(--page-accent)" }}>One Excel sheet.</span>
            </h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 18,
                fontSize: 17,
                lineHeight: 1.75,
                color: "var(--page-text-2)",
                maxWidth: 520,
              }}
            >
              <p style={{ margin: 0 }}>
                Rajesh started Bharat Steel in 1992 with three suppliers
                and a Tata 407. Rahul joined in 2018 after an engineering
                degree. The yard ran on paper challans, WhatsApp photos of
                delivery slips, and one shared Excel sheet nobody fully
                trusted.
              </p>
              <p style={{ margin: 0 }}>
                A buyer calls for twenty tonnes of 12mm TMT. Someone walks
                the yard. Calls back. Handwrites a quote. Negotiates. Half
                the calls end in silence because a competitor answered
                faster.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .bs-family-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 56px;
          align-items: center;
        }
        @media (min-width: 1024px) {
          .bs-family-grid {
            grid-template-columns: 55fr 45fr;
            gap: 80px;
          }
        }
      `}</style>
    </section>
  );
}
