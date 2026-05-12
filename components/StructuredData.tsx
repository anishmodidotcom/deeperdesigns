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
  url: "https://deeperdesigns.in",
  logo: "https://deeperdesigns.in/icon.svg",
  description:
    "An AI-led build studio that designs and ships custom digital tools for modern businesses. Possibility studies. Live products. Twenty working prototypes.",
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
  image: "https://deeperdesigns.in/images/about/anish-real.webp",
  worksFor: {
    "@type": "Organization",
    name: "Deeper Designs",
    url: "https://deeperdesigns.in",
  },
  sameAs: ["https://anishmodi.com", "https://linkedin.com/in/anishmodi"],
};

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
    name: `${args.name} · Possibility Study`,
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
