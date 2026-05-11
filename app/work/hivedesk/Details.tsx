"use client";

import Image from "next/image";
import { motion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

type Card = {
  src: string;
  alt: string;
  caption: string;
  ratio: string;
};

const CARDS: Card[] = [
  {
    src: "/images/hivedesk/meeting-room.webp",
    alt: "Empty modern meeting room with oval wooden table and tan leather chairs",
    caption: "Room booking that takes 3 taps, not a Slack message.",
    ratio: "3 / 2",
  },
  {
    src: "/images/hivedesk/focus-pod.webp",
    alt: "Glass focus pod with soft violet accent lighting inside",
    caption: "Focus pods that show booked or free in the floor map.",
    ratio: "4 / 5",
  },
  {
    src: "/images/hivedesk/lounge-detail.webp",
    alt: "Eames lounge chair, side table, MacBook and coffee cup in soft afternoon light",
    caption: "Coffee bar inventory tracked so you never run out at 4pm.",
    ratio: "1 / 1",
  },
];

export default function Details() {
  return (
    <section style={{ paddingBlock: 144 }}>
      <div className="container-x">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.25, ease: EASE }}
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            color: "var(--page-accent)",
            margin: 0,
            marginBottom: 24,
          }}
        >
          DETAILS
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, ease: EASE }}
          style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontWeight: 600,
            fontSize: "clamp(32px, 4.6vw, 56px)",
            letterSpacing: "-0.04em",
            lineHeight: 1.1,
            color: "var(--page-text)",
            margin: 0,
            marginBottom: 64,
            maxWidth: 720,
          }}
        >
          The small things people actually feel.
        </motion.h2>

        <div className="hd-details-grid">
          {CARDS.map((c, i) => (
            <motion.figure
              key={c.src}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.4,
                delay: i * 0.08,
                ease: EASE,
              }}
              style={{
                position: "relative",
                margin: 0,
                aspectRatio: c.ratio,
                overflow: "hidden",
                borderRadius: 10,
                border: "1px solid var(--page-border)",
              }}
            >
              <Image
                src={c.src}
                alt={c.alt}
                fill
                sizes="(min-width: 1024px) 33vw, 90vw"
                style={{ objectFit: "cover" }}
              />
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, transparent 50%, rgba(9,9,11,0.92) 100%)",
                }}
              />
              <figcaption
                style={{
                  position: "absolute",
                  left: 20,
                  right: 20,
                  bottom: 20,
                  fontFamily:
                    "var(--font-inter), system-ui, sans-serif",
                  fontWeight: 500,
                  fontSize: 16,
                  color: "#FAFAFA",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.4,
                }}
              >
                {c.caption}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>

      <style jsx>{`
        .hd-details-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }
        @media (min-width: 720px) {
          .hd-details-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
          }
        }
      `}</style>
    </section>
  );
}
