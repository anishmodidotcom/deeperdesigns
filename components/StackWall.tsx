"use client";

import Image from "next/image";
import { motion } from "motion/react";

type Logo = { name: string; file: string };

const GROUPS: { label: string; logos: Logo[] }[] = [
  {
    label: "AI + MODELS",
    logos: [
      { name: "Claude", file: "/logos/anthropic.svg" },
      { name: "ChatGPT", file: "/logos/openai.svg" },
      { name: "Gemini", file: "/logos/googlegemini.svg" },
      { name: "Perplexity", file: "/logos/perplexity.svg" },
    ],
  },
  {
    label: "BUILD + CODE",
    logos: [
      { name: "Next.js", file: "/logos/nextdotjs.svg" },
      { name: "React", file: "/logos/react.svg" },
      { name: "Vercel", file: "/logos/vercel.svg" },
      { name: "GitHub", file: "/logos/github.svg" },
      { name: "Cursor", file: "/logos/cursor.svg" },
      { name: "Claude Code", file: "/logos/claude.svg" },
    ],
  },
  {
    label: "BACKEND + DATA",
    logos: [
      { name: "Supabase", file: "/logos/supabase.svg" },
      { name: "PostgreSQL", file: "/logos/postgresql.svg" },
      { name: "Resend", file: "/logos/resend.svg" },
      { name: "Cloudflare", file: "/logos/cloudflare.svg" },
    ],
  },
  {
    label: "AUTOMATION",
    logos: [
      { name: "n8n", file: "/logos/n8n.svg" },
      { name: "Zapier", file: "/logos/zapier.svg" },
      { name: "Make", file: "/logos/make.svg" },
    ],
  },
  {
    label: "DESIGN",
    logos: [
      { name: "Figma", file: "/logos/figma.svg" },
      { name: "Framer", file: "/logos/framer.svg" },
    ],
  },
  {
    label: "OPS + ANALYTICS",
    logos: [
      { name: "PostHog", file: "/logos/posthog.svg" },
      { name: "Notion", file: "/logos/notion.svg" },
      { name: "Linear", file: "/logos/linear.svg" },
      { name: "Google Analytics", file: "/logos/googleanalytics.svg" },
    ],
  },
  {
    label: "DISTRIBUTION",
    logos: [
      { name: "WhatsApp", file: "/logos/whatsapp.svg" },
      { name: "Meta Ads", file: "/logos/meta.svg" },
      { name: "Google Ads", file: "/logos/googleads.svg" },
      { name: "LinkedIn", file: "/logos/linkedin.svg" },
    ],
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export default function StackWall() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 40,
      }}
    >
      {GROUPS.map((group, gi) => (
        <motion.div
          key={group.label}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: gi * 0.05, ease: EASE }}
        >
          <p
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: 10,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--accent)",
              margin: 0,
              marginBottom: 18,
            }}
          >
            {group.label}
          </p>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
              gap: 14,
            }}
          >
            {group.logos.map((logo) => (
              <li
                key={logo.name}
                className="dd-stack-tile"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  paddingInline: 14,
                  paddingBlock: 12,
                  border: "1px solid var(--border)",
                  borderRadius: 10,
                  background: "var(--surface-1)",
                  transition: "border-color 0.2s var(--ease-spring), transform 0.2s var(--ease-spring)",
                }}
              >
                <span
                  className="dd-stack-logo"
                  style={{
                    width: 22,
                    height: 22,
                    position: "relative",
                    flexShrink: 0,
                    filter: "grayscale(1) brightness(1.6)",
                    opacity: 0.7,
                    transition:
                      "filter 0.2s var(--ease-spring), opacity 0.2s var(--ease-spring)",
                  }}
                >
                  <Image
                    src={logo.file}
                    alt=""
                    fill
                    sizes="22px"
                    style={{ objectFit: "contain" }}
                  />
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                    fontSize: 13,
                    color: "var(--text)",
                    letterSpacing: "-0.005em",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {logo.name}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
      <style jsx global>{`
        .dd-stack-tile:hover {
          border-color: var(--accent) !important;
          transform: translateY(-2px);
        }
        .dd-stack-tile:hover .dd-stack-logo {
          filter: none !important;
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
}
