"use client";

import { motion } from "motion/react";

type Message = {
  side: "in" | "out";
  text: string;
  time: string;
};

const MESSAGES: Message[] = [
  {
    side: "in",
    text: "Hi, can I reschedule my Thursday private session to Saturday?",
    time: "9:14",
  },
  {
    side: "out",
    text: "Of course! I have Saturday at 10am or 2pm available. Which works for you?",
    time: "9:14",
  },
  { side: "in", text: "10am please", time: "9:15" },
  {
    side: "out",
    text: "Done! Your private session is confirmed for Saturday 10am at Marina Studio. See you there.",
    time: "9:15",
  },
  {
    side: "out",
    text: "Your updated weekly schedule has been sent to your email.",
    time: "9:15",
  },
];

function Tick() {
  return (
    <svg
      width="14"
      height="10"
      viewBox="0 0 14 10"
      fill="none"
      stroke="#3FB6E5"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      style={{ marginLeft: 4 }}
    >
      <polyline points="1 5 4 8 9 2" />
      <polyline points="5 5 8 8 13 2" />
    </svg>
  );
}

export default function WhatsAppPanel() {
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
          style={{ width: "100%", maxWidth: 360 }}
        >
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              width: "100%",
              aspectRatio: "9 / 19",
              borderRadius: 32,
              border: "1px solid var(--page-surface)",
              background: "#FFFFFF",
              overflow: "hidden",
              boxShadow: "0 30px 60px -30px rgba(26,23,21,0.2)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                background: "#25D366",
                color: "#FFFFFF",
                padding: "16px 18px",
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div
                aria-hidden
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 9999,
                  background: "rgba(255,255,255,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily:
                    "var(--font-cormorant), Georgia, serif",
                  fontWeight: 500,
                  fontSize: 16,
                }}
              >
                M
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 500 }}>
                  Meera Wellness
                </div>
                <div
                  style={{
                    fontSize: 11,
                    opacity: 0.85,
                    marginTop: 2,
                  }}
                >
                  online
                </div>
              </div>
            </div>

            <div
              style={{
                flex: 1,
                background: "#ECE5DD",
                padding: 12,
                display: "flex",
                flexDirection: "column",
                gap: 8,
                overflow: "hidden",
              }}
            >
              {MESSAGES.map((m, i) => (
                <div
                  key={i}
                  style={{
                    alignSelf: m.side === "in" ? "flex-start" : "flex-end",
                    maxWidth: "82%",
                    background:
                      m.side === "in" ? "#FFFFFF" : "#DCF8C6",
                    color: "#1A1715",
                    padding: "8px 10px",
                    fontSize: 12.5,
                    lineHeight: 1.4,
                    borderRadius: 10,
                    borderTopLeftRadius: m.side === "in" ? 2 : 10,
                    borderTopRightRadius: m.side === "out" ? 2 : 10,
                    boxShadow: "0 1px 1px rgba(0,0,0,0.06)",
                  }}
                >
                  {m.text}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      gap: 2,
                      marginTop: 4,
                      fontSize: 9,
                      color: "rgba(26,23,21,0.45)",
                    }}
                  >
                    {m.time}
                    {m.side === "out" && <Tick />}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <p
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: 13,
              color: "var(--page-accent)",
              textAlign: "center",
              margin: 0,
              marginTop: 24,
              letterSpacing: "0.04em",
            }}
          >
            Powered by AI. Meera steps in only when needed.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
