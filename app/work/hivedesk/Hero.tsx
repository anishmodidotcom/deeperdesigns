"use client";

import Image from "next/image";
import { Link } from "next-view-transitions";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

const PILLS = [
  "84 active members",
  "12 rooms booked today",
  "Avg stay 7.2 months",
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "grid",
      }}
      className="hd-hero"
    >
      <div
        className="hd-hero-left"
        style={{
          background: "var(--page-surface-1)",
          display: "flex",
          alignItems: "center",
          paddingInline: 32,
          paddingBlock: 96,
        }}
      >
        <div style={{ width: "100%", maxWidth: 560 }}>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
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
            HIVEDESK
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05, ease: EASE }}
            style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontWeight: 600,
              fontSize: "clamp(48px, 7.4vw, 88px)",
              letterSpacing: "-0.04em",
              lineHeight: 1.0,
              color: "var(--page-text)",
              margin: 0,
            }}
          >
            Stop guessing why members leave.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.13, ease: EASE }}
            style={{
              fontSize: 19,
              color: "var(--page-text-2)",
              maxWidth: 480,
              lineHeight: 1.5,
              margin: 0,
              marginTop: 24,
            }}
          >
            A coworking operating system that runs the floor, profiles every
            member, and tells the owner where the revenue actually leaks.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.21, ease: EASE }}
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: 20,
              marginTop: 36,
            }}
          >
            <Link
              href="#the-operating-system"
              data-cursor="pointer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                background: "var(--page-accent)",
                color: "#FAFAFA",
                paddingInline: 22,
                paddingBlock: 12,
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 500,
                fontFamily:
                  "var(--font-inter), system-ui, sans-serif",
                border: "1px solid var(--page-accent)",
                transition: "background 0.15s var(--ease-spring)",
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
                  "var(--font-inter), system-ui, sans-serif",
                fontSize: 14,
                color: "var(--page-text-2)",
                transition: "color 0.15s var(--ease-spring)",
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
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.29, ease: EASE }}
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              marginTop: 36,
            }}
          >
            {PILLS.map((p) => (
              <span
                key={p}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  paddingInline: 12,
                  paddingBlock: 6,
                  border: "1px solid var(--page-border-2)",
                  borderRadius: 9999,
                  background: "var(--page-surface-2)",
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: 11,
                  color: "var(--page-text-2)",
                  letterSpacing: "0.04em",
                }}
              >
                <PulseDot />
                {p}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="hd-hero-right">
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
            src="/images/hivedesk/hero-space.webp"
            alt="Minimalist coworking floor at dawn with empty desks and natural light"
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to right, rgba(139,92,246,0.12) 0%, rgba(139,92,246,0) 18%), linear-gradient(to right, var(--page-surface-1) 0%, transparent 5%)",
            }}
          />
        </motion.div>
      </div>

      <style jsx>{`
        .hd-hero {
          grid-template-columns: 1fr;
          grid-template-rows: auto auto;
        }
        .hd-hero-right {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 10;
          overflow: hidden;
          order: -1;
        }
        @media (min-width: 1024px) {
          .hd-hero {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 1fr;
            min-height: 100vh;
          }
          .hd-hero-right {
            position: relative;
            height: 100%;
            aspect-ratio: auto;
            order: 1;
          }
        }
      `}</style>
    </section>
  );
}

function PulseDot() {
  return (
    <motion.span
      aria-hidden
      animate={{ opacity: [0.45, 1, 0.45] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      style={{
        width: 6,
        height: 6,
        borderRadius: 9999,
        background: "var(--page-accent)",
      }}
    />
  );
}
