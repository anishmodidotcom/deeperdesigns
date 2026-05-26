"use client";

import { motion } from "motion/react";

type Props = {
  quote: string;
  attribution?: string;
  accent?: string;
};

const EASE = [0.16, 1, 0.3, 1] as const;

export default function EditorialPullQuote({
  quote,
  attribution,
  accent = "var(--dd-accent-primary)",
}: Props) {
  return (
    <section className="epq" aria-label="Pull quote">
      <div className="epq__inner">
        <motion.span
          aria-hidden
          className="epq__rule"
          style={{ background: accent }}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.5, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.7, ease: EASE }}
        />
        <div className="epq__col">
          <motion.p
            className="epq__quote"
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            {quote}
          </motion.p>
          {attribution ? (
            <motion.p
              className="epq__attr"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
            >
              {attribution}
            </motion.p>
          ) : null}
        </div>
      </div>
      <style>{`
        .epq {
          padding-block: 96px;
        }
        .epq__inner {
          max-width: 920px;
          margin-inline: auto;
          padding-inline: var(--container-px);
          display: grid;
          grid-template-columns: 3px 1fr;
          column-gap: 32px;
          align-items: start;
        }
        .epq__rule {
          width: 3px;
          height: 64px;
          transform-origin: top center;
          display: block;
          margin-top: 8px;
        }
        .epq__col {
          min-width: 0;
        }
        .epq__quote {
          font-family: var(--font-instrument-serif), "Instrument Serif", Georgia, serif;
          font-style: italic;
          font-weight: 400;
          font-size: clamp(30px, 4.6vw, 52px);
          line-height: 1.15;
          letter-spacing: -0.01em;
          color: var(--dd-bone);
          margin: 0;
        }
        .epq__attr {
          font-family: var(--font-geist-mono), ui-monospace, monospace;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--dd-text-faint);
          margin: 24px 0 0;
        }
        @media (max-width: 767px) {
          .epq {
            padding-block: 64px;
          }
          .epq__inner {
            grid-template-columns: 1fr;
            row-gap: 20px;
          }
          .epq__rule {
            width: 48px;
            height: 3px;
            margin-top: 0;
            transform-origin: left center;
          }
          .epq__quote {
            font-size: clamp(28px, 7vw, 36px);
          }
        }
      `}</style>
    </section>
  );
}
