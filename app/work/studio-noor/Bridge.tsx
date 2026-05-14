"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const NODE_ICON_PROPS = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "var(--page-accent)",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const NODES = [
  {
    title: "Supervisor sends photo + text on WhatsApp",
    icon: (
      <svg {...NODE_ICON_PROPS} aria-hidden>
        <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
      </svg>
    ),
  },
  {
    title: "AI processes and organizes",
    icon: (
      <svg {...NODE_ICON_PROPS} aria-hidden>
        <circle cx="12" cy="12" r="3" />
        <circle cx="12" cy="12" r="9" />
        <line x1="12" y1="3" x2="12" y2="6" />
        <line x1="12" y1="18" x2="12" y2="21" />
        <line x1="3" y1="12" x2="6" y2="12" />
        <line x1="18" y1="12" x2="21" y2="12" />
      </svg>
    ),
  },
  {
    title: "Client sees update in portal",
    icon: (
      <svg {...NODE_ICON_PROPS} aria-hidden>
        <rect x="3" y="5" width="18" height="13" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="18" x2="12" y2="21" />
      </svg>
    ),
  },
];

export default function Bridge() {
  const sectionRef = useRef<HTMLElement>(null);
  const arrow1Ref = useRef<SVGPathElement>(null);
  const arrow2Ref = useRef<SVGPathElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      [arrow1Ref.current, arrow2Ref.current].forEach((path) => {
        if (!path) return;
        const length = path.getTotalLength();
        if (reduced) {
          gsap.set(path, {
            strokeDasharray: length,
            strokeDashoffset: 0,
          });
          return;
        }
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
        gsap.to(path, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 50%",
            scrub: true,
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} style={{ paddingBlock: 128 }}>
      <div
        className="container-x"
        style={{
          maxWidth: 720,
          margin: "0 auto",
          textAlign: "center",
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
          THE BRIDGE
        </p>
        <h2
          style={{
            fontFamily: "var(--font-instrument), Georgia, serif",
            fontWeight: 400,
            fontSize: 28,
            color: "var(--page-text)",
            lineHeight: 1.3,
            letterSpacing: "-0.01em",
            margin: 0,
            marginBottom: 64,
          }}
        >
          Supervisors update through WhatsApp. Clients see it in the portal.
        </h2>

        <div className="sn-bridge">
          {NODES.map((n, i) => (
            <div key={i} className="sn-bridge-node">
              <div className="sn-bridge-icon">{n.icon}</div>
              <p
                style={{
                  fontSize: 13,
                  color: "var(--page-text-2)",
                  margin: 0,
                  marginTop: 16,
                  lineHeight: 1.5,
                  maxWidth: 180,
                }}
              >
                {n.title}
              </p>
            </div>
          ))}

          <svg
            className="sn-bridge-svg"
            viewBox="0 0 600 120"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path
              ref={arrow1Ref}
              d="M 110 60 L 290 60"
              stroke="var(--page-accent)"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
            <path
              ref={arrow2Ref}
              d="M 310 60 L 490 60"
              stroke="var(--page-accent)"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 285 55 L 295 60 L 285 65"
              stroke="var(--page-accent)"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.7"
            />
            <path
              d="M 485 55 L 495 60 L 485 65"
              stroke="var(--page-accent)"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.7"
            />
          </svg>
        </div>

        <p
          style={{
            fontSize: 14,
            color: "var(--page-text-2)",
            marginTop: 64,
            margin: 0,
            marginBlockStart: 64,
            lineHeight: 1.6,
          }}
        >
          No app for the site team to download. No training. They use
          WhatsApp, the way they already do.
        </p>
      </div>

      <style jsx>{`
        .sn-bridge {
          position: relative;
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
        }
        .sn-bridge-node {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .sn-bridge-icon {
          width: 56px;
          height: 56px;
          border-radius: 9999px;
          border: 1px solid rgba(155, 126, 200, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--page-surface);
          z-index: 1;
        }
        .sn-bridge-svg {
          display: none;
        }
        @media (min-width: 720px) {
          .sn-bridge {
            grid-template-columns: repeat(3, 1fr);
            gap: 24px;
            align-items: flex-start;
          }
          .sn-bridge-svg {
            display: block;
            position: absolute;
            top: 12px;
            left: 0;
            right: 0;
            width: 100%;
            height: 56px;
            pointer-events: none;
          }
        }
      `}</style>
    </section>
  );
}
