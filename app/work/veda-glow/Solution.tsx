"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Pill = { label: string; selected?: boolean };

const SKIN_TYPES: Pill[] = [
  { label: "Dry" },
  { label: "Oily", selected: true },
  { label: "Combination" },
  { label: "Sensitive" },
];

const CONCERNS: Pill[] = [
  { label: "Acne", selected: true },
  { label: "Pigmentation" },
  { label: "Aging" },
  { label: "Dullness" },
];

const AGE_RANGES: Pill[] = [
  { label: "18-25" },
  { label: "25-35", selected: true },
  { label: "35-45" },
  { label: "45+" },
];

const MORNING = ["Neem Cleanser", "Saffron Toner", "Rose Hydration Mist"];
const EVENING = ["Ubtan Cleanser", "Kumkumadi Oil", "Night Repair Cream"];

function PillRow({ pills }: { pills: Pill[] }) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 8,
        marginTop: 12,
      }}
    >
      {pills.map((p) => (
        <span
          key={p.label}
          style={{
            display: "inline-flex",
            alignItems: "center",
            paddingInline: 14,
            paddingBlock: 8,
            borderRadius: 9999,
            border: p.selected
              ? "1px solid var(--page-accent)"
              : "1px solid rgba(212,165,116,0.25)",
            color: p.selected ? "var(--page-text)" : "var(--page-text-2)",
            background: p.selected
              ? "rgba(212,165,116,0.12)"
              : "transparent",
            fontSize: 13,
          }}
        >
          {p.label}
        </span>
      ))}
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontFamily: "var(--font-geist-mono), monospace",
        fontSize: 11,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        color: "var(--page-text-2)",
        margin: 0,
        marginTop: 20,
      }}
    >
      {children}
    </p>
  );
}

function RoutineRow({ name }: { name: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        paddingBlock: 8,
        borderBottom: "1px solid rgba(212,165,116,0.08)",
      }}
    >
      <span
        aria-hidden
        style={{
          width: 10,
          height: 10,
          borderRadius: 9999,
          background: "var(--page-accent)",
          flexShrink: 0,
          opacity: 0.85,
        }}
      />
      <span
        style={{
          fontSize: 14,
          color: "var(--page-text)",
        }}
      >
        {name}
      </span>
    </div>
  );
}

export default function Solution() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mockRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const target = mockRef.current;
      if (!target) return;

      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reduced) {
        gsap.set(target, { clipPath: "inset(0% 0 0 0)" });
        return;
      }

      gsap.fromTo(
        target,
        { clipPath: "inset(100% 0 0 0)" },
        {
          clipPath: "inset(0% 0 0 0)",
          ease: "none",
          scrollTrigger: {
            trigger: target,
            start: "top 85%",
            end: "bottom 60%",
            scrub: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  const cardStyle: React.CSSProperties = {
    background:
      "linear-gradient(135deg, var(--page-surface), #1F1A10)",
    border: "1px solid rgba(212,165,116,0.2)",
    borderRadius: 16,
    padding: 32,
    boxShadow: "0 0 60px rgba(212,165,116,0.1)",
    width: "100%",
  };

  return (
    <section ref={sectionRef} style={{ paddingBlock: 128 }}>
      <div className="container-x">
        <p
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 13,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "var(--page-accent)",
            margin: 0,
            marginBottom: 24,
          }}
        >
          THE SOLUTION
        </p>

        <h2
          style={{
            fontFamily: "var(--font-playfair), serif",
            fontWeight: 400,
            fontSize: "clamp(28px, 4vw, 48px)",
            color: "var(--page-text)",
            lineHeight: 1.15,
            margin: 0,
            maxWidth: 800,
            marginBottom: 64,
          }}
        >
          A skin advisor that answers like she would, every time, instantly.
        </h2>

        <div
          ref={mockRef}
          style={{
            maxWidth: 480,
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: 24,
            willChange: "clip-path",
          }}
        >
          <div style={cardStyle}>
            <h3
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontWeight: 400,
                fontSize: 24,
                color: "var(--page-text)",
                margin: 0,
              }}
            >
              Tell us about your skin
            </h3>

            <FieldLabel>Skin Type</FieldLabel>
            <PillRow pills={SKIN_TYPES} />

            <FieldLabel>Main Concerns</FieldLabel>
            <PillRow pills={CONCERNS} />

            <FieldLabel>Your Age Range</FieldLabel>
            <PillRow pills={AGE_RANGES} />

            <button
              type="button"
              data-cursor="pointer"
              style={{
                marginTop: 28,
                width: "100%",
                paddingBlock: 14,
                paddingInline: 20,
                background: "var(--page-accent)",
                color: "#1A1208",
                border: "none",
                borderRadius: 8,
                fontSize: 15,
                fontWeight: 500,
                fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                letterSpacing: "0.02em",
                cursor: "pointer",
              }}
            >
              Get My Routine
            </button>
          </div>

          <div style={cardStyle}>
            <h3
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontWeight: 400,
                fontSize: 22,
                color: "var(--page-text)",
                margin: 0,
                marginBottom: 16,
              }}
            >
              Your Personalized Routine
            </h3>

            <FieldLabel>Morning</FieldLabel>
            <div style={{ marginTop: 8 }}>
              {MORNING.map((m) => (
                <RoutineRow key={m} name={m} />
              ))}
            </div>

            <FieldLabel>Evening</FieldLabel>
            <div style={{ marginTop: 8 }}>
              {EVENING.map((m) => (
                <RoutineRow key={m} name={m} />
              ))}
            </div>

            <FieldLabel>Diet Tips</FieldLabel>
            <p
              style={{
                fontSize: 14,
                color: "var(--page-text)",
                margin: 0,
                marginTop: 6,
                lineHeight: 1.5,
              }}
            >
              Cooling foods, ghee daily, avoid late dinners.
            </p>

            <FieldLabel>Sleep Recommendation</FieldLabel>
            <p
              style={{
                fontSize: 14,
                color: "var(--page-text)",
                margin: 0,
                marginTop: 6,
                lineHeight: 1.5,
              }}
            >
              In bed by 10:30pm. 7 to 8 hours. No screens after 10pm.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
