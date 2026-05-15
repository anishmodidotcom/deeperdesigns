"use client";

import { motion } from "motion/react";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

type Slot = {
  day: number; // 0-6
  start: number; // hour
  end: number;
  type: "Group" | "Private" | "Online";
  label: string;
};

const SLOTS: Slot[] = [
  { day: 0, start: 7, end: 8, type: "Group", label: "Group 7am" },
  { day: 1, start: 10, end: 11, type: "Private", label: "Private 10am" },
  { day: 2, start: 7, end: 8, type: "Group", label: "Group 7am" },
  { day: 3, start: 18, end: 19, type: "Online", label: "Online 6pm" },
  { day: 5, start: 9, end: 10, type: "Private", label: "Private 9am" },
];

const TYPE_COLOR: Record<Slot["type"], string> = {
  Group: "var(--page-accent)",
  Private: "#8B7EC8",
  Online: "#6BA3BE",
};

const HOUR_START = 6;
const HOUR_END = 20;

export default function SchedulingPanel() {
  return (
    <section style={{ paddingBlock: 64 }}>
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05, margin: "-10% 0px -10% 0px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mw-panel mw-panel-1"
        >
          <div>
            <h3
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontWeight: 500,
                fontSize: 24,
                color: "var(--page-text)",
                margin: 0,
                marginBottom: 16,
                letterSpacing: "-0.005em",
              }}
            >
              Scheduling that understands her business
            </h3>
            <p
              style={{
                fontSize: 15,
                color: "var(--page-text-2)",
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              Group classes, private sessions, online bookings. Different
              prices, durations, locations. The calendar handles all of
              it, and clients book themselves. No more WhatsApp
              back-and-forth.
            </p>
          </div>

          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              background: "#FFFFFF",
              border: "1px solid var(--page-surface)",
              borderRadius: 12,
              padding: 24,
              boxShadow: "0 20px 50px -30px rgba(26,23,21,0.18)",
            }}
          >
            <div
              className="mw-cal-head"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                gap: 6,
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--page-text-2)",
                marginBottom: 12,
              }}
            >
              {DAYS.map((d) => (
                <div key={d} style={{ textAlign: "center" }}>
                  {d}
                </div>
              ))}
            </div>

            <div
              className="mw-cal-grid"
              style={{
                position: "relative",
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                gap: 6,
                height: 280,
                background:
                  "repeating-linear-gradient(to bottom, rgba(26,23,21,0.06) 0 1px, transparent 1px 56px)",
              }}
            >
              {DAYS.map((d, i) => (
                <div
                  key={d}
                  style={{
                    position: "relative",
                    borderLeft:
                      i === 0
                        ? "none"
                        : "1px solid rgba(26,23,21,0.06)",
                  }}
                />
              ))}

              {SLOTS.map((s) => {
                const top =
                  ((s.start - HOUR_START) /
                    (HOUR_END - HOUR_START)) *
                  100;
                const height =
                  ((s.end - s.start) / (HOUR_END - HOUR_START)) * 100;
                return (
                  <div
                    key={`${s.day}-${s.start}-${s.label}`}
                    style={{
                      position: "absolute",
                      left: `calc(${(s.day / 7) * 100}% + 4px)`,
                      width: `calc(${100 / 7}% - 8px)`,
                      top: `${top}%`,
                      height: `${height}%`,
                      borderRadius: 8,
                      background: TYPE_COLOR[s.type],
                      color: "#FFFFFF",
                      fontSize: 11,
                      padding: "6px 8px",
                      lineHeight: 1.2,
                      letterSpacing: "0.01em",
                      display: "flex",
                      alignItems: "flex-start",
                    }}
                  >
                    {s.label}
                  </div>
                );
              })}
            </div>

            <div
              style={{
                display: "flex",
                gap: 16,
                marginTop: 20,
                fontSize: 12,
                color: "var(--page-text-2)",
                flexWrap: "wrap",
              }}
            >
              {(
                ["Group", "Private", "Online"] as Slot["type"][]
              ).map((t) => (
                <span
                  key={t}
                  style={{
                    display: "inline-flex",
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
                      background: TYPE_COLOR[t],
                    }}
                  />
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      <style jsx>{`
        .mw-panel {
          max-width: 900px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
          align-items: center;
        }
        @media (min-width: 900px) {
          .mw-panel {
            grid-template-columns: 1fr 1.2fr;
            gap: 64px;
          }
        }
      `}</style>
    </section>
  );
}
