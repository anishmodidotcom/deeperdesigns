"use client";

import { Link } from "next-view-transitions";
import { motion } from "motion/react";
import type { IndustryBuild } from "@/lib/industries";
import { getDemo } from "./demos/registry";
import BrowserFrame from "./frames/BrowserFrame";
import PhoneFrame from "./frames/PhoneFrame";
import VideoFrame from "./frames/VideoFrame";
import { FORM_HREF } from "@/lib/contact";
import { renderSerif, renderBold } from "./text";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function BuildRow({
  build,
  position,
}: {
  build: IndustryBuild;
  position: number; // 0-based, decides which side the demo sits on
}) {
  // v19.1: prefer a real screenshot inside a device frame; fall back to a
  // legacy CSS widget only if no frame/shot is declared.
  const Demo = getDemo(build.demo);
  const demoFirst = position % 2 === 1; // alternate sides

  return (
    <div
      style={{
        paddingBlock: "clamp(56px, 8vh, 96px)",
        borderTop: "1px solid var(--dd-border, rgba(255,255,255,0.08))",
      }}
    >
      <div className={`ind-build ${demoFirst ? "ind-build--flip" : ""}`}>
        {/* Copy column */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="ind-build__copy"
        >
          <p
            className="mono"
            style={{
              fontSize: 11,
              letterSpacing: "0.16em",
              color: "var(--page-accent)",
              margin: "0 0 20px",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span style={{ color: "var(--dd-text-low, #6B6B6B)" }}>
              {build.index}
            </span>
            <span aria-hidden style={{ width: 24, height: 1, background: "var(--page-accent)" }} />
            {build.kicker}
          </p>

          <h3
            style={{
              fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
              fontWeight: 600,
              fontSize: "clamp(26px, 3vw, 38px)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "var(--dd-text-high, #F5F5F5)",
              margin: 0,
              maxWidth: 460,
            }}
          >
            {renderSerif(build.headline)}
          </h3>

          <p
            style={{
              marginTop: 20,
              fontSize: 16.5,
              lineHeight: 1.6,
              color: "var(--dd-text-mid, #A8A8A8)",
              maxWidth: 460,
            }}
          >
            {build.body}
          </p>

          <ul
            style={{
              listStyle: "none",
              margin: "28px 0 0",
              padding: 0,
              display: "flex",
              flexDirection: "column",
              gap: 14,
              maxWidth: 460,
            }}
          >
            {build.bullets.map((b, i) => (
              <li
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 14,
                  fontSize: 15,
                  lineHeight: 1.5,
                  color: "var(--dd-text-mid, #A8A8A8)",
                }}
              >
                <span
                  aria-hidden
                  style={{
                    flexShrink: 0,
                    marginTop: 9,
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "var(--page-accent)",
                  }}
                />
                <span>{renderBold(b)}</span>
              </li>
            ))}
          </ul>

          {/* Per-block CTA to the site's primary lead form. */}
          <Link href={FORM_HREF} className="ind-build__cta">
            Get this for your brand
            <span aria-hidden className="ind-build__cta-arrow">
              →
            </span>
          </Link>
        </motion.div>

        {/* Demo column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2, margin: "0px 0px -8% 0px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          className="ind-build__demo"
        >
          {build.frame === "browser" && build.shot ? (
            <BrowserFrame
              src={build.shot}
              alt={`${build.kicker} build, a real screenshot`}
              url={build.demoUrl ?? ""}
              width={build.shotW ?? 1440}
              height={build.shotH ?? 900}
            />
          ) : build.frame === "phone" && build.shot ? (
            <PhoneFrame
              src={build.shot}
              alt={`${build.kicker} build, a real screenshot`}
              width={build.shotW ?? 390}
              height={build.shotH ?? 844}
            />
          ) : build.frame === "video" && build.poster ? (
            <VideoFrame
              poster={build.poster}
              src={build.video}
              alt={`${build.kicker} build, a property walkthrough film`}
              aspect={build.videoAspect ?? "16:9"}
              duration={build.videoDuration ?? "0:08"}
            />
          ) : Demo ? (
            <Demo />
          ) : null}
        </motion.div>
      </div>

      <style>{`
        .ind-build {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
          align-items: center;
        }
        .ind-build__demo {
          display: flex;
          justify-content: center;
        }
        .ind-build__cta {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          margin-top: 30px;
          font-size: 15px;
          font-weight: 500;
          color: var(--page-accent);
          text-decoration: none;
          width: fit-content;
        }
        .ind-build__cta-arrow {
          display: inline-block;
          transition: transform 250ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .ind-build__cta:hover .ind-build__cta-arrow { transform: translateX(5px); }
        .ind-build__cta:active { transform: translateY(1px); }
        @media (min-width: 1024px) {
          .ind-build {
            grid-template-columns: 1fr 1fr;
            gap: 72px;
          }
          .ind-build--flip .ind-build__copy { order: 2; }
          .ind-build--flip .ind-build__demo { order: 1; }
        }
      `}</style>
    </div>
  );
}
