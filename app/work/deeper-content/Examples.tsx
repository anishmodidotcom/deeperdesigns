"use client";

import { motion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

type Card = {
  brand: string;
  archetype: string;
  mode: string;
  format: "STATIC" | "CAROUSEL" | "REEL";
  idea: string;
};

const CARDS: Card[] = [
  // CAHVE BEAUTY
  { brand: "CAHVE BEAUTY", archetype: "MODERN INDIAN", mode: "PRODUCT-FORWARD", format: "STATIC", idea: "Face oil on worn marble, late afternoon light cutting across the bottle." },
  { brand: "CAHVE BEAUTY", archetype: "MODERN INDIAN", mode: "USEFUL", format: "CAROUSEL", idea: "Three signs your skin barrier is broken, with the fix on slide 4." },
  { brand: "CAHVE BEAUTY", archetype: "MODERN INDIAN", mode: "UNEXPECTED", format: "REEL", idea: "A jar slow-tilting in a shaft of monsoon light, no copy." },

  // LILA & CO.
  { brand: "LILA & CO.", archetype: "ARTISAN HERITAGE", mode: "PRODUCT-FORWARD", format: "STATIC", idea: "A pair of gold hoops resting on aged indigo silk, single side-light." },
  { brand: "LILA & CO.", archetype: "ARTISAN HERITAGE", mode: "LIFE-MOMENT", format: "STATIC", idea: "Mother's hand placing the necklace into a daughter's palm, almost out of frame." },
  { brand: "LILA & CO.", archetype: "ARTISAN HERITAGE", mode: "UNEXPECTED", format: "REEL", idea: "Tilt up across a bridal jhumka resting on dark wood, 8s, locked horizon." },

  // FORREST ROASTERY
  { brand: "FORREST ROASTERY", archetype: "MODERN CRAFTSMAN", mode: "PRODUCT-FORWARD", format: "STATIC", idea: "A bag of beans on a stone counter, single ray of morning light, no copy." },
  { brand: "FORREST ROASTERY", archetype: "MODERN CRAFTSMAN", mode: "USEFUL", format: "CAROUSEL", idea: "Three things your home-brew is missing, with the fix on slide 5." },
  { brand: "FORREST ROASTERY", archetype: "MODERN CRAFTSMAN", mode: "UNEXPECTED", format: "REEL", idea: "Slow pour into a ceramic dripper, locked off, 6s, no audio cues." },

  // BOMBAY ATELIER
  { brand: "BOMBAY ATELIER", archetype: "TAILORED MODERN", mode: "LIFE-MOMENT", format: "STATIC", idea: "A trouser cuff over a leather Oxford on a Bombay pavement, mid-stride." },
  { brand: "BOMBAY ATELIER", archetype: "TAILORED MODERN", mode: "USEFUL", format: "CAROUSEL", idea: "Four ways linen settles after a day of wear, slide by slide." },
  { brand: "BOMBAY ATELIER", archetype: "TAILORED MODERN", mode: "PRODUCT-FORWARD", format: "STATIC", idea: "Leather Oxford on a wooden bench in a workshop, scuff visible on the toe." },

  // SAFFRON SUPPER CLUB
  { brand: "SAFFRON SUPPER CLUB", archetype: "GATHERED TABLE", mode: "PRODUCT-FORWARD", format: "STATIC", idea: "A long table after the second course, glasses half full, candlelight on plates." },
  { brand: "SAFFRON SUPPER CLUB", archetype: "GATHERED TABLE", mode: "LIFE-MOMENT", format: "STATIC", idea: "A hand reaching for the last piece of naan, blur of laughter in the background." },
  { brand: "SAFFRON SUPPER CLUB", archetype: "GATHERED TABLE", mode: "UNEXPECTED", format: "REEL", idea: "Slow push in on a cocktail being poured under a single warm bulb, 6s." },

  // VYANA WELLNESS
  { brand: "VYANA WELLNESS", archetype: "ROOTED CONTEMPORARY", mode: "PRODUCT-FORWARD", format: "STATIC", idea: "Ghee shot bottles lined up against pale plaster, single soft window light." },
  { brand: "VYANA WELLNESS", archetype: "ROOTED CONTEMPORARY", mode: "LIFE-MOMENT", format: "STATIC", idea: "A morning ritual kit half-opened on a low table, a yoga mat just visible." },
  { brand: "VYANA WELLNESS", archetype: "ROOTED CONTEMPORARY", mode: "USEFUL", format: "CAROUSEL", idea: "Three signs your sleep is shallow, the fourth slide an ashwagandha bottle." },
];

function formatLabel(format: Card["format"]) {
  return format === "REEL" ? "▶ REEL" : format;
}

export default function Examples() {
  return (
    <section style={{ paddingBlock: 144, borderTop: "1px solid var(--page-border)", background: "var(--page-surface)" }}>
      <div
        className="container-x"
        style={{ maxWidth: 1280, marginInline: "auto", paddingInline: "clamp(20px, 4vw, 48px)" }}
      >
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: EASE }}
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 11,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--page-accent-2)",
            margin: 0,
            marginBottom: 24,
          }}
        >
          WHAT IT MAKES
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{
            fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
            fontWeight: 600,
            fontSize: "clamp(36px, 5vw, 64px)",
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
            color: "var(--page-text)",
            margin: 0,
            marginBottom: 64,
            maxWidth: 880,
          }}
        >
          Six brands. One engine. Every output, on brand.
        </motion.h2>

        <div className="dc-examples-grid">
          {CARDS.map((c, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.55, delay: (i % 3) * 0.06, ease: EASE }}
              className="dc-example-card"
            >
              <p className="dc-example-eyebrow">{formatLabel(c.format)}</p>
              <p className="dc-example-idea">
                {"“"}{c.idea}{"”"}
              </p>
              <p className="dc-example-attr">
                {c.brand} <span className="dc-example-dot">·</span> {c.archetype} <span className="dc-example-dot">·</span> {c.mode}
              </p>
            </motion.article>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{
            fontFamily: "var(--font-instrument-serif), 'Instrument Serif', Georgia, serif",
            fontStyle: "italic",
            fontSize: "clamp(22px, 2.4vw, 30px)",
            lineHeight: 1.35,
            color: "var(--page-text-2)",
            margin: 0,
            marginTop: 80,
            maxWidth: 720,
          }}
        >
          Same engine. Different brands. Each one knows itself.
        </motion.p>
      </div>

      <style>{`
        .dc-examples-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }
        .dc-example-card {
          background: var(--page-bg);
          border: 1px solid var(--page-border);
          border-radius: 12px;
          padding: 22px 22px 18px 22px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .dc-example-eyebrow {
          font-family: var(--font-geist-mono), monospace;
          font-size: 10px;
          letter-spacing: 0.20em;
          text-transform: uppercase;
          color: var(--page-accent-2);
          margin: 0;
        }
        .dc-example-idea {
          font-family: var(--font-instrument-serif), 'Instrument Serif', Georgia, serif;
          font-style: italic;
          font-size: 18px;
          line-height: 1.4;
          color: var(--page-text);
          margin: 0;
          flex: 1;
        }
        .dc-example-attr {
          font-family: var(--font-geist-mono), monospace;
          font-size: 10px;
          letter-spacing: 0.10em;
          color: var(--page-text-3);
          margin: 0;
        }
        .dc-example-dot {
          color: var(--page-accent-2);
        }
        @media (min-width: 768px) {
          .dc-examples-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 1100px) {
          .dc-examples-grid {
            grid-template-columns: repeat(3, 1fr);
          }
          .dc-example-card {
            padding: 24px 24px 20px 24px;
          }
        }
      `}</style>
    </section>
  );
}
