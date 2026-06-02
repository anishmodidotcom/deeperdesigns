"use client";

import Image from "next/image";
import { Link } from "next-view-transitions";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

function Paw() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden
      style={{ flexShrink: 0 }}
    >
      <circle cx="4" cy="5" r="1.6" />
      <circle cx="8" cy="3.5" r="1.6" />
      <circle cx="12" cy="5" r="1.6" />
      <ellipse cx="8" cy="11" rx="3.6" ry="3" />
    </svg>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "grid",
      }}
      className="ps-hero"
    >
      <div
        className="ps-hero-left"
        style={{
          background: "var(--page-surface-1)",
          display: "flex",
          alignItems: "center",
          paddingInline: 40,
          paddingBlock: 96,
        }}
      >
        <div style={{ width: "100%", maxWidth: 560 }}>
          <motion.p
            initial={{ opacity: 0.35, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              color: "var(--page-accent)",
              margin: 0,
              marginBottom: 28,
            }}
          >
            PAWSTAY
          </motion.p>

          <h1
            style={{
              fontFamily:
                "var(--font-jakarta), var(--font-geist-sans), system-ui, sans-serif",
              fontStyle: "italic",
              fontWeight: 500,
              fontSize: "clamp(40px, 6vw, 72px)",
              letterSpacing: "-0.025em",
              lineHeight: 1.05,
              color: "var(--page-text)",
              margin: 0,
            }}
          >
            <WordReveal text="She wants to know her dog is okay." />
            <span style={{ display: "block" }}>
              <WordReveal
                text="We built her a window in."
                delay={0.5}
              />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0.35, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0, ease: EASE }}
            style={{
              fontSize: 19,
              color: "var(--page-text-2)",
              maxWidth: 520,
              lineHeight: 1.6,
              margin: 0,
              marginTop: 28,
            }}
          >
            Twenty dogs, and every drop-off triggered a dozen anxious
            WhatsApp messages. Now parents watch a live camera and a
            real-time tracker, and the owner gets two hours of her day
            back.
          </motion.p>

          <motion.div
            initial={{ opacity: 0.35, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.15, ease: EASE }}
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: 20,
              marginTop: 36,
            }}
          >
            <Link
              href="#live-camera"
              data-cursor="pointer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                background: "var(--page-accent)",
                color: "#1A120A",
                paddingInline: 22,
                paddingBlock: 12,
                borderRadius: 9999,
                fontSize: 14,
                fontWeight: 600,
                fontFamily:
                  "var(--font-jakarta), var(--font-geist-sans), system-ui, sans-serif",
                transition: "background 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--page-accent-2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--page-accent)";
              }}
            >
              View the build
            </Link>
            <a
              href="#about-build"
              data-cursor="pointer"
              style={{
                fontFamily:
                  "var(--font-jakarta), var(--font-geist-sans), system-ui, sans-serif",
                fontSize: 14,
                color: "var(--page-text-2)",
                transition: "color 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
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

          <motion.div
            initial={{ opacity: 0.35, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.3, ease: EASE }}
            style={{
              marginTop: 56,
              paddingTop: 24,
              borderTop: "1px solid var(--page-border)",
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "var(--page-text-2)",
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                color: "var(--page-accent)",
              }}
            >
              <Paw />
              20 dogs
            </span>
            <span aria-hidden style={{ color: "var(--page-text-3)" }}>·</span>
            <span>0 panic messages</span>
            <span aria-hidden style={{ color: "var(--page-text-3)" }}>·</span>
            <span>1 portal</span>
          </motion.div>
        </div>
      </div>

      <div className="ps-hero-right">
        <motion.div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            y: imageY,
            willChange: "transform",
          }}
        >
          <Image
            src="/images/pawstay/hero-dog.webp"
            alt="A calm golden retriever lying on a cream rug in soft window light"
            fill
            priority
            sizes="(min-width: 1024px) 55vw, 100vw"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(circle at 30% 30%, transparent 30%, rgba(15,19,16,0.45) 100%)",
            }}
          />
        </motion.div>
      </div>

      <style jsx>{`
        .ps-hero {
          grid-template-columns: 1fr;
          grid-template-rows: auto auto;
        }
        .ps-hero-right {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 10;
          overflow: hidden;
          order: -1;
        }
        @media (min-width: 1024px) {
          .ps-hero {
            grid-template-columns: 45fr 55fr;
            grid-template-rows: 1fr;
            min-height: 100vh;
          }
          .ps-hero-right {
            height: 100%;
            aspect-ratio: auto;
            order: 1;
          }
        }
      `}</style>
    </section>
  );
}

function WordReveal({ text, delay = 0 }: { text: string; delay?: number }) {
  const words = text.split(" ");
  return (
    <span style={{ display: "inline-block" }}>
      {words.map((w, i) => (
        <span key={`${w}-${i}`}>
          <span
            style={{
              display: "inline-block",
              overflow: "hidden",
              verticalAlign: "top",
            }}
          >
            <motion.span
              initial={{ y: "110%", opacity: 0.35 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{
                duration: 0.6,
                delay: delay + 0.15 + i * 0.08,
                ease: EASE,
              }}
              style={{ display: "inline-block" }}
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
