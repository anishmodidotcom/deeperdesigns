"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Program = {
  number: string;
  title: string;
  meta: string;
  src: string;
  alt: string;
};

const PROGRAMS: Program[] = [
  {
    number: "01",
    title: "STRENGTH",
    meta: "12 weeks · Linear progression · Compound lifts",
    src: "/images/zara-fitness/workout-strength.webp",
    alt: "Heavy barbell deadlift at the bottom of the rep",
  },
  {
    number: "02",
    title: "HYPERTROPHY",
    meta: "8 weeks · Volume blocks · Isolation focus",
    src: "/images/zara-fitness/workout-hypertrophy.webp",
    alt: "Cable lateral raise in a dramatic side light",
  },
  {
    number: "03",
    title: "HIIT",
    meta: "6 weeks · 4 days/week · 30 min sessions",
    src: "/images/zara-fitness/workout-hiit.webp",
    alt: "Box jump mid-air in a dark gym",
  },
  {
    number: "04",
    title: "MOBILITY",
    meta: "Ongoing · Daily 15-min flows · Recovery focused",
    src: "/images/zara-fitness/workout-mobility.webp",
    alt: "Controlled mobility pose on a black mat",
  },
  {
    number: "05",
    title: "RECOVERY",
    meta: "On-demand · Stretching, foam rolling, breathwork",
    src: "/images/zara-fitness/workout-recovery.webp",
    alt: "Calm recovery pose on a foam roller in warm light",
  },
];

export default function Programs() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        "(min-width: 900px) and (prefers-reduced-motion: no-preference)",
        () => {
          const section = sectionRef.current;
          const track = trackRef.current;
          const bar = progressRef.current;
          if (!section || !track || !bar) return;

          const getDistance = () =>
            Math.max(0, track.scrollWidth - section.clientWidth);

          const tween = gsap.to(track, {
            x: () => -getDistance(),
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${getDistance()}`,
              scrub: 0.5,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                bar.style.width = `${self.progress * 100}%`;
                const idx = Math.min(
                  PROGRAMS.length - 1,
                  Math.floor(self.progress * PROGRAMS.length)
                );
                setActive(idx);
              },
            },
          });

          return () => {
            tween.scrollTrigger?.kill();
            tween.kill();
          };
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        overflow: "hidden",
        background: "var(--page-bg)",
      }}
    >
      <div ref={trackRef} className="zf-programs-track">
        {PROGRAMS.map((p) => (
          <article key={p.number} className="zf-program-card">
            <Image
              src={p.src}
              alt={p.alt}
              fill
              sizes="100vw"
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
                  "linear-gradient(180deg, rgba(14,14,14,0.25) 0%, rgba(14,14,14,0.45) 55%, rgba(14,14,14,0.92) 100%)",
              }}
            />
            <div
              style={{
                position: "relative",
                zIndex: 1,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                padding: 48,
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: 11,
                  letterSpacing: "0.2em",
                  color: "var(--page-accent)",
                  margin: 0,
                }}
              >
                PROGRAM · {p.number}
              </p>
              <h3
                style={{
                  fontFamily: "var(--font-anton), Impact, sans-serif",
                  fontWeight: 400,
                  fontSize: "clamp(72px, 14vw, 200px)",
                  letterSpacing: "-0.01em",
                  lineHeight: 0.92,
                  color: "var(--page-text)",
                  margin: 0,
                  marginTop: 14,
                  textTransform: "uppercase",
                }}
              >
                {p.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: 13,
                  letterSpacing: "0.06em",
                  color: "var(--page-text-2)",
                  margin: 0,
                  marginTop: 18,
                  maxWidth: 480,
                }}
              >
                {p.meta}
              </p>
            </div>
          </article>
        ))}
      </div>

      <div
        aria-hidden
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 16,
          paddingInline: 32,
          display: "flex",
          alignItems: "center",
          gap: 16,
          zIndex: 2,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 10,
            letterSpacing: "0.18em",
            color: "var(--page-text-2)",
          }}
        >
          {String(active + 1).padStart(2, "0")} / {String(PROGRAMS.length).padStart(2, "0")}
        </span>
        <div
          style={{
            flex: 1,
            height: 2,
            background: "rgba(255,255,255,0.12)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            ref={progressRef}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: "0%",
              background: "var(--page-accent)",
            }}
          />
        </div>
        <span
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 10,
            letterSpacing: "0.18em",
            color: "var(--page-text-2)",
          }}
        >
          SCROLL →
        </span>
      </div>

      <style jsx>{`
        .zf-programs-track {
          display: flex;
          flex-direction: column;
          gap: 16px;
          padding: 40px 24px;
        }
        .zf-program-card {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 5;
          overflow: hidden;
          background: var(--page-surface-1);
          border: 1px solid var(--page-border);
        }
        @media (min-width: 900px) {
          .zf-programs-track {
            flex-direction: row;
            gap: 24px;
            padding: 64px 64px;
            min-height: 100vh;
            align-items: stretch;
            will-change: transform;
          }
          .zf-program-card {
            width: calc(100vw - 240px);
            max-width: 1080px;
            min-width: 720px;
            aspect-ratio: auto;
            height: calc(100vh - 128px);
            flex-shrink: 0;
          }
        }
      `}</style>
    </section>
  );
}
