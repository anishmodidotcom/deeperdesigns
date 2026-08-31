// v26 Part 8: the rented-versus-built arithmetic.
//
// Every rented figure here is a current public list price taken from the
// vendor's own pricing page, with the plan named and the source recorded.
// Nothing is estimated. Field sales was in the brief's list of categories
// and has been dropped: FieldAssist and Bizom publish no list price at all,
// and BeatRoute's own pricing page did not respond, so the only figures
// available were third-party blog claims, which do not meet the bar.
//
// Build figures are Deeper Designs' own published tiers from /services, not
// invented numbers, expressed as ranges.

export type CostRow = {
  id: string;
  category: string;
  vendor: string;
  plan: string;
  // Monthly rented cost for a given number of users or employees.
  rentedPerMonth: (people: number) => number;
  // How the rented figure is worked out, shown inline in the table.
  assumption: string;
  source: string;
  sourceUrl: string;
  verifiedOn: string;
  buildLow: number;
  buildHigh: number;
  buildTier: string;
};

export const COST_ROWS: CostRow[] = [
  {
    id: "crm",
    category: "CRM",
    vendor: "Zoho CRM",
    plan: "Professional",
    rentedPerMonth: (people) => people * 1400,
    assumption: "Rs 1,400 per user per month, billed annually",
    source: "zoho.com",
    sourceUrl: "https://www.zoho.com/crm/zohocrm-pricing.html",
    verifiedOn: "2026-08-30",
    buildLow: 100000,
    buildHigh: 300000,
    buildTier: "Custom build",
  },
  {
    id: "dashboards",
    category: "MIS dashboards",
    vendor: "Power BI",
    plan: "Pro",
    rentedPerMonth: (people) => people * 1165,
    assumption: "Rs 1,165 per user per month, paid yearly",
    source: "microsoft.com",
    sourceUrl:
      "https://www.microsoft.com/en-in/power-platform/products/power-bi/pricing",
    verifiedOn: "2026-08-30",
    buildLow: 25000,
    buildHigh: 100000,
    buildTier: "Single tool",
  },
  {
    id: "hrms",
    category: "HRMS and attendance",
    vendor: "greytHR",
    plan: "Growth",
    // Base covers the first 50 employees, then per employee above that.
    rentedPerMonth: (people) => 4495 + Math.max(0, people - 50) * 85,
    assumption:
      "Rs 4,495 per month covering the first 50 employees, then Rs 85 per employee above 50",
    source: "greythr.com",
    sourceUrl: "https://www.greythr.com/pricing/",
    verifiedOn: "2026-08-30",
    buildLow: 100000,
    buildHigh: 300000,
    buildTier: "Custom build",
  },
];

export function rentedTotal(row: CostRow, people: number, years: number): number {
  return row.rentedPerMonth(people) * 12 * years;
}

export function formatInr(value: number): string {
  return `Rs ${new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(Math.round(value))}`;
}
