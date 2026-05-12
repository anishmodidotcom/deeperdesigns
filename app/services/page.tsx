import type { Metadata } from "next";
import { Fraunces } from "next/font/google";

import Hero from "./Hero";
import Services from "./Services";
import Contact from "./Contact";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Services · Deeper Designs",
  description:
    "Three outcomes: customer experience, operations, growth. Custom tools, dashboards, portals, and operational systems. From ₹25,000.",
  openGraph: {
    title: "Services · Deeper Designs",
    description:
      "Custom tools, dashboards, portals, and operational systems. From ₹25,000.",
    url: "/services",
  },
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <div className={fraunces.variable}>
      <Hero />
      <Services />
      <Contact />
    </div>
  );
}
