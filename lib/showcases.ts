// Single source of truth for the Possibility Studies gallery.
// Drives the homepage filter router, the gallery cards, and the
// filter-aware Next study chain on individual showcase pages.

export const OBJECTIVES = [
  "Customer Experience",
  "Operations",
  "Growth",
  "Founder Overload",
] as const;

export type Objective = (typeof OBJECTIVES)[number];

export const INDUSTRIES = [
  "F&B / Restaurants",
  "Wellness / Beauty / Skincare",
  "Retail / D2C",
  "Professional Services",
  "Manufacturing / Industrial",
  "Hospitality / Travel",
  "Healthcare / Clinics",
  "Creative / Studios",
  "Agriculture / Farms",
  "Other",
] as const;

export type Industry = (typeof INDUSTRIES)[number];

export type Showcase = {
  number: string;
  name: string;
  archetype: string;
  toolKind: string;
  industryLabel: string;
  bg: string;
  slug: string;
  image: string;
  industries: Industry[];
  objectives: Objective[];
  live?: boolean;
  liveUrl?: string;
};

export const SHOWCASES: Showcase[] = [
  {
    number: "00",
    name: "Maple Lens",
    archetype: "an Indian furniture maker",
    toolKind: "Catalog Generator",
    industryLabel: "Furniture Maker",
    bg: "#1A1612",
    slug: "maplelens",
    image: "/images/maplelens/hero-catalog.jpg",
    industries: ["Retail / D2C", "Creative / Studios"],
    objectives: ["Customer Experience", "Growth"],
    live: true,
    liveUrl: "https://maplelens.vercel.app/app",
  },
  {
    number: "01",
    name: "Veda Glow",
    archetype: "an Ayurvedic skincare D2C brand",
    toolKind: "Skin Advisor",
    industryLabel: "Ayurvedic D2C",
    bg: "#2D1810",
    slug: "veda-glow",
    image: "/images/veda-glow/hero-bottle.webp",
    industries: ["Wellness / Beauty / Skincare", "Retail / D2C"],
    objectives: ["Customer Experience", "Growth"],
  },
  {
    number: "02",
    name: "Bharat Steel Corp",
    archetype: "a B2B steel trading company",
    toolKind: "Inventory Dashboard",
    industryLabel: "B2B Industrial",
    bg: "#1A1F2E",
    slug: "bharat-steel",
    image: "/images/bharat-steel/hero-coil.webp",
    industries: ["Manufacturing / Industrial"],
    objectives: ["Operations", "Founder Overload"],
  },
  {
    number: "03",
    name: "Meera Wellness",
    archetype: "a yoga and wellness studio",
    toolKind: "Wellness Hub",
    industryLabel: "Wellness Studio",
    bg: "#1C2A1E",
    slug: "meera-wellness",
    image: "/images/meera-wellness/hero-pose.webp",
    industries: ["Wellness / Beauty / Skincare", "Professional Services"],
    objectives: ["Customer Experience", "Operations"],
  },
  {
    number: "04",
    name: "Zaatar Republic",
    archetype: "a regional QSR chain",
    toolKind: "Ops Intelligence",
    industryLabel: "QSR Chain",
    bg: "#2E1F0A",
    slug: "zaatar-republic",
    image: "/images/zaatar-republic/hero-wrap.webp",
    industries: ["F&B / Restaurants"],
    objectives: ["Operations", "Founder Overload"],
  },
  {
    number: "05",
    name: "Studio Noor",
    archetype: "a boutique interior design studio",
    toolKind: "Client Portal",
    industryLabel: "Interior Design",
    bg: "#1E1A28",
    slug: "studio-noor",
    image: "/images/studio-noor/hero-room.webp",
    industries: ["Creative / Studios", "Professional Services"],
    objectives: ["Customer Experience", "Operations"],
  },
  {
    number: "06",
    name: "SmileFirst",
    archetype: "an urban dental clinic",
    toolKind: "Patient Manager",
    industryLabel: "Dental Clinic",
    bg: "#0F2028",
    slug: "smilefirst",
    image: "/images/smilefirst/hero-clinic.webp",
    industries: ["Healthcare / Clinics"],
    objectives: ["Customer Experience", "Operations", "Growth"],
  },
  {
    number: "07",
    name: "AutoBazaar",
    archetype: "a used-car dealership",
    toolKind: "Dynamic Pricing",
    industryLabel: "Used-Car Lot",
    bg: "#1F1209",
    slug: "autobazaar",
    image: "/images/autobazaar/hero-sedan.webp",
    industries: ["Retail / D2C"],
    objectives: ["Operations", "Growth"],
  },
  {
    number: "08",
    name: "StumpVision",
    archetype: "a cricket coaching academy",
    toolKind: "Academy Platform",
    industryLabel: "Coaching Academy",
    bg: "#0A1F0A",
    slug: "stumpvision",
    image: "/images/stumpvision/hero-batsman.webp",
    industries: ["Professional Services"],
    objectives: ["Customer Experience", "Growth"],
  },
  {
    number: "09",
    name: "Oud and Ember",
    archetype: "a bespoke perfume atelier",
    toolKind: "Fragrance Finder",
    industryLabel: "Perfume Atelier",
    bg: "#201518",
    slug: "oud-and-ember",
    image: "/images/oud-and-ember/hero-bottle.webp",
    industries: ["Wellness / Beauty / Skincare", "Retail / D2C"],
    objectives: ["Customer Experience", "Growth"],
  },
  {
    number: "10",
    name: "HiveDesk",
    archetype: "a neighborhood coworking space",
    toolKind: "Member Hub",
    industryLabel: "Coworking Space",
    bg: "#18181F",
    slug: "hivedesk",
    image: "/images/hivedesk/hero-space.webp",
    industries: ["Hospitality / Travel", "Professional Services"],
    objectives: ["Operations", "Founder Overload"],
  },
  {
    number: "11",
    name: "Malabar Spice House",
    archetype: "a heritage spice exporter",
    toolKind: "Brand Site",
    industryLabel: "Heritage Exporter",
    bg: "#2A1A08",
    slug: "malabar-spice",
    image: "/images/malabar-spice/hero-pepper.webp",
    industries: ["F&B / Restaurants", "Retail / D2C"],
    objectives: ["Growth", "Customer Experience"],
  },
  {
    number: "12",
    name: "PawStay",
    archetype: "a dog boarding facility",
    toolKind: "Pet Parent Portal",
    industryLabel: "Pet Boarding",
    bg: "#1A2220",
    slug: "pawstay",
    image: "/images/pawstay/hero-dog.webp",
    industries: ["Hospitality / Travel", "Professional Services"],
    objectives: ["Customer Experience", "Operations"],
  },
  {
    number: "13",
    name: "Sahaja Farms",
    archetype: "an organic farm CSA",
    toolKind: "Farm Dashboard",
    industryLabel: "Organic Farm",
    bg: "#1A2010",
    slug: "sahaja-farms",
    image: "/images/sahaja-farms/hero-field.webp",
    industries: ["Agriculture / Farms"],
    objectives: ["Operations", "Founder Overload"],
  },
  {
    number: "14",
    name: "Karan Legal",
    archetype: "an independent legal practice",
    toolKind: "Lead Qualifier",
    industryLabel: "Legal Practice",
    bg: "#14141E",
    slug: "karan-legal",
    image: "/images/karan-legal/hero-pen.webp",
    industries: ["Professional Services"],
    objectives: ["Customer Experience", "Growth", "Founder Overload"],
  },
  {
    number: "15",
    name: "Zara Fitness",
    archetype: "a personal-brand fitness platform",
    toolKind: "Training Platform",
    industryLabel: "Fitness Creator",
    bg: "#1A1A1A",
    slug: "zara-fitness",
    image: "/images/zara-fitness/hero-zara.webp",
    industries: ["Wellness / Beauty / Skincare", "Professional Services"],
    objectives: ["Growth", "Customer Experience"],
  },
  {
    number: "16",
    name: "Earth and Fire",
    archetype: "a handmade ceramics studio",
    toolKind: "Custom Product Builder",
    industryLabel: "Ceramics Studio",
    bg: "#2A1810",
    slug: "earth-and-fire",
    image: "/images/earth-and-fire/hero-vase.webp",
    industries: ["Creative / Studios", "Retail / D2C"],
    objectives: ["Customer Experience", "Growth"],
  },
  {
    number: "17",
    name: "Kadak Chai",
    archetype: "a craft chai brand",
    toolKind: "Brand Experience",
    industryLabel: "Craft Tea Brand",
    bg: "#201508",
    slug: "kadak-chai",
    image: "/images/kadak-chai/hero-tin.webp",
    industries: ["F&B / Restaurants", "Retail / D2C"],
    objectives: ["Growth", "Customer Experience"],
  },
  {
    number: "18",
    name: "Nomad Trails",
    archetype: "a Himalayan trek outfit",
    toolKind: "Trip Companion",
    industryLabel: "Trek Outfit",
    bg: "#0F1820",
    slug: "nomad-trails",
    image: "/images/nomad-trails/hero-ridge.webp",
    industries: ["Hospitality / Travel"],
    objectives: ["Customer Experience", "Growth"],
  },
  {
    number: "19",
    name: "Sugar Lane",
    archetype: "a home bakery",
    toolKind: "Order Studio",
    industryLabel: "Home Bakery",
    bg: "#201A1E",
    slug: "sugar-lane",
    image: "/images/sugar-lane/hero-cake.webp",
    industries: ["F&B / Restaurants"],
    objectives: ["Operations", "Founder Overload", "Customer Experience"],
  },
  {
    number: "20",
    name: "BrightPath",
    archetype: "a neighborhood tutoring practice",
    toolKind: "Parent Portal",
    industryLabel: "Tutoring Practice",
    bg: "#101828",
    slug: "brightpath",
    image: "/images/brightpath/hero-classroom.webp",
    industries: ["Professional Services"],
    objectives: ["Customer Experience", "Operations", "Founder Overload"],
  },
];

// Filter logic.
export function filterShowcases(
  industries: Industry[],
  objectives: Objective[]
): Showcase[] {
  return SHOWCASES.filter((s) => {
    const industryMatch =
      industries.length === 0 ||
      industries.some((i) => s.industries.includes(i));
    const objectiveMatch =
      objectives.length === 0 ||
      objectives.some((o) => s.objectives.includes(o));
    return industryMatch && objectiveMatch;
  });
}

// Find the next showcase in the filtered list given a slug.
export function nextShowcase(
  slug: string,
  industries: Industry[] = [],
  objectives: Objective[] = []
): Showcase {
  const list = filterShowcases(industries, objectives);
  if (list.length === 0) return SHOWCASES[0];
  const idx = list.findIndex((s) => s.slug === slug);
  if (idx === -1) {
    // Showcase not in current filter, fall back to global next.
    const globalIdx = SHOWCASES.findIndex((s) => s.slug === slug);
    return SHOWCASES[(globalIdx + 1) % SHOWCASES.length];
  }
  return list[(idx + 1) % list.length];
}
