"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const EASE = [0.4, 0, 0.2, 1] as const;

type Crop = {
  name: string;
  current: number;
  recommended: number;
};

const CROPS: Crop[] = [
  { name: "Tomato", current: 18, recommended: 22 },
  { name: "Spinach", current: 14, recommended: 12 },
  { name: "Bottle gourd", current: 8, recommended: 8 },
  { name: "Beetroot", current: 6, recommended: 9 },
  { name: "Coriander", current: 4, recommended: 3 },
  { name: "Lettuce", current: 5, recommended: 7 },
];

const MAX_ACRES = 24;

function deltaLabel(c: number, r: number) {
  if (r > c) return "recommend more";
  if (r < c) return "recommend less";
  return "steady";
}

function deltaColor(c: number, r: number) {
  if (r > c) return "var(--page-accent-2)";
  if (r < c) return "var(--page-accent-3)";
  return "var(--page-text-3)";
}

export default function WhatToPlant() {
  const sectionRef = useRef<HTMLElement>(null);
  const currentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const recommendRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      CROPS.forEach((c, i) => {
        const cur = currentRefs.current[i];
        const rec = recommendRefs.current[i];
        if (!cur || !rec) return;
        const curPct = (c.current / MAX_ACRES) * 100;
        const recPct = (c.recommended / MAX_ACRES) * 100;

        if (reduced) {
          cur.style.width = `${curPct}%`;
          rec.style.width = `${recPct}%`;
          return;
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            once: true,
          },
        });
        tl.fromTo(
          cur,
          { width: "0%" },
          {
            width: `${curPct}%`,
            duration: 0.8,
            delay: i * 0.08,
            ease: "power2.out",
          },
          0
        ).fromTo(
          rec,
          { width: "0%" },
          {
            width: `${recPct}%`,
            duration: 0.7,
            delay: 0.4 + i * 0.08,
            ease: "power2.inOut",
          },
          0
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      style={{ paddingBlock: 144 }}
    >
      <div
        className="container-x"
        style={{ maxWidth: 1080, marginInline: "auto" }}
      >
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.18em",
            color: "var(--page-accent)",
            margin: 0,
            marginBottom: 24,
          }}
        >
          THE WEEKLY MATH
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE }}
          style={{
            fontFamily: "var(--font-bricolage), Georgia, serif",
            fontWeight: 600,
            fontSize: "clamp(34px, 5.4vw, 64px)",
            letterSpacing: "-0.035em",
            lineHeight: 1.05,
            color: "var(--page-text)",
            margin: 0,
            marginBottom: 24,
            fontVariationSettings: "'opsz' 96",
          }}
        >
          How much of each crop to plant. Recalculated every dawn.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.08, ease: EASE }}
          style={{
            fontSize: 17,
            color: "var(--page-text-2)",
            lineHeight: 1.75,
            margin: 0,
            marginBottom: 64,
            maxWidth: 720,
          }}
        >
          The model takes last week&rsquo;s subscriber orders, the
          wholesale forecasts, the restaurant&rsquo;s projected covers,
          and the season, and outputs a planting list. Lata reads it on
          her phone at 6 AM.
        </motion.p>

        <div
          style={{
            background: "var(--page-surface-1)",
            border: "1px solid var(--page-border)",
            borderRadius: 12,
            padding: 32,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 26,
            }}
          >
            {CROPS.map((c, i) => {
              const curPct = (c.current / MAX_ACRES) * 100;
              const recPct = (c.recommended / MAX_ACRES) * 100;
              const delta = c.recommended - c.current;
              return (
                <div key={c.name}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      gap: 12,
                      marginBottom: 8,
                      flexWrap: "wrap",
                    }}
                  >
                    <span
                      style={{
                        fontFamily:
                          "var(--font-bricolage), Georgia, serif",
                        fontWeight: 500,
                        fontSize: 16,
                        letterSpacing: "-0.02em",
                        color: "var(--page-text)",
                      }}
                    >
                      {c.name}
                    </span>
                    <span
                      style={{
                        fontFamily:
                          "var(--font-geist-mono), monospace",
                        fontSize: 12,
                        color: "var(--page-text-2)",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <span style={{ color: "var(--page-text)" }}>
                        {c.current} acres
                      </span>
                      <span style={{ color: "var(--page-text-3)" }}>→</span>
                      <span style={{ color: deltaColor(c.current, c.recommended) }}>
                        {c.recommended} acres
                      </span>
                      <span
                        style={{
                          color: deltaColor(c.current, c.recommended),
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                          fontSize: 10,
                        }}
                      >
                        {deltaLabel(c.current, c.recommended)}
                      </span>
                    </span>
                  </div>

                  <div
                    style={{
                      position: "relative",
                      height: 24,
                      background: "rgba(255,255,255,0.03)",
                      borderRadius: 6,
                      overflow: "hidden",
                      border: "1px solid var(--page-border)",
                    }}
                  >
                    <div
                      ref={(el) => {
                        recommendRefs.current[i] = el;
                      }}
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: `${recPct}%`,
                        background:
                          delta === 0
                            ? "rgba(212,165,55,0.18)"
                            : delta > 0
                            ? "rgba(107,165,114,0.22)"
                            : "rgba(184,85,48,0.22)",
                        border: `1px dashed ${
                          delta === 0
                            ? "rgba(212,165,55,0.4)"
                            : delta > 0
                            ? "rgba(107,165,114,0.6)"
                            : "rgba(184,85,48,0.6)"
                        }`,
                        borderRadius: 6,
                      }}
                    />
                    <div
                      ref={(el) => {
                        currentRefs.current[i] = el;
                      }}
                      style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: `${curPct}%`,
                        background:
                          "linear-gradient(90deg, var(--page-accent-2), var(--page-accent))",
                        borderRadius: 6,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE }}
          style={{
            fontFamily: "var(--font-bricolage), Georgia, serif",
            fontStyle: "italic",
            fontWeight: 500,
            fontSize: "clamp(20px, 2.6vw, 28px)",
            letterSpacing: "-0.025em",
            color: "var(--page-text-2)",
            margin: 0,
            marginTop: 32,
            textAlign: "center",
            fontVariationSettings: "'opsz' 96",
          }}
        >
          Last year this was a Sunday meeting and a notebook.
        </motion.p>
      </div>
    </section>
  );
}
