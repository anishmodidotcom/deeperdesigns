"use client";

import Image from "next/image";
import { motion } from "motion/react";

const EASE = [0.25, 1, 0.5, 1] as const;

export default function Story() {
  return (
    <section style={{ paddingBlock: 144 }}>
      <div className="container-x">
        <div className="ms-story-grid">
          <div className="ms-story-image-col">
            <div className="ms-story-sticky">
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
                }}
              >
                <Image
                  src="/images/malabar-spice/warehouse-wide.webp"
                  alt="Interior of a traditional Kerala spice warehouse, jute sacks and shafts of golden dust-light"
                  fill
                  sizes="(min-width: 1024px) 38vw, 90vw"
                  style={{ objectFit: "cover" }}
                />
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 1, ease: EASE }}
            className="ms-story-text"
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
              THE HOUSE
            </p>

            <h2
              style={{
                fontFamily: "var(--font-fraunces), Georgia, serif",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(36px, 5.4vw, 60px)",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                color: "var(--page-text)",
                margin: 0,
                marginBottom: 40,
                fontVariationSettings: "'opsz' 144",
              }}
            >
              Some businesses do not need to be optimized. They need to be
              honored.
            </h2>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 24,
                color: "var(--page-text-2)",
                fontSize: 17,
                lineHeight: 1.8,
                maxWidth: 580,
              }}
            >
              <p style={{ margin: 0 }}>
                Rashid&rsquo;s grandfather opened the warehouse in 1962. The
                ledger entries from that first year, written in Malayalam and
                English in the same disciplined hand, still sit on a high
                shelf in the office. Buyers in Hamburg, Marseille, and New
                York remember the price of cardamom in 1978. Some of them
                remember which monsoon failed in 1983 and how the family
                rationed inventory through it.
              </p>
            </div>

            <motion.figure
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, ease: EASE }}
              style={{
                margin: 0,
                marginBlock: 56,
                paddingLeft: 32,
                borderLeft: "1px solid var(--page-accent)",
                maxWidth: 620,
              }}
            >
              <blockquote
                style={{
                  fontFamily: "var(--font-fraunces), Georgia, serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: "clamp(26px, 3.4vw, 36px)",
                  letterSpacing: "-0.02em",
                  color: "var(--page-accent)",
                  margin: 0,
                  lineHeight: 1.35,
                  fontVariationSettings: "'opsz' 144",
                }}
              >
                &ldquo;I want my great-grandchildren to know what this smelled
                like.&rdquo;
              </blockquote>
              <figcaption
                style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  color: "var(--page-text-3)",
                  marginTop: 18,
                }}
              >
                Rashid, when we asked what he wanted from the internet
              </figcaption>
            </motion.figure>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 24,
                color: "var(--page-text-2)",
                fontSize: 17,
                lineHeight: 1.8,
                maxWidth: 580,
              }}
            >
              <p style={{ margin: 0 }}>
                The business runs on relationships. Forty-five buyers, two to
                four shipments a year, calls that begin with &ldquo;How is
                your son&rsquo;s wedding?&rdquo; before they begin with
                &ldquo;What is the price per kilo on Tellicherry pepper?&rdquo;
                This is not a business that needs a CRM. The CRM is in
                Rashid&rsquo;s head, and it has a longer memory than any
                database we could have built him.
              </p>
              <p style={{ margin: 0 }}>
                So we did not build a tool. We built an heirloom. A website
                with the same patience as the warehouse, the same care as the
                ledger, and a quiet door that opens when a new buyer in
                Copenhagen or Casablanca finds his way here. The instrument
                is the same one his grandfather used. We just gave it a URL.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .ms-story-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
        }
        .ms-story-image-col {
          position: relative;
        }
        .ms-story-sticky {
          position: relative;
        }
        @media (min-width: 1024px) {
          .ms-story-grid {
            grid-template-columns: 40fr 60fr;
            gap: 96px;
            align-items: start;
          }
          .ms-story-sticky {
            position: sticky;
            top: 14vh;
          }
        }
      `}</style>
    </section>
  );
}
