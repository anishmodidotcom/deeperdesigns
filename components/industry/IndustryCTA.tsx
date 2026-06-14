"use client";

import { Link } from "next-view-transitions";
import { motion } from "motion/react";
import TrackedWhatsAppLink from "@/components/TrackedWhatsAppLink";
import { WHATSAPP_HREF } from "@/lib/contact";
import type { Industry } from "@/lib/industries";
import { renderSerif } from "./text";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function IndustryCTA({
  cta,
  slug,
  name,
}: {
  cta: NonNullable<Industry["cta"]>;
  slug: string;
  name: string;
}) {
  return (
    <section style={{ paddingBlock: "var(--dd-section-py, 120px)" }} aria-label="Book a teardown">
      <div className="container" style={{ maxWidth: "var(--dd-container-max, 1280px)" }}>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{
            background: "var(--dd-surface-1, #111111)",
            border: "1px solid var(--dd-border, rgba(255,255,255,0.08))",
            borderRadius: 22,
            padding: "clamp(32px, 5vw, 64px)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Subtle accent wash, single hue, no purple-to-blue gradient */}
          <span
            aria-hidden
            style={{
              position: "absolute",
              top: -120,
              right: -80,
              width: 320,
              height: 320,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, color-mix(in srgb, var(--page-accent) 26%, transparent) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <div style={{ position: "relative", maxWidth: 620 }}>
            <h2
              style={{
                fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                fontWeight: 600,
                fontSize: "var(--dd-fs-h2, clamp(28px, 3.5vw, 44px))",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                color: "var(--dd-text-high, #F5F5F5)",
                margin: 0,
              }}
            >
              {renderSerif(cta.headline)}
            </h2>
            <p
              style={{
                marginTop: 20,
                fontSize: 18,
                lineHeight: 1.6,
                color: "var(--dd-text-mid, #A8A8A8)",
                maxWidth: 520,
              }}
            >
              {cta.body}
            </p>

            <div
              style={{
                marginTop: 28,
                display: "flex",
                flexWrap: "wrap",
                gap: 10,
              }}
            >
              {cta.chips.map((c) => (
                <span
                  key={c}
                  className="mono"
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.08em",
                    color: "var(--dd-text-mid, #A8A8A8)",
                    border: "1px solid var(--dd-border-strong, rgba(255,255,255,0.16))",
                    borderRadius: 999,
                    padding: "7px 13px",
                  }}
                >
                  {c}
                </span>
              ))}
            </div>

            <div
              style={{
                marginTop: 36,
                display: "flex",
                flexWrap: "wrap",
                gap: 14,
              }}
            >
              <Link
                href="/start-your-study"
                className="ind-cta-primary"
                style={{
                  background: "var(--page-accent)",
                  color: "#0A0A0A",
                  padding: "15px 28px",
                  borderRadius: 999,
                  fontWeight: 600,
                  fontSize: 15,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                Book a teardown
              </Link>
              <TrackedWhatsAppLink
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                showcaseSlug={slug}
                showcaseIndustry={name}
                className="ind-cta-wa"
                style={{
                  background: "var(--whatsapp, #25D366)",
                  color: "#0A0A0A",
                  padding: "15px 28px",
                  borderRadius: 999,
                  fontWeight: 600,
                  fontSize: 15,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                WhatsApp us
              </TrackedWhatsAppLink>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        .ind-cta-primary { transition: filter 150ms var(--dd-ease-out, ease); }
        .ind-cta-primary:hover { filter: brightness(1.08); }
        .ind-cta-primary:active { transform: translateY(1px); }
        .ind-cta-wa { transition: filter 150ms var(--dd-ease-out, ease); }
        .ind-cta-wa:hover { filter: brightness(1.05); }
        .ind-cta-wa:active { transform: translateY(1px); }
      `}</style>
    </section>
  );
}
