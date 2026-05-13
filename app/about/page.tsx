import type { Metadata } from "next";
import { Fraunces } from "next/font/google";

import Hero from "./Hero";
import Thesis from "./Thesis";
import HowWeWork from "./HowWeWork";
import Founder from "./Founder";
import FAQ from "./FAQ";
import Contact from "./Contact";
import LabNotes from "@/components/sections/LabNotes";
import { StructuredData, ANISH_PERSON_LD } from "@/components/StructuredData";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  title: "About · Deeper Designs",
  description:
    "Deeper Designs is an India-first studio building custom digital tools for ambitious businesses. Based in Delhi, with select clients in the UAE.",
  openGraph: {
    title: "About · Deeper Designs",
    description:
      "India-first studio building custom digital tools. Delhi, with select clients in the UAE.",
    url: "/about",
  },
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className={fraunces.variable}>
      <StructuredData data={ANISH_PERSON_LD} />
      <Hero />
      <Thesis />
      <HowWeWork />
      <Founder />
      <FAQ />
      <LabNotes />
      <Contact />
    </div>
  );
}
