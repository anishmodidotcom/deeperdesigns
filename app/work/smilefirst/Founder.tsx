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
      }}
    >
      <div className="container-x" style={{ maxWidth: 1280, marginInline: "auto" }}>
        <div className="sf-founder-grid">
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
              src="/images/smilefirst/kavita-portrait.webp"
              alt="Dr. Kavita, the lead dentist of SmileFirst, in her Noida clinic"
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
              THE LEAD DENTIST
            </p>
            <h2
              style={{
                fontFamily:
                  "var(--font-jakarta), var(--font-geist-sans), system-ui, sans-serif",
                fontWeight: 700,
                fontSize: "clamp(36px, 5.4vw, 60px)",
                letterSpacing: "-0.02em",
                lineHeight: 1.05,
                color: "var(--page-text)",
                margin: 0,
                marginBottom: 28,
              }}
            >
              Three dentists.
              <br />
              <span
                style={{
                  fontWeight: 300,
                  color: "var(--page-accent)",
                }}
              >
                One follow-up problem.
              </span>
            </h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 18,
                fontSize: 17,
                lineHeight: 1.75,
                color: "var(--page-text-2)",
                maxWidth: 540,
                marginBottom: 32,
              }}
            >
              <p style={{ margin: 0 }}>
                Dr. Kavita and her two partners see forty to fifty patients
                a day across three chairs. Every patient needs a recall, a
                cleaning reminder, a treatment follow-up, or a receipt sent
                to a parent. The front desk was holding all of it in their
                heads.
              </p>
              <p style={{ margin: 0 }}>
                Now the system holds it. It routes every recall, sends the
                right message at the right time, and surfaces the patients
                about to go quiet before they do.
              </p>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 20,
                paddingTop: 28,
                borderTop: "1px solid rgba(83,189,194,0.16)",
              }}
            >
              {[
                { v: "40-50", l: "Patients per day" },
                { v: "3", l: "Active dentists" },
                { v: "8 yr", l: "In practice" },
              ].map((s) => (
                <div key={s.l}>
                  <p
                    style={{
                      fontFamily:
                        "var(--font-jakarta), var(--font-geist-sans), system-ui, sans-serif",
                      fontWeight: 700,
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
        .sf-founder-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 56px;
        }
        @media (min-width: 1024px) {
          .sf-founder-grid {
            grid-template-columns: 40fr 60fr;
            gap: 96px;
            align-items: center;
          }
        }
      `}</style>
    </section>
  );
}
