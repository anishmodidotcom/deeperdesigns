"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

const PORTAL_BG = "#FAFBF8";
const PORTAL_TEXT = "#0E1F0E";
const PORTAL_TEXT_2 = "#5C6E5C";
const PORTAL_ACCENT = "#22A95B";

const monoSmall: React.CSSProperties = {
  fontFamily: "var(--font-geist-mono), monospace",
  fontSize: 10,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
};

const cardShell: React.CSSProperties = {
  background: PORTAL_BG,
  borderRadius: 8,
  padding: 20,
  boxShadow:
    "0 24px 60px -28px rgba(74,222,128,0.32), 0 0 0 1px rgba(74,222,128,0.12)",
  width: "100%",
  maxWidth: 360,
  margin: "0 auto",
};

function ProfileMockup() {
  return (
    <div style={cardShell}>
      <div
        style={{
          display: "flex",
          gap: 14,
          alignItems: "center",
          marginBottom: 14,
          paddingBottom: 14,
          borderBottom: "1px solid rgba(14,31,14,0.08)",
        }}
      >
        <div
          aria-hidden
          style={{
            width: 40,
            height: 40,
            borderRadius: 9999,
            background:
              "linear-gradient(135deg, rgba(74,222,128,0.4), rgba(34,169,91,0.6))",
          }}
        />
        <div>
          <div
            style={{
              fontFamily:
                "var(--font-rajdhani), var(--font-geist-sans), system-ui, sans-serif",
              fontWeight: 700,
              fontSize: 15,
              color: PORTAL_TEXT,
              textTransform: "uppercase",
              letterSpacing: "0.04em",
            }}
          >
            Arjun Malik
          </div>
          <div style={{ ...monoSmall, color: PORTAL_TEXT_2, marginTop: 2 }}>
            All-Rounder · Under-16
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 18, marginBottom: 14 }}>
        {["Overview", "Stats", "Matches", "Media"].map((t, i) => (
          <span
            key={t}
            style={{
              ...monoSmall,
              fontSize: 11,
              color: i === 1 ? PORTAL_ACCENT : PORTAL_TEXT_2,
              borderBottom: i === 1 ? `2px solid ${PORTAL_ACCENT}` : "none",
              paddingBottom: 6,
            }}
          >
            {t}
          </span>
        ))}
      </div>

      <div style={{ ...monoSmall, color: PORTAL_TEXT_2, marginBottom: 6 }}>
        Batting Average · Last 6 Months
      </div>
      <svg
        width="100%"
        height="80"
        viewBox="0 0 320 80"
        preserveAspectRatio="none"
        aria-hidden
      >
        <line x1="0" y1="60" x2="320" y2="60" stroke="rgba(14,31,14,0.08)" strokeWidth="1" />
        <line x1="0" y1="40" x2="320" y2="40" stroke="rgba(14,31,14,0.08)" strokeWidth="1" />
        <line x1="0" y1="20" x2="320" y2="20" stroke="rgba(14,31,14,0.08)" strokeWidth="1" />
        <polyline
          points="0,62 53,55 106,48 159,42 212,30 265,22 320,12"
          fill="none"
          stroke={PORTAL_ACCENT}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {[0, 53, 106, 159, 212, 265, 320].map((x, i) => {
          const ys = [62, 55, 48, 42, 30, 22, 12];
          return (
            <circle
              key={i}
              cx={x}
              cy={ys[i]}
              r="2.5"
              fill={PORTAL_ACCENT}
            />
          );
        })}
      </svg>
      <div
        style={{
          ...monoSmall,
          color: PORTAL_ACCENT,
          marginTop: 10,
        }}
      >
        +34% improvement
      </div>
    </div>
  );
}

function LeaderboardMockup() {
  const rows = [
    { rank: "#1", name: "Arjun M.", score: "847 runs", color: "#FCD34D", w: "100%" },
    { rank: "#2", name: "Rohan K.", score: "723 runs", color: "#C0C0C0", w: "82%" },
    { rank: "#3", name: "Priya S.", score: "698 runs", color: "#CD7F32", w: "78%" },
    { rank: "#4", name: "Vikram T.", score: "612 runs", color: "rgba(14,31,14,0.18)", w: "68%" },
  ];
  return (
    <div style={cardShell}>
      <div
        style={{
          ...monoSmall,
          color: PORTAL_TEXT_2,
          marginBottom: 12,
        }}
      >
        Top Run Scorers · 2025 Season
      </div>
      {rows.map((r) => (
        <div key={r.rank} style={{ marginBottom: 12 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 6,
            }}
          >
            <div
              aria-hidden
              style={{
                width: 28,
                height: 28,
                borderRadius: 9999,
                background: "rgba(14,31,14,0.06)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily:
                  "var(--font-rajdhani), var(--font-geist-sans), system-ui, sans-serif",
                fontWeight: 700,
                fontSize: 12,
                color: PORTAL_TEXT_2,
              }}
            >
              {r.rank}
            </div>
            <div
              style={{
                flex: 1,
                fontSize: 13,
                color: PORTAL_TEXT,
                fontFamily:
                  "var(--font-rajdhani), var(--font-geist-sans), system-ui, sans-serif",
                fontWeight: 500,
              }}
            >
              {r.name}
            </div>
            <div
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: 11,
                color: PORTAL_TEXT_2,
              }}
            >
              {r.score}
            </div>
          </div>
          <div
            style={{
              height: 6,
              borderRadius: 9999,
              background: "rgba(14,31,14,0.06)",
              overflow: "hidden",
            }}
          >
            <div
              style={{ width: r.w, height: "100%", background: r.color }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function ReportMockup() {
  const skills = [
    { name: "Batting", score: 8, max: 10 },
    { name: "Bowling", score: 6, max: 10 },
    { name: "Fielding", score: 9, max: 10 },
    { name: "Fitness", score: 7, max: 10 },
  ];
  return (
    <div style={cardShell}>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          marginBottom: 14,
        }}
      >
        <span
          style={{
            fontFamily:
              "var(--font-rajdhani), var(--font-geist-sans), system-ui, sans-serif",
            fontWeight: 700,
            fontSize: 16,
            textTransform: "uppercase",
            letterSpacing: "0.02em",
            color: PORTAL_TEXT,
          }}
        >
          Monthly Report
        </span>
        <span style={{ ...monoSmall, color: PORTAL_TEXT_2 }}>April 2025</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {skills.map((s) => (
          <div key={s.name}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 12,
                color: PORTAL_TEXT,
                marginBottom: 4,
                fontFamily:
                  "var(--font-rajdhani), var(--font-geist-sans), system-ui, sans-serif",
                fontWeight: 500,
              }}
            >
              <span>{s.name}</span>
              <span
                style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                  color: PORTAL_TEXT_2,
                }}
              >
                {s.score}/{s.max}
              </span>
            </div>
            <div
              style={{
                height: 6,
                borderRadius: 9999,
                background: "rgba(14,31,14,0.08)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${(s.score / s.max) * 100}%`,
                  height: "100%",
                  background: PORTAL_ACCENT,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <p
        style={{
          fontSize: 12,
          color: PORTAL_TEXT_2,
          marginTop: 14,
          margin: 0,
          marginBlockStart: 14,
          lineHeight: 1.55,
          fontStyle: "italic",
        }}
      >
        Arjun has shown excellent improvement in his cover drive. Needs more
        work on yorker-length bowling.
      </p>
    </div>
  );
}

function BracketMockup() {
  const team = (label: string): React.CSSProperties => ({
    background: "rgba(14,31,14,0.05)",
    border: "1px solid rgba(14,31,14,0.08)",
    borderRadius: 6,
    padding: "8px 12px",
    fontFamily:
      "var(--font-rajdhani), var(--font-geist-sans), system-ui, sans-serif",
    fontWeight: 600,
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: "0.04em",
    color: PORTAL_TEXT,
  });
  return (
    <div style={cardShell}>
      <div
        style={{
          ...monoSmall,
          color: PORTAL_TEXT_2,
          marginBottom: 4,
        }}
      >
        Inter-Academy Cup
      </div>
      <div
        style={{
          fontFamily:
            "var(--font-rajdhani), var(--font-geist-sans), system-ui, sans-serif",
          fontWeight: 700,
          fontSize: 16,
          textTransform: "uppercase",
          color: PORTAL_TEXT,
          marginBottom: 18,
        }}
      >
        June 2025
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          gap: 16,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={team("a")}>Tigers</div>
          <div style={team("b")}>Lions</div>
          <div style={team("a")}>Eagles</div>
          <div style={team("b")}>Hawks</div>
        </div>

        <svg width="40" height="120" viewBox="0 0 40 120" aria-hidden>
          <line x1="0" y1="14" x2="20" y2="14" stroke="rgba(14,31,14,0.25)" strokeWidth="1" />
          <line x1="0" y1="42" x2="20" y2="42" stroke="rgba(14,31,14,0.25)" strokeWidth="1" />
          <line x1="20" y1="14" x2="20" y2="42" stroke="rgba(14,31,14,0.25)" strokeWidth="1" />
          <line x1="20" y1="28" x2="40" y2="28" stroke="rgba(14,31,14,0.25)" strokeWidth="1" />
          <line x1="0" y1="78" x2="20" y2="78" stroke="rgba(14,31,14,0.25)" strokeWidth="1" />
          <line x1="0" y1="106" x2="20" y2="106" stroke="rgba(14,31,14,0.25)" strokeWidth="1" />
          <line x1="20" y1="78" x2="20" y2="106" stroke="rgba(14,31,14,0.25)" strokeWidth="1" />
          <line x1="20" y1="92" x2="40" y2="92" stroke="rgba(14,31,14,0.25)" strokeWidth="1" />
          <line x1="40" y1="28" x2="40" y2="92" stroke="rgba(14,31,14,0.25)" strokeWidth="1" />
        </svg>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 6,
          }}
        >
          <div
            style={{
              ...team("final"),
              borderColor: "rgba(252,211,77,0.5)",
              background: "rgba(252,211,77,0.12)",
              color: PORTAL_TEXT,
            }}
          >
            Final
          </div>
          <div style={{ ...monoSmall, color: PORTAL_TEXT_2 }}>22 June</div>
        </div>
      </div>
    </div>
  );
}

type Feature = {
  title: string;
  description: string;
  visual: ReactNode;
};

const FEATURES: Feature[] = [
  {
    title: "Full player profiles with lifetime records",
    description:
      "Every match, every innings, every wicket recorded. Season averages, personal bests, improvement graphs. The player's entire cricket journey in one place.",
    visual: <ProfileMockup />,
  },
  {
    title: "Leaderboards and hall of fame",
    description:
      "Top run scorers. Best bowlers. Most improved. Season MVPs. A competitive leaderboard that makes kids push harder every practice session.",
    visual: <LeaderboardMockup />,
  },
  {
    title: "Session reports from coaches",
    description:
      "After each session or monthly, coaches submit a quick report. Batting technique, bowling action, fitness, attitude. Parents see the progress. No more guessing.",
    visual: <ReportMockup />,
  },
  {
    title: "Matches, tournaments, registrations",
    description:
      "Upcoming fixtures, team sheets, live scoring, results. Parents register for tournaments directly. No phone calls, no paper forms.",
    visual: <BracketMockup />,
  },
];

export default function Features() {
  return (
    <section style={{ paddingBlock: 128 }}>
      <div className="container-x">
        <p
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 13,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            color: "var(--page-accent)",
            margin: 0,
            marginBottom: 64,
          }}
        >
          THE PLATFORM
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 96 }}>
          {FEATURES.map((f, i) => {
            const reversed = i % 2 === 1;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="sv-feature"
                style={{ alignItems: "center" }}
              >
                <div
                  className="sv-feature-text"
                  style={{ order: reversed ? 2 : 1 }}
                >
                  <p
                    style={{
                      fontFamily:
                        "var(--font-geist-mono), monospace",
                      fontSize: 11,
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      color: "var(--page-accent)",
                      margin: 0,
                      marginBottom: 14,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")} / 04
                  </p>
                  <h3
                    style={{
                      fontFamily:
                        "var(--font-rajdhani), var(--font-geist-sans), system-ui, sans-serif",
                      fontWeight: 600,
                      fontSize: 22,
                      textTransform: "uppercase",
                      color: "var(--page-text)",
                      lineHeight: 1.2,
                      letterSpacing: "-0.005em",
                      margin: 0,
                      marginBottom: 14,
                    }}
                  >
                    {f.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 15,
                      color: "var(--page-text-2)",
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {f.description}
                  </p>
                </div>
                <div
                  className="sv-feature-visual"
                  style={{ order: reversed ? 1 : 2 }}
                >
                  {f.visual}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .sv-feature {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
        }
        @media (min-width: 900px) {
          .sv-feature {
            grid-template-columns: 1fr 1fr;
            gap: 80px;
          }
        }
      `}</style>
    </section>
  );
}
