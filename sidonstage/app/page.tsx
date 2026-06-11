import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import MarqueeStrip from "@/components/MarqueeStrip";
import About from "@/components/About";
import Stats from "@/components/Stats";
import CorporateEdge from "@/components/CorporateEdge";
import Galleries from "@/components/Galleries";
import TrustedBy from "@/components/TrustedBy";
import Testimonials from "@/components/Testimonials";
import Services from "@/components/Services";
import CtaContact from "@/components/CtaContact";
import Footer from "@/components/Footer";
import { getHeroPortrait, hasHeroPoster, hasHeroVideo } from "@/lib/heroFallback";

export default function Page() {
  const portrait = getHeroPortrait();
  const video = hasHeroVideo();
  const poster = hasHeroPoster();
  return (
    <>
      <Nav />
      <main id="top">
        <Hero portrait={portrait} hasVideo={video} hasPoster={poster} />
        <MarqueeStrip />
        <About portrait={portrait} />
        <Stats />
        <CorporateEdge />
        <Galleries />
        <TrustedBy />
        <Testimonials />
        <Services />
        <CtaContact />
      </main>
      <Footer />
    </>
  );
}
