"use client";

import { motion } from "motion/react";

type Note = {
  date: string;
  body: string;
};

const NOTES: Note[] = [
  {
    date: "MAY 12, 2026",
    body: "We tried using Veo 3 to render a fragrance bottle. It rendered NADIA on the label perfectly. We did not expect that.",
  },
  {
    date: "MAY 09, 2026",
    body: "The peppercorn loop in Malabar Spice took three reroll attempts. The seam still snaps. We left it because the snap feels like the heartbeat of the spice.",
  },
  {
    date: "MAY 03, 2026",
    body: "Most websites optimize for clicks. We optimize for scrolls. Different game.",
  },
  {
    date: "APR 28, 2026",
    body: "Tried five fonts on the BrightPath portal. Settled on Source Serif 4. A serif teaches better than a sans, evidently.",
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export default function LabNotes() {
  return (
    <section
      style={{
        paddingBlock: 144,
        borderTop: "1px solid var(--border)",
      }}
    >
      <div className="container-x" style={{ maxWidth: 980, marginInline: "auto" }}>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: EASE }}
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 12,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--accent)",
            margin: 0,
            marginBottom: 16,
          }}
        >
          Lab Notes
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{
            fontFamily: "var(--font-fraunces), Georgia, serif",
            fontWeight: 400,
            fontSize: "clamp(28px, 4.4vw, 48px)",
            letterSpacing: "-0.02em",
            color: "var(--text)",
            lineHeight: 1.06,
            margin: 0,
            marginBottom: 48,
          }}
        >
          Small notes from the practice.
        </motion.h2>

        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "flex",
            flexDirection: "column",
            gap: 0,
            borderTop: "1px dashed var(--border-2)",
          }}
        >
          {NOTES.map((note, i) => (
            <motion.li
              key={note.body}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: EASE }}
              style={{
                paddingBlock: 28,
                borderBottom: "1px dashed var(--border-2)",
                display: "grid",
                gridTemplateColumns: "120px 1fr",
                gap: 24,
                alignItems: "baseline",
              }}
              className="lab-note"
            >
              <span
                style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  color: "var(--text-3)",
                }}
              >
                {note.date}
              </span>
              <p
                style={{
                  margin: 0,
                  fontSize: 16,
                  color: "var(--text)",
                  lineHeight: 1.65,
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontWeight: 400,
                }}
              >
                {note.body}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
      <style jsx>{`
        @media (max-width: 600px) {
          :global(.lab-note) {
            grid-template-columns: 1fr !important;
            gap: 8px !important;
          }
        }
      `}</style>
    </section>
  );
}
