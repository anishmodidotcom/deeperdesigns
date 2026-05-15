"use client";

import Image from "next/image";
import { motion } from "motion/react";

const SOFT = [0.4, 0, 0.6, 1] as const;

export default function Founder() {
  return (
    <section
      style={{
        paddingBlock: 144,
        position: "relative",
        background: "var(--page-surface)",
        borderBlock: "1px solid rgba(34,211,238,0.12)",
      }}
    >
      <div className="container-x" style={{ maxWidth: 1280, marginInline: "auto" }}>
        <div className="ab-founder-grid">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: SOFT }}
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "4 / 5",
              overflow: "hidden",
              borderRadius: 4,
            }}
          >
            <Image
              src="/images/autobazaar/tariq-portrait.webp"
              alt="Tariq, the owner of AutoBazaar, in his Deira Dubai dealership at night"
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
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
                marginBottom: 24,
              }}
            >
              THE OWNER
            </p>
            <h2
              style={{
                fontFamily: "var(--font-outfit), system-ui, sans-serif",
                fontWeight: 800,
                fontSize: "clamp(36px, 5.4vw, 60px)",
                letterSpacing: "-0.03em",
                lineHeight: 1.0,
                color: "var(--page-text)",
                margin: 0,
                marginBottom: 28,
              }}
            >
              60 cars.
              <br />
              <span style={{ color: "var(--page-accent)", fontWeight: 400 }}>
                Priced by feel.
              </span>
            </h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 18,
                fontFamily: "var(--font-outfit), system-ui, sans-serif",
                fontSize: 17,
                lineHeight: 1.7,
                color: "var(--page-text-2)",
                maxWidth: 540,
                marginBottom: 32,
              }}
            >
              <p style={{ margin: 0 }}>
                Tariq runs AutoBazaar from a Deira side street that locals
                know and nobody else does. Sixty cars on the lot. Every one
                priced last night by Tariq walking the lot with a
                clipboard, checking each competitor listing on his phone.
              </p>
              <p style={{ margin: 0 }}>
                Two hours every evening. Cars that sat too long lost
                margin. Cars that moved fast were underpriced. We built
                him an engine that prices the whole lot every morning
                before he gets there.
              </p>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 20,
                paddingTop: 28,
                borderTop: "1px solid rgba(34,211,238,0.18)",
              }}
            >
              {[
                { v: "60", l: "Cars on lot" },
                { v: "2 hr", l: "Old daily pricing time" },
                { v: "8 min", l: "New daily pricing time" },
              ].map((s) => (
                <div key={s.l}>
                  <p
                    style={{
                      fontFamily: "var(--font-outfit), system-ui, sans-serif",
                      fontWeight: 800,
                      fontSize: 30,
                      color: "var(--page-text)",
                      margin: 0,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {s.v}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-geist-mono), monospace",
                      fontSize: 10,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "var(--page-text-2)",
                      margin: 0,
                      marginTop: 6,
                    }}
                  >
                    {s.l}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .ab-founder-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 56px;
        }
        @media (min-width: 1024px) {
          .ab-founder-grid {
            grid-template-columns: 40fr 60fr;
            gap: 96px;
            align-items: center;
          }
        }
      `}</style>
    </section>
  );
}
