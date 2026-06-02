"use client";

import { motion } from "motion/react";

type Props = {
  text: string;
  align?: "left" | "right";
  variant?: "margin" | "inline";
};

const EASE = [0.16, 1, 0.3, 1] as const;

export default function AnishNote({
  text,
  align = "right",
  variant = "margin",
}: Props) {
  return (
    <aside
      className={`anish-note anish-note--${variant} anish-note--${align}`}
      aria-label="Note from Anish"
    >
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6, margin: "0px 0px -15% 0px" }}
        transition={{ duration: 0.6, ease: EASE }}
        className="anish-note__body"
      >
        <p className="anish-note__label">
          <span className="anish-note__rule" aria-hidden />
          ANISH
        </p>
        <p className="anish-note__text">{text}</p>
      </motion.div>
      <style>{`
        .anish-note {
          display: block;
        }
        .anish-note__body {
          position: relative;
          padding-left: 16px;
          border-left: 1px solid var(--dd-eyebrow-on-dark);
        }
        .anish-note__label {
          font-family: var(--font-geist-mono), ui-monospace, monospace;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--dd-eyebrow-on-dark);
          margin: 0 0 8px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .anish-note__rule {
          display: inline-block;
          width: 14px;
          height: 1px;
          background: currentColor;
        }
        .anish-note__text {
          font-family: var(--font-instrument-serif), "Instrument Serif", Georgia, serif;
          font-style: italic;
          font-size: 16px;
          line-height: 1.45;
          color: var(--dd-text-mid);
          margin: 0;
        }
        @media (min-width: 1024px) {
          .anish-note--margin {
            max-width: 280px;
            margin-block: 4px 28px;
          }
          .anish-note--margin.anish-note--right {
            float: right;
            margin-left: 40px;
            margin-right: 0;
          }
          .anish-note--margin.anish-note--left {
            float: left;
            margin-right: 40px;
            margin-left: 0;
          }
        }
        @media (max-width: 1023px) {
          .anish-note--margin {
            float: none;
            max-width: none;
            margin: 24px 0 32px;
          }
        }
        .anish-note--inline {
          float: none;
          max-width: 720px;
          margin: 48px auto;
          padding-inline: var(--container-px, 24px);
        }
        /* F9 (v16): on desktop, even the "inline" variant aligns to the
           right margin of the container so the note reads as a margin
           annotation, consistent with the homepage and /about pattern.
           Mobile stays centred for column legibility. */
        @media (min-width: 1024px) {
          .anish-note--inline.anish-note--right {
            max-width: 420px;
            margin-left: auto;
            margin-right: 0;
            padding-right: var(--container-px, 24px);
          }
          .anish-note--inline.anish-note--left {
            max-width: 420px;
            margin-right: auto;
            margin-left: 0;
            padding-left: var(--container-px, 24px);
          }
        }
      `}</style>
    </aside>
  );
}
