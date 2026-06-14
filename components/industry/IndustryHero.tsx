"use client";

import { Link } from "next-view-transitions";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { Industry } from "@/lib/industries";
import { renderSerif } from "./text";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function IndustryHero({ industry }: { industry: Industry }) {
  const { heroEyebrow, heroEyebrowNote, heroHeadline, heroSub, statPanel } =
    industry;

  return (
    <section
      className="ind-hero"
      style={{
        position: "relative",
        paddingTop: 168,
        paddingBottom: "var(--dd-section-py, 120px)",
      }}
    >
      <div
        className="container"
        style={{ maxWidth: "var(--dd-container-max, 1280px)" }}
      >
        <div className="ind-hero__grid">
          {/* Left: editorial column */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              style={{ marginBottom: 36 }}
            >
              <p
                className="mono"
                style={{
                  fontSize: 12,
                  letterSpacing: "0.2em",
                  color: "var(--page-accent)",
                  margin: 0,
                }}
              >
                {heroEyebrow}
              </p>
              <p
                style={{
                  margin: "8px 0 0",
                  fontSize: 13,
                  color: "var(--dd-text-low, #6B6B6B)",
                }}
              >
                {heroEyebrowNote}
              </p>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
              style={{
                fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                fontWeight: 600,
                fontSize: "var(--dd-fs-h1, clamp(40px, 5vw, 64px))",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                color: "var(--dd-text-high, #F5F5F5)",
                margin: 0,
                maxWidth: 620,
              }}
            >
              {renderSerif(heroHeadline)}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.16, ease: EASE }}
              style={{
                marginTop: 28,
                maxWidth: 540,
                fontSize: 18,
                lineHeight: 1.6,
                color: "var(--dd-text-mid, #A8A8A8)",
              }}
            >
              {heroSub}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.24, ease: EASE }}
              style={{
                marginTop: 40,
                display: "flex",
                flexWrap: "wrap",
                gap: 14,
              }}
            >
              <Link
                href="/start-your-study"
                className="ind-btn-primary"
                style={{
                  background: "var(--page-accent)",
                  color: "#0A0A0A",
                  padding: "14px 26px",
                  borderRadius: 999,
                  fontWeight: 600,
                  fontSize: 15,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                Scope your build
              </Link>
              <a
                href="#builds"
                className="ind-btn-ghost"
                style={{
                  border: "1px solid var(--dd-border-strong, rgba(255,255,255,0.16))",
                  color: "var(--dd-text-high, #F5F5F5)",
                  padding: "14px 26px",
                  borderRadius: 999,
                  fontSize: 15,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                Walk the builds
              </a>
            </motion.div>
          </div>

          {/* Right: stat panel */}
          {statPanel ? <StatPanel panel={statPanel} /> : null}
        </div>
      </div>

      <style>{`
        .ind-hero__grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
          align-items: center;
        }
        @media (min-width: 1024px) {
          .ind-hero__grid {
            grid-template-columns: 1.1fr 0.9fr;
            gap: 64px;
          }
        }
        .ind-btn-primary { transition: filter 150ms var(--dd-ease-out, ease); }
        .ind-btn-primary:hover { filter: brightness(1.08); }
        .ind-btn-primary:active { transform: translateY(1px); }
        .ind-btn-ghost {
          transition: border-color 150ms var(--dd-ease-out, ease), background 150ms var(--dd-ease-out, ease);
        }
        .ind-btn-ghost:hover {
          border-color: var(--dd-text-high, #F5F5F5);
          background: rgba(255,255,255,0.04);
        }
        .ind-btn-ghost:active { transform: translateY(1px); }
      `}</style>
    </section>
  );
}

function StatPanel({
  panel,
}: {
  panel: NonNullable<Industry["statPanel"]>;
}) {
  const reduce = useReducedMotion();
  const [value, setValue] = useState(reduce ? panel.target : 0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (reduce) {
      setValue(panel.target);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1300;
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / duration);
            // ease-out cubic
            const eased = 1 - Math.pow(1 - t, 3);
            setValue(Math.round(eased * panel.target));
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce, panel.target]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
      style={{
        background: "var(--dd-surface-1, #111111)",
        border: "1px solid var(--dd-border, rgba(255,255,255,0.08))",
        borderRadius: 18,
        padding: "28px 28px 24px",
      }}
    >
      <p
        className="mono"
        style={{
          fontSize: 10.5,
          letterSpacing: "0.12em",
          color: "var(--dd-text-low, #6B6B6B)",
          margin: 0,
          lineHeight: 1.5,
        }}
      >
        {panel.label}
      </p>
      <p
        style={{
          margin: "18px 0 0",
          fontFamily: "var(--font-geist-mono), monospace",
          fontSize: "clamp(40px, 6vw, 60px)",
          fontWeight: 600,
          letterSpacing: "-0.02em",
          color: "var(--page-money)",
          lineHeight: 1,
        }}
      >
        ₹{value.toLocaleString("en-IN")}
      </p>
      <p
        style={{
          margin: "16px 0 22px",
          fontSize: 14,
          lineHeight: 1.55,
          color: "var(--dd-text-mid, #A8A8A8)",
        }}
      >
        {panel.caption}
      </p>
      <div
        style={{
          borderTop: "1px solid var(--dd-border, rgba(255,255,255,0.08))",
          paddingTop: 16,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {panel.rows.map((r) => (
          <div
            key={r.k}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              gap: 16,
            }}
          >
            <span
              style={{
                fontSize: 13.5,
                color: "var(--dd-text-mid, #A8A8A8)",
              }}
            >
              {r.k}
            </span>
            <span
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: 12.5,
                color: "var(--dd-text-high, #F5F5F5)",
                textAlign: "right",
                whiteSpace: "nowrap",
              }}
            >
              {r.v}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
