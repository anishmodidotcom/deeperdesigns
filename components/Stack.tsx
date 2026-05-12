"use client";

import { motion } from "motion/react";

type Group = {
  label: string;
  tools: string[];
};

const GROUPS: Group[] = [
  {
    label: "LANGUAGE MODELS",
    tools: ["Claude", "ChatGPT", "Gemini", "Claude Sonnet 4.6", "Claude Opus"],
  },
  {
    label: "IMAGE & VIDEO",
    tools: ["Nano Banana", "Veo 3", "Kling", "Google AI Studio", "Sharp"],
  },
  {
    label: "DEV TOOLS",
    tools: ["Cursor", "Claude Code", "GitHub", "Vercel"],
  },
  {
    label: "INFRASTRUCTURE",
    tools: ["Supabase", "Resend", "Lenis", "GSAP", "Motion"],
  },
  {
    label: "AND",
    tools: ["The next ten that drop next month"],
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;

type Props = {
  background?: string;
  border?: string;
  text?: string;
  textDim?: string;
  accent?: string;
};

export default function Stack({
  background,
  border,
  text,
  textDim,
  accent,
}: Props = {}) {
  const styles = {
    bg: background ?? "var(--surface-1)",
    border: border ?? "var(--border)",
    text: text ?? "var(--text)",
    textDim: textDim ?? "var(--text-3)",
    accent: accent ?? "var(--accent)",
  };

  return (
    <div
      style={{
        background: styles.bg,
        border: `1px solid ${styles.border}`,
        borderRadius: 12,
        padding: "clamp(28px, 4vw, 48px)",
        display: "flex",
        flexDirection: "column",
        gap: 36,
      }}
    >
      {GROUPS.map((group, i) => (
        <motion.div
          key={group.label}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: i * 0.06, ease: EASE }}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 12,
          }}
          className="dd-stack-row"
        >
          <p
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: styles.accent,
              margin: 0,
              lineHeight: 1,
            }}
          >
            {group.label}
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px 18px",
              color: styles.text,
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: 14,
            }}
          >
            {group.tools.map((tool, j) => (
              <span key={tool} style={{ display: "inline-flex", gap: 18 }}>
                {tool}
                {j < group.tools.length - 1 ? (
                  <span aria-hidden style={{ color: styles.textDim }}>
                    ·
                  </span>
                ) : null}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
      <style jsx>{`
        @media (min-width: 720px) {
          :global(.dd-stack-row) {
            grid-template-columns: 180px 1fr !important;
            align-items: baseline !important;
            gap: 24px !important;
          }
        }
      `}</style>
    </div>
  );
}
