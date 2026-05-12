import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import WhatWeBuild from "@/components/sections/WhatWeBuild";
import GalleryRouter from "@/components/sections/GalleryRouter";
import Manifesto from "@/components/sections/Manifesto";
import HowItWorks from "@/components/sections/HowItWorks";
import WhyNotDIY from "@/components/sections/WhyNotDIY";
import SpeedNote from "@/components/sections/SpeedNote";
import ContactCTA from "@/components/sections/ContactCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <WhatWeBuild />
      <GalleryRouter />
      <Manifesto />
      <WhyNotDIY />
      <HowItWorks />
      <SpeedNote />
      <ContactCTA />
    </>
  );
}
