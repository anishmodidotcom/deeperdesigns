import type { Metadata } from "next";
import { Fraunces } from "next/font/google";

import Hero from "./Hero";
import Thesis from "./Thesis";
import HowWeWork from "./HowWeWork";
import Studio from "./Studio";
import Selectivity from "./Selectivity";
import NotDoing from "./NotDoing";
import Contact from "./Contact";

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
    "Enterprise software costs a million dollars. We build the same thing for businesses that could never afford it. Deeper Designs is an AI-led build studio operating between Dubai and Delhi.",
};

export default function AboutPage() {
  return (
    <div className={fraunces.variable}>
      <Hero />
      <Thesis />
      <HowWeWork />
      <Studio />
      <Selectivity />
      <NotDoing />
      <Contact />
    </div>
  );
}
