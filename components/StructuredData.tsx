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
  logo: "https://www.deeperdesigns.in/brand/og-deeperdesigns.png",
  description:
    "India-first AI-led build studio for ambitious businesses. We design and build digital tools, sites, and operational systems.",
  founder: {
    "@type": "Person",
    name: "Anish Modi",
    url: "https://anishmodi.com",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Delhi · Dubai",
    addressCountry: ["IN", "AE"],
  },
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

export const ANISH_PERSON_LD: JsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Anish Modi",
  jobTitle: "Founder, Deeper Designs",
  url: "https://anishmodi.com",
  image: "https://deeperdesigns.in/images/about/anish-portrait.webp",
  worksFor: {
    "@type": "Organization",
    name: "Deeper Designs",
    url: "https://deeperdesigns.in",
  },
  sameAs: ["https://anishmodi.com", "https://linkedin.com/in/anishmodi"],
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

export function creativeWorkLd(args: {
  name: string;
  description: string;
  slug: string;
  image: string;
  archetype: string;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: args.name,
    description: args.description,
    url: `https://deeperdesigns.in/work/${args.slug}`,
    image: `https://deeperdesigns.in${args.image}`,
    creator: {
      "@type": "Organization",
      name: "Deeper Designs",
      url: "https://deeperdesigns.in",
    },
    about: args.archetype,
    workExample: {
      "@type": "WebApplication",
      name: args.name,
      applicationCategory: "BusinessApplication",
    },
  };
}
