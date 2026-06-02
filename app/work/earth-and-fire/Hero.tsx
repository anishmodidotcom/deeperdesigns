"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { JharokhaArch, LotusBorder, PaisleyOrnament } from "./illustrations";

const EASE = [0.34, 1.56, 0.64, 1] as const;
const SOFT = [0.4, 0, 0.6, 1] as const;

export default function Hero() {
  return (
    <section
      style={{
        position: "relative",
        paddingTop: 96,
        paddingBottom: 64,
        overflow: "hidden",
      }}
    >
      <div
        className="container-x"
        style={{ position: "relative", maxWidth: 1200, marginInline: "auto" }}
      >
        <div className="ef-hero-grid">
          <div className="ef-hero-image-col">
            <motion.div
              initial={{ opacity: 0.35, scale: 1.02, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, ease: SOFT }}
              style={{
                position: "relative",
                width: "100%",
                maxWidth: 480,
                margin: "0 auto",
              }}
            >
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  top: -28,
                  left: "50%",
                  transform: "translateX(-50%)",
                  color: "var(--page-border)",
                  pointerEvents: "none",
                  zIndex: 0,
                }}
              >
                <JharokhaArch width={420} />
              </div>
              <div
                style={{
                  position: "relative",
                  zIndex: 1,
                  width: "100%",
                  aspectRatio: "2 / 3",
                  overflow: "hidden",
                }}
              >
                <Image
                  src="/images/earth-and-fire/hero-vase.webp"
                  alt="Handmade terracotta vase with Rajasthani patterns on a raw stone plinth"
                  fill
                  priority
                  sizes="(min-width: 1024px) 480px, 80vw"
                  style={{ objectFit: "cover", objectPosition: "center" }}
                />
              </div>
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  right: -28,
                  bottom: 28,
                  color: "var(--page-accent)",
                  zIndex: 2,
                }}
              >
                <PaisleyOrnament width={72} />
              </div>
            </motion.div>
          </div>

          <div className="ef-hero-text-col">
            <motion.p
              initial={{ opacity: 0.35, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: SOFT }}
              style={{
                fontFamily:
                  "var(--font-geist-sans), system-ui, sans-serif",
                fontWeight: 500,
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.22em",
                color: "var(--page-border)",
                margin: 0,
                marginBottom: 28,
              }}
            >
              EARTH &amp; FIRE
            </motion.p>

            <h1
              style={{
                fontFamily:
                  "var(--font-display-script), 'DM Serif Display', Georgia, serif",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(56px, 8vw, 92px)",
                letterSpacing: "-0.01em",
                lineHeight: 0.95,
                color: "var(--page-text)",
                margin: 0,
              }}
            >
              <ItalicReveal text="Pottery" delay={0.1} />
              <span style={{ display: "block" }}>
                <ItalicReveal text="that knows" delay={0.25} />
              </span>
              <span style={{ display: "block" }}>
                <ItalicReveal text="your name." delay={0.4} />
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0.35, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7, ease: SOFT }}
              style={{
                fontSize: 17,
                color: "var(--page-text-2)",
                lineHeight: 1.7,
                margin: 0,
                marginTop: 28,
                maxWidth: 460,
              }}
            >
              A Jaipur ceramicist sold out every drop in 90 minutes and
              underpriced the work to do it. Now a custom builder takes
              orders, the lead time is the feature, and the average order
              is up 340%.
            </motion.p>

            <motion.a
              initial={{ opacity: 0.35, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.85, ease: SOFT }}
              href="#the-maker"
              data-cursor="pointer"
              style={{
                display: "inline-block",
                fontFamily:
                  "var(--font-geist-sans), system-ui, sans-serif",
                fontSize: 14,
                color: "var(--page-text)",
                marginTop: 32,
                paddingBottom: 4,
                borderBottom: "2px solid var(--page-accent-2)",
                fontWeight: 500,
              }}
            >
              See the build →
            </motion.a>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0.35, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.0, delay: 0.6, ease: EASE }}
          aria-hidden
          style={{
            display: "flex",
            justifyContent: "center",
            color: "var(--page-border)",
            marginTop: 80,
          }}
        >
          <LotusBorder width={220} />
        </motion.div>
      </div>

      <style jsx>{`
        .ef-hero-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
          align-items: center;
        }
        .ef-hero-image-col {
          order: -1;
        }
        @media (min-width: 1024px) {
          .ef-hero-grid {
            grid-template-columns: 1fr 1fr;
            gap: 96px;
          }
          .ef-hero-image-col {
            order: 0;
          }
        }
      `}</style>
    </section>
  );
}

function ItalicReveal({
  text,
  delay = 0,
}: {
  text: string;
  delay?: number;
}) {
  return (
    <span style={{ display: "inline-block", overflow: "hidden" }}>
      <motion.span
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.9, delay, ease: SOFT }}
        style={{ display: "inline-block" }}
      >
        {text}
      </motion.span>
    </span>
  );
}
