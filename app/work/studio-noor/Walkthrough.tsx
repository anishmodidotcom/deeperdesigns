"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "motion/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type State = 1 | 2 | 3 | 4;

const BLOCKS: { title: string; description: string }[] = [
  {
    title: "See the big picture",
    description:
      "A living timeline of the whole project. Which phase you are in, what is done, what is next. Updated by the site supervisor every day over WhatsApp.",
  },
  {
    title: "Daily updates without asking",
    description:
      "Every day, the portal shows what happened. Site photos, material arrivals, decisions made. No more 11pm status calls.",
  },
  {
    title: "Know where every rupee went",
    description:
      "Real-time budget tracking by category, with a payment schedule and automatic reminders. No more compiling receipts into a spreadsheet.",
  },
  {
    title: "Everything in one place",
    description:
      "Floor plans, renders, invoices, material selections. All stored, organised, and one tap away. Not buried in WhatsApp.",
  },
];

const PORTAL_BG = "#FAFAF8";
const PORTAL_TEXT = "#1A1620";
const PORTAL_TEXT_2 = "#6B5F73";
const PORTAL_ACCENT = "#9B7EC8";

function MockHeader() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        marginBottom: 20,
        flexWrap: "wrap",
      }}
    >
      <div>
        <p
          style={{
            fontFamily:
              "var(--font-instrument), Georgia, serif",
            fontSize: 17,
            color: PORTAL_TEXT,
            margin: 0,
            letterSpacing: "-0.01em",
          }}
        >
          Sharma Residence
        </p>
        <p
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 11,
            color: PORTAL_TEXT_2,
            margin: 0,
            marginTop: 2,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          3BHK · Indiranagar
        </p>
      </div>
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          background: "rgba(34,197,94,0.12)",
          color: "#15803D",
          fontFamily: "var(--font-geist-mono), monospace",
          fontSize: 10,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          paddingInline: 10,
          paddingBlock: 4,
          borderRadius: 9999,
        }}
      >
        <span
          aria-hidden
          style={{
            width: 6,
            height: 6,
            borderRadius: 9999,
            background: "#22C55E",
          }}
        />
        In Progress
      </span>
    </div>
  );
}

function State1() {
  const phases = [
    { name: "Design", fill: 1 },
    { name: "Procurement", fill: 0.5 },
    { name: "Carpentry", fill: 0 },
    { name: "Installation", fill: 0 },
    { name: "Handover", fill: 0 },
  ];
  return (
    <>
      <MockHeader />
      <p
        style={{
          fontFamily: "var(--font-geist-mono), monospace",
          fontSize: 10,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: PORTAL_TEXT_2,
          margin: 0,
          marginBottom: 10,
        }}
      >
        Project Timeline
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: 4,
          marginBottom: 16,
        }}
      >
        {phases.map((p) => (
          <div key={p.name}>
            <div
              style={{
                height: 6,
                background: "rgba(155,126,200,0.15)",
                borderRadius: 9999,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${p.fill * 100}%`,
                  height: "100%",
                  background: PORTAL_ACCENT,
                }}
              />
            </div>
            <p
              style={{
                fontSize: 10,
                color: PORTAL_TEXT_2,
                margin: 0,
                marginTop: 6,
                textAlign: "center",
                fontFamily: "var(--font-geist-mono), monospace",
                letterSpacing: "0.04em",
              }}
            >
              {p.name}
            </p>
          </div>
        ))}
      </div>
      <div
        style={{
          marginTop: 28,
          padding: "20px 24px",
          background: "rgba(155,126,200,0.08)",
          borderRadius: 8,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 13,
            color: PORTAL_TEXT_2,
            marginBottom: 8,
          }}
        >
          <span style={{ color: PORTAL_TEXT, fontWeight: 500 }}>
            Overall Progress
          </span>
          <span style={{ color: PORTAL_ACCENT, fontWeight: 500 }}>
            42% Complete
          </span>
        </div>
        <div
          style={{
            width: "100%",
            height: 8,
            background: "rgba(155,126,200,0.2)",
            borderRadius: 9999,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: "42%",
              height: "100%",
              background: PORTAL_ACCENT,
            }}
          />
        </div>
        <p
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 11,
            color: PORTAL_TEXT_2,
            margin: 0,
            marginTop: 12,
            letterSpacing: "0.04em",
          }}
        >
          Day 47 of estimated 120 days
        </p>
      </div>
    </>
  );
}

function State2() {
  const updates = [
    {
      date: "Today",
      text: "Kitchen cabinet laminate samples arrived. 3 options. Photos attached.",
      hasImage: true,
    },
    {
      date: "Yesterday",
      text: "Electrician completed bedroom wiring. Supervisor verified.",
    },
    {
      date: "2 days ago",
      text: "Dining table wood selected: Sheesham, natural finish. Approved by client.",
    },
  ];
  return (
    <>
      <MockHeader />
      <p
        style={{
          fontFamily: "var(--font-geist-mono), monospace",
          fontSize: 10,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: PORTAL_TEXT_2,
          margin: 0,
          marginBottom: 14,
        }}
      >
        Daily Updates
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {updates.map((u) => (
          <div
            key={u.date}
            style={{
              borderLeft: `2px solid ${PORTAL_ACCENT}`,
              paddingLeft: 16,
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: 11,
                color: PORTAL_ACCENT,
                margin: 0,
                marginBottom: 4,
                letterSpacing: "0.04em",
              }}
            >
              {u.date}
            </p>
            <p
              style={{
                fontSize: 13,
                color: PORTAL_TEXT,
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              {u.text}
            </p>
            {u.hasImage && (
              <div
                aria-hidden
                style={{
                  marginTop: 10,
                  display: "flex",
                  gap: 6,
                }}
              >
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    style={{
                      width: 56,
                      height: 40,
                      background:
                        "linear-gradient(135deg, rgba(155,126,200,0.18), rgba(155,126,200,0.05))",
                      borderRadius: 4,
                      border: "1px solid rgba(155,126,200,0.2)",
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

function State3() {
  const lines = [
    { name: "Carpentry", spent: "2,40,000", total: "4,00,000", pct: 60 },
    { name: "Electrical", spent: "80,000", total: "1,20,000", pct: 67 },
    {
      name: "Paint & Finish",
      spent: "0",
      total: "1,50,000",
      pct: 0,
      note: "Not started",
    },
  ];
  return (
    <>
      <MockHeader />
      <p
        style={{
          fontFamily: "var(--font-geist-mono), monospace",
          fontSize: 10,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: PORTAL_TEXT_2,
          margin: 0,
          marginBottom: 8,
        }}
      >
        Budget Tracker
      </p>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: 12,
          marginBottom: 10,
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-instrument), Georgia, serif",
            fontSize: 22,
            color: PORTAL_TEXT,
            letterSpacing: "-0.005em",
          }}
        >
          Rs. 12,00,000
        </span>
        <span style={{ fontSize: 12, color: PORTAL_TEXT_2 }}>
          Total Budget
        </span>
      </div>
      <div
        style={{
          width: "100%",
          height: 14,
          background: "rgba(155,126,200,0.15)",
          borderRadius: 6,
          overflow: "hidden",
          marginBottom: 8,
        }}
      >
        <div
          style={{
            width: "43%",
            height: "100%",
            background: PORTAL_ACCENT,
          }}
        />
      </div>
      <p
        style={{
          fontFamily: "var(--font-geist-mono), monospace",
          fontSize: 11,
          color: PORTAL_TEXT_2,
          margin: 0,
          marginBottom: 18,
        }}
      >
        Spent Rs. 5,20,000 (43%)
      </p>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          marginBottom: 18,
        }}
      >
        {lines.map((l) => (
          <div
            key={l.name}
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 12,
              color: l.pct === 0 ? PORTAL_TEXT_2 : PORTAL_TEXT,
              fontFamily: "var(--font-geist-mono), monospace",
            }}
          >
            <span>{l.name}</span>
            <span>
              Rs. {l.spent} / Rs. {l.total}
              {l.note ? ` (${l.note})` : ""}
            </span>
          </div>
        ))}
      </div>

      <div
        style={{
          paddingTop: 14,
          borderTop: "1px solid rgba(155,126,200,0.15)",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 10,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: PORTAL_TEXT_2,
            margin: 0,
            marginBottom: 10,
          }}
        >
          Payment Schedule
        </p>
        {[
          { label: "Advance", state: "Paid", color: "#22C55E", glyph: "✓" },
          {
            label: "Midpoint",
            state: "Due in 10 days",
            color: "#EAB308",
            glyph: "◷",
          },
          { label: "Final", state: "Pending", color: PORTAL_TEXT_2, glyph: "·" },
        ].map((p) => (
          <div
            key={p.label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontSize: 12,
              color: PORTAL_TEXT,
              paddingBlock: 4,
            }}
          >
            <span
              aria-hidden
              style={{
                width: 16,
                height: 16,
                borderRadius: 9999,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 10,
                color: "#fff",
                background: p.color,
              }}
            >
              {p.glyph}
            </span>
            <span style={{ flex: 1 }}>{p.label}</span>
            <span style={{ color: PORTAL_TEXT_2 }}>{p.state}</span>
          </div>
        ))}
      </div>
    </>
  );
}

function State4() {
  const docs = [
    { name: "Floor Plan v3.pdf", tint: "rgba(155,126,200,0.18)" },
    { name: "Electrical Layout.pdf", tint: "rgba(107,163,190,0.2)" },
    { name: "Kitchen 3D Render.jpg", tint: "rgba(232,201,160,0.25)" },
    { name: "Invoice #047.pdf", tint: "rgba(142,132,148,0.18)" },
  ];
  return (
    <>
      <MockHeader />
      <p
        style={{
          fontFamily: "var(--font-geist-mono), monospace",
          fontSize: 10,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: PORTAL_TEXT_2,
          margin: 0,
          marginBottom: 14,
        }}
      >
        Documents & Blueprints
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 10,
          marginBottom: 18,
        }}
      >
        {docs.map((d) => (
          <div
            key={d.name}
            style={{
              background: d.tint,
              borderRadius: 8,
              padding: 14,
              minHeight: 76,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              border: "1px solid rgba(26,22,32,0.06)",
            }}
          >
            <p
              style={{
                fontSize: 12,
                color: PORTAL_TEXT,
                margin: 0,
                fontFamily: "var(--font-geist-mono), monospace",
                letterSpacing: "0.02em",
              }}
            >
              {d.name}
            </p>
          </div>
        ))}
      </div>
      <p
        style={{
          fontSize: 12,
          color: PORTAL_TEXT_2,
          margin: 0,
          marginBottom: 14,
        }}
      >
        All documents stored securely. No more digging through WhatsApp.
      </p>
      <button
        type="button"
        data-cursor="pointer"
        style={{
          background: PORTAL_ACCENT,
          color: "#fff",
          border: "none",
          borderRadius: 8,
          padding: "10px 16px",
          fontSize: 13,
          fontWeight: 500,
          fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
          cursor: "pointer",
        }}
      >
        Download All
      </button>
    </>
  );
}

const STATES: Record<State, React.FC> = {
  1: State1,
  2: State2,
  3: State3,
  4: State4,
};

function PortalMockup({ state }: { state: State }) {
  return (
    <div
      style={{
        background: PORTAL_BG,
        borderRadius: 12,
        border: "1px solid rgba(155,126,200,0.15)",
        boxShadow:
          "0 30px 60px -30px rgba(155,126,200,0.35), 0 0 0 1px rgba(255,255,255,0.02)",
        padding: 28,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={state}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {(() => {
            const Comp = STATES[state];
            return <Comp />;
          })()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function Walkthrough() {
  const sectionRef = useRef<HTMLElement>(null);
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState<State>(1);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 900px)", () => {
        const triggers = blockRefs.current.map((el, i) => {
          if (!el) return null;
          return ScrollTrigger.create({
            trigger: el,
            start: "top 55%",
            end: "bottom 45%",
            onEnter: () => setActive((i + 1) as State),
            onEnterBack: () => setActive((i + 1) as State),
          });
        });
        return () => {
          triggers.forEach((t) => t?.kill());
        };
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} style={{ paddingBlock: 128 }}>
      <div
        className="container-x"
        style={{
          marginBottom: 64,
        }}
      >
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
            fontFamily: "var(--font-instrument), Georgia, serif",
            fontWeight: 400,
            fontSize: "clamp(28px, 4vw, 48px)",
            color: "var(--page-text)",
            lineHeight: 1.15,
            letterSpacing: "-0.01em",
            margin: 0,
          }}
        >
          One portal. Everything visible.
        </h2>
      </div>

      <div className="container-x">
        <div className="sn-walk-grid">
          <div className="sn-walk-stickycol">
            <div className="sn-walk-sticky">
              <PortalMockup state={active} />
            </div>
          </div>

          <div className="sn-walk-blocks">
            {BLOCKS.map((b, i) => (
              <div
                key={b.title}
                ref={(el) => {
                  blockRefs.current[i] = el;
                }}
                className="sn-walk-block"
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
                    marginBottom: 12,
                  }}
                >
                  {String(i + 1).padStart(2, "0")} / 04
                </p>
                <h3
                  style={{
                    fontFamily:
                      "var(--font-instrument), Georgia, serif",
                    fontWeight: 400,
                    fontSize: 22,
                    color: "var(--page-text)",
                    margin: 0,
                    marginBottom: 12,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {b.title}
                </h3>
                <p
                  style={{
                    fontSize: 15,
                    color: "var(--page-text-2)",
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {b.description}
                </p>

                <div className="sn-walk-inline">
                  <PortalMockup state={(i + 1) as State} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .sn-walk-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 64px;
        }
        .sn-walk-stickycol {
          display: none;
        }
        .sn-walk-blocks {
          display: flex;
          flex-direction: column;
          gap: 96px;
        }
        .sn-walk-inline {
          display: block;
          margin-top: 24px;
        }
        @media (min-width: 900px) {
          .sn-walk-grid {
            grid-template-columns: minmax(0, 1fr) minmax(0, 0.8fr);
            gap: 96px;
          }
          .sn-walk-stickycol {
            display: block;
            height: 100%;
          }
          .sn-walk-sticky {
            position: sticky;
            top: 14vh;
          }
          .sn-walk-blocks {
            gap: 0;
          }
          .sn-walk-block {
            min-height: 80vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
          .sn-walk-inline {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
