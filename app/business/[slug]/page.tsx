import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SEGMENTS, getSegment } from "@/lib/segments";
import { getSoftware } from "@/lib/software";
import { StructuredData } from "@/components/StructuredData";
import StandardCTA from "@/components/StandardCTA";
import { renderSerif } from "@/components/industry/text";

// v26 Part 7: the B2B segments layer. All seven pages come from
// lib/segments.ts. Lighter than the /for industry pages by design: no coded
// demos, just the daily reality, what we build, and links into the software
// index.

export function generateStaticParams() {
  return SEGMENTS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const segment = getSegment(slug);
  if (!segment) {
    return { title: "Not found · Deeper Designs", robots: { index: false } };
  }
  const url = `/business/${segment.slug}`;
  return {
    title: segment.metaTitle,
    description: segment.metaDescription,
    alternates: { canonical: url },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
    openGraph: {
      title: segment.metaTitle,
      description: segment.metaDescription,
      url,
      siteName: "Deeper Designs",
      type: "website",
      images: [
        {
          url: "/brand/og-deeperdesigns.png",
          width: 1200,
          height: 630,
          alt: segment.metaTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: segment.metaTitle,
      description: segment.metaDescription,
      images: ["/brand/og-deeperdesigns.png"],
    },
  };
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
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
      {children}
    </h2>
  );
}

function PlainList({ items }: { items: string[] }) {
  return (
    <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
      {items.map((item) => (
        <li
          key={item}
          style={{
            fontSize: "17px",
            lineHeight: 1.55,
            color: "var(--fg)",
            paddingBlock: "14px",
            borderTop: "1px solid var(--border)",
          }}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

export default async function BusinessSegmentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const segment = getSegment(slug);
  if (!segment) notFound();

  const related = segment.related
    .map((r) => getSoftware(r))
    .filter((r): r is NonNullable<typeof r> => Boolean(r));

  const ld = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Custom software for ${segment.name.toLowerCase()}`,
    serviceType: "Custom business software",
    description: segment.metaDescription,
    provider: {
      "@type": "Organization",
      name: "Deeper Designs",
      url: "https://www.deeperdesigns.in",
    },
    areaServed: "India",
    url: `https://www.deeperdesigns.in/business/${segment.slug}`,
  };

  return (
    <main id="main" style={{ paddingTop: "120px" }}>
      <StructuredData data={ld} />

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
            {renderSerif(segment.heading)}
          </h1>
          <p
            style={{
              fontSize: "21px",
              color: "var(--fg-muted)",
              lineHeight: 1.6,
              maxWidth: "700px",
            }}
          >
            Here is where businesses like yours usually lose time and money.
          </p>
        </div>
      </section>

      <section style={{ paddingBottom: "var(--section-py)" }}>
        <div className="container bseg-grid" style={{ maxWidth: "880px" }}>
          <div>
            <SectionLabel>The daily reality</SectionLabel>
            <PlainList items={segment.pains} />
          </div>
          <div>
            <SectionLabel>What we build for you</SectionLabel>
            <PlainList items={segment.builds} />
          </div>
        </div>
      </section>

      <section style={{ paddingBottom: "var(--section-py)" }}>
        <div className="container" style={{ maxWidth: "880px" }}>
          <SectionLabel>Related tools</SectionLabel>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/software/${r.slug}`}
                className="mono bseg-chip"
                style={{ fontSize: "13px" }}
              >
                {r.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <StandardCTA />

      <style>{`
        .bseg-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 56px;
        }
        @media (max-width: 767px) {
          .bseg-grid { grid-template-columns: 1fr; gap: 40px; }
        }
        .bseg-chip {
          letter-spacing: 0.04em;
          color: var(--fg);
          border: 1px solid var(--border-strong);
          border-radius: 999px;
          padding: 9px 16px;
          transition: border-color 150ms var(--ease-out);
        }
        .bseg-chip:hover { border-color: var(--fg); }
      `}</style>
    </main>
  );
}
