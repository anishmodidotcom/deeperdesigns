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

export const SEGMENT_PACKS: Record<string, PackItem[]> = {
  manufacturers: [
    {
      name: "Lead Filter",
      line: "Find the five real buyers, ignore the forty-five.",
      shot: "/builds/manufacturing/lead-filter.webp",
      alt: "The Lead Filter interface, built for the manufacturing industry page.",
      href: "/for/manufacturing",
    },
    {
      name: "Quote Engine",
      line: "Specs in, branded quote out in seconds.",
      shot: "/builds/manufacturing/quote-engine.webp",
      alt: "The Quote Engine interface, built for the manufacturing industry page.",
      href: "/for/manufacturing",
    },
    {
      name: "Distributor Portal",
      line: "Two hundred distributors, off the spreadsheet.",
      shot: "/builds/manufacturing/distributor-portal.webp",
      alt: "The Distributor Portal interface, built for the manufacturing industry page.",
      href: "/for/manufacturing",
    },
    {
      name: "Outreach Agent",
      line: "A week of business development, done in an hour.",
      shot: "/builds/manufacturing/outreach.webp",
      alt: "The Outreach Agent interface, built for the manufacturing industry page.",
      href: "/for/manufacturing",
    },
    {
      name: "EPOD",
      line: "Proof of delivery, the moment it lands.",
      shot: "/builds/logistics/epod.webp",
      alt: "The EPOD interface, built for the logistics industry page.",
      href: "/for/logistics",
    },
    {
      name: "Control Room",
      line: "Every trip on one screen, no more chasing.",
      shot: "/builds/logistics/control-room.webp",
      alt: "The Control Room interface, built for the logistics industry page.",
      href: "/for/logistics",
    },
  ],
  traders: [
    {
      name: "Khata and Schemes",
      line: "Udhaar and schemes, chased without you.",
      shot: "/builds/jewellery/khata.webp",
      alt: "The Khata and Schemes interface, built for the jewellery industry page.",
      href: "/for/jewellery",
    },
    {
      name: "Live-Rate Billing",
      line: "Today's rate, in every bill, to the paisa.",
      shot: "/builds/jewellery/billing.webp",
      alt: "The Live-Rate Billing interface, built for the jewellery industry page.",
      href: "/for/jewellery",
    },
    {
      name: "Freight Audit",
      line: "Every invoice checked, before you pay it.",
      shot: "/builds/logistics/freight-audit.webp",
      alt: "The Freight Audit interface, built for the logistics industry page.",
      href: "/for/logistics",
    },
    {
      name: "Control Room",
      line: "Every trip on one screen, no more chasing.",
      shot: "/builds/logistics/control-room.webp",
      alt: "The Control Room interface, built for the logistics industry page.",
      href: "/for/logistics",
    },
    {
      name: "EPOD",
      line: "Proof of delivery, the moment it lands.",
      shot: "/builds/logistics/epod.webp",
      alt: "The EPOD interface, built for the logistics industry page.",
      href: "/for/logistics",
    },
    {
      name: "Profit Command",
      line: "The one screen that tells you the truth about each order.",
      shot: "/builds/d2c/profit-command.webp",
      alt: "The Profit Command interface, built for the d2c brands industry page.",
      href: "/for/d2c-brands",
    },
  ],
  distributors: [
    {
      name: "Distributor Portal",
      line: "Two hundred distributors, off the spreadsheet.",
      shot: "/builds/manufacturing/distributor-portal.webp",
      alt: "The Distributor Portal interface, built for the manufacturing industry page.",
      href: "/for/manufacturing",
    },
    {
      name: "Control Room",
      line: "Every trip on one screen, no more chasing.",
      shot: "/builds/logistics/control-room.webp",
      alt: "The Control Room interface, built for the logistics industry page.",
      href: "/for/logistics",
    },
    {
      name: "EPOD",
      line: "Proof of delivery, the moment it lands.",
      shot: "/builds/logistics/epod.webp",
      alt: "The EPOD interface, built for the logistics industry page.",
      href: "/for/logistics",
    },
    {
      name: "Khata and Schemes",
      line: "Udhaar and schemes, chased without you.",
      shot: "/builds/jewellery/khata.webp",
      alt: "The Khata and Schemes interface, built for the jewellery industry page.",
      href: "/for/jewellery",
    },
    {
      name: "Freight Audit",
      line: "Every invoice checked, before you pay it.",
      shot: "/builds/logistics/freight-audit.webp",
      alt: "The Freight Audit interface, built for the logistics industry page.",
      href: "/for/logistics",
    },
    {
      name: "Fuel and Route Watch",
      line: "The biggest cost line, finally watched.",
      shot: "/builds/logistics/fuel-watch.webp",
      alt: "The Fuel and Route Watch interface, built for the logistics industry page.",
      href: "/for/logistics",
    },
  ],
  retailers: [
    {
      name: "Live-Rate Billing",
      line: "Today's rate, in every bill, to the paisa.",
      shot: "/builds/jewellery/billing.webp",
      alt: "The Live-Rate Billing interface, built for the jewellery industry page.",
      href: "/for/jewellery",
    },
    {
      name: "The Vault",
      line: "Every gram, by karat and HUID, finally searchable.",
      shot: "/builds/jewellery/vault.webp",
      alt: "The The Vault interface, built for the jewellery industry page.",
      href: "/for/jewellery",
    },
    {
      name: "Try-On Studio",
      line: "Let them see it on, before they come in.",
      shot: "/builds/jewellery/try-on.webp",
      alt: "The Try-On Studio interface, built for the jewellery industry page.",
      href: "/for/jewellery",
    },
    {
      name: "Profit Command",
      line: "The one screen that tells you the truth about each order.",
      shot: "/builds/d2c/profit-command.webp",
      alt: "The Profit Command interface, built for the d2c brands industry page.",
      href: "/for/d2c-brands",
    },
    {
      name: "COD Confirm Agent",
      line: "Catch the fake order before the courier moves.",
      shot: "/builds/d2c/cod-confirm.webp",
      alt: "The COD Confirm Agent interface, built for the d2c brands industry page.",
      href: "/for/d2c-brands",
    },
    {
      name: "Drop Engine",
      line: "From ready to live, the same day.",
      shot: "/builds/fashion/drop-engine.webp",
      alt: "The Drop Engine interface, built for the fashion industry page.",
      href: "/for/fashion",
    },
    {
      name: "Khata and Schemes",
      line: "Udhaar and schemes, chased without you.",
      shot: "/builds/jewellery/khata.webp",
      alt: "The Khata and Schemes interface, built for the jewellery industry page.",
      href: "/for/jewellery",
    },
  ],
  importers: [
    {
      name: "Freight Audit",
      line: "Every invoice checked, before you pay it.",
      shot: "/builds/logistics/freight-audit.webp",
      alt: "The Freight Audit interface, built for the logistics industry page.",
      href: "/for/logistics",
    },
    {
      name: "Control Room",
      line: "Every trip on one screen, no more chasing.",
      shot: "/builds/logistics/control-room.webp",
      alt: "The Control Room interface, built for the logistics industry page.",
      href: "/for/logistics",
    },
    {
      name: "EPOD",
      line: "Proof of delivery, the moment it lands.",
      shot: "/builds/logistics/epod.webp",
      alt: "The EPOD interface, built for the logistics industry page.",
      href: "/for/logistics",
    },
    {
      name: "Fuel and Route Watch",
      line: "The biggest cost line, finally watched.",
      shot: "/builds/logistics/fuel-watch.webp",
      alt: "The Fuel and Route Watch interface, built for the logistics industry page.",
      href: "/for/logistics",
    },
    {
      name: "Khata and Schemes",
      line: "Udhaar and schemes, chased without you.",
      shot: "/builds/jewellery/khata.webp",
      alt: "The Khata and Schemes interface, built for the jewellery industry page.",
      href: "/for/jewellery",
    },
  ],
  exporters: [
    {
      name: "Freight Audit",
      line: "Every invoice checked, before you pay it.",
      shot: "/builds/logistics/freight-audit.webp",
      alt: "The Freight Audit interface, built for the logistics industry page.",
      href: "/for/logistics",
    },
    {
      name: "EPOD",
      line: "Proof of delivery, the moment it lands.",
      shot: "/builds/logistics/epod.webp",
      alt: "The EPOD interface, built for the logistics industry page.",
      href: "/for/logistics",
    },
    {
      name: "Control Room",
      line: "Every trip on one screen, no more chasing.",
      shot: "/builds/logistics/control-room.webp",
      alt: "The Control Room interface, built for the logistics industry page.",
      href: "/for/logistics",
    },
    {
      name: "Quote Engine",
      line: "Specs in, branded quote out in seconds.",
      shot: "/builds/manufacturing/quote-engine.webp",
      alt: "The Quote Engine interface, built for the manufacturing industry page.",
      href: "/for/manufacturing",
    },
    {
      name: "Outreach Agent",
      line: "A week of business development, done in an hour.",
      shot: "/builds/manufacturing/outreach.webp",
      alt: "The Outreach Agent interface, built for the manufacturing industry page.",
      href: "/for/manufacturing",
    },
  ],
  packaging: [
    {
      name: "Quote Engine",
      line: "Specs in, branded quote out in seconds.",
      shot: "/builds/manufacturing/quote-engine.webp",
      alt: "The Quote Engine interface, built for the manufacturing industry page.",
      href: "/for/manufacturing",
    },
    {
      name: "Lead Filter",
      line: "Find the five real buyers, ignore the forty-five.",
      shot: "/builds/manufacturing/lead-filter.webp",
      alt: "The Lead Filter interface, built for the manufacturing industry page.",
      href: "/for/manufacturing",
    },
    {
      name: "Outreach Agent",
      line: "A week of business development, done in an hour.",
      shot: "/builds/manufacturing/outreach.webp",
      alt: "The Outreach Agent interface, built for the manufacturing industry page.",
      href: "/for/manufacturing",
    },
    {
      name: "Distributor Portal",
      line: "Two hundred distributors, off the spreadsheet.",
      shot: "/builds/manufacturing/distributor-portal.webp",
      alt: "The Distributor Portal interface, built for the manufacturing industry page.",
      href: "/for/manufacturing",
    },
    {
      name: "Control Room",
      line: "Every trip on one screen, no more chasing.",
      shot: "/builds/logistics/control-room.webp",
      alt: "The Control Room interface, built for the logistics industry page.",
      href: "/for/logistics",
    },
  ],
};
