"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { HennaVine, PaisleyOrnament } from "./illustrations";

const EASE = [0.4, 0, 0.6, 1] as const;

export default function Maker() {
  return (
    <section
      id="the-maker"
      style={{ paddingBlock: 144, position: "relative" }}
    >
      <div
        className="container-x"
        style={{ maxWidth: 1200, marginInline: "auto" }}
      >
        <div className="ef-maker-grid">
          <div className="ef-maker-portrait-col">
            <div
              aria-hidden
              style={{
                position: "absolute",
                left: -40,
                top: 0,
                bottom: 0,
                color: "var(--page-border)",
                opacity: 0.6,
                pointerEvents: "none",
              }}
              className="ef-vine"
            >
              <HennaVine width={48} style={{ height: "100%" }} />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: EASE }}
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "4 / 5",
                overflow: "hidden",
              }}
            >
              <Image
                src="/images/earth-and-fire/nia-portrait.webp"
                alt="Nia, a 26-year-old ceramicist in her Jaipur workshop"
                fill
                sizes="(min-width: 1024px) 38vw, 90vw"
                style={{ objectFit: "cover" }}
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          >
            <p
              style={{
                fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                fontWeight: 500,
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.22em",
                color: "var(--page-border)",
                margin: 0,
                marginBottom: 28,
              }}
            >
              THE MAKER
            </p>

            <h2
              style={{
                fontFamily:
                  "var(--font-display-script), 'DM Serif Display', Georgia, serif",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(36px, 5.4vw, 60px)",
                letterSpacing: "-0.01em",
                lineHeight: 1.05,
                color: "var(--page-text)",
                margin: 0,
                marginBottom: 36,
              }}
            >
              Nia throws clay. We threw her a moat.
            </h2>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 22,
                color: "var(--page-text-2)",
                fontSize: 17,
                lineHeight: 1.8,
                maxWidth: 540,
              }}
            >
              <p style={{ margin: 0 }}>
                Nia&rsquo;s Jaipur workshop sits on the second floor of a
                weathered courtyard building. She trained in the craft as
                a teenager and built a 45K Instagram following on pure
                work-of-the-hand process videos. The wheel, the kiln, the
                brush.
              </p>
              <p style={{ margin: 0 }}>
                Her drops sold out in 90 minutes. That is not a humble
                brag, it is a business problem. She underpriced the work
                to race the audience, and fast followers in other cities
                copied her designs the same week. The ceiling was
                mathematical. She only has two hands.
              </p>
              <p style={{ margin: 0 }}>
                We shifted the model. Fewer pieces, higher prices, longer
                lead times. A builder UI lets the customer pick the
                shape, the size, the pattern, the glaze. Rajasthani
                heritage front and centre. A queue, not a race.
              </p>
            </div>

            <motion.figure
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, ease: EASE }}
              style={{
                margin: 0,
                marginTop: 56,
                paddingLeft: 32,
                borderLeft: "2px solid var(--page-accent-2)",
                maxWidth: 620,
              }}
            >
              <blockquote
                style={{
                  fontFamily:
                    "var(--font-display-script), 'DM Serif Display', Georgia, serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: 36,
                  letterSpacing: "-0.01em",
                  color: "var(--page-accent-2)",
                  margin: 0,
                  lineHeight: 1.35,
                }}
              >
                She is the bottleneck. That is the brand.
              </blockquote>
            </motion.figure>

            <div
              aria-hidden
              style={{
                color: "var(--page-accent)",
                marginTop: 40,
              }}
            >
              <PaisleyOrnament width={48} />
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .ef-maker-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 64px;
        }
        .ef-maker-portrait-col {
          position: relative;
        }
        .ef-vine {
          display: none;
        }
        @media (min-width: 1024px) {
          .ef-maker-grid {
            grid-template-columns: 38fr 62fr;
            gap: 96px;
            align-items: start;
          }
          .ef-vine {
            display: block;
          }
        }
      `}</style>
    </section>
  );
}
