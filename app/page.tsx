import HomeHero from "./_home/HomeHero";
import HomeWhatWeBuild from "./_home/HomeWhatWeBuild";
import HomeGallery from "./_home/HomeGallery";
import HomeStudioMind from "./_home/HomeStudioMind";
import HomeWhyNotDIY from "./_home/HomeWhyNotDIY";
import HomeStack from "./_home/HomeStack";
import HomeFAQ from "./_home/HomeFAQ";
import HomeCTA from "./_home/HomeCTA";

export default function Home() {
  return (
    <main>
      <HomeHero />
      <HomeWhatWeBuild />
      <HomeGallery />
      <HomeStudioMind />
      <HomeWhyNotDIY />
      <HomeStack />
      <HomeFAQ />
      <HomeCTA />
    </main>
  );
}
