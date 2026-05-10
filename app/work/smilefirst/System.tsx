"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

const ICON_PROPS = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "var(--page-accent)",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const UserIcon = (
  <svg {...ICON_PROPS} aria-hidden>
    <circle cx="12" cy="8" r="4" />
    <path d="M5 21a7 7 0 0 1 14 0" />
  </svg>
);

const BellIcon = (
  <svg {...ICON_PROPS} aria-hidden>
    <path d="M6 9a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3 -2 3 -9" />
    <path d="M10.3 21a2 2 0 0 0 3.4 0" />
  </svg>
);

const CalIcon = (
  <svg {...ICON_PROPS} aria-hidden>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <line x1="3" y1="10" x2="21" y2="10" />
    <line x1="8" y1="3" x2="8" y2="7" />
    <line x1="16" y1="3" x2="16" y2="7" />
  </svg>
);

const TrendIcon = (
  <svg {...ICON_PROPS} aria-hidden>
    <polyline points="3 17 9 11 13 15 21 7" />
    <polyline points="14 7 21 7 21 14" />
  </svg>
);

const monoStyle: React.CSSProperties = {
  fontFamily: "var(--font-geist-mono), monospace",
  fontSize: 11,
  letterSpacing: "0.02em",
  lineHeight: 1.5,
};

const insetStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(15,168,154,0.1)",
  borderRadius: 6,
  padding: 14,
  marginTop: 20,
};

function PatientMockup() {
  return (
    <div style={insetStyle}>
      <div
        style={{
          ...monoStyle,
          color: "var(--page-text)",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          fontWeight: 700,
          marginBottom: 6,
        }}
      >
        PRIYA MEHTA
      </div>
      <div style={{ ...monoStyle, color: "var(--page-text-2)" }}>
        Last visit · March 15
      </div>
      <div style={{ ...monoStyle, color: "var(--page-text-2)" }}>
        Treatment · Root Canal (Tooth #36) · In Progress
      </div>
      <div style={{ ...monoStyle, color: "var(--page-text-2)" }}>
        Next · Crown fitting · Overdue by 22 days
      </div>
      <div
        style={{
          ...monoStyle,
          color: "#F59E0B",
          marginTop: 8,
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        <span
          aria-hidden
          style={{
            width: 8,
            height: 8,
            borderRadius: 9999,
            background: "#F59E0B",
          }}
        />
        Follow-up needed
      </div>
    </div>
  );
}

function RecallsMockup() {
  const events = [
    {
      day: "Day 2",
      ch: "WhatsApp",
      text: "“Hi Priya, Dr. Kavita recommended a crown fitting. Would you like to schedule?”",
    },
    {
      day: "Day 7",
      ch: "SMS",
      text: "“Your treatment is still pending. Book in 2 taps.”",
    },
    {
      day: "Day 14",
      ch: "Call",
      text: "Reminder queued for receptionist",
    },
  ];
  return (
    <div style={insetStyle}>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {events.map((e, i) => (
          <div
            key={e.day}
            style={{
              position: "relative",
              paddingLeft: 18,
            }}
          >
            <span
              aria-hidden
              style={{
                position: "absolute",
                top: 5,
                left: 0,
                width: 8,
                height: 8,
                borderRadius: 9999,
                background: "var(--page-accent)",
              }}
            />
            {i < events.length - 1 && (
              <span
                aria-hidden
                style={{
                  position: "absolute",
                  top: 13,
                  left: 3.5,
                  bottom: -10,
                  width: 1,
                  background: "rgba(15,168,154,0.25)",
                }}
              />
            )}
            <div style={{ ...monoStyle, color: "var(--page-accent)" }}>
              {e.day} · {e.ch}
            </div>
            <div style={{ ...monoStyle, color: "var(--page-text-2)" }}>
              {e.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CalendarMockup() {
  const cols = ["Dr. Kavita", "Dr. Anand", "Dr. Isha"];
  type Block = {
    col: number;
    top: number;
    h: number;
    color: string;
  };
  const blocks: Block[] = [
    { col: 0, top: 8, h: 18, color: "rgba(15,168,154,0.45)" },
    { col: 0, top: 60, h: 22, color: "rgba(15,168,154,0.45)" },
    { col: 1, top: 12, h: 16, color: "rgba(15,168,154,0.45)" },
    { col: 1, top: 42, h: 24, color: "rgba(245,158,11,0.4)" },
    { col: 2, top: 26, h: 18, color: "rgba(15,168,154,0.45)" },
    { col: 2, top: 70, h: 14, color: "rgba(15,168,154,0.45)" },
  ];
  return (
    <div style={insetStyle}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 6,
          marginBottom: 8,
        }}
      >
        {cols.map((c) => (
          <div
            key={c}
            style={{
              ...monoStyle,
              color: "var(--page-text-2)",
              textAlign: "center",
            }}
          >
            {c}
          </div>
        ))}
      </div>
      <div
        style={{
          position: "relative",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 6,
          height: 100,
        }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              position: "relative",
              background:
                "repeating-linear-gradient(to bottom, rgba(15,168,154,0.06) 0 1px, transparent 1px 20px)",
              borderRadius: 4,
            }}
          >
            {blocks
              .filter((b) => b.col === i)
              .map((b, k) => (
                <div
                  key={k}
                  style={{
                    position: "absolute",
                    left: 2,
                    right: 2,
                    top: `${b.top}%`,
                    height: `${b.h}%`,
                    background: b.color,
                    borderRadius: 3,
                  }}
                />
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function RevenueMockup() {
  return (
    <div style={insetStyle}>
      <div
        style={{
          ...monoStyle,
          color: "var(--page-text-2)",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
        }}
      >
        Follow-up conversion
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginTop: 10,
        }}
      >
        <span
          style={{
            ...monoStyle,
            fontSize: 16,
            color: "var(--page-text-2)",
            textDecoration: "line-through",
          }}
        >
          12%
        </span>
        <span style={{ ...monoStyle, color: "var(--page-text-2)" }}>→</span>
        <span
          style={{
            ...monoStyle,
            fontSize: 18,
            color: "var(--page-accent)",
            fontWeight: 700,
          }}
        >
          38%
        </span>
      </div>
      <div
        style={{
          marginTop: 10,
          display: "flex",
          alignItems: "flex-end",
          gap: 8,
          height: 36,
        }}
      >
        <div
          style={{
            flex: 1,
            background: "rgba(122,156,165,0.4)",
            height: "32%",
            borderRadius: 3,
          }}
        />
        <div
          style={{
            flex: 1,
            background: "var(--page-accent)",
            height: "100%",
            borderRadius: 3,
          }}
        />
      </div>
      <div
        style={{
          ...monoStyle,
          color: "var(--page-accent)",
          marginTop: 10,
          fontWeight: 500,
        }}
      >
        Recovered: Rs. 2.4L / month
      </div>
    </div>
  );
}

type Card = {
  icon: ReactNode;
  title: string;
  description: string;
  mockup: ReactNode;
};

const CARDS: Card[] = [
  {
    icon: UserIcon,
    title: "Every patient, every visit, every detail",
    description:
      "Complete digital records. Treatment history, X-rays, notes, billing. No more paper files.",
    mockup: <PatientMockup />,
  },
  {
    icon: BellIcon,
    title: "Automatic reminders that bring patients back",
    description:
      "Cleaning done in January? The system reminds them in July. Root canal recommended but not booked? Follow-up sequence starts in 48 hours.",
    mockup: <RecallsMockup />,
  },
  {
    icon: CalIcon,
    title: "Bookings that run themselves",
    description:
      "Online booking, WhatsApp booking, walk-in management. Automatic slot allocation across 3 dentists and 2 hygienists. No double-booking.",
    mockup: <CalendarMockup />,
  },
  {
    icon: TrendIcon,
    title: "Turn recommended treatments into completed treatments",
    description:
      "AI-powered follow-up sequences. Personalized messaging. Payment plan offers for expensive procedures. The 60% who disappear start coming back.",
    mockup: <RevenueMockup />,
  },
];

export default function System() {
  return (
    <section style={{ paddingBlock: 128 }}>
      <div className="container-x">
        <p
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 13,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "var(--page-accent)",
            margin: 0,
            marginBottom: 24,
          }}
        >
          THE SOLUTION
        </p>

        <h2
          style={{
            fontFamily:
              "var(--font-jakarta), var(--font-geist-sans), system-ui, sans-serif",
            fontWeight: 500,
            fontSize: "clamp(26px, 3.5vw, 42px)",
            color: "var(--page-text)",
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
            margin: 0,
            marginBottom: 64,
            maxWidth: 700,
          }}
        >
          A clinic that remembers every patient and never lets them slip
          away.
        </h2>

        <div className="sf-grid">
          {CARDS.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.7,
                delay: (i % 2) * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                background: "var(--page-surface)",
                border: "1px solid rgba(15,168,154,0.15)",
                borderRadius: 8,
                padding: 32,
              }}
            >
              {c.icon}
              <h3
                style={{
                  fontFamily:
                    "var(--font-jakarta), var(--font-geist-sans), system-ui, sans-serif",
                  fontWeight: 500,
                  fontSize: 19,
                  color: "var(--page-text)",
                  letterSpacing: "-0.01em",
                  margin: 0,
                  marginTop: 16,
                  marginBottom: 10,
                  lineHeight: 1.3,
                }}
              >
                {c.title}
              </h3>
              <p
                style={{
                  fontFamily:
                    "var(--font-jakarta), var(--font-geist-sans), system-ui, sans-serif",
                  fontSize: 14,
                  color: "var(--page-text-2)",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {c.description}
              </p>
              {c.mockup}
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .sf-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }
        @media (min-width: 900px) {
          .sf-grid {
            grid-template-columns: 1fr 1fr;
            gap: 24px;
          }
        }
      `}</style>
    </section>
  );
}
