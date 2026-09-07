// v31: the industry packs, evidenced.
//
// Every item is a build that exists in this repo: a coded demo under
// /demos with a real interface capture in public/builds, reached from its
// industry page. Nothing here is a category, a plan or an intention. A
// segment lists a system where that kind of business runs that function,
// and the one-line description is the build's own approved headline, so
// no item claims to have been built for a segment it was not.
//
// The captures are the same files the industry pages render, so a pack
// item and the page it links to always show the same screen.

export type PackItem = {
  name: string;
  line: string;
  shot: string;
  alt: string;
  href: string;
};

// v32.1: the four segments whose pack is built from work made for a
// neighbouring trade. They carry their own intro, which says so, and are
// held to four items so the section claims less and claims it plainly.
export const ADAPTED_SEGMENTS = new Set([
  "traders",
  "importers",
  "exporters",
  "packaging",
]);

export const SEGMENT_PACKS: Record<string, PackItem[]> = {
  manufacturers: [
    {
      name: "Lead Filter",
      line: "Find the five real buyers, ignore the forty-five.",
      shot: "/builds/manufacturing/lead-filter.webp",
      alt: "The Lead Filter screen, built for a manufacturer.",
      href: "/for/manufacturing",
    },
    {
      name: "Quote Engine",
      line: "Specs in, branded quote out in seconds.",
      shot: "/builds/manufacturing/quote-engine.webp",
      alt: "The Quote Engine screen, built for a manufacturer.",
      href: "/for/manufacturing",
    },
    {
      name: "Distributor Portal",
      line: "Two hundred distributors, off the spreadsheet.",
      shot: "/builds/manufacturing/distributor-portal.webp",
      alt: "The Distributor Portal screen, built for a manufacturer.",
      href: "/for/manufacturing",
    },
    {
      name: "Outreach Agent",
      line: "A week of business development, done in an hour.",
      shot: "/builds/manufacturing/outreach.webp",
      alt: "The Outreach Agent screen, built for a manufacturer.",
      href: "/for/manufacturing",
    },
    {
      name: "EPOD",
      line: "Proof of delivery, the moment it lands.",
      shot: "/builds/logistics/epod.webp",
      alt: "The EPOD screen, built for a fleet and transport operator.",
      href: "/for/logistics",
    },
    {
      name: "Control Room",
      line: "Every trip on one screen, no more chasing.",
      shot: "/builds/logistics/control-room.webp",
      alt: "The Control Room screen, built for a fleet and transport operator.",
      href: "/for/logistics",
    },
  ],
  traders: [
    {
      name: "Khata and Schemes",
      line: "Udhaar and schemes, chased without you.",
      shot: "/builds/jewellery/khata.webp",
      alt: "The Khata and Schemes screen, built for a jewellery retailer.",
      href: "/for/jewellery",
    },
    {
      name: "Live-Rate Billing",
      line: "Today's rate, in every bill, to the paisa.",
      shot: "/builds/jewellery/billing.webp",
      alt: "The Live-Rate Billing screen, built for a jewellery retailer.",
      href: "/for/jewellery",
    },
    {
      name: "Freight Audit",
      line: "Every invoice checked, before you pay it.",
      shot: "/builds/logistics/freight-audit.webp",
      alt: "The Freight Audit screen, built for a fleet and transport operator.",
      href: "/for/logistics",
    },
    {
      name: "Profit Command",
      line: "The one screen that tells you the truth about each order.",
      shot: "/builds/d2c/profit-command.webp",
      alt: "The Profit Command screen, built for a direct-to-consumer brand.",
      href: "/for/d2c-brands",
    },
  ],
  distributors: [
    {
      name: "Distributor Portal",
      line: "Two hundred distributors, off the spreadsheet.",
      shot: "/builds/manufacturing/distributor-portal.webp",
      alt: "The Distributor Portal screen, built for a manufacturer.",
      href: "/for/manufacturing",
    },
    {
      name: "Control Room",
      line: "Every trip on one screen, no more chasing.",
      shot: "/builds/logistics/control-room.webp",
      alt: "The Control Room screen, built for a fleet and transport operator.",
      href: "/for/logistics",
    },
    {
      name: "EPOD",
      line: "Proof of delivery, the moment it lands.",
      shot: "/builds/logistics/epod.webp",
      alt: "The EPOD screen, built for a fleet and transport operator.",
      href: "/for/logistics",
    },
    {
      name: "Khata and Schemes",
      line: "Udhaar and schemes, chased without you.",
      shot: "/builds/jewellery/khata.webp",
      alt: "The Khata and Schemes screen, built for a jewellery retailer.",
      href: "/for/jewellery",
    },
    {
      name: "Freight Audit",
      line: "Every invoice checked, before you pay it.",
      shot: "/builds/logistics/freight-audit.webp",
      alt: "The Freight Audit screen, built for a fleet and transport operator.",
      href: "/for/logistics",
    },
    {
      name: "Fuel and Route Watch",
      line: "The biggest cost line, finally watched.",
      shot: "/builds/logistics/fuel-watch.webp",
      alt: "The Fuel and Route Watch screen, built for a fleet and transport operator.",
      href: "/for/logistics",
    },
  ],
  retailers: [
    {
      name: "Live-Rate Billing",
      line: "Today's rate, in every bill, to the paisa.",
      shot: "/builds/jewellery/billing.webp",
      alt: "The Live-Rate Billing screen, built for a jewellery retailer.",
      href: "/for/jewellery",
    },
    {
      name: "The Vault",
      line: "Every gram, by karat and HUID, finally searchable.",
      shot: "/builds/jewellery/vault.webp",
      alt: "The The Vault screen, built for a jewellery retailer.",
      href: "/for/jewellery",
    },
    {
      name: "Try-On Studio",
      line: "Let them see it on, before they come in.",
      shot: "/builds/jewellery/try-on.webp",
      alt: "The Try-On Studio screen, built for a jewellery retailer.",
      href: "/for/jewellery",
    },
    {
      name: "Profit Command",
      line: "The one screen that tells you the truth about each order.",
      shot: "/builds/d2c/profit-command.webp",
      alt: "The Profit Command screen, built for a direct-to-consumer brand.",
      href: "/for/d2c-brands",
    },
    {
      name: "COD Confirm Agent",
      line: "Catch the fake order before the courier moves.",
      shot: "/builds/d2c/cod-confirm.webp",
      alt: "The COD Confirm Agent screen, built for a direct-to-consumer brand.",
      href: "/for/d2c-brands",
    },
    {
      name: "Drop Engine",
      line: "From ready to live, the same day.",
      shot: "/builds/fashion/drop-engine.webp",
      alt: "The Drop Engine screen, built for a fashion label.",
      href: "/for/fashion",
    },
    {
      name: "Khata and Schemes",
      line: "Udhaar and schemes, chased without you.",
      shot: "/builds/jewellery/khata.webp",
      alt: "The Khata and Schemes screen, built for a jewellery retailer.",
      href: "/for/jewellery",
    },
  ],
  importers: [
    {
      name: "Freight Audit",
      line: "Every invoice checked, before you pay it.",
      shot: "/builds/logistics/freight-audit.webp",
      alt: "The Freight Audit screen, built for a fleet and transport operator.",
      href: "/for/logistics",
    },
    {
      name: "Control Room",
      line: "Every trip on one screen, no more chasing.",
      shot: "/builds/logistics/control-room.webp",
      alt: "The Control Room screen, built for a fleet and transport operator.",
      href: "/for/logistics",
    },
    {
      name: "EPOD",
      line: "Proof of delivery, the moment it lands.",
      shot: "/builds/logistics/epod.webp",
      alt: "The EPOD screen, built for a fleet and transport operator.",
      href: "/for/logistics",
    },
    {
      name: "Khata and Schemes",
      line: "Udhaar and schemes, chased without you.",
      shot: "/builds/jewellery/khata.webp",
      alt: "The Khata and Schemes screen, built for a jewellery retailer.",
      href: "/for/jewellery",
    },
  ],
  exporters: [
    {
      name: "Freight Audit",
      line: "Every invoice checked, before you pay it.",
      shot: "/builds/logistics/freight-audit.webp",
      alt: "The Freight Audit screen, built for a fleet and transport operator.",
      href: "/for/logistics",
    },
    {
      name: "Control Room",
      line: "Every trip on one screen, no more chasing.",
      shot: "/builds/logistics/control-room.webp",
      alt: "The Control Room screen, built for a fleet and transport operator.",
      href: "/for/logistics",
    },
    {
      name: "Quote Engine",
      line: "Specs in, branded quote out in seconds.",
      shot: "/builds/manufacturing/quote-engine.webp",
      alt: "The Quote Engine screen, built for a manufacturer.",
      href: "/for/manufacturing",
    },
    {
      name: "Outreach Agent",
      line: "A week of business development, done in an hour.",
      shot: "/builds/manufacturing/outreach.webp",
      alt: "The Outreach Agent screen, built for a manufacturer.",
      href: "/for/manufacturing",
    },
  ],
  packaging: [
    {
      name: "Quote Engine",
      line: "Specs in, branded quote out in seconds.",
      shot: "/builds/manufacturing/quote-engine.webp",
      alt: "The Quote Engine screen, built for a manufacturer.",
      href: "/for/manufacturing",
    },
    {
      name: "Lead Filter",
      line: "Find the five real buyers, ignore the forty-five.",
      shot: "/builds/manufacturing/lead-filter.webp",
      alt: "The Lead Filter screen, built for a manufacturer.",
      href: "/for/manufacturing",
    },
    {
      name: "Outreach Agent",
      line: "A week of business development, done in an hour.",
      shot: "/builds/manufacturing/outreach.webp",
      alt: "The Outreach Agent screen, built for a manufacturer.",
      href: "/for/manufacturing",
    },
    {
      name: "Distributor Portal",
      line: "Two hundred distributors, off the spreadsheet.",
      shot: "/builds/manufacturing/distributor-portal.webp",
      alt: "The Distributor Portal screen, built for a manufacturer.",
      href: "/for/manufacturing",
    },
  ],
};
