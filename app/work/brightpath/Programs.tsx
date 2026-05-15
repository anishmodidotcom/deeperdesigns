"use client";

import Image from "next/image";
import { motion } from "motion/react";

const SOFT = [0.4, 0, 0.6, 1] as const;

type Program = {
  code: string;
  name: string;
  subject: string;
  duration: string;
  outcome: string;
  fee: string;
  image: string;
  alt: string;
};

const PROGRAMS: Program[] = [
  {
    code: "MAT · 01",
    name: "IGCSE Maths",
    subject: "Year 10 & 11",
    duration: "32 weeks",
    outcome: "Target grade A or A*",
    fee: "AED 280 / hour",
    image: "/images/brightpath/notebook-detail.webp",
    alt: "A close-up of a maths working in a neat student notebook",
  },
  {
    code: "PHY · 02",
    name: "A-Level Physics",
    subject: "Year 12 & 13",
    duration: "60 weeks",
    outcome: "Target grade A",
    fee: "AED 320 / hour",
    image: "/images/brightpath/student-studying.webp",
    alt: "A student writing physics notes at a quiet desk in evening light",
  },
  {
    code: "SAT · 03",
    name: "SAT Maths",
    subject: "Grade 11 & 12",
    duration: "16 weeks",
    outcome: "Target 750+ math",
    fee: "AED 340 / hour",
    image: "/images/brightpath/exam-papers.webp",
    alt: "SAT practice papers stacked on a wooden desk with a fountain pen",
  },
];

export default function Programs() {
  return (
    <section
      style={{
        paddingBlock: 144,
        background: "var(--page-bg)",
        position: "relative",
      }}
    >
      <div
        className="container-x"
        style={{ maxWidth: 1320, marginInline: "auto" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: 32,
            marginBottom: 72,
          }}
        >
          <div>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: SOFT }}
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
              SECTION 03 · THE PROGRAMS
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: SOFT }}
              style={{
                fontFamily:
                  "var(--font-display-academic), 'Source Serif 4', 'Times New Roman', serif",
                fontWeight: 500,
                fontSize: "clamp(40px, 6vw, 72px)",
                letterSpacing: "-0.02em",
                lineHeight: 1.02,
                color: "var(--page-text)",
                margin: 0,
                maxWidth: 720,
              }}
            >
              Three subjects.
              <br />
              <em
                style={{
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: "var(--page-accent)",
                }}
              >
                One tutor.
              </em>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.15, ease: SOFT }}
            style={{
              fontFamily:
                "var(--font-body-soft), 'Source Sans 3', system-ui, sans-serif",
              fontSize: 16,
              color: "var(--page-text-2)",
              maxWidth: 380,
              margin: 0,
              lineHeight: 1.65,
            }}
          >
            Omar only teaches what he can teach well. No franchise
            model, no subject he is winging. Three subjects, all to
            A-grade standard, all reviewed weekly.
          </motion.p>
        </div>

        <div className="bp-programs-grid">
          {PROGRAMS.map((program, i) => (
            <motion.article
              key={program.code}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.8,
                delay: (i % 3) * 0.1,
                ease: SOFT,
              }}
              data-cursor="view"
              style={{
                background: "var(--page-surface-1)",
                border: "1px solid var(--page-border)",
                cursor: "pointer",
              }}
              whileHover={{ y: -8 }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "4 / 3",
                  overflow: "hidden",
                }}
              >
                <Image
                  src={program.image}
                  alt={program.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, 90vw"
                  style={{ objectFit: "cover" }}
                />
              </div>

              <div
                style={{
                  padding: 32,
                  borderTop: "1px solid var(--page-border)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    marginBottom: 14,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-geist-mono), monospace",
                      fontSize: 11,
                      letterSpacing: "0.2em",
                      color: "var(--page-accent)",
                    }}
                  >
                    {program.code}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-geist-mono), monospace",
                      fontSize: 11,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "var(--page-text-3)",
                    }}
                  >
                    {program.subject}
                  </span>
                </div>
                <h3
                  style={{
                    fontFamily:
                      "var(--font-display-academic), 'Source Serif 4', serif",
                    fontWeight: 500,
                    fontSize: 34,
                    letterSpacing: "-0.02em",
                    color: "var(--page-text)",
                    margin: 0,
                    marginBottom: 22,
                  }}
                >
                  {program.name}
                </h3>

                <dl
                  style={{
                    display: "grid",
                    gridTemplateColumns: "auto 1fr",
                    gap: "10px 24px",
                    margin: 0,
                    paddingTop: 18,
                    borderTop: "1px dashed var(--page-border)",
                  }}
                >
                  {[
                    { k: "Length", v: program.duration },
                    { k: "Target", v: program.outcome },
                    { k: "Fee", v: program.fee },
                  ].map((row) => (
                    <RowItem key={row.k} k={row.k} v={row.v} />
                  ))}
                </dl>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <style jsx>{`
        .bp-programs-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }
        @media (min-width: 700px) {
          .bp-programs-grid {
            grid-template-columns: 1fr 1fr;
            gap: 24px;
          }
        }
        @media (min-width: 1024px) {
          .bp-programs-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 24px;
          }
        }
      `}</style>
    </section>
  );
}

function RowItem({ k, v }: { k: string; v: string }) {
  return (
    <>
      <dt
        style={{
          fontFamily: "var(--font-geist-mono), monospace",
          fontSize: 10,
          fontWeight: 500,
          textTransform: "uppercase",
          letterSpacing: "0.16em",
          color: "var(--page-text-3)",
          margin: 0,
        }}
      >
        {k}
      </dt>
      <dd
        style={{
          fontFamily: "var(--font-body-soft), 'Source Sans 3', sans-serif",
          fontSize: 14,
          fontWeight: 500,
          color: "var(--page-text)",
          margin: 0,
        }}
      >
        {v}
      </dd>
    </>
  );
}
