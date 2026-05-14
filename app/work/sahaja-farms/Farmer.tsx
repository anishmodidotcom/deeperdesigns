"use client";

import Image from "next/image";
import { motion } from "motion/react";

const EASE = [0.4, 0, 0.2, 1] as const;

export default function Farmer() {
  return (
    <section style={{ paddingBlock: 144 }}>
      <div className="container-x">
        <div className="sf-farmer-grid">
          <div className="sf-farmer-image-col">
            <div className="sf-farmer-sticky">
              <motion.div
                initial={{ opacity: 0, scale: 1.02, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1.2, ease: EASE }}
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "4 / 5",
                  overflow: "hidden",
                  borderRadius: 4,
                  boxShadow: "0 30px 70px -30px rgba(212,165,55,0.18)",
                }}
              >
                <Image
                  src="/images/sahaja-farms/lata-portrait.webp"
                  alt="Lata standing in her organic vegetable field at golden hour holding fresh tomatoes"
                  fill
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  style={{ objectFit: "cover" }}
                />
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <p
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.18em",
                color: "var(--page-accent)",
                margin: 0,
                marginBottom: 28,
              }}
            >
              THE PROBLEM IS NOT THE FARMING
            </p>

            <h2
              style={{
                fontFamily: "var(--font-bricolage), Georgia, serif",
                fontStyle: "italic",
                fontWeight: 500,
                fontSize: "clamp(34px, 5.2vw, 60px)",
                letterSpacing: "-0.035em",
                lineHeight: 1.1,
                color: "var(--page-text)",
                margin: 0,
                marginBottom: 36,
                fontVariationSettings: "'opsz' 96",
              }}
            >
              Thirty competitors. Better Instagrams. Worse soil.
            </h2>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 22,
                color: "var(--page-text-2)",
                fontSize: 17,
                lineHeight: 1.8,
                maxWidth: 600,
              }}
            >
              <p style={{ margin: 0 }}>
                Lata is one of the best organic farmers in South
                Karnataka. Her soil is alive, her produce is consistent,
                her farm restaurant sells out every weekend. The problem
                is the thirty other organic farms in her market, none who
                can match her quality, all with better marketing.
              </p>
              <p style={{ margin: 0 }}>
                She was losing subscribers to whoever ran a discount.
                Wholesale partners called when they needed something, not
                when she had a surplus. Half her crop decisions lived in
                her head, from memory of last year. When she got sick
                for two weeks, she lost three weeks of planning.
              </p>
              <p style={{ margin: 0 }}>
                We did not build her a marketing tool. We built her a
                brain that survives if she takes a Sunday off. It holds
                her process, plans the planting from real subscriber
                demand, flags subscribers at churn risk, and runs the
                whole operation on one screen.
              </p>
            </div>

            <motion.figure
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, ease: EASE }}
              style={{
                margin: 0,
                marginTop: 48,
                paddingLeft: 32,
                borderLeft: "1px solid var(--page-accent)",
                maxWidth: 620,
              }}
            >
              <blockquote
                style={{
                  fontFamily: "var(--font-bricolage), Georgia, serif",
                  fontStyle: "italic",
                  fontWeight: 500,
                  fontSize: "clamp(26px, 3.4vw, 36px)",
                  letterSpacing: "-0.03em",
                  color: "var(--page-accent)",
                  margin: 0,
                  lineHeight: 1.3,
                  fontVariationSettings: "'opsz' 96",
                }}
              >
                She does not need to do less. She needs to know more.
              </blockquote>
            </motion.figure>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .sf-farmer-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
        }
        .sf-farmer-image-col {
          position: relative;
        }
        .sf-farmer-sticky {
          position: relative;
        }
        @media (min-width: 1024px) {
          .sf-farmer-grid {
            grid-template-columns: 45fr 55fr;
            gap: 96px;
            align-items: start;
          }
          .sf-farmer-sticky {
            position: sticky;
            top: 12vh;
          }
        }
      `}</style>
    </section>
  );
}
