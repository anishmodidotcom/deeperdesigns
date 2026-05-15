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
        flexDirection: "column",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
        }}
      >
        <Image
          src="/images/nomad-trails/hero-ridge.webp"
          alt="A wide Himalayan ridge at dawn, soft pink light on snow, two small figures walking the line"
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
              "linear-gradient(180deg, rgba(250,248,244,0.4) 0%, rgba(250,248,244,0.05) 30%, rgba(26,31,38,0.55) 100%)",
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
          paddingBlock: 80,
          color: "#FAF8F4",
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: SOFT }}
          style={{
            fontFamily: "var(--font-mono-tech), 'IBM Plex Mono', monospace",
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.22em",
            color: "#FAF8F4",
            margin: 0,
            marginBottom: 40,
            opacity: 0.85,
          }}
        >
          NOMAD TRAILS · HIMALAYAS
        </motion.p>

        <div className="nt-hero-headline">
          <h1
            style={{
              fontFamily:
                "var(--font-display-editorial), 'Bodoni Moda', 'Didot', serif",
              fontWeight: 500,
              fontSize: "clamp(56px, 9vw, 132px)",
              letterSpacing: "-0.03em",
              lineHeight: 0.95,
              color: "#FAF8F4",
              margin: 0,
              maxWidth: 1100,
            }}
          >
            <Reveal text="Walk to where" delay={0.1} />
            <span style={{ display: "block" }}>
              <Reveal text="it gets quiet." delay={0.25} />
            </span>
          </h1>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 48,
            marginTop: 56,
            alignItems: "flex-end",
          }}
        >
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: SOFT }}
            style={{
              fontFamily:
                "var(--font-body-clean), 'Inter', system-ui, sans-serif",
              fontSize: 18,
              lineHeight: 1.6,
              color: "#FAF8F4",
              margin: 0,
              maxWidth: 480,
              opacity: 0.92,
            }}
          >
            Three trips a year, eight trekkers a trip, sold out but
            quietly and cheaply. Now an editorial site sells the
            constraint as the offer. Direct bookings went from 18% to
            62%.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: SOFT }}
            style={{
              display: "flex",
              gap: 32,
              fontFamily: "var(--font-mono-tech), 'IBM Plex Mono', monospace",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              opacity: 0.85,
            }}
          >
            <div>
              <div style={{ marginBottom: 4 }}>EST.</div>
              <div style={{ fontWeight: 600 }}>2019</div>
            </div>
            <div>
              <div style={{ marginBottom: 4 }}>BASED</div>
              <div style={{ fontWeight: 600 }}>LEH, IN</div>
            </div>
            <div>
              <div style={{ marginBottom: 4 }}>GROUPS</div>
              <div style={{ fontWeight: 600 }}>MAX 8</div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 1.2 }}
        style={{
          position: "absolute",
          bottom: 24,
          right: 32,
          fontFamily: "var(--font-mono-tech), 'IBM Plex Mono', monospace",
          fontSize: 10,
          letterSpacing: "0.2em",
          color: "#FAF8F4",
          opacity: 0.7,
        }}
      >
        34°09&apos;N · 77°34&apos;E
      </motion.div>

      <style jsx>{`
        .nt-hero-headline {
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}

function Reveal({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <span
      style={{
        display: "inline-block",
        overflow: "hidden",
        paddingBottom: "0.12em",
        verticalAlign: "bottom",
      }}
    >
      <motion.span
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1.0, delay, ease: STRONG }}
        style={{ display: "inline-block" }}
      >
        {text}
      </motion.span>
    </span>
  );
}
