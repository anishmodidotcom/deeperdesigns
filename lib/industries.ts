// Single source of truth for the /for/[slug] industry pages.
// These are ad-destination pages: someone clicks an industry-specific ad
// and lands on a page that shows that industry its current day vs its day
// with our systems, with real working build demos.
//
// Mirrors the lib/showcases.ts pattern: one typed array, helper functions,
// per-page accent declared on the object and wired through the existing
// --page-accent CSS variable mechanism on the route root.

export type DayItem = {
  label: string; // short mono label, e.g. "THE RETURN"
  title: string;
  body: string;
  stat: string; // mono stat line
};

export type IndustryBuild = {
  index: string; // "01", "02" ... shown as a mono kicker number
  kicker: string; // e.g. "BEHAVIOUR RECOVERY ENGINE"
  headline: string; // may contain a {serif} span marker
  body: string;
  bullets: string[]; // 4 each, <b> markers allowed
  demo: string; // key selecting which build-demo component to render
};

export type StatPanel = {
  label: string;
  target: number; // counts up, reduced-motion shows final
  caption: string;
  rows: { k: string; v: string }[];
};

export type Industry = {
  slug: string; // url: /for/{slug}
  name: string; // "D2C Brands"
  live: boolean; // true = fully built, false = scaffold only
  accent: string; // hex, per-vertical accent (never teal-family)
  accentSoft: string; // hex, lighter tint for text-on-dark
  money: string; // hex used for currency / positive figures

  heroEyebrow: string; // e.g. "FOR D2C BRANDS"
  heroEyebrowNote: string; // secondary line, e.g. "One of 13 industries we build for"
  heroHeadline: string; // contains {serif} marker
  heroSub: string;

  meta: { title: string; description: string };

  // ----- Full-page fields (present when live === true) -----
  statPanel?: StatPanel | null;

  nowHeadline?: string; // current-day section heading, {serif} marker allowed
  nowIntro?: string;
  nowItems?: DayItem[]; // 4

  aiHeadline?: string;
  aiIntro?: string;
  aiItems?: DayItem[]; // 4

  builds?: IndustryBuild[]; // 4-5

  payback?: {
    intro: string;
    before: { k: string; v: string }[];
    beforeTotal: { k: string; v: string };
    after: { k: string; v: string }[];
    afterTotal: { k: string; v: string };
    note: string;
  };

  voices?: {
    before: { quote: string; who: string };
    after: { quote: string; who: string };
  };

  cta?: { headline: string; body: string; chips: string[] };

  // One Anish margin note and one editorial pull quote, so these pages
  // carry the same human-edit layer as the rest of the site.
  anishNote?: string;
  pullQuote?: { quote: string; attribution: string };
};

export const INDUSTRIES: Industry[] = [
  // =====================================================================
  // 01 · D2C BRANDS · fully built
  // =====================================================================
  {
    slug: "d2c-brands",
    name: "D2C Brands",
    live: true,
    accent: "#FF5C38",
    accentSoft: "#FF8266",
    money: "#F5B544",

    heroEyebrow: "FOR D2C BRANDS",
    heroEyebrowNote: "One of 13 industries we build for",
    heroHeadline: "Your ads work. Your margin {serif}doesn't.{/serif}",
    heroSub:
      "The leak isn't your ad spend. It's everything after the click. Returns you eat, carts that die, spend you can't trace. We build the system that closes the gap between a click and a kept rupee.",

    meta: {
      title: "For D2C Brands · Deeper Designs",
      description:
        "Your ads work, your margin doesn't. We build the system that fixes returns, dead carts, and untraceable spend for Indian D2C brands.",
    },

    statPanel: {
      label:
        "WHAT AN AVERAGE MID-SIZE D2C BRAND LOSES AFTER THE CLICK, EVERY MONTH",
      target: 550000,
      caption:
        "Returns, dead carts, and spend you can't trace. Money that already cleared your ad account.",
      rows: [
        { k: "COD returns shipped back to you", v: "10 to 15% of revenue" },
        { k: "Carts abandoned at checkout", v: "around 7 in 10" },
        { k: "Repeat buyers you never won back", v: "most of them" },
      ],
    },

    nowHeadline: "You're not losing money on the ad. {serif}You're losing it after.{/serif}",
    nowIntro:
      "Every founder has the dashboard that says the campaign worked. Few have the one that says where the money went next. Here is the day as you actually live it.",
    nowItems: [
      {
        label: "THE RETURN",
        title: "It costs you twice",
        body: "A COD order ships. The customer changes their mind at the door. You pay the courier both ways and the product comes back creased. Nobody checked the order was real.",
        stat: "₹180 to 350 lost per returned COD order",
      },
      {
        label: "THE DEAD CART",
        title: "It died quietly",
        body: "Someone added three items, reached checkout, and left. No follow-up went out. By evening they have forgotten your brand exists, and you will pay an ad to reach them again.",
        stat: "around 70% of carts abandoned",
      },
      {
        label: "THE BLIND SPEND",
        title: "You can't trace it",
        body: "Meta reports one number. Shopify another. Your accountant a third. You scale on ROAS and still can't say what a sale truly costs after returns and shipping.",
        stat: "real CM2 unknown on most orders",
      },
      {
        label: "THE LOST REGULAR",
        title: "You bought them once",
        body: "A happy customer ordered in March. No reason to return was ever sent. So you go back to Meta and pay full price to acquire someone you already had.",
        stat: "re-buying customers you already own",
      },
    ],

    aiHeadline: "Same day. Same orders. {serif}Nothing falls through.{/serif}",
    aiIntro:
      "Not another tool to log into. One connected system that watches the parts you can't, and acts before the money leaves.",
    aiItems: [
      {
        label: "CONFIRMED FIRST",
        title: "Every COD order checked",
        body: "The moment a COD order lands, an agent reaches the buyer on WhatsApp to confirm. Fakes and second thoughts get caught before the courier moves.",
        stat: "RTO cut, not absorbed",
      },
      {
        label: "BROUGHT BACK",
        title: "Dead carts revived",
        body: "The visitor who left at checkout gets a message showing the exact items they looked at, with a reason to finish. Automatically, within the hour.",
        stat: "12 to 18% of lost carts recoverable",
      },
      {
        label: "ONE HONEST NUMBER",
        title: "Real margin per order",
        body: "Spend, shipping, returns and fees folded into a true contribution margin, by product and by pincode. You scale what actually pays.",
        stat: "CM1 and CM2 on every order",
      },
      {
        label: "THEY RETURN",
        title: "Repeat without re-buying",
        body: "Past buyers get the right nudge at the right time, tied to what they bought. Repeat revenue you don't pay Meta for.",
        stat: "win-back running on its own",
      },
    ],

    builds: [
      {
        index: "01",
        kicker: "BEHAVIOUR RECOVERY ENGINE",
        demo: "BehaviourRecoveryDemo",
        headline:
          "It watches what each visitor looked at. {serif}Then it brings them back.{/serif}",
        body: "Most recovery messages say you left something behind. Yours shows them exactly what, the product they hovered on, with the photo, ready to buy in one tap.",
        bullets: [
          "Tracks <b>what each visitor browsed</b>, added, and abandoned, live",
          "Sends a <b>personalised WhatsApp</b> with the actual items they viewed",
          "Times the nudge to <b>intent</b>, not a generic 24-hour blast",
          "Hands a hot cart to a <b>human only when it is worth it</b>",
        ],
      },
      {
        index: "02",
        kicker: "PROFIT COMMAND",
        demo: "ProfitCommandDemo",
        headline:
          "The one screen that tells you {serif}the truth about each order.{/serif}",
        body: "Not ROAS. Real contribution margin after returns, shipping and fees, broken down by product and by the pincodes quietly eating your profit.",
        bullets: [
          "<b>CM1 and CM2</b> on every order, live",
          "<b>RTO by pincode</b>, so you flag or pre-pay the worst zones",
          "Channel truth across <b>Meta, Shopify and marketplaces</b> in one view",
          "An alert when a <b>winning product turns unprofitable</b>",
        ],
      },
      {
        index: "03",
        kicker: "COD CONFIRM AGENT",
        demo: "CODConfirmDemo",
        headline: "Catch the fake order {serif}before the courier moves.{/serif}",
        body: "The cheapest way to cut returns is to never ship the bad ones. An agent confirms every COD order in seconds, on the channel your buyer already lives on.",
        bullets: [
          "Auto-confirms <b>every COD order</b> on WhatsApp or a quick call",
          "Flags <b>address gaps and repeat-RTO numbers</b> automatically",
          "Offers a <b>prepaid nudge</b> with a small incentive to switch",
          "Only the <b>confirmed orders</b> reach your packing table",
        ],
      },
      {
        index: "04",
        kicker: "STUDIO ENGINE",
        demo: "StudioEngineDemo",
        headline: "Stop paying for shoots. {serif}Generate them.{/serif}",
        body: "A phone photo of the product on your packing table becomes a studio shot, a lifestyle scene, an on-model image. The whole catalogue, in an afternoon, in your brand's look.",
        bullets: [
          "Raw product photo into <b>studio, lifestyle and on-model</b> shots",
          "Consistent <b>brand look</b> across the full catalogue",
          "Feeds straight into <b>ads, listings and the recovery messages</b>",
          "A new drop shot and live the <b>same day</b>, not next month",
        ],
      },
    ],

    payback: {
      intro:
        "Illustrative figures for a brand doing roughly ₹20L a month. We size the build to your real numbers in the first call.",
      before: [
        { k: "RTO on COD orders", v: "₹1,60,000" },
        { k: "Abandoned carts, no follow-up", v: "₹2,40,000" },
        { k: "Re-acquiring past buyers via ads", v: "₹90,000" },
        { k: "Shoot and creative production", v: "₹60,000" },
      ],
      beforeTotal: { k: "Walking out the door", v: "₹5,50,000" },
      after: [
        { k: "RTO cut by confirmation", v: "₹95,000" },
        { k: "Carts recovered, around 15%", v: "₹1,55,000" },
        { k: "Repeat revenue, not re-bought", v: "₹70,000" },
        { k: "Shoot cost removed", v: "₹55,000" },
      ],
      afterTotal: { k: "Back in your pocket", v: "₹3,75,000" },
      note: "Ranges drawn from common Indian D2C benchmarks, not a single client. Your real figures decide the build.",
    },

    voices: {
      before: {
        quote:
          "My ads are doing fine. I just don't understand where the money disappears by the end of the month.",
        who: "The voice of a D2C founder before the system. Representative, not a specific client.",
      },
      after: {
        quote:
          "I stopped guessing. I can see which orders make money, and the rest fixes itself while I sleep.",
        who: "The shift we build toward. Representative, not a specific client.",
      },
    },

    cta: {
      headline: "Pick three. {serif}Scope them in one meeting.{/serif}",
      body: "Thirty minutes. We map your real leaks to a real build and tell you what it costs and what it returns. No deck.",
      chips: [
        "Behaviour Recovery",
        "Profit Command",
        "COD Confirm",
        "Studio Engine",
        "Win-Back Flows",
      ],
    },

    anishNote:
      "Every founder I meet knows their ROAS to the decimal. Almost none can tell me their CM2. That gap is the whole business. We build the screen that closes it.",
    pullQuote: {
      quote:
        "The leak was never the ad. It was the ten quiet things that happen after the click, and nobody owned a single one of them.",
      attribution: "DEEPER DESIGNS · FOR D2C",
    },
  },

  // =====================================================================
  // SCAFFOLDS · routes live, hero + switcher, live: false
  // Accents deliberately clear of teal #0F766E and its family.
  // =====================================================================
  {
    slug: "real-estate",
    name: "Real Estate",
    live: false,
    accent: "#3E7BFA",
    accentSoft: "#7CA4FF",
    money: "#F5B544",
    heroEyebrow: "FOR REAL ESTATE",
    heroEyebrowNote: "One of 13 industries we build for",
    heroHeadline: "Your listings look like phone photos. {serif}Because they are.{/serif}",
    heroSub:
      "Buyers scroll past amateur listings. We make your inventory look like the portals, and answer every lead before it goes cold.",
    meta: {
      title: "For Real Estate · Deeper Designs",
      description:
        "Your listings look like phone photos because they are. We make your inventory look like the portals and answer every lead before it goes cold.",
    },
  },
  {
    slug: "coaching",
    name: "Coaching & Education",
    live: false,
    accent: "#F25F4C",
    accentSoft: "#FF8E7E",
    money: "#F5B544",
    heroEyebrow: "FOR COACHING & EDUCATION",
    heroEyebrowNote: "One of 13 industries we build for",
    heroHeadline: "200 students you can run from your head. {serif}1,000 you can't.{/serif}",
    heroSub:
      "That is where institutes stall. We build the system that never drops an admission enquiry or a late fee.",
    meta: {
      title: "For Coaching & Education · Deeper Designs",
      description:
        "200 students you can run from your head, 1,000 you can't. We build the system that never drops an admission enquiry or a late fee.",
    },
  },
  {
    slug: "clinics",
    name: "Clinics & Diagnostics",
    live: false,
    accent: "#5B8DEF",
    accentSoft: "#93B5F6",
    money: "#F5B544",
    heroEyebrow: "FOR CLINICS & DIAGNOSTICS",
    heroEyebrowNote: "One of 13 industries we build for",
    heroHeadline: "Every missed call {serif}booked somewhere else.{/serif}",
    heroSub:
      "A front desk can't answer everything. We build the one that does, and fills every empty slot.",
    meta: {
      title: "For Clinics & Diagnostics · Deeper Designs",
      description:
        "Every missed call is booked somewhere else. We build the front desk that answers everything and fills every empty slot.",
    },
  },
  {
    slug: "restaurants",
    name: "Restaurants & F&B",
    live: false,
    accent: "#FF7A1A",
    accentSoft: "#FFA866",
    money: "#F5B544",
    heroEyebrow: "FOR RESTAURANTS & F&B",
    heroEyebrowNote: "One of 13 industries we build for",
    heroHeadline: "You pay 25% to aggregators {serif}and still reconcile by hand.{/serif}",
    heroSub:
      "We build the screen that checks every payout and the channel that takes orders without the commission.",
    meta: {
      title: "For Restaurants & F&B · Deeper Designs",
      description:
        "You pay 25% to aggregators and still reconcile by hand. We build the screen that checks every payout and the channel that takes orders without the commission.",
    },
  },
  {
    slug: "jewellery",
    name: "Jewellery Retail",
    live: false,
    accent: "#C9A227",
    accentSoft: "#E3C766",
    money: "#F5B544",
    heroEyebrow: "FOR JEWELLERY RETAIL",
    heroEyebrowNote: "One of 13 industries we build for",
    heroHeadline:
      "Your billing changes with the gold rate every morning. {serif}Your software doesn't.{/serif}",
    heroSub:
      "We build the counter that bills right, tracks every gram, and lets a buyer see the piece on their own phone.",
    meta: {
      title: "For Jewellery Retail · Deeper Designs",
      description:
        "Your billing changes with the gold rate every morning, your software doesn't. We build the counter that bills right, tracks every gram, and lets a buyer see the piece on their own phone.",
    },
  },
  {
    slug: "manufacturing",
    name: "MSME Manufacturing",
    live: false,
    accent: "#E8602C",
    accentSoft: "#FF9263",
    money: "#F5B544",
    heroEyebrow: "FOR MSME MANUFACTURING",
    heroEyebrowNote: "One of 13 industries we build for",
    heroHeadline: "IndiaMART sends 50 leads. {serif}45 are junk.{/serif}",
    heroSub:
      "We build the system that finds the 5, quotes in seconds, and follows up on its own.",
    meta: {
      title: "For MSME Manufacturing · Deeper Designs",
      description:
        "IndiaMART sends 50 leads and 45 are junk. We build the system that finds the 5, quotes in seconds, and follows up on its own.",
    },
  },
  {
    slug: "fashion",
    name: "Fashion & Apparel",
    live: false,
    accent: "#E84393",
    accentSoft: "#F576B5",
    money: "#F5B544",
    heroEyebrow: "FOR FASHION & APPAREL",
    heroEyebrowNote: "One of 13 industries we build for",
    heroHeadline: "Stop paying for model shoots. {serif}Generate them.{/serif}",
    heroSub:
      "Flat product to full on-model catalogue, any body type, your brand's look. Plus try-on that shows the buyer the fit before they order.",
    meta: {
      title: "For Fashion & Apparel · Deeper Designs",
      description:
        "Stop paying for model shoots, generate them. Flat product to full on-model catalogue in your brand's look, plus try-on that shows the buyer the fit before they order.",
    },
  },
  {
    slug: "ca-firms",
    name: "CA & Professional Services",
    live: false,
    accent: "#5A6ACF",
    accentSoft: "#8C97E0",
    money: "#F5B544",
    heroEyebrow: "FOR CA & PROFESSIONAL SERVICES",
    heroEyebrowNote: "One of 13 industries we build for",
    heroHeadline: "You don't have a work problem. {serif}You have a chasing-clients problem.{/serif}",
    heroSub:
      "We build the system that collects documents, tracks every filing, and ends the WhatsApp chaos.",
    meta: {
      title: "For CA & Professional Services · Deeper Designs",
      description:
        "You don't have a work problem, you have a chasing-clients problem. We build the system that collects documents, tracks every filing, and ends the WhatsApp chaos.",
    },
  },
  {
    slug: "salons",
    name: "Salons & Wellness",
    live: false,
    accent: "#D6336C",
    accentSoft: "#EE6F9C",
    money: "#F5B544",
    heroEyebrow: "FOR SALONS & WELLNESS",
    heroEyebrowNote: "One of 13 industries we build for",
    heroHeadline: "An empty chair at 4pm {serif}is money you never get back.{/serif}",
    heroSub:
      "We build the calendar that fills itself, rebooks every client, and lets them see the look before they sit down.",
    meta: {
      title: "For Salons & Wellness · Deeper Designs",
      description:
        "An empty chair at 4pm is money you never get back. We build the calendar that fills itself, rebooks every client, and lets them see the look before they sit down.",
    },
  },
  {
    slug: "logistics",
    name: "Logistics & Fleet",
    live: false,
    accent: "#F59F00",
    accentSoft: "#FFC04D",
    money: "#F5B544",
    heroEyebrow: "FOR LOGISTICS & FLEET",
    heroEyebrowNote: "One of 13 industries we build for",
    heroHeadline:
      "Your fleet runs on WhatsApp groups and registers. {serif}That is where the money leaks.{/serif}",
    heroSub:
      "We build the control room that sees every trip and flags every leak.",
    meta: {
      title: "For Logistics & Fleet · Deeper Designs",
      description:
        "Your fleet runs on WhatsApp groups and registers, and that is where the money leaks. We build the control room that sees every trip and flags every leak.",
    },
  },
  {
    slug: "automotive",
    name: "Automotive",
    live: false,
    accent: "#C92A2A",
    accentSoft: "#E36464",
    money: "#F5B544",
    heroEyebrow: "FOR AUTOMOTIVE",
    heroEyebrowNote: "One of 13 industries we build for",
    heroHeadline: "You sell a ₹15L car {serif}with photos shot in a dusty lot.{/serif}",
    heroSub:
      "We build the showroom-grade shots, the test-drive bookings, and the service desk that runs on WhatsApp.",
    meta: {
      title: "For Automotive · Deeper Designs",
      description:
        "You sell a ₹15L car with photos shot in a dusty lot. We build the showroom-grade shots, the test-drive bookings, and the service desk that runs on WhatsApp.",
    },
  },
  {
    slug: "hotels",
    name: "Hotels & Hospitality",
    live: false,
    accent: "#9B5DE5",
    accentSoft: "#BC8DEF",
    money: "#F5B544",
    heroEyebrow: "FOR HOTELS & HOSPITALITY",
    heroEyebrowNote: "One of 13 industries we build for",
    heroHeadline: "OTAs take a fifth of every booking {serif}and own your guest.{/serif}",
    heroSub:
      "We build the direct-booking engine and the concierge that takes them back.",
    meta: {
      title: "For Hotels & Hospitality · Deeper Designs",
      description:
        "OTAs take a fifth of every booking and own your guest. We build the direct-booking engine and the concierge that takes them back.",
    },
  },
];

// Lookup by slug.
export function getIndustry(slug: string): Industry | undefined {
  return INDUSTRIES.find((i) => i.slug === slug);
}

// The other industries, for the footer-level switcher strip.
export function otherIndustries(slug: string): Industry[] {
  return INDUSTRIES.filter((i) => i.slug !== slug);
}
