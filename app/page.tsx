import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import SoundLikeYou from "@/components/sections/SoundLikeYou";
import WhatWeBuild from "@/components/sections/WhatWeBuild";
import Portfolio from "@/components/sections/Portfolio";
import Manifesto from "@/components/sections/Manifesto";
import HowItWorks from "@/components/sections/HowItWorks";
import ContactCTA from "@/components/sections/ContactCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <SoundLikeYou />
      <WhatWeBuild />
      <Portfolio />
      <Manifesto />
      <HowItWorks />
      <ContactCTA />
    </>
  );
}
