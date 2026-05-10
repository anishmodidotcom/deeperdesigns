"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

type Capability = {
  title: string;
  description: string;
  icon: ReactNode;
};

const ICON_PROPS = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "var(--accent)",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const CAPABILITIES: Capability[] = [
  {
    title: "AI-Powered Tools",
    description:
      "Calculators, visualizers, configurators, quizzes. Custom tools that solve specific problems in your business.",
    icon: (
      <svg {...ICON_PROPS} aria-hidden>
        <polyline points="8 7 3 12 8 17" />
        <polyline points="16 7 21 12 16 17" />
      </svg>
    ),
  },
  {
    title: "Websites That Convert",
    description:
      "Not templates. Custom-built sites designed to make your brand look like a million bucks and turn visitors into customers.",
    icon: (
      <svg {...ICON_PROPS} aria-hidden>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18" />
        <path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0 -18" />
      </svg>
    ),
  },
  {
    title: "Dashboards and Portals",
    description:
      "Real-time dashboards, client portals, internal tools. Your data, organized and visual, updated live.",
    icon: (
      <svg {...ICON_PROPS} aria-hidden>
        <line x1="4" y1="20" x2="4" y2="10" />
        <line x1="10" y1="20" x2="10" y2="4" />
        <line x1="16" y1="20" x2="16" y2="14" />
        <line x1="22" y1="20" x2="22" y2="8" />
      </svg>
    ),
  },
  {
    title: "Chatbots and Agents",
    description:
      "WhatsApp bots, sales agents, customer support AI. Handles the conversations so you can focus on the work.",
    icon: (
      <svg {...ICON_PROPS} aria-hidden>
        <path d="M21 12a8 8 0 0 1 -8 8a9 9 0 0 1 -4 -1l-5 1l1 -4a8 8 0 1 1 16 -4z" />
      </svg>
    ),
  },
  {
    title: "E-commerce",
    description:
      "Stores built to sell. Product builders, custom ordering flows, inventory systems. From Shopify to fully custom.",
    icon: (
      <svg {...ICON_PROPS} aria-hidden>
        <path d="M3 7h18l-1.5 12a2 2 0 0 1 -2 2h-11a2 2 0 0 1 -2 -2z" />
        <path d="M8 7a4 4 0 0 1 8 0" />
      </svg>
    ),
  },
  {
    title: "Marketing and Growth",
    description:
      "Content systems, lead magnets, ad management, social media engines. The systems that bring people to your door.",
    icon: (
      <svg {...ICON_PROPS} aria-hidden>
        <path d="M3 11l18 -7v16l-18 -7z" />
        <path d="M7 11v6a2 2 0 0 0 4 0v-2" />
      </svg>
    ),
  },
];

export default function WhatWeBuild() {
  return (
    <section className="section">
      <div className="container-x">
        <p
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 13,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "var(--text-3)",
            margin: 0,
            marginBottom: 32,
          }}
        >
          WHAT WE DO
        </p>

        <h2
          style={{
            fontSize: "clamp(32px, 5vw, 64px)",
            fontWeight: 300,
            letterSpacing: "-0.04em",
            color: "var(--text)",
            lineHeight: 1.05,
            margin: 0,
            maxWidth: 900,
          }}
        >
          Enterprise-grade tools for businesses that could never afford them.
        </h2>

        <p
          style={{
            fontSize: 18,
            color: "var(--text-2)",
            maxWidth: 640,
            marginTop: 24,
            lineHeight: 1.6,
          }}
        >
          Big companies have million-dollar software. Small businesses get
          nothing. We change that. Custom AI tools, sites, and platforms built
          in days, priced for real businesses.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 16,
            marginTop: 64,
          }}
        >
          {CAPABILITIES.map((cap, i) => (
            <motion.div
              key={cap.title}
              data-cursor="pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.7,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                background: "var(--surface-1)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-md)",
                padding: 32,
                transition:
                  "border-color var(--t-base) var(--ease-spring), transform var(--t-base) var(--ease-spring)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
              }}
            >
              {cap.icon}
              <h3
                style={{
                  fontSize: 18,
                  fontWeight: 500,
                  color: "var(--text)",
                  marginTop: 16,
                  marginBottom: 0,
                  letterSpacing: "-0.02em",
                }}
              >
                {cap.title}
              </h3>
              <p
                style={{
                  fontSize: 15,
                  color: "var(--text-2)",
                  marginTop: 8,
                  marginBottom: 0,
                  lineHeight: 1.5,
                }}
              >
                {cap.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
