import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { INDUSTRIES, getIndustry } from "@/lib/industries";
import AnishNote from "@/components/AnishNote";
import EditorialPullQuote from "@/components/EditorialPullQuote";
import IndustryHero from "@/components/industry/IndustryHero";
import DayShift from "@/components/industry/DayShift";
import BuildRow from "@/components/industry/BuildRow";
import PaybackLedger from "@/components/industry/PaybackLedger";
import IndustryVoices from "@/components/industry/IndustryVoices";
import IndustryPersonas from "@/components/industry/IndustryPersonas";
import IndustryCTA from "@/components/industry/IndustryCTA";
import IndustrySwitcher from "@/components/industry/IndustrySwitcher";
import IndustryScaffold from "@/components/industry/IndustryScaffold";
import ForAnalytics from "@/components/industry/ForAnalytics";
import { StructuredData, forIndustryLd } from "@/components/StructuredData";

export function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) {
    return { title: "Not found · Deeper Designs", robots: { index: false } };
  }
  const url = `/for/${industry.slug}`;
  const { title, description } = industry.meta;
  // v19.7: branded per-industry OG card from the dynamic /api/og route, so
  // shares render the vertical's accent and headline, not the generic card.
  const ogImage = `/api/og/${industry.slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    // v19.8: assert indexability explicitly. The pages were always
    // index-able in code (no noindex is emitted for a live industry), but a
    // Bing audit showed three of them cached as "Indexing allowed: No" after
    // being crawled during their preview-deploy window (Vercel adds
    // X-Robots-Tag: noindex to non-production deploys). A positive
    // index,follow directive is the strongest signal to flip that cached
    // verdict on re-crawl.
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    // openGraph does not deep-merge with the root layout here, so siteName
    // and every other field are set explicitly on each route.
    openGraph: {
      title,
      description,
      url,
      siteName: "Deeper Designs",
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `Deeper Designs · ${industry.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();

  // Per-page accent wired through the existing --page-accent mechanism.
  // Components read these variables; no vertical colors are hardcoded.
  const pageStyle = {
    "--page-accent": industry.accent,
    "--page-accent-soft": industry.accentSoft,
    "--page-money": industry.money,
    background: "var(--dd-bg, #0A0A0A)",
    color: "var(--dd-text-high, #F5F5F5)",
  } as React.CSSProperties;

  if (!industry.live) {
    return (
      <main id="main" style={pageStyle}>
        <IndustryScaffold industry={industry} />
      </main>
    );
  }

  // v19.7: per-industry Service schema with the builds as an offer catalog,
  // India everywhere plus UAE on real-estate (the page already notes Dubai/GCC).
  const areaServed =
    industry.slug === "real-estate"
      ? ["India", "United Arab Emirates"]
      : ["India"];
  const industryLd = forIndustryLd({
    name: industry.name,
    slug: industry.slug,
    description: industry.meta.description,
    builds: (industry.builds ?? []).map((b) => b.kicker),
    areaServed,
  });

  return (
    <main id="main" style={pageStyle}>
      <ForAnalytics slug={industry.slug} />
      <StructuredData data={industryLd} />
      <IndustryHero industry={industry} />

      {industry.anishNote ? (
        <div
          className="container"
          style={{ maxWidth: "var(--dd-container-max, 1280px)" }}
        >
          <AnishNote text={industry.anishNote} align="right" variant="inline" />
        </div>
      ) : null}

      {industry.nowItems && industry.aiItems ? (
        <DayShift
          nowHeadline={industry.nowHeadline as string}
          nowIntro={industry.nowIntro as string}
          nowItems={industry.nowItems}
          aiHeadline={industry.aiHeadline as string}
          aiIntro={industry.aiIntro as string}
          aiItems={industry.aiItems}
        />
      ) : null}

      {industry.pullQuote ? (
        <EditorialPullQuote
          quote={industry.pullQuote.quote}
          attribution={industry.pullQuote.attribution}
          accent="var(--page-accent)"
        />
      ) : null}

      {industry.builds && industry.builds.length > 0 ? (
        <section
          id="builds"
          style={{ paddingBlock: "var(--dd-section-py, 120px)" }}
          aria-label="The builds"
        >
          <div
            className="container"
            style={{ maxWidth: "var(--dd-container-max, 1280px)" }}
          >
            <p
              className="mono"
              style={{
                fontSize: 11,
                letterSpacing: "0.16em",
                color: "var(--page-accent)",
                margin: "0 0 16px",
              }}
            >
              THE BUILDS
            </p>
            <h2
              style={{
                fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                fontWeight: 600,
                fontSize: "var(--dd-fs-h2, clamp(28px, 3.5vw, 44px))",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                color: "var(--dd-text-high, #F5F5F5)",
                margin: 0,
                maxWidth: 640,
              }}
            >
              Four working builds. Not slides about them.
            </h2>
          </div>
          <div
            className="container"
            style={{ maxWidth: "var(--dd-container-max, 1280px)", marginTop: 16 }}
          >
            {industry.builds.map((b, i) => (
              <BuildRow key={b.index} build={b} position={i} slug={industry.slug} />
            ))}
          </div>
        </section>
      ) : null}

      {industry.payback ? <PaybackLedger payback={industry.payback} /> : null}

      {industry.personas && industry.personas.length > 0 ? (
        <IndustryPersonas
          headline={industry.personasHeadline as string}
          intro={industry.personasIntro as string}
          personas={industry.personas}
        />
      ) : industry.voices ? (
        <IndustryVoices voices={industry.voices} />
      ) : null}

      {industry.cta ? (
        <IndustryCTA cta={industry.cta} slug={industry.slug} name={industry.name} />
      ) : null}

      <IndustrySwitcher currentSlug={industry.slug} />
    </main>
  );
}
