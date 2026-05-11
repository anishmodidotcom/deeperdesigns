"use client";

import Image from "next/image";
import { motion } from "motion/react";

const SOFT = [0.4, 0, 0.6, 1] as const;
const STRONG = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        paddingBlock: 96,
        overflow: "hidden",
      }}
    >
      <div aria-hidden style={{ position: "absolute", inset: 0, opacity: 0.4 }}>
        <Image
          src="/images/kadak-chai/mumbai-evening.webp"
          alt=""
          fill
          sizes="100vw"
          priority
          style={{ objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 70% 50%, rgba(17,9,6,0.35) 0%, rgba(17,9,6,0.95) 70%)",
          }}
        />
      </div>

      <div
        className="container-x"
        style={{
          position: "relative",
          maxWidth: 1440,
          marginInline: "auto",
          width: "100%",
        }}
      >
        <div className="kc-hero-grid">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: SOFT }}
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.22em",
                color: "var(--page-accent)",
                margin: 0,
                marginBottom: 40,
              }}
            >
              MUMBAI · CASE STUDY 017 · TEA
            </motion.p>

            <h1
              style={{
                fontFamily:
                  "var(--font-display-bold), 'Archivo Black', Impact, sans-serif",
                fontWeight: 400,
                fontSize: "clamp(80px, 13vw, 200px)",
                letterSpacing: "-0.04em",
                lineHeight: 0.86,
                color: "var(--page-text)",
                margin: 0,
                textTransform: "uppercase",
              }}
            >
              <SlideUp text="Kadak" delay={0.1} />
              <span style={{ display: "block" }}>
                <SlideUp text="Chai" delay={0.22} />
              </span>
              <span
                style={{
                  display: "block",
                  color: "var(--page-accent)",
                }}
              >
                <SlideUp text="Neat." delay={0.34} />
              </span>
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: SOFT }}
              style={{
                marginTop: 56,
                maxWidth: 480,
                display: "flex",
                flexDirection: "column",
                gap: 24,
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-body), 'Crimson Pro', Georgia, serif",
                  fontSize: 22,
                  lineHeight: 1.55,
                  color: "var(--page-text-2)",
                  margin: 0,
                  fontStyle: "italic",
                }}
              >
                Third generation. First tin.
              </p>
              <p
                style={{
                  fontSize: 16,
                  lineHeight: 1.7,
                  color: "var(--page-text-3)",
                  margin: 0,
                  maxWidth: 440,
                }}
              >
                A Mumbai tea family selling sample-room blends out of a
                wholesale yard. We made it a brand.
              </p>
              <a
                href="#the-tin"
                data-cursor="pointer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 12,
                  marginTop: 16,
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: 12,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--page-accent)",
                  paddingBlock: 14,
                  paddingInline: 24,
                  border: "1.5px solid var(--page-accent)",
                  alignSelf: "flex-start",
                  fontWeight: 600,
                }}
              >
                Open the tin →
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 1.04, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.2, ease: STRONG }}
            className="kc-hero-tin"
          >
            <Image
              src="/images/kadak-chai/hero-tin.webp"
              alt="An ornate cylindrical metallic chai tin on a dark warm wood surface, dramatic side light"
              fill
              sizes="(min-width: 1024px) 50vw, 90vw"
              priority
              style={{ objectFit: "cover" }}
            />
          </motion.div>
        </div>
      </div>

      <p
        style={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: "var(--font-geist-mono), monospace",
          fontSize: 11,
          letterSpacing: "0.22em",
          color: "var(--page-text-3)",
          margin: 0,
        }}
      >
        SCROLL FOR THE STORY
      </p>

      <style jsx>{`
        .kc-hero-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 64px;
          align-items: center;
        }
        .kc-hero-tin {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 5;
          max-width: 520px;
          margin-inline: auto;
          border-radius: 4px;
          overflow: hidden;
          box-shadow: 0 60px 120px -40px rgba(201, 128, 58, 0.25);
        }
        @media (min-width: 1024px) {
          .kc-hero-grid {
            grid-template-columns: 55fr 45fr;
            gap: 80px;
          }
          .kc-hero-tin {
            aspect-ratio: 4 / 5;
            max-width: none;
          }
        }
      `}</style>
    </section>
  );
}

function SlideUp({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <span style={{ display: "inline-block", overflow: "hidden" }}>
      <motion.span
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.9, delay, ease: STRONG }}
        style={{ display: "inline-block" }}
      >
        {text}
      </motion.span>
    </span>
  );
}
