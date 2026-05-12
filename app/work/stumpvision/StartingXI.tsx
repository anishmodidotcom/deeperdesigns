"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Player = {
  num: string;
  name: string;
  role: string;
  age: number;
  bat: string;
  bowl: string;
  rating: number;
};

const PLAYERS: Player[] = [
  { num: "01", name: "Arjun S.", role: "Opener", age: 14, bat: "Right-hand", bowl: "—", rating: 92 },
  { num: "02", name: "Karthik P.", role: "Opener", age: 13, bat: "Left-hand", bowl: "—", rating: 88 },
  { num: "03", name: "Veer M.", role: "No. 3", age: 14, bat: "Right-hand", bowl: "Leg-spin", rating: 90 },
  { num: "04", name: "Ishaan T.", role: "All-rounder", age: 15, bat: "Right-hand", bowl: "Right-arm medium", rating: 87 },
  { num: "05", name: "Rohan G.", role: "Wicketkeeper", age: 14, bat: "Right-hand", bowl: "—", rating: 85 },
  { num: "06", name: "Aarav D.", role: "Finisher", age: 15, bat: "Left-hand", bowl: "—", rating: 89 },
  { num: "07", name: "Shourya R.", role: "All-rounder", age: 14, bat: "Right-hand", bowl: "Off-spin", rating: 84 },
  { num: "08", name: "Kabir N.", role: "Pace", age: 15, bat: "Right-hand", bowl: "Right-arm fast", rating: 91 },
  { num: "09", name: "Aditya J.", role: "Spin", age: 13, bat: "Right-hand", bowl: "Left-arm spin", rating: 82 },
  { num: "10", name: "Yuvraj C.", role: "Pace", age: 14, bat: "Left-hand", bowl: "Right-arm fast", rating: 86 },
  { num: "11", name: "Reyansh K.", role: "Spin", age: 13, bat: "Right-hand", bowl: "Off-spin", rating: 80 },
];

export default function StartingXI() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const track = trackRef.current;
      if (!track) return;
      if (reduced) return;

      const distance = track.scrollWidth - window.innerWidth;
      gsap.to(track, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${distance}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        height: "100vh",
        overflow: "hidden",
        background: "var(--page-bg)",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 48,
          left: 0,
          right: 0,
          padding: "0 48px",
          display: "flex",
          justifyContent: "space-between",
          gap: 12,
          flexWrap: "wrap",
          zIndex: 2,
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 11,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--page-accent)",
            margin: 0,
          }}
        >
          STARTING XI · UNDER-15 · GURGAON
        </p>
        <p
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--page-text-2)",
            margin: 0,
          }}
        >
          SCROLL · FLIP THROUGH THE DECK
        </p>
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          paddingBlock: 100,
        }}
      >
        <div
          ref={trackRef}
          style={{
            display: "flex",
            gap: 20,
            paddingInline: "calc((100vw - 280px) / 2)",
            willChange: "transform",
          }}
        >
          {PLAYERS.map((player, i) => (
            <motion.article
              key={player.num}
              whileHover={{ y: -8 }}
              style={{
                flexShrink: 0,
                width: 280,
                height: 420,
                background: "var(--page-surface)",
                border: "1px solid rgba(74,222,128,0.18)",
                borderRadius: 8,
                padding: 20,
                display: "flex",
                flexDirection: "column",
                position: "relative",
                overflow: "hidden",
              }}
              data-cursor="view"
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, rgba(74,222,128,0.1) 0%, transparent 50%)",
                  pointerEvents: "none",
                }}
              />

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: 16,
                  position: "relative",
                }}
              >
                <span
                  style={{
                    fontFamily:
                      "var(--font-rajdhani), system-ui, sans-serif",
                    fontWeight: 700,
                    fontSize: 40,
                    color: "var(--page-accent)",
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                  }}
                >
                  {player.num}
                </span>
                <span
                  style={{
                    fontFamily:
                      "var(--font-rajdhani), system-ui, sans-serif",
                    fontWeight: 700,
                    fontSize: 32,
                    color: "var(--page-accent-2)",
                    letterSpacing: "0.04em",
                    lineHeight: 1,
                  }}
                >
                  {player.rating}
                </span>
              </div>

              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "4 / 5",
                  borderRadius: 6,
                  overflow: "hidden",
                  marginBottom: 16,
                  background: "rgba(13,26,13,0.4)",
                }}
              >
                <Image
                  src={
                    i % 3 === 0
                      ? "/images/stumpvision/hero-batsman.webp"
                      : i % 3 === 1
                      ? "/images/stumpvision/kids-nets.webp"
                      : "/images/stumpvision/ground-dusk.webp"
                  }
                  alt={`${player.name} ${player.role}`}
                  fill
                  sizes="280px"
                  style={{ objectFit: "cover" }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg, transparent 40%, rgba(6,14,6,0.85) 100%)",
                  }}
                />
                <p
                  style={{
                    position: "absolute",
                    bottom: 10,
                    left: 12,
                    right: 12,
                    fontFamily:
                      "var(--font-rajdhani), system-ui, sans-serif",
                    fontWeight: 700,
                    fontSize: 24,
                    color: "#FFFFFF",
                    margin: 0,
                    textTransform: "uppercase",
                    letterSpacing: "0.03em",
                  }}
                >
                  {player.name}
                </p>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "auto 1fr",
                  gap: "6px 12px",
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: 10,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--page-text-2)",
                  position: "relative",
                }}
              >
                <span>ROLE</span>
                <span style={{ color: "var(--page-text)" }}>{player.role}</span>
                <span>AGE</span>
                <span style={{ color: "var(--page-text)" }}>{player.age}</span>
                <span>BAT</span>
                <span style={{ color: "var(--page-text)" }}>{player.bat}</span>
                <span>BOWL</span>
                <span style={{ color: "var(--page-text)" }}>{player.bowl}</span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
