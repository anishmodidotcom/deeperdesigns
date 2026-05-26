"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.55]);

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
          y: imageY,
          opacity: imageOpacity,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url(/images/deeper-content/hero-screenshot.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.35,
            filter: "blur(1px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 70% 40%, rgba(99,102,241,0.18) 0%, rgba(10,10,18,0.92) 65%)",
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
        <div className="dc-hero-grid">
          <div>
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
                marginBottom: 40,
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
              22 · LIVE PRODUCT · CONTENT AUTOMATION
            </motion.div>

            <h1
              style={{
                fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                fontWeight: 600,
                fontSize: "clamp(56px, 9vw, 128px)",
                letterSpacing: "-0.03em",
                lineHeight: 1.0,
                color: "var(--page-text)",
                margin: 0,
                marginBottom: 32,
              }}
            >
              <WordReveal text="Content that knows" delayStart={0.05} />{" "}
              <span style={{ display: "block" }}>
                <WordReveal text="your brand." delayStart={0.25} accent />
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
                marginBottom: 32,
                maxWidth: 560,
              }}
            >
              An AI engine custom-built for one brand at a time. We install it for you. We train it on your voice. It runs forever.
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

          <div className="dc-hero-visual">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
              style={{
                position: "relative",
                aspectRatio: "4 / 3",
                borderRadius: 14,
                overflow: "hidden",
                border: "1px solid var(--page-border)",
                boxShadow: "0 30px 80px -30px rgba(0,0,0,0.6), 0 0 0 1px rgba(99,102,241,0.18)",
              }}
            >
              <Image
                src="/images/deeper-content/hero-screenshot.png"
                alt="Deeper Content engine landing page at cge.deeperdesigns.in"
                fill
                priority
                sizes="(min-width: 1024px) 48vw, 100vw"
                style={{ objectFit: "cover", objectPosition: "left top" }}
              />
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`
        .dc-hero-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 56px;
          align-items: center;
        }
        .dc-hero-visual {
          width: 100%;
        }
        @media (min-width: 1024px) {
          .dc-hero-grid {
            grid-template-columns: 1.05fr 1fr;
            gap: 80px;
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
    <span style={{ display: "inline-block" }}>
      {words.map((w, i) => (
        <span key={`${w}-${i}`}>
          <span style={{ display: "inline-block", verticalAlign: "top" }}>
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
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}
