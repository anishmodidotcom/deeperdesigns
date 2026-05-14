"use client";

import Image from "next/image";
import { Link } from "next-view-transitions";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const EASE = [0.19, 1, 0.22, 1] as const;

const SMOKE_PATHS = [
  {
    d: "M 50 200 C 30 160, 70 120, 50 80 C 30 40, 70 10, 50 -20",
    duration: 9,
    delay: 0,
    opacity: 0.4,
    x: 0,
  },
  {
    d: "M 50 200 C 70 165, 35 130, 55 90 C 75 55, 30 20, 50 -10",
    duration: 12,
    delay: 1.5,
    opacity: 0.25,
    x: 28,
  },
  {
    d: "M 50 200 C 40 170, 65 135, 45 100 C 25 65, 60 25, 50 0",
    duration: 14,
    delay: 3,
    opacity: 0.18,
    x: -22,
  },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        minHeight: "100vh",
        paddingInline: 24,
        paddingBlock: 96,
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <div
        className="container-x oe-hero-grid"
        style={{ position: "relative", zIndex: 2, width: "100%" }}
      >
        <div className="oe-hero-text">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: EASE }}
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              color: "var(--page-accent)",
              margin: 0,
              marginBottom: 32,
            }}
          >
            OUD &amp; EMBER
          </motion.p>

          <h1
            className="oe-display"
            style={{
              fontFamily:
                "var(--font-cormorant-display), Cormorant, Georgia, serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(56px, 8vw, 96px)",
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
              color: "var(--page-text)",
              margin: 0,
            }}
          >
            <WordReveal text="A fragrance that knows your name." />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.7, ease: EASE }}
            style={{
              fontSize: 17,
              color: "var(--page-text-2)",
              maxWidth: 520,
              margin: 0,
              marginTop: 32,
              lineHeight: 1.7,
            }}
          >
            Seventy percent of inquiries arrived online, and the atelier
            magic did not survive twenty WhatsApp messages. Now an
            eight-question quiz finds the scent and shows the customer a
            bottle with their name on it.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.9, ease: EASE }}
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: 24,
              marginTop: 40,
            }}
          >
            <Link
              href="#the-house"
              data-cursor="pointer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                paddingInline: 22,
                paddingBlock: 12,
                border: "1px solid var(--page-accent)",
                color: "var(--page-accent)",
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: 12,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                transition:
                  "background var(--t-base) cubic-bezier(0.19, 1, 0.22, 1), color var(--t-base) cubic-bezier(0.19, 1, 0.22, 1)",
                background: "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background =
                  "rgba(201,168,76,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              View the build
            </Link>
            <a
              href="#about-build"
              data-cursor="pointer"
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: 12,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "var(--page-text-2)",
                transition: "color var(--t-base) cubic-bezier(0.19, 1, 0.22, 1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--page-text)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--page-text-2)";
              }}
            >
              See the build →
            </a>
          </motion.div>
        </div>

        <div className="oe-hero-image">
          <div
            aria-hidden
            className="oe-hero-glow"
            style={{
              position: "absolute",
              inset: "-12% -8%",
              background:
                "radial-gradient(closest-side, rgba(201,168,76,0.32), rgba(201,168,76,0.06) 55%, transparent 75%)",
              pointerEvents: "none",
              filter: "blur(8px)",
              zIndex: 0,
            }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 1.02, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.2, ease: EASE }}
            style={{
              position: "relative",
              y: imageY,
              zIndex: 1,
              willChange: "transform",
            }}
          >
            <Image
              src="/images/oud-and-ember/hero-bottle.webp"
              alt="Ornate Arabian perfume bottle catching warm gold light"
              width={1024}
              height={1536}
              priority
              sizes="(min-width: 1024px) 40vw, 90vw"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                borderRadius: 4,
              }}
            />
          </motion.div>

          <SmokeWisps />
        </div>
      </div>

      <style jsx>{`
        .oe-hero-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 56px;
          align-items: center;
        }
        .oe-hero-image {
          position: relative;
          order: -1;
          max-width: 520px;
          margin-inline: auto;
          width: 100%;
        }
        @media (min-width: 1024px) {
          .oe-hero-grid {
            grid-template-columns: 60fr 40fr;
            gap: 96px;
          }
          .oe-hero-image {
            order: 1;
            max-width: none;
          }
        }
      `}</style>
    </section>
  );
}

function WordReveal({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <span style={{ display: "inline-block" }}>
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          style={{
            display: "inline-block",
            overflow: "hidden",
            verticalAlign: "top",
          }}
        >
          <motion.span
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              duration: 1.2,
              delay: 0.2 + i * 0.08,
              ease: EASE,
            }}
            style={{ display: "inline-block" }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function SmokeWisps() {
  return (
    <svg
      aria-hidden
      className="oe-smoke"
      viewBox="0 0 100 220"
      preserveAspectRatio="xMidYMax meet"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 2,
        mixBlendMode: "screen",
      }}
    >
      {SMOKE_PATHS.map((s, i) => (
        <motion.path
          key={i}
          d={s.d}
          stroke="rgba(201,168,76,0.85)"
          strokeWidth="0.6"
          fill="none"
          strokeLinecap="round"
          initial={{
            opacity: 0,
            translateY: 20,
            translateX: s.x,
            scaleY: 0.85,
          }}
          animate={{
            opacity: [0, s.opacity, s.opacity * 0.6, 0],
            translateY: [20, -40, -120, -200],
            translateX: [s.x, s.x + 8, s.x - 6, s.x + 4],
            scaleY: [0.85, 1, 1.1, 1.2],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: "easeOut",
            times: [0, 0.25, 0.7, 1],
          }}
          style={{ transformOrigin: "50% 100%" }}
        />
      ))}
    </svg>
  );
}
