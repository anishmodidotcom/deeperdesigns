"use client";

import { motion } from "motion/react";

type Entry = { time: string; text: string };

const ENTRIES: Entry[] = [
  {
    time: "6:30 AM",
    text: "Platform sends Meera her day: 3 group classes, 2 private sessions, 1 online. No surprises.",
  },
  {
    time: "7:00 AM",
    text: "Group class at Marina Studio. 12 students checked in via the app.",
  },
  {
    time: "9:15 AM",
    text: "Client reschedules via WhatsApp. AI handles it. Meera doesn't even see the message.",
  },
  {
    time: "10:00 AM",
    text: "Private session. Client's workout plan and notes already loaded on her phone.",
  },
  {
    time: "2:00 PM",
    text: "New inquiry from Instagram. AI qualifies, answers FAQs, and books a trial class.",
  },
  {
    time: "6:00 PM",
    text: "Online Zoom class. Attendance auto-tracked. Recording saved to client portals.",
  },
  {
    time: "8:00 PM",
    text: "Daily summary pushed to WhatsApp: 28 students today, 2 new bookings, Rs. 12,400 revenue.",
  },
];

export default function DailyFlow() {
  return (
    <section style={{ paddingBlock: 128 }}>
      <div className="container-x">
        <p
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 12,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "var(--page-accent)",
            margin: 0,
            marginBottom: 48,
          }}
        >
          A DAY WITH MEERA
        </p>

        <div
          style={{
            position: "relative",
            paddingLeft: 24,
            maxWidth: 760,
          }}
        >
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: 6,
              bottom: 6,
              left: 0,
              width: 1,
              background: "rgba(91,127,110,0.2)",
            }}
          />

          {ENTRIES.map((e, i) => (
            <motion.div
              key={e.time}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.7,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                position: "relative",
                paddingBlock: 18,
                display: "grid",
                gridTemplateColumns: "auto 1fr",
                gap: 24,
                alignItems: "baseline",
              }}
            >
              <span
                aria-hidden
                style={{
                  position: "absolute",
                  left: -28,
                  top: 25,
                  width: 8,
                  height: 8,
                  borderRadius: 9999,
                  background: "var(--page-accent)",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: 14,
                  color: "var(--page-accent)",
                  minWidth: 80,
                  letterSpacing: "0.02em",
                }}
              >
                {e.time}
              </span>
              <span
                style={{
                  fontSize: 15,
                  color: "var(--page-text-2)",
                  lineHeight: 1.6,
                }}
              >
                {e.text}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
