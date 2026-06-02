"use client";

import Image from "next/image";
import { motion } from "motion/react";

const EASE = [0.4, 0, 0.6, 1] as const;

const SHAPES = ["Cup", "Bowl", "Vase", "Planter"];
const SIZES = ["S", "M", "L"];
const PATTERNS = ["01", "02", "03", "04", "05", "06"];
const GLAZES: { name: string; color: string }[] = [
  { name: "Terracotta", color: "#B85530" },
  { name: "Saffron", color: "#E8A93C" },
  { name: "Jade", color: "#5C7A5C" },
  { name: "Indigo", color: "#3C4A6B" },
  { name: "Raw Clay", color: "#C9A47A" },
];

export default function Builder() {
  return (
    <section style={{ paddingBlock: 144, position: "relative" }}>
      <div
        className="container-x"
        style={{ maxWidth: 1280, marginInline: "auto" }}
      >
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{
            fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
            fontWeight: 500,
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.22em",
            color: "var(--page-border)",
            margin: 0,
            marginBottom: 28,
          }}
        >
          THE BUILDER
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE }}
          style={{
            fontFamily:
              "var(--font-display-script), 'DM Serif Display', Georgia, serif",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(34px, 5vw, 56px)",
            letterSpacing: "-0.01em",
            lineHeight: 1.1,
            color: "var(--page-text)",
            margin: 0,
            marginBottom: 64,
            maxWidth: 920,
          }}
        >
          Pick a shape. Pick a pattern. Pick your colors. Wait twelve weeks.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.9, ease: EASE }}
          style={{
            position: "relative",
            borderRadius: 12,
            overflow: "hidden",
            border: "1px solid var(--page-border)",
            boxShadow: "0 40px 100px -40px rgba(43,28,14,0.25)",
          }}
        >
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.55,
              pointerEvents: "none",
            }}
          >
            <Image
              src="/images/earth-and-fire/pottery-builder-bg.webp"
              alt=""
              role="presentation"
              fill
              sizes="100vw"
              style={{ objectFit: "cover" }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, rgba(245,239,227,0.7) 0%, rgba(245,239,227,0.92) 100%)",
              }}
            />
          </div>

          <div
            className="ef-builder-grid"
            style={{
              position: "relative",
              zIndex: 1,
              padding: 32,
            }}
          >
            <div
              style={{
                position: "relative",
                background: "var(--page-surface-1)",
                border: "1px solid var(--page-border)",
                borderRadius: 8,
                padding: 32,
                display: "flex",
                flexDirection: "column",
                gap: 14,
                minHeight: 480,
              }}
            >
              <div
                style={{
                  position: "relative",
                  flex: 1,
                  width: "100%",
                  borderRadius: 8,
                  overflow: "hidden",
                }}
              >
                <Image
                  src="/images/earth-and-fire/clay-detail.webp"
                  alt="A handmade terracotta cup with a hand-painted floral pattern"
                  fill
                  sizes="(min-width: 1024px) 60vw, 90vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <p
                style={{
                  fontFamily:
                    "var(--font-geist-sans), system-ui, sans-serif",
                  fontSize: 13,
                  color: "var(--page-text-2)",
                  margin: 0,
                  fontStyle: "italic",
                }}
              >
                Cup · medium · pattern 03 · saffron and jade glaze
              </p>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 24,
              }}
            >
              <FieldGroup label="01 · SHAPE">
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {SHAPES.map((s, i) => (
                    <Pill key={s} active={i === 0}>
                      {s}
                    </Pill>
                  ))}
                </div>
              </FieldGroup>

              <FieldGroup label="02 · SIZE">
                <div style={{ display: "flex", gap: 8 }}>
                  {SIZES.map((s, i) => (
                    <Pill key={s} active={i === 1}>
                      {s}
                    </Pill>
                  ))}
                </div>
              </FieldGroup>

              <FieldGroup label="03 · PATTERN">
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: 8,
                  }}
                >
                  {PATTERNS.map((p, i) => (
                    <div
                      key={p}
                      style={{
                        aspectRatio: "1 / 1",
                        background: "var(--page-surface-2)",
                        border: i === 2
                          ? "1.5px solid var(--page-accent)"
                          : "1px solid var(--page-border)",
                        borderRadius: 6,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                        fontSize: 11,
                        color: "var(--page-text-2)",
                        letterSpacing: "0.08em",
                      }}
                    >
                      {p}
                    </div>
                  ))}
                </div>
              </FieldGroup>

              <FieldGroup label="04 · GLAZE">
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {GLAZES.map((g, i) => (
                    <div
                      key={g.name}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      <span
                        aria-hidden
                        style={{
                          width: 32,
                          height: 32,
                          background: g.color,
                          borderRadius: "50%",
                          border:
                            i === 1 || i === 2
                              ? "2px solid var(--page-text)"
                              : "1px solid var(--page-border)",
                          boxShadow:
                            i === 1 || i === 2
                              ? `0 0 0 3px var(--page-surface-1) inset`
                              : "none",
                        }}
                      />
                      <span
                        style={{
                          fontFamily:
                            "var(--font-geist-sans), system-ui, sans-serif",
                          fontSize: 9,
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                          color: "var(--page-text-3)",
                        }}
                      >
                        {g.name}
                      </span>
                    </div>
                  ))}
                </div>
              </FieldGroup>

              <button
                type="button"
                data-cursor="pointer"
                style={{
                  marginTop: "auto",
                  background: "var(--page-accent)",
                  color: "var(--page-surface-1)",
                  border: "none",
                  borderRadius: 8,
                  paddingBlock: 16,
                  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                  fontWeight: 600,
                  fontSize: 14,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                }}
              >
                Reserve this piece · Rs. 4,800
              </button>
            </div>
          </div>
        </motion.div>

        <p
          style={{
            fontFamily:
              "var(--font-display-script), 'DM Serif Display', Georgia, serif",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: 22,
            color: "var(--page-text-2)",
            textAlign: "center",
            margin: 0,
            marginTop: 36,
          }}
        >
          Eight hundred customizable combinations. One pair of hands.
        </p>
      </div>

      <style jsx>{`
        .ef-builder-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }
        @media (min-width: 900px) {
          .ef-builder-grid {
            grid-template-columns: 60fr 40fr;
            gap: 32px;
          }
        }
      `}</style>
    </section>
  );
}

function FieldGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p
        style={{
          fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
          fontSize: 10,
          fontWeight: 500,
          textTransform: "uppercase",
          letterSpacing: "0.16em",
          color: "var(--page-text-3)",
          margin: 0,
          marginBottom: 10,
        }}
      >
        {label}
      </p>
      {children}
    </div>
  );
}

function Pill({
  active,
  children,
}: {
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        paddingInline: 14,
        paddingBlock: 8,
        borderRadius: 9999,
        border: active
          ? "1.5px solid var(--page-accent)"
          : "1px solid var(--page-border)",
        color: active ? "var(--page-accent)" : "var(--page-text)",
        background: active ? "rgba(184,85,48,0.06)" : "transparent",
        fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
        fontSize: 13,
        fontWeight: active ? 600 : 500,
      }}
    >
      {children}
    </span>
  );
}
