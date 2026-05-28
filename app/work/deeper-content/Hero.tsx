"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

// 12 sample images for the hero masonry, balanced across brands.
const HERO_TILES = [
  "FR-01", "BA-01", "SS-01", "AH-02",
  "CB-02", "KS-02", "FR-04", "BA-02",
  "SS-04", "AM-03", "VL-01", "OA-02",
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const wallY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const wallOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.55]);

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        minHeight: "100vh",
        paddingBlock: 120,
        overflow: "hidden",
      }}
    >
      <motion.div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          y: wallY,
          opacity: wallOpacity,
        }}
      >
        <div className="dc-hero-wall" aria-hidden>
          {HERO_TILES.map((code, i) => (
            <div key={code} className="dc-hero-tile">
              <Image
                src={`/images/deeper-content/samples/${code}.jpg`}
                alt=""
                fill
                priority={i < 4}
                sizes="(min-width: 1024px) 25vw, 50vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          ))}
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 30% 35%, rgba(10,10,18,0.65) 0%, rgba(10,10,18,0.92) 55%, rgba(10,10,18,0.98) 80%)",
          }}
        />
      </motion.div>

      <div
        className="container-x"
        style={{
          position: "relative",
          maxWidth: 1280,
          marginInline: "auto",
          paddingInline: "clamp(20px, 4vw, 48px)",
        }}
      >
        <motion.div
          initial={{ opacity: 0.4, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "6px 14px",
            borderRadius: 9999,
            border: "1px solid var(--page-border)",
            background: "rgba(99,102,241,0.08)",
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 11,
            letterSpacing: "0.22em",
            color: "var(--page-accent-2)",
            textTransform: "uppercase",
            marginBottom: 48,
          }}
        >
          <span
            aria-hidden
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "#25D366",
              boxShadow: "0 0 8px #25D366",
            }}
          />
          02 · LIVE PRODUCT · CONTENT ENGINE
        </motion.div>

        <h1
          style={{
            fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
            fontWeight: 600,
            fontSize: "clamp(52px, 8.5vw, 120px)",
            letterSpacing: "-0.03em",
            lineHeight: 1.0,
            color: "var(--page-text)",
            margin: 0,
            marginBottom: 36,
            maxWidth: 1000,
          }}
        >
          <WordReveal text="Content that thinks" delayStart={0.05} />{" "}
          <span style={{ display: "block" }}>
            <WordReveal text="before it generates." delayStart={0.25} accent />
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0.4, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease: EASE }}
          style={{
            fontSize: 21,
            lineHeight: 1.55,
            color: "var(--page-text-2)",
            margin: 0,
            marginBottom: 36,
            maxWidth: 640,
          }}
        >
          Most AI tools generate. Deeper Content reasons first: funnel stage,
          audience, idea, brand. Then it makes social creative that looks like
          you, every time.
        </motion.p>

        <motion.div
          initial={{ opacity: 0.4 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6, ease: EASE }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 12,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "var(--page-text-3)",
          }}
        >
          <span
            aria-hidden
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#25D366",
              boxShadow: "0 0 6px #25D366",
            }}
          />
          LIVE ·{" "}
          <a
            href="https://cge.deeperdesigns.in"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "var(--page-accent-2)",
              textDecoration: "underline",
              textUnderlineOffset: 4,
              textDecorationThickness: 1,
            }}
          >
            cge.deeperdesigns.in
          </a>
        </motion.div>
      </div>

      <style>{`
        .dc-hero-wall {
          position: absolute;
          inset: -40px -40px -120px -40px;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-auto-rows: 1fr;
          gap: 8px;
          opacity: 0.45;
        }
        .dc-hero-tile {
          position: relative;
          aspect-ratio: 4 / 5;
          overflow: hidden;
          border-radius: 6px;
        }
        @media (min-width: 768px) {
          .dc-hero-wall {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (min-width: 1100px) {
          .dc-hero-wall {
            grid-template-columns: repeat(4, 1fr);
            opacity: 0.5;
          }
        }
      `}</style>
    </section>
  );
}

function WordReveal({
  text,
  delayStart = 0,
  accent = false,
}: {
  text: string;
  delayStart?: number;
  accent?: boolean;
}) {
  const words = text.split(" ");
  return (
    <span style={{ display: "inline" }}>
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          style={{ display: "inline-block", whiteSpace: "nowrap" }}
        >
          <motion.span
            initial={{ y: 10, opacity: 0.35 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.6,
              delay: delayStart + i * 0.08,
              ease: EASE,
            }}
            style={{
              display: "inline-block",
              color: accent ? "var(--page-accent-2)" : "inherit",
            }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}
