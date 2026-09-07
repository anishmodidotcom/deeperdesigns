"use client";

import Link from "next/link";
import TrackedWhatsAppLink from "@/components/TrackedWhatsAppLink";
import { WHATSAPP_HREF } from "@/lib/contact";

export default function HomeCTA() {
  return (
    <section style={{ padding: "var(--section-py) 0" }}>
      <div className="container">
        {/* v30.2: the column used to be centred by narrowing the
            container itself, which pushed the heading in from the
            house measure. The container stays full width and the
            column is set on the block inside it, so the left edge
            sits at 128 at 1440 like every other section. */}
        <div style={{ maxWidth: "880px" }}>
        <h2 style={{ fontSize: "var(--fs-h1)", fontWeight: 500, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "32px" }}>
          What could you build next?
        </h2>
        {/* v27: the supporting line is replaced with the approved voice
            line, which asks less of the reader and points at the same CTA. */}
        <p style={{ fontSize: "18px", color: "var(--fg-muted)", maxWidth: "600px", marginBottom: "40px" }}>
          Still not sure where to start? Talk to us.
        </p>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <Link href="/start-your-study" className="btn-whatsapp">Talk to us</Link>
          <TrackedWhatsAppLink
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            Or message us on WhatsApp
          </TrackedWhatsAppLink>
        </div>
        </div>
      </div>
    </section>
  );
}
