import type { Metadata } from "next";
import Link from "next/link";
import { SOFTWARE_GROUPS, softwareByGroup } from "@/lib/software";
import { SEGMENTS } from "@/lib/segments";
import { StructuredData } from "@/components/StructuredData";
import StandardCTA from "@/components/StandardCTA";
import { renderSerif } from "@/components/industry/text";

// v26 Part 6: the master software index. Every category page is generated
// from lib/software.ts; nothing here is hand-written per entry.

const DESCRIPTION =
  "What each kind of business software actually does, what the well-known names charge for it, and what it costs to have your own version built instead.";

export const metadata: Metadata = {
  title: "Every Kind of Business Software · Deeper Designs",
  description: DESCRIPTION,
  alternates: { canonical: "https://www.deeperdesigns.in/software" },
  openGraph: {
    title: "Every Kind of Business Software · Deeper Designs",
    description: DESCRIPTION,
    url: "https://www.deeperdesigns.in/software",
    siteName: "Deeper Designs",
    images: [
      {
        url: "/brand/og-deeperdesigns.png",
        width: 1200,
        height: 630,
        alt: "Every Kind of Business Software · Deeper Designs",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Every Kind of Business Software · Deeper Designs",
    description: DESCRIPTION,
    images: ["/brand/og-deeperdesigns.png"],
  },
};

const INDEX_LD = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Every kind of business software",
  description: DESCRIPTION,
  url: "https://www.deeperdesigns.in/software",
  isPartOf: {
    "@type": "Organization",
    name: "Deeper Designs",
    url: "https://www.deeperdesigns.in",
  },
};

export default function SoftwareIndex() {
  return (
    <main id="main" style={{ paddingTop: "120px" }}>
      <StructuredData data={INDEX_LD} />

      <section style={{ padding: "60px 0 var(--section-py)" }}>
        <div className="container" style={{ maxWidth: "880px" }}>
          <h1
            style={{
              fontSize: "var(--fs-display)",
              fontWeight: 500,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              marginBottom: "32px",
            }}
          >
            {renderSerif(
              "Every kind of business software, {serif}and what it costs you.{/serif}",
            )}
          </h1>
          <p
            style={{
              fontSize: "21px",
              color: "var(--fg-muted)",
              lineHeight: 1.6,
              maxWidth: "760px",
            }}
          >
            Most business software is rented by the seat, forever. Below is
            what each kind actually does, what the well-known names charge for
            it, and what it costs to have your own version built instead. Your
            own version is shaped around how you already work, and you own it.
          </p>
        </div>
      </section>

      {SOFTWARE_GROUPS.map((group) => {
        const items = softwareByGroup(group.id);
        if (items.length === 0) return null;
        return (
          <section key={group.id} style={{ paddingBottom: "var(--section-py)" }}>
            <div className="container" style={{ maxWidth: "880px" }}>
              <h2
                className="mono"
                style={{
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--dd-eyebrow-on-dark)",
                  margin: "0 0 20px",
                }}
              >
                {group.title}
              </h2>
              <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {items.map((item) => (
                  <li key={item.slug} style={{ borderTop: "1px solid var(--border)" }}>
                    <Link
                      href={`/software/${item.slug}`}
                      className="sw-row"
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "baseline",
                        gap: "12px",
                        paddingBlock: "18px",
                      }}
                    >
                      <span style={{ fontSize: "17px", color: "var(--fg)", fontWeight: 500 }}>
                        {item.name}
                      </span>
                      <span style={{ fontSize: "15px", color: "var(--fg-muted)", flex: 1, minWidth: "220px" }}>
                        {item.does}
                      </span>
                      <span aria-hidden style={{ color: "var(--accent)" }}>
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        );
      })}

      <section style={{ paddingBottom: "var(--section-py)" }}>
        <div className="container" style={{ maxWidth: "880px" }}>
          <h2
            className="mono"
            style={{
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--dd-eyebrow-on-dark)",
              margin: "0 0 20px",
            }}
          >
            By kind of business
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {SEGMENTS.map((s) => (
              <Link
                key={s.slug}
                href={`/business/${s.slug}`}
                className="mono"
                style={{
                  fontSize: "13px",
                  letterSpacing: "0.04em",
                  color: "var(--fg)",
                  border: "1px solid var(--border-strong)",
                  borderRadius: "999px",
                  padding: "9px 16px",
                }}
              >
                {s.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <StandardCTA note="Not sure which of these you need? That is what the free call is for." />

      <style>{`
        .sw-row { transition: opacity 150ms var(--ease-out); }
        .sw-row:hover { opacity: 0.72; }
      `}</style>
    </main>
  );
}
