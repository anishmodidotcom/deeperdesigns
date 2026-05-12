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
    "AI-built websites, custom tools, social and ecommerce, lead generation, LinkedIn sales agent as a service. What Deeper Designs builds and what it costs.",
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
