import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SOFTWARE, getSoftware, type SoftwareGroupId } from "@/lib/software";
import { getSegment } from "@/lib/segments";
import { getIndustry } from "@/lib/industries";
import { StructuredData } from "@/components/StructuredData";
import StandardCTA from "@/components/StandardCTA";
import MidPageCTA from "@/components/MidPageCTA";
import SoftwareAnalytics from "@/components/SoftwareAnalytics";
import { renderSerif } from "@/components/industry/text";

// v26 Part 6: one template for all 30 category pages, driven entirely by
// lib/software.ts. Five parts per page: heading, what it does, what it
// usually costs, what we build instead, and the CTA with related links.

export function generateStaticParams() {
  return SOFTWARE.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getSoftware(slug);
  if (!item) {
    return { title: "Not found · Deeper Designs", robots: { index: false } };
  }
  const title = `${item.name} · Deeper Designs`;
  const description = `${item.does} What the well-known names charge, and what your own version costs to build instead.`;
  const url = `/software/${item.slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
    openGraph: {
      title,
      description,
      url,
      siteName: "Deeper Designs",
      type: "website",
      images: [
        {
          url: "/brand/og-deeperdesigns.png",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
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
        margin: "0 0 18px",
      }}
    >
      {children}
    </h2>
  );
}

// v28 Part 3: one closing line per group. Assigned by group rather than by
// entry so it stays honest without becoming thirty variations of the same
// sentence. People and visibility share one line.
const GROUP_CLOSER: Record<SoftwareGroupId, string> = {
  money: "Built to sit alongside your accounts, not on top of them.",
  operations:
    "Built around how your business actually counts, moves and makes things.",
  selling: "Built for every person on your team, with no per-seat bill.",
  people:
    "Built so the numbers you check every morning are already there.",
  visibility:
    "Built so the numbers you check every morning are already there.",
  specialist:
    "Built for a workflow the big software vendors never bothered to learn.",
};

function joinNames(names: string[]): string {
  if (names.length === 1) return names[0];
  return `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
}

export default async function SoftwarePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getSoftware(slug);
  if (!item) notFound();

  const related = item.related
    .map((r) => getSoftware(r))
    .filter((r): r is NonNullable<typeof r> => Boolean(r));
  const segments = (item.segments ?? [])
    .map((s) => getSegment(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
  const industries = (item.industries ?? [])
    .map((i) => getIndustry(i))
    .filter((i): i is NonNullable<typeof i> => Boolean(i));

  // Service node for the custom build. No reviews, no ratings.
  const ld = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Custom ${item.name.toLowerCase()} built for your business`,
    serviceType: item.name,
    description: item.does,
    provider: {
      "@type": "Organization",
      name: "Deeper Designs",
      url: "https://www.deeperdesigns.in",
    },
    areaServed: "India",
    url: `https://www.deeperdesigns.in/software/${item.slug}`,
  };

  return (
    <main id="main" style={{ paddingTop: "120px" }}>
      <SoftwareAnalytics slug={item.slug} />
      <StructuredData data={ld} />

      <section style={{ padding: "60px 0 var(--section-py)" }}>
        <div className="container" style={{ maxWidth: "820px" }}>
          <Link
            href="/software"
            className="mono"
            style={{
              fontSize: "11px",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--fg-dim)",
              display: "inline-block",
              marginBottom: "24px",
            }}
          >
            All software
          </Link>
          <h1
            style={{
              fontSize: "var(--fs-display)",
              fontWeight: 500,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            {renderSerif(item.heading)}
          </h1>
        </div>
      </section>

      <section style={{ paddingBottom: "var(--section-py)" }}>
        <div className="container" style={{ maxWidth: "820px" }}>
          <SectionLabel>What it does</SectionLabel>
          <p style={{ fontSize: "19px", lineHeight: 1.6, color: "var(--fg)", margin: 0 }}>
            {item.does}
          </p>
        </div>
      </section>

      <section style={{ paddingBottom: "var(--section-py)" }}>
        <div className="container" style={{ maxWidth: "820px" }}>
          {/* v28 Part 1: a category with real named products gets the
              product-list label. A category where no standalone product
              exists gets its own label, so a commentary sentence is never
              rendered where a list of product names belongs. */}
          <SectionLabel>
            {item.incumbents ? "What it usually costs" : "The state of this category"}
          </SectionLabel>
          {item.incumbents ? (
            <p style={{ fontSize: "19px", lineHeight: 1.6, color: "var(--fg)", margin: 0 }}>
              Well-known options include {joinNames(item.incumbents)}.{" "}
              {item.costAnchor}
            </p>
          ) : (
            <>
              <p style={{ fontSize: "19px", lineHeight: 1.6, color: "var(--fg)", margin: 0 }}>
                {item.categoryState}
              </p>
              <p
                style={{
                  fontSize: "19px",
                  lineHeight: 1.6,
                  color: "var(--fg)",
                  marginTop: "16px",
                }}
              >
                {item.costAnchor}
              </p>
            </>
          )}

          {/* v28 Part 2: a verified public list price, or the honest line.
              Nothing here is estimated. */}
          {item.price ? (
            <p
              style={{
                fontSize: "17px",
                lineHeight: 1.6,
                color: "var(--fg-muted)",
                marginTop: "20px",
              }}
            >
              {item.price.vendor}, {item.price.plan}: {item.price.rate}. Checked
              on {item.price.source}, {item.price.verifiedOn}.
            </p>
          ) : (
            <p
              style={{
                fontSize: "17px",
                lineHeight: 1.6,
                color: "var(--fg-muted)",
                marginTop: "20px",
              }}
            >
              This category does not publish public pricing. Vendors quote per
              business, which is part of why comparing is hard.
            </p>
          )}

          <p
            style={{
              fontSize: "17px",
              lineHeight: 1.6,
              color: "var(--fg-muted)",
              marginTop: "12px",
            }}
          >
            See the five-year arithmetic on{" "}
            <Link href="/what-software-costs" style={{ color: "var(--accent)" }}>
              what software actually costs
            </Link>
            .
          </p>
        </div>
      </section>

      <section style={{ paddingBottom: "var(--section-py)" }}>
        <div className="container" style={{ maxWidth: "820px" }}>
          <SectionLabel>What we build instead</SectionLabel>
          <p style={{ fontSize: "19px", lineHeight: 1.6, color: "var(--fg)", margin: 0 }}>
            {item.build}
          </p>
          {/* v28 Part 3: the repeated pitch sentence is gone. A short line
              per group closes the section instead, so it varies rather than
              reading as the same template thirty times. The integrateOnly
              entries get nothing: their own text is the honest ending. */}
          {!item.integrateOnly && GROUP_CLOSER[item.group] ? (
            <p
              style={{
                fontSize: "19px",
                lineHeight: 1.6,
                color: "var(--fg-muted)",
                marginTop: "20px",
              }}
            >
              {GROUP_CLOSER[item.group]}
            </p>
          ) : null}
        </div>
      </section>

      <MidPageCTA />

      {related.length > 0 || segments.length > 0 || industries.length > 0 ? (
        <section style={{ paddingBottom: "var(--section-py)" }}>
          <div className="container" style={{ maxWidth: "820px" }}>
            <SectionLabel>Related</SectionLabel>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/software/${r.slug}`}
                  className="mono sw-chip"
                  style={{ fontSize: "13px" }}
                >
                  {r.name}
                </Link>
              ))}
              {segments.map((s) => (
                <Link
                  key={s.slug}
                  href={`/business/${s.slug}`}
                  className="mono sw-chip"
                  style={{ fontSize: "13px" }}
                >
                  For {s.name.toLowerCase()}
                </Link>
              ))}
              {industries.map((i) => (
                <Link
                  key={i.slug}
                  href={`/for/${i.slug}`}
                  className="mono sw-chip"
                  style={{ fontSize: "13px" }}
                >
                  For {i.name.toLowerCase()}
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <StandardCTA />

      <style>{`
        .sw-chip {
          letter-spacing: 0.04em;
          color: var(--fg);
          border: 1px solid var(--border-strong);
          border-radius: 999px;
          padding: 9px 16px;
          transition: border-color 150ms var(--ease-out);
        }
        .sw-chip:hover { border-color: var(--fg); }
      `}</style>
    </main>
  );
}
