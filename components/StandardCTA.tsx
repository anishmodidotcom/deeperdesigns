import Link from "next/link";
import TrackedWhatsAppLink from "@/components/TrackedWhatsAppLink";
import { WHATSAPP_HREF } from "@/lib/contact";

// v26: the standard DD lead CTA pair, so the new page families do not each
// reinvent it. Same two actions and the same classes the rest of the site
// already uses. `note` renders the page's own closing line above the pair.
export default function StandardCTA({ note }: { note?: string }) {
  return (
    <section style={{ padding: "var(--section-py) 0" }}>
      <div className="container" style={{ maxWidth: "880px" }}>
        {note ? (
          <p
            style={{
              fontSize: "18px",
              lineHeight: 1.6,
              color: "var(--fg-muted)",
              margin: "0 0 28px",
              maxWidth: "620px",
            }}
          >
            {note}
          </p>
        ) : null}
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <Link href="/start-your-study" className="btn-whatsapp">
            Book a free strategy call
          </Link>
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
