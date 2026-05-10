"use client";

import { motion } from "motion/react";

type Pair = { label: string; value: string };

const PAIRS: Pair[] = [
  { label: "Name", value: "Meera Sharma" },
  { label: "Practice", value: "Yoga & Holistic Wellness" },
  { label: "Location", value: "Dubai Marina, UAE" },
  { label: "Clients", value: "200+ regular students" },
  { label: "Sessions", value: "Group, Private, Online" },
];

export default function Client() {
  return (
    <section style={{ paddingBlock: 128 }}>
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="mw-client-grid"
        >
          <div>
            <p
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: 12,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--page-accent)",
                margin: 0,
                marginBottom: 32,
              }}
            >
              THE CLIENT
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {PAIRS.map((p) => (
                <div key={p.label}>
                  <p
                    style={{
                      fontFamily: "var(--font-geist-mono), monospace",
                      fontSize: 11,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: "var(--page-text-2)",
                      margin: 0,
                      marginBottom: 4,
                    }}
                  >
                    {p.label}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-cormorant), Georgia, serif",
                      fontSize: 20,
                      fontWeight: 400,
                      color: "var(--page-text)",
                      margin: 0,
                      letterSpacing: "-0.005em",
                    }}
                  >
                    {p.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <blockquote
            style={{
              borderLeft: "2px solid var(--page-accent)",
              paddingLeft: 32,
              margin: 0,
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: 26,
              fontWeight: 300,
              fontStyle: "italic",
              color: "var(--page-text)",
              lineHeight: 1.5,
              letterSpacing: "-0.005em",
            }}
          >
            I juggle three types of sessions across two studios and Zoom.
            Clients WhatsApp me to book, I check my calendar, reply, sometimes
            double-book. I tried Calendly but it cannot handle my pricing.
            Group is 50 AED, private is 250, online is 100, and I have monthly
            packages at 8 and 12 sessions.
          </blockquote>
        </motion.div>
      </div>

      <style jsx>{`
        .mw-client-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
        }
        @media (min-width: 900px) {
          .mw-client-grid {
            grid-template-columns: 40fr 60fr;
            gap: 80px;
            align-items: start;
          }
        }
      `}</style>
    </section>
  );
}
