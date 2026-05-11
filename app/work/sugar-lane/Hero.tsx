"use client";

import Image from "next/image";
import { motion } from "motion/react";

const SOFT = [0.4, 0, 0.6, 1] as const;
const SPRING = [0.34, 1.4, 0.64, 1] as const;

export default function Hero() {
  return (
    <section
      style={{
        position: "relative",
        paddingTop: 96,
        paddingBottom: 96,
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 70% 40%, rgba(242,212,201,0.65) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      <div
        className="container-x"
        style={{
          position: "relative",
          maxWidth: 1320,
          marginInline: "auto",
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: SOFT }}
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.24em",
            color: "var(--page-accent-deep)",
            margin: 0,
            marginBottom: 36,
          }}
        >
          ABU DHABI · CASE STUDY 019 · BAKERY
        </motion.p>

        <div className="sl-hero-grid">
          <div>
            <h1
              style={{
                margin: 0,
                fontFamily:
                  "var(--font-display-script), 'Yellowtail', cursive",
                fontWeight: 400,
                fontSize: "clamp(80px, 14vw, 200px)",
                letterSpacing: "-0.01em",
                lineHeight: 0.85,
                color: "var(--page-text)",
              }}
            >
              <Reveal text="Sugar" delay={0.1} />
              <span
                style={{
                  display: "block",
                  color: "var(--page-accent)",
                  marginTop: "-0.1em",
                }}
              >
                <Reveal text="Lane" delay={0.25} />
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: SOFT }}
              style={{
                fontFamily: "var(--font-body), 'DM Sans', sans-serif",
                fontSize: 20,
                lineHeight: 1.6,
                color: "var(--page-text-2)",
                margin: 0,
                marginTop: 48,
                maxWidth: 480,
              }}
            >
              A home bakery in Abu Dhabi run by Farah, who makes 4 cakes
              a week and could make 40. The order form was the bottleneck.
              We rebuilt it.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.75, ease: SOFT }}
              style={{
                marginTop: 36,
                display: "flex",
                gap: 16,
                flexWrap: "wrap",
              }}
            >
              <a
                href="#the-cake"
                data-cursor="pointer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  paddingInline: 28,
                  paddingBlock: 16,
                  background: "var(--page-accent)",
                  color: "#FFFFFF",
                  fontFamily: "var(--font-body), 'DM Sans', sans-serif",
                  fontSize: 14,
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  borderRadius: 9999,
                }}
              >
                See the build →
              </a>
              <a
                href="#the-menu"
                data-cursor="pointer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  paddingInline: 28,
                  paddingBlock: 16,
                  border: "1.5px solid var(--page-text)",
                  color: "var(--page-text)",
                  fontFamily: "var(--font-body), 'DM Sans', sans-serif",
                  fontSize: 14,
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  borderRadius: 9999,
                  background: "transparent",
                }}
              >
                Browse the menu
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40, rotate: -4 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: SPRING }}
            className="sl-hero-cake"
          >
            <div
              style={{
                position: "absolute",
                inset: -16,
                background: "var(--page-blush)",
                borderRadius: "50%",
                zIndex: 0,
              }}
            />
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "1 / 1",
                borderRadius: "50%",
                overflow: "hidden",
                zIndex: 1,
                boxShadow: "0 50px 100px -40px rgba(201,64,90,0.3)",
              }}
            >
              <Image
                src="/images/sugar-lane/hero-cake.webp"
                alt="A tall, pastel-pink layered cake with delicate piping, surrounded by fresh flowers, on a marble surface"
                fill
                priority
                sizes="(min-width: 1024px) 520px, 80vw"
                style={{ objectFit: "cover" }}
              />
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.1, ease: SPRING }}
              aria-hidden
              style={{
                position: "absolute",
                top: -24,
                right: -24,
                width: 100,
                height: 100,
                background: "var(--page-accent)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily:
                  "var(--font-display-script), 'Yellowtail', cursive",
                fontSize: 18,
                color: "#FFFFFF",
                transform: "rotate(8deg)",
                lineHeight: 1.1,
                textAlign: "center",
                zIndex: 2,
                boxShadow: "0 12px 30px -10px rgba(201,64,90,0.5)",
              }}
            >
              made
              <br />
              by hand
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .sl-hero-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 64px;
          align-items: center;
        }
        .sl-hero-cake {
          position: relative;
          width: 100%;
          max-width: 520px;
          margin-inline: auto;
        }
        @media (min-width: 1024px) {
          .sl-hero-grid {
            grid-template-columns: 55fr 45fr;
            gap: 96px;
          }
        }
      `}</style>
    </section>
  );
}

function Reveal({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <span style={{ display: "inline-block", overflow: "hidden" }}>
      <motion.span
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.9, delay, ease: SPRING }}
        style={{ display: "inline-block" }}
      >
        {text}
      </motion.span>
    </span>
  );
}
