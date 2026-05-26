import HomeHero from "./_home/HomeHero";
import HomeOutcomes from "./_home/HomeOutcomes";
import HomeFounderQuote from "./_home/HomeFounderQuote";
import HomeGallery from "./_home/HomeGallery";
import HomeLiveBuilds from "./_home/HomeLiveBuilds";
import HomeStudioMind from "./_home/HomeStudioMind";
import HomeBrings from "./_home/HomeBrings";
import HomeStack from "./_home/HomeStack";
import HomeFAQ from "./_home/HomeFAQ";
import HomeCTA from "./_home/HomeCTA";

export default function Home() {
  return (
    <main>
      <HomeHero />
      <HomeOutcomes />
      <HomeFounderQuote />
      <HomeGallery />
      <HomeLiveBuilds />
      <HomeStudioMind />
      <HomeBrings />
      <HomeStack />
      <HomeFAQ />
      <HomeCTA />
    </main>
  );
}
