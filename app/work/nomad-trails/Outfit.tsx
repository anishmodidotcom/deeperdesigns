"use client";

import Image from "next/image";
import { motion } from "motion/react";

const SOFT = [0.4, 0, 0.6, 1] as const;

export default function Outfit() {
  return (
    <section
      style={{
        paddingBlock: 144,
        position: "relative",
        background: "var(--page-bg)",
      }}
    >
      <div
        className="container-x"
        style={{ maxWidth: 1280, marginInline: "auto" }}
      >
        <div className="nt-outfit-grid">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
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
              src="/images/nomad-trails/arjun-sneha-portrait.webp"
              alt="Arjun and Sneha, a husband-and-wife trek-guide team, standing on a mountain pass"
              fill
              sizes="(min-width: 1024px) 42vw, 90vw"
              style={{ objectFit: "cover" }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.1, ease: SOFT }}
          >
            <p
              style={{
                fontFamily: "var(--font-mono-tech), 'IBM Plex Mono', monospace",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.22em",
                color: "var(--page-accent-deep)",
                margin: 0,
                marginBottom: 28,
              }}
            >
              SECTION 01 · THE OUTFIT
            </p>

            <h2
              style={{
                fontFamily:
                  "var(--font-display-editorial), 'Bodoni Moda', 'Didot', serif",
                fontWeight: 500,
                fontSize: "clamp(40px, 6vw, 72px)",
                letterSpacing: "-0.02em",
                lineHeight: 1.02,
                color: "var(--page-text)",
                margin: 0,
                marginBottom: 36,
              }}
            >
              Two guides.
              <br />
              <em
                style={{
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: "var(--page-accent-deep)",
                }}
              >
                One mountain at a time.
              </em>
            </h2>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 22,
                fontFamily:
                  "var(--font-body-clean), 'Inter', system-ui, sans-serif",
                fontSize: 18,
                color: "var(--page-text-2)",
                lineHeight: 1.75,
                maxWidth: 560,
              }}
            >
              <p style={{ margin: 0 }}>
                Arjun and Sneha started Nomad Trails after eight seasons
                guiding for other outfits. They got tired of group sizes
                of twenty, and of clients picking treks off a brochure
                they could not pronounce.
              </p>
              <p style={{ margin: 0 }}>
                Their model is the opposite. Maximum eight trekkers a
                trip. Always one of them on the trail. A long phone call
                before you sign, not a credit-card form.
              </p>
              <p style={{ margin: 0 }}>
                The site sells the same way. No carousels, no fake
                reviews. Three trips at a time, full briefs, real
                photographs, real numbers. The phone call still happens.
              </p>
            </div>

            <div
              style={{
                marginTop: 48,
                paddingTop: 32,
                borderTop: "1px solid var(--page-border)",
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 24,
              }}
            >
              {[
                { value: "210+", label: "Trips guided" },
                { value: "4.9", label: "Repeat-booking rate" },
                { value: "0", label: "Mountain incidents" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div
                    style={{
                      fontFamily:
                        "var(--font-display-editorial), 'Bodoni Moda', 'Didot', serif",
                      fontWeight: 500,
                      fontSize: 36,
                      color: "var(--page-text)",
                      letterSpacing: "-0.02em",
                      marginBottom: 6,
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontFamily:
                        "var(--font-mono-tech), 'IBM Plex Mono', monospace",
                      fontSize: 10,
                      textTransform: "uppercase",
                      letterSpacing: "0.16em",
                      color: "var(--page-text-3)",
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .nt-outfit-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 56px;
        }
        @media (min-width: 1024px) {
          .nt-outfit-grid {
            grid-template-columns: 42fr 58fr;
            gap: 96px;
            align-items: center;
          }
        }
      `}</style>
    </section>
  );
}
