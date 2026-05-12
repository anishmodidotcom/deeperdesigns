"use client";

import { motion } from "motion/react";

const NAV = ["Schedule", "Programs", "Progress", "Messages"];

const SESSIONS = [
  {
    when: "Tuesday 7:00 AM",
    title: "Group Yoga (Marina Studio)",
  },
  {
    when: "Thursday 10:00 AM",
    title: "Private Session (Home Visit)",
  },
];

export default function PortalPanel() {
  return (
    <section style={{ paddingBlock: 64 }}>
      <div
        className="container-x"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ width: "100%", maxWidth: 800 }}
        >
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
              padding: 32,
              boxShadow: "0 24px 60px -30px rgba(26,23,21,0.18)",
            }}
          >
            <div
              style={{
                marginBottom: 28,
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontWeight: 500,
                  fontSize: 26,
                  color: "var(--page-text)",
                  margin: 0,
                  letterSpacing: "-0.005em",
                }}
              >
                Welcome back, Priya
              </h3>
              <p
                style={{
                  fontSize: 14,
                  color: "var(--page-text-2)",
                  margin: 0,
                  marginTop: 4,
                }}
              >
                Your wellness journey
              </p>
            </div>

            <div className="mw-portal-grid">
              <nav
                aria-label="Client navigation"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                {NAV.map((item) => {
                  const active = item === "Schedule";
                  return (
                    <a
                      key={item}
                      href="/start-your-study"
                      data-cursor="pointer"
                      style={{
                        fontSize: 14,
                        color: active
                          ? "var(--page-accent)"
                          : "var(--page-text-2)",
                        fontWeight: active ? 500 : 400,
                        paddingBlock: 6,
                      }}
                    >
                      {item}
                    </a>
                  );
                })}
              </nav>

              <div>
                <p
                  style={{
                    fontFamily:
                      "var(--font-geist-mono), monospace",
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "var(--page-text-2)",
                    margin: 0,
                    marginBottom: 12,
                  }}
                >
                  This Week
                </p>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                    marginBottom: 24,
                  }}
                >
                  {SESSIONS.map((s) => (
                    <div
                      key={s.when}
                      style={{
                        background: "var(--page-surface)",
                        borderRadius: 10,
                        padding: 16,
                      }}
                    >
                      <div
                        style={{
                          fontFamily:
                            "var(--font-geist-mono), monospace",
                          fontSize: 11,
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                          color: "var(--page-accent)",
                          marginBottom: 6,
                        }}
                      >
                        {s.when}
                      </div>
                      <div
                        style={{
                          fontSize: 14,
                          color: "var(--page-text)",
                          fontWeight: 500,
                        }}
                      >
                        {s.title}
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ marginBottom: 24 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: 13,
                      color: "var(--page-text-2)",
                      marginBottom: 8,
                    }}
                  >
                    <span style={{ color: "var(--page-text)" }}>
                      30-Day Detox Program
                    </span>
                    <span>60%</span>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      height: 6,
                      background: "var(--page-surface)",
                      borderRadius: 9999,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: "60%",
                        height: "100%",
                        background: "var(--page-accent)",
                      }}
                    />
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                  }}
                >
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                    aria-hidden
                  >
                    <circle
                      cx="24"
                      cy="24"
                      r="20"
                      fill="none"
                      stroke="var(--page-surface)"
                      strokeWidth="4"
                    />
                    <circle
                      cx="24"
                      cy="24"
                      r="20"
                      fill="none"
                      stroke="var(--page-accent)"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeDasharray={`${(18 / 24) * 125.66} 125.66`}
                      transform="rotate(-90 24 24)"
                    />
                  </svg>
                  <div>
                    <div
                      style={{
                        fontSize: 15,
                        color: "var(--page-text)",
                        fontWeight: 500,
                      }}
                    >
                      Attendance
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        color: "var(--page-text-2)",
                      }}
                    >
                      18 of 24 sessions completed
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <style jsx>{`
        .mw-portal-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }
        @media (min-width: 720px) {
          .mw-portal-grid {
            grid-template-columns: 160px 1fr;
            gap: 48px;
            align-items: start;
          }
        }
      `}</style>
    </section>
  );
}
