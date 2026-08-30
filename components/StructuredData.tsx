type JsonLd = Record<string, unknown>;

export function StructuredData({ data }: { data: JsonLd | JsonLd[] }) {
  const payload = Array.isArray(data) ? data : [data];
  return (
    <>
      {payload.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}

export const ORGANIZATION_LD: JsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Deeper Designs",
  url: "https://www.deeperdesigns.in",
  // v25.5: was the 1200x630 social card, which is not a logo. The
  // monogram is the actual brand mark.
  logo: "https://www.deeperdesigns.in/brand/monogram-email.png",
  description:
    "India-first AI-led build studio for ambitious businesses. We design and build digital tools, sites, and operational systems.",
  founder: {
    "@type": "Person",
    name: "Anish Modi",
    url: "https://anishmodi.com",
  },
  // v25.5: "Delhi · Dubai" is not a locality. Two cities means two
  // PostalAddress nodes, each with its own country, which is what
  // schema.org expects and what a parser can actually read.
  address: [
    {
      "@type": "PostalAddress",
      addressLocality: "Delhi",
      addressCountry: "IN",
    },
    {
      "@type": "PostalAddress",
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-99687-16498",
    contactType: "Customer Service",
    email: "anish.modi@deeperdesigns.in",
    areaServed: ["IN", "AE"],
    availableLanguage: ["en"],
  },
  sameAs: [
    "https://instagram.com/deeperdesignsco",
    "https://linkedin.com/company/deeperdesigns",
    "https://anishmodi.com",
  ],
};

// v19.7: per /for/[slug] industry page. A Service node provided by Deeper
// Designs, with an OfferCatalog of the page's builds as the services offered.
// References the existing Organization brand identity; no fabricated reviews.
export function forIndustryLd(args: {
  name: string;
  slug: string;
  description: string;
  builds: string[];
  areaServed: string[];
}): JsonLd {
  const url = `https://www.deeperdesigns.in/for/${args.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `AI systems for ${args.name}`,
    serviceType: `AI build studio for ${args.name}`,
    description: args.description,
    url,
    provider: {
      "@type": "Organization",
      name: "Deeper Designs",
      url: "https://www.deeperdesigns.in",
    },
    areaServed: args.areaServed.map((c) => ({ "@type": "Country", name: c })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Builds for ${args.name}`,
      itemListElement: args.builds.map((b) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: b },
      })),
    },
  };
}

// v25.5: `concept` marks a demonstration build rather than a delivered
// client engagement. The showcase pages say so on the page and the social
// card carries a CONCEPT eyebrow, but the structured data did not, so a
// machine reader ingested a fictional outcome as a real case study.
// creativeWorkStatus and the disambiguating description carry that
// disclosure into the schema. Defaults to true because all but the four
// live products are concepts; the live product pages pass false.
export function creativeWorkLd(args: {
  name: string;
  description: string;
  slug: string;
  image: string;
  archetype: string;
  concept?: boolean;
}): JsonLd {
  const isConcept = args.concept !== false;
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: args.name,
    description: args.description,
    url: `https://www.deeperdesigns.in/work/${args.slug}`,
    image: `https://www.deeperdesigns.in${args.image}`,
    creator: {
      "@type": "Organization",
      name: "Deeper Designs",
      url: "https://www.deeperdesigns.in",
    },
    ...(isConcept
      ? {
          creativeWorkStatus: "Concept",
          disambiguatingDescription:
            "Concept build. A demonstration of what Deeper Designs builds, not a delivered client engagement. The business shown is illustrative.",
        }
      : {}),
    about: args.archetype,
    workExample: {
      "@type": "WebApplication",
      name: args.name,
      applicationCategory: "BusinessApplication",
    },
  };
}
