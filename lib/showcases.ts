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
  timeline?: string;
  pains?: string[];
  pattern?: string;
  cardLabel: string;
  cardDescription: string;
  outcome: string;
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
    image: "/images/maplelens/hero-catalog.webp",
    industries: ["Retail / D2C", "Creative / Studios"],
    objectives: ["Customer Experience", "Growth"],
    cardLabel: "A photo studio for furniture makers",
    cardDescription: "Turns workshop photos into catalog-ready studio shots.",
    outcome: "Saves ₹2L per catalog shoot",
    live: true,
    liveUrl: "https://maplelens.vercel.app/app",
  },
  {
    number: "22",
    name: "Deeper Content",
    archetype: "a Deeper Designs product",
    toolKind: "Content Engine",
    industryLabel: "Deeper Designs",
    bg: "#0E0E14",
    slug: "deeper-content",
    image: "/images/deeper-content/card.jpg",
    industries: ["Creative / Studios", "Retail / D2C"],
    objectives: ["Growth", "Operations"],
    cardLabel: "An AI engine that reasons before it generates",
    cardDescription: "Funnel stage, audience, brand, thought through before any image is made.",
    outcome: "Brand-consistent creative, every single post",
    live: true,
    liveUrl: "https://cge.deeperdesigns.in",
  },
  {
    number: "23",
    name: "Outpost",
    archetype: "a Deeper Designs product",
    toolKind: "Outreach Engine",
    industryLabel: "Deeper Designs",
    bg: "#0D0D16",
    slug: "outpost",
    image: "/images/outpost/live-hero.webp",
    industries: ["Professional Services", "Manufacturing / Industrial"],
    objectives: ["Growth", "Operations"],
    cardLabel: "Finds your next customers and starts the conversation",
    cardDescription: "Verified contacts, outreach in your voice, every reply in one inbox.",
    outcome: "Every reply, one inbox",
    live: true,
    liveUrl: "https://outpost.deeperdesigns.in",
  },
  {
    number: "24",
    name: "Oviya Studio",
    archetype: "a Deeper Designs product",
    toolKind: "Product Photo Studio",
    industryLabel: "Deeper Designs",
    bg: "#160C0E",
    slug: "oviya-studio",
    image: "/images/oviya-studio/live-hero.webp",
    industries: ["Retail / D2C", "Wellness / Beauty / Skincare"],
    objectives: ["Growth", "Customer Experience"],
    cardLabel: "A photo studio that already knows the shoot",
    cardDescription: "One photo of your piece becomes a magazine-grade shoot.",
    outcome: "Magazine-grade shoots, no photographer",
    live: true,
    liveUrl: "https://oviyastudio.com",
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
    cardLabel: "A skin advisor for an Ayurvedic brand",
    cardDescription: "Recommends a routine based on skin, lifestyle, and goals.",
    outcome: "Doubles consult-to-purchase rate",
    timeline: "5 days",
    pains: [
      "40 DMs a day. All asking the same thing.",
      "Every customer needs a different combination.",
      "Slow replies mean lost sales.",
      "PDFs do not work. Nobody reads them.",
    ],
    pattern:
      "Skincare brands. Wellness brands. Any D2C with high-volume customer questions.",
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
    cardLabel: "An inventory brain for a steel trader",
    cardDescription: "Knows what you have, what's moving, and what's about to run out.",
    outcome: "Cuts inventory checks to zero",
    timeline: "7 days",
    pains: [
      "Quotes go out on WhatsApp. Half are forgotten.",
      "Stock is a guess until someone walks the yard.",
      "The price list lives in three different Excels.",
      "A delivery slip is a photo on a phone.",
    ],
    pattern:
      "Industrial wholesalers. Building material suppliers. Any B2B running quotes on WhatsApp.",
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
    cardLabel: "A wellness hub for a yoga studio",
    cardDescription: "Holds the schedule, the packages, and the renewals in one place.",
    outcome: "Reduces no-shows by half",
    timeline: "10 days",
    pains: [
      "Bookings live on three calendars and a notebook.",
      "Renewals are remembered or forgotten by hand.",
      "Every client needs a slightly different program.",
      "The intake form is a PDF. Nobody fills it in.",
    ],
    pattern:
      "Yoga studios. Pilates studios. Therapists. Any wellness practice with packages and renewals.",
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
    cardLabel: "An ops dashboard for a QSR chain",
    cardDescription: "Reads four POS feeds at once and tells you where the day is going.",
    outcome: "Sees the day before it goes sideways",
    timeline: "12 days",
    pains: [
      "Four locations. Four POS systems. No single view.",
      "Demand is guessed. Waste is found in the trash bin.",
      "Unit economics live in a manager's head.",
      "The dashboard is a WhatsApp message at 11pm.",
    ],
    pattern:
      "QSR chains. Multi-location restaurants. Any food brand running on gut feel and a POS dump.",
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
    cardLabel: "A client portal for an interior studio",
    cardDescription: "Replaces six WhatsApp groups with one shared project space.",
    outcome: "Replaces six WhatsApp groups",
    timeline: "14 days",
    pains: [
      "Eight WhatsApp groups for one project.",
      "Material approvals get lost between chats.",
      "The client asks for status three times a day.",
      "Invoices and selections live in different folders.",
    ],
    pattern:
      "Interior designers. Architects. Any project-based service business juggling clients on WhatsApp.",
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
    cardLabel: "A patient flow manager for a dental clinic",
    cardDescription: "Books, reminds, and re-engages without anyone lifting a phone.",
    outcome: "Books a third more chairs without a receptionist",
    timeline: "10 days",
    pains: [
      "A recall list sits in a drawer.",
      "No-shows eat a third of the week.",
      "The patient form is on paper. The patient is on a phone.",
      "Follow-up is one person, on slow days, when they remember.",
    ],
    pattern:
      "Dental clinics. Med spas. Hair clinics. Any private practice losing leads to slow follow-up.",
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
    cardLabel: "A pricing engine for a used-car lot",
    cardDescription: "Prices each car daily on market data, days on lot, and competitors.",
    outcome: "Prices every car overnight",
    timeline: "8 days",
    pains: [
      "Sixty cars on the lot. Sixty pricing decisions made by feel.",
      "The competitor across the road just dropped prices. We do not know.",
      "Days on lot is a number nobody tracks.",
      "Test drives get booked over phone calls and forgotten texts.",
    ],
    pattern:
      "Used-car lots. Dealerships. Any inventory business pricing by feel.",
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
    cardLabel: "An academy platform for a cricket coaching centre",
    cardDescription: "Player cards, match stats, and parent updates without paperwork.",
    outcome: "Turns parents into paying members",
    timeline: "10 days",
    pains: [
      "Parents on the sidelines, asking how is my child doing.",
      "Stats live in a coach's notebook.",
      "Match selection feels political. It is not, but it looks it.",
      "Renewals depend on a single hand-written letter home.",
    ],
    pattern:
      "Coaching academies. Music schools. Skill-building businesses with parents on the sidelines.",
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
    cardLabel: "A fragrance finder for a perfume atelier",
    cardDescription: "Turns a five-question quiz into a personalised bottle.",
    outcome: "Personalised bottles in under 90 seconds",
    timeline: "11 days",
    pains: [
      "Fifteen scents. Every customer asks which is for me.",
      "Sampling is a counter conversation. It does not scale.",
      "The bottle has a label. The customer wants their name on it.",
      "Online conversion is half of what the boutique does.",
    ],
    pattern:
      "Bespoke perfumeries. Custom blends. Any taste-led product business with a quiz to give.",
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
    cardLabel: "A member hub for a coworking space",
    cardDescription: "Runs the floor, profiles every member, and flags churn early.",
    outcome: "Catches member churn 30 days early",
    timeline: "22 days",
    pains: [
      "Six different tools. None of them talk to each other.",
      "Churn happens silently, one missed renewal at a time.",
      "Room bookings clash. Nobody knows whose fault it is.",
      "The owner runs the floor and the spreadsheet.",
    ],
    pattern:
      "Coworking spaces. Studios with memberships. Any space-based business losing track of who is in and who is leaving.",
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
    cardLabel: "A brand site for a heritage spice exporter",
    cardDescription: "Sixty-four years of work, finally on a site that looks like Kerala.",
    outcome: "Sixty-four years, finally online",
    timeline: "8 days",
    pains: [
      "Sixty-four years of work. A website that does not show it.",
      "Buyers Google us and leave.",
      "The archive lives in a wooden cabinet in Kochi.",
      "New buyers ask for a brochure we do not have.",
    ],
    pattern:
      "Heritage exporters. Family-run trading houses. Any decades-old business whose website does not match the work.",
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
    cardLabel: "A parent portal for a dog boarding facility",
    cardDescription: "Live camera, daily tracker, and bookings, anxiety down to zero.",
    outcome: "Anxiety down to zero, retention up",
    timeline: "10 days",
    pains: [
      "Pet parents are anxious. They want a photo every hour.",
      "Bookings are taken over WhatsApp. Some get missed.",
      "Special instructions are written on a paper taped to the kennel.",
      "Owners ask for the same camera link every day.",
    ],
    pattern:
      "Boarding facilities. Salons. Service businesses with anxious clients.",
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
    cardLabel: "A farm dashboard for an organic CSA",
    cardDescription: "Plans planting, harvest, and subscriber retention from one screen.",
    outcome: "Plans the season in one screen",
    timeline: "12 days",
    pains: [
      "Two hundred acres. Decisions made over the kitchen table.",
      "Subscribers cancel and we hear about it from the delivery boy.",
      "What to plant next season is a hand-drawn map.",
      "Compost cycles are tracked on the back of an invoice book.",
    ],
    pattern:
      "CSA farms. Organic brands. Subscription-based food businesses with seasonal supply.",
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
    cardLabel: "A lead qualifier for an independent lawyer",
    cardDescription: "Intakes every prospect before the phone gets answered.",
    outcome: "Filters out 80% of bad leads",
    timeline: "9 days",
    pains: [
      "Forty intake calls a week. Three of them turn into clients.",
      "The phone rings while we are in a hearing.",
      "Every prospect needs the same five questions answered.",
      "Half the leads are not even in our practice area.",
    ],
    pattern:
      "Independent lawyers. CAs. Consultants. Any solo practice drowning in unqualified intakes.",
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
    cardLabel: "A training platform for a fitness creator",
    cardDescription: "Turns 280K followers into members, programs, and a product line.",
    outcome: "Turns 280K followers into 1,200 members",
    timeline: "12 days",
    pains: [
      "Two hundred and eighty thousand followers. No place to send them.",
      "DMs come in. None convert. They scroll on.",
      "The PDF programs feel like everyone else's PDF programs.",
      "There is no membership. There is no merch. There is only Instagram.",
    ],
    pattern:
      "Personal trainers. Fitness creators. Anyone trying to turn followers into paying members.",
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
    cardLabel: "A product builder for a ceramics studio",
    cardDescription: "Shape, glaze, finish, and a queue that the maker can live with.",
    outcome: "Made-to-order without the back-and-forth",
    timeline: "9 weeks",
    pains: [
      "Drops sell out in ninety minutes. Then silence for a month.",
      "Comments asking for custom orders. No way to take them.",
      "Photography eats half the week.",
      "The maker is at the wheel and on Instagram and on email.",
    ],
    pattern:
      "Ceramicists. Woodworkers. Any maker selling drops and running out of stock in minutes.",
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
    cardLabel: "A brand world for a craft chai company",
    cardDescription: "Tin, tea range, quiz, and a site that reads like a strong cup.",
    outcome: "A brand that reads like a strong cup",
    timeline: "7 weeks",
    pains: [
      "Three generations of blends. No brand to carry them.",
      "Wholesale is the whole business. Margins are thin.",
      "Customers ask for tins. We sell in plastic packets.",
      "The blends are stronger than the packaging.",
    ],
    pattern:
      "Wholesale-to-D2C brands. Family supply businesses going direct. Any product worth a tin.",
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
    cardLabel: "A trip companion for a Himalayan trek outfit",
    cardDescription: "Editorial site, kit list, and bookings for three trips a year.",
    outcome: "Fills three trips a year, on autopilot",
    timeline: "10 days",
    pains: [
      "Three trips a year. Eight trekkers a trip. Sold out, but quietly.",
      "Enquiries arrive at midnight and get answered at lunch.",
      "The booking funnel is a Google Form and a prayer.",
      "Past trekkers ask when the next one is. We have not told them.",
    ],
    pattern:
      "Trek outfits. Small-group tours. Niche travel brands selling experience, not seats.",
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
    cardLabel: "An order studio for a home bakery",
    cardDescription: "Custom cake briefs become orders the baker can actually deliver.",
    outcome: "Custom cakes, briefed and queued",
    timeline: "10 days",
    pains: [
      "Could bake forty cakes a week. Baked four.",
      "Every order is a back-and-forth on WhatsApp.",
      "Reference images get lost in the chat.",
      "The oven is free. The baker is on the phone.",
    ],
    pattern:
      "Home bakeries. Caterers. Custom-order food businesses run by one person and the oven.",
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
    cardLabel: "A parent portal for a tutoring practice",
    cardDescription: "Auto weekly summaries in the parent's language. No more reports by hand.",
    outcome: "Weekly parent updates, written in their language",
    timeline: "9 weeks",
    pains: [
      "Every parent wants a progress report. Every week.",
      "Weekly emails are written by hand. They look it.",
      "The tutor is in a class while the parent is on WhatsApp.",
      "Renewals are awkward calls when the term ends.",
    ],
    pattern:
      "Tutors. Coaches. Any one-person education practice that needs to look like an institution.",
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
