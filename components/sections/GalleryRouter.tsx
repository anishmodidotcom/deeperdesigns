"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "next-view-transitions";
import {
  INDUSTRIES,
  OBJECTIVES,
  SHOWCASES,
  filterShowcases,
  type Industry,
  type Objective,
} from "@/lib/showcases";
import { FORM_HREF } from "@/lib/contact";

const EASE = [0.16, 1, 0.3, 1] as const;

const OBJECTIVE_HINTS: Record<Objective, string> = {
  "Customer Experience": "repetitive inquiries, onboarding, booking, support",
  Operations: "team workflows, dashboards, reporting, inventory",
  Growth: "lead gen, conversion, retention, sales enablement",
  "Founder Overload": "scattered tools, manual decisions, time leaks",
};

function syncParams(industries: Industry[], objectives: Objective[]) {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  if (industries.length > 0)
    url.searchParams.set("industry", industries.join("|"));
  else url.searchParams.delete("industry");
  if (objectives.length > 0)
    url.searchParams.set("objective", objectives.join("|"));
  else url.searchParams.delete("objective");
  window.history.replaceState({}, "", url.toString());
}

function readParams(): {
  industries: Industry[];
  objectives: Objective[];
} {
  if (typeof window === "undefined") return { industries: [], objectives: [] };
  const params = new URLSearchParams(window.location.search);
  const i = params.get("industry");
  const o = params.get("objective");
  const industries = (i ? i.split("|") : []) as Industry[];
  const objectives = (o ? o.split("|") : []) as Objective[];
  return {
    industries: industries.filter((x) => INDUSTRIES.includes(x)),
    objectives: objectives.filter((x) => OBJECTIVES.includes(x)),
  };
}

export default function GalleryRouter() {
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [objectives, setObjectives] = useState<Objective[]>([]);

  useEffect(() => {
    const initial = readParams();
    setIndustries(initial.industries);
    setObjectives(initial.objectives);
  }, []);

  useEffect(() => {
    syncParams(industries, objectives);
  }, [industries, objectives]);

  const toggleIndustry = useCallback((value: Industry) => {
    setIndustries((curr) =>
      curr.includes(value) ? curr.filter((v) => v !== value) : [...curr, value]
    );
  }, []);

  const toggleObjective = useCallback((value: Objective) => {
    setObjectives((curr) =>
      curr.includes(value) ? curr.filter((v) => v !== value) : [...curr, value]
    );
  }, []);

  function clear() {
    setIndustries([]);
    setObjectives([]);
  }

  const results = useMemo(
    () => filterShowcases(industries, objectives),
    [industries, objectives]
  );

  const hasFilters = industries.length > 0 || objectives.length > 0;
  const liveResults = results.filter((s) => s.live);
  const hasLive = liveResults.length > 0;
  const studies = results;
  const filterLabel = hasFilters
    ? `${results.length} ${results.length === 1 ? "study" : "studies"}${
        industries.length > 0 ? ` in ${industries.join(", ")}` : ""
      }${
        objectives.length > 0 ? ` for ${objectives.join(", ")}` : ""
      }.`
    : `${SHOWCASES.length} possibility studies in the gallery.`;

  const prefilled = `${FORM_HREF}?industry=${encodeURIComponent(
    industries.join("|")
  )}&objective=${encodeURIComponent(objectives.join("|"))}`;

  return (
    <section
      style={{
        paddingBlock: 160,
        position: "relative",
      }}
      id="gallery"
    >
      <div className="container-x">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: EASE }}
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 13,
            textTransform: "uppercase",
            letterSpacing: "0.16em",
            color: "var(--accent)",
            margin: 0,
            marginBottom: 24,
          }}
        >
          02 · POSSIBILITY GALLERY
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          style={{
            fontSize: "clamp(36px, 6vw, 80px)",
            fontWeight: 300,
            letterSpacing: "-0.04em",
            color: "var(--text)",
            lineHeight: 1.02,
            margin: 0,
            marginBottom: 24,
            maxWidth: 1000,
          }}
        >
          What is slowing your business down?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.18, ease: EASE }}
          style={{
            fontSize: "clamp(17px, 2vw, 20px)",
            color: "var(--text-2)",
            lineHeight: 1.55,
            margin: 0,
            marginBottom: 56,
            maxWidth: 720,
          }}
        >
          Pick a lane. We will show you what we have already imagined for
          businesses like yours. Or scroll past and see everything.
        </motion.p>

        <FilterRow
          label="BY OBJECTIVE"
          options={[...OBJECTIVES]}
          selected={objectives}
          onToggle={(v) => toggleObjective(v as Objective)}
          hints={OBJECTIVE_HINTS as Record<string, string>}
        />

        <div style={{ height: 20 }} />

        <FilterRow
          label="BY INDUSTRY"
          options={[...INDUSTRIES]}
          selected={industries}
          onToggle={(v) => toggleIndustry(v as Industry)}
        />

        <div
          style={{
            marginTop: 36,
            display: "flex",
            flexWrap: "wrap",
            gap: 16,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: 12,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--text-2)",
              margin: 0,
            }}
          >
            {filterLabel}
          </p>
          {hasFilters ? (
            <button
              type="button"
              onClick={clear}
              data-cursor="pointer"
              style={{
                background: "transparent",
                border: "none",
                color: "var(--text-3)",
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: 12,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                cursor: "pointer",
                padding: 0,
                textDecoration: "underline",
                textUnderlineOffset: 4,
              }}
            >
              Clear filters
            </button>
          ) : null}
        </div>

        {studies.length === 0 ? (
          <EmptyState prefilled={prefilled} />
        ) : (
          <div
            style={{
              marginTop: 36,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: 16,
            }}
          >
            <AnimatePresence mode="popLayout">
              {studies.map((s, i) => (
                <motion.div
                  key={s.slug}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{
                    duration: 0.5,
                    delay: (i % 6) * 0.04,
                    ease: EASE,
                  }}
                >
                  <Link
                    href={`/work/${s.slug}`}
                    data-cursor="view"
                    className="portfolio-card"
                    style={{
                      display: "block",
                      position: "relative",
                      aspectRatio: "4 / 3",
                      background: s.bg,
                      borderRadius: "var(--radius-md)",
                      overflow: "hidden",
                      color: "#ffffff",
                    }}
                  >
                    <Image
                      src={s.image}
                      alt={`${s.industryLabel} · ${s.toolKind} thumbnail`}
                      fill
                      sizes="(min-width: 1200px) 300px, (min-width: 768px) 33vw, 90vw"
                      style={{
                        objectFit: "cover",
                        transition:
                          "transform 0.6s var(--ease-spring), opacity 0.4s var(--ease-spring)",
                      }}
                      className="portfolio-img"
                    />
                    <div
                      aria-hidden
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: `linear-gradient(180deg, ${s.bg}55 0%, ${s.bg}cc 60%, ${s.bg}f5 100%)`,
                        pointerEvents: "none",
                      }}
                    />
                    {s.live ? (
                      <span
                        className="dd-live-badge"
                        style={{
                          position: "absolute",
                          top: 14,
                          right: 14,
                          background: "var(--accent)",
                          color: "#FFFFFF",
                          fontFamily: "var(--font-geist-mono), monospace",
                          fontSize: 10,
                          letterSpacing: "0.18em",
                          paddingInline: 8,
                          paddingBlock: 4,
                          borderRadius: 4,
                          fontWeight: 600,
                          zIndex: 2,
                          animation:
                            "dd-live-pulse 2.2s ease-in-out infinite",
                        }}
                      >
                        LIVE
                      </span>
                    ) : null}
                    <div
                      className="portfolio-inner"
                      style={{
                        position: "relative",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-end",
                        padding: 24,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-geist-mono), monospace",
                          fontSize: 11,
                          textTransform: "uppercase",
                          letterSpacing: "0.16em",
                          opacity: 0.65,
                          marginBottom: 10,
                        }}
                      >
                        {s.number}
                        {s.live ? " · LIVE" : ""}
                      </span>
                      <span
                        style={{
                          fontSize: 18,
                          fontWeight: 500,
                          letterSpacing: "-0.01em",
                          lineHeight: 1.25,
                        }}
                      >
                        {s.cardLabel}
                      </span>
                      <span
                        style={{
                          fontSize: 13,
                          opacity: 0.75,
                          marginTop: 4,
                          fontStyle: "italic",
                          lineHeight: 1.5,
                        }}
                      >
                        {s.cardDescription}
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {hasLive && studies.length > 0 ? (
          <p
            style={{
              marginTop: 24,
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--text-3)",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: 6,
                height: 6,
                borderRadius: 9999,
                background: "var(--accent)",
                marginRight: 8,
                verticalAlign: "middle",
              }}
            />
            Live product. You can use it today.
          </p>
        ) : null}
      </div>

      <style jsx>{`
        :global(.portfolio-card:hover .portfolio-img) {
          transform: scale(1.06);
          opacity: 0.9;
        }
        @keyframes dd-live-pulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(94, 106, 210, 0.6);
          }
          50% {
            box-shadow: 0 0 0 8px rgba(94, 106, 210, 0);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          :global(.dd-live-badge) {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}

function FilterRow({
  label,
  options,
  selected,
  onToggle,
  hints,
}: {
  label: string;
  options: string[];
  selected: string[];
  onToggle: (v: string) => void;
  hints?: Record<string, string>;
}) {
  return (
    <div>
      <p
        style={{
          fontFamily: "var(--font-geist-mono), monospace",
          fontSize: 11,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--text-3)",
          margin: 0,
          marginBottom: 12,
        }}
      >
        {label}
      </p>
      <div
        className="dd-filter-scroll"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
        }}
      >
        {options.map((opt) => {
          const active = selected.includes(opt);
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onToggle(opt)}
              data-cursor="pointer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                paddingInline: 12,
                paddingBlock: 7,
                background: active ? "var(--accent)" : "transparent",
                color: active ? "#FFFFFF" : "var(--text-2)",
                border: `1px solid ${
                  active ? "var(--accent)" : "var(--border-2)"
                }`,
                borderRadius: 9999,
                fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                fontSize: 12,
                fontWeight: 500,
                cursor: "pointer",
                transition:
                  "background 0.18s var(--ease-spring), color 0.18s var(--ease-spring), border-color 0.18s var(--ease-spring)",
                whiteSpace: "nowrap",
              }}
              title={hints ? hints[opt] : undefined}
            >
              {opt}
            </button>
          );
        })}
      </div>
      <style jsx>{`
        @media (max-width: 900px) {
          :global(.dd-filter-scroll) {
            flex-wrap: nowrap !important;
            overflow-x: auto;
            padding-bottom: 6px;
            scroll-snap-type: x proximity;
            scrollbar-width: none;
            -webkit-overflow-scrolling: touch;
            margin-inline: -24px;
            padding-inline: 24px;
          }
          :global(.dd-filter-scroll::-webkit-scrollbar) {
            display: none;
          }
          :global(.dd-filter-scroll button) {
            scroll-snap-align: start;
          }
        }
      `}</style>
    </div>
  );
}

function EmptyState({ prefilled }: { prefilled: string }) {
  return (
    <div
      style={{
        marginTop: 48,
        padding: "clamp(40px, 6vw, 72px)",
        border: "1px dashed var(--border-2)",
        borderRadius: 12,
        textAlign: "center",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-geist-mono), monospace",
          fontSize: 12,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--accent)",
          margin: 0,
          marginBottom: 16,
        }}
      >
        Nothing in the gallery for this combination
      </p>
      <h3
        style={{
          fontSize: "clamp(24px, 3vw, 36px)",
          fontWeight: 300,
          letterSpacing: "-0.02em",
          color: "var(--text)",
          margin: 0,
          marginBottom: 16,
          lineHeight: 1.2,
        }}
      >
        We have not imagined this one yet. Tell us about it.
      </h3>
      <p
        style={{
          fontSize: 16,
          color: "var(--text-2)",
          lineHeight: 1.6,
          margin: 0,
          marginBottom: 28,
          maxWidth: 520,
          marginInline: "auto",
        }}
      >
        Yours might be the first. Walk us through the bottleneck and we will
        sketch a study in days, not weeks.
      </p>
      <Link
        href={prefilled}
        data-cursor="pointer"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          paddingInline: 24,
          paddingBlock: 14,
          background: "var(--accent)",
          color: "#FFFFFF",
          borderRadius: 9999,
          fontSize: 14,
          fontWeight: 600,
          fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
          textDecoration: "none",
        }}
      >
        Let&apos;s explore possibilities
        <span aria-hidden>→</span>
      </Link>
    </div>
  );
}
