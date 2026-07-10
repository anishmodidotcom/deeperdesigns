"use client";

import Link from "next/link";
import TrackedWhatsAppLink from "@/components/TrackedWhatsAppLink";
import { WHATSAPP_HREF } from "@/lib/contact";

export default function HomeCTA() {
  return (
    <section style={{ padding: "var(--section-py) 0" }}>
      <div className="container" style={{ textAlign: "center", maxWidth: "880px" }}>
        <h2 style={{ fontSize: "var(--fs-h1)", fontWeight: 500, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "32px" }}>
          What could you build next?
        </h2>
        <p style={{ fontSize: "18px", color: "var(--fg-muted)", maxWidth: "600px", marginInline: "auto", marginBottom: "40px" }}>
          If something here made you think of your business, that&apos;s the point. Let&apos;s see what we can build.
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/start-your-study" className="btn-whatsapp">Book a free strategy call</Link>
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
    </section>
  );
}
