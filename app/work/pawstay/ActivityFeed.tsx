"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Event = { time: string; dog: string; activity: string; dot: string };

const FEED: Event[] = [
  { time: "08:42", dog: "Biscuit", activity: "just ate breakfast", dot: "var(--page-accent)" },
  { time: "08:55", dog: "Max", activity: "started playing", dot: "var(--page-accent-2)" },
  { time: "09:18", dog: "Moti", activity: "is napping", dot: "var(--page-text-3)" },
  { time: "09:31", dog: "Pepper", activity: "checked in", dot: "var(--page-accent)" },
  { time: "09:46", dog: "Cookie", activity: "went for the morning walk", dot: "var(--page-accent-2)" },
  { time: "10:02", dog: "Bruno", activity: "had medication", dot: "var(--page-accent)" },
  { time: "10:18", dog: "Biscuit", activity: "is on the porch", dot: "var(--page-text-3)" },
  { time: "10:34", dog: "Max", activity: "splashed in the pool", dot: "var(--page-accent-2)" },
  { time: "10:51", dog: "Lily", activity: "had a treat", dot: "var(--page-accent)" },
  { time: "11:07", dog: "Pepper", activity: "is napping", dot: "var(--page-text-3)" },
];

export default function ActivityFeed() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(0);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) {
        setVisible(FEED.length);
        return;
      }
      ScrollTrigger.create({
        trigger: "body",
        start: "20% top",
        end: "75% bottom",
        scrub: 1,
        onUpdate: (self) => {
          setVisible(Math.min(FEED.length, Math.floor(self.progress * FEED.length) + 1));
        },
      });
    },
    { scope: sectionRef }
  );

  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === document.body) t.kill();
      });
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      aria-hidden
      className="pawstay-activity-feed"
      style={{
        position: "fixed",
        right: 24,
        top: "50%",
        transform: "translateY(-50%)",
        width: 280,
        background: "rgba(15,19,16,0.92)",
        backdropFilter: "blur(12px)",
        border: "1px solid var(--page-border)",
        borderRadius: 12,
        padding: 18,
        zIndex: 30,
        boxShadow: "0 20px 40px -20px rgba(0,0,0,0.5)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: 12,
          borderBottom: "1px solid var(--page-border)",
          marginBottom: 12,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "var(--page-accent)",
              boxShadow: "0 0 8px var(--page-accent)",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: 10,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--page-text)",
            }}
          >
            LIVE FEED
          </span>
        </div>
        <span
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 10,
            letterSpacing: "0.14em",
            color: "var(--page-text-3)",
          }}
        >
          {visible} / {FEED.length}
        </span>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          maxHeight: 320,
          overflow: "hidden",
        }}
      >
        {FEED.slice(0, visible).reverse().map((event, i) => (
          <div
            key={`${event.time}-${event.dog}`}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
              opacity: i === 0 ? 1 : 0.55 - i * 0.06,
              transition: "opacity 0.4s ease",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: event.dot,
                marginTop: 7,
                flexShrink: 0,
              }}
            />
            <div style={{ flex: 1 }}>
              <p
                style={{
                  fontFamily:
                    "var(--font-jakarta), system-ui, sans-serif",
                  fontSize: 13,
                  color: "var(--page-text)",
                  margin: 0,
                  lineHeight: 1.4,
                }}
              >
                <strong style={{ fontWeight: 600 }}>{event.dog}</strong>{" "}
                <span style={{ color: "var(--page-text-2)" }}>
                  {event.activity}
                </span>
              </p>
              <p
                style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: 10,
                  letterSpacing: "0.12em",
                  color: "var(--page-text-3)",
                  margin: 0,
                  marginTop: 2,
                }}
              >
                {event.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @media (max-width: 1100px) {
          :global(.pawstay-activity-feed) {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
