import type { Metadata } from "next";
import { Fraunces } from "next/font/google";

import Hero from "./Hero";
import Timeline from "./Timeline";
import Contact from "./Contact";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Process · Deeper Designs",
  description:
    "The four-step build process. Discovery, design, build, ship. Two to six weeks from kickoff to live tool.",
  openGraph: {
    title: "Process · Deeper Designs",
    description:
      "Discovery, design, build, ship. Two to six weeks from kickoff to live tool.",
    url: "/process",
  },
  alternates: { canonical: "/process" },
};

export default function ProcessPage() {
  return (
    <div className={fraunces.variable}>
      <Hero />
      <Timeline />
      <Contact />
    </div>
  );
}
