import HeroSection from "@/components/sections/HeroSection";
import StatsBar from "@/components/sections/StatsBar";
import StrategicWindowSection from "@/components/sections/StrategicWindowSection";
import TerritorySection from "@/components/sections/TerritorySection";
import BrandAuthoritySection from "@/components/sections/BrandAuthoritySection";
import PricingSection from "@/components/sections/PricingSection";
import FaqSection from "@/components/sections/FaqSection";
import CtaBanner from "@/components/sections/CtaBanner";
import { getHomeSections } from "@/lib/cms";

export default async function Home() {
  const sections = await getHomeSections();

  return (
    <>
      <HeroSection data={sections.hero} />
      <StatsBar />
      <StrategicWindowSection data={sections.strategic_window} />
      <TerritorySection data={sections.territory_zip} />
      <BrandAuthoritySection data={sections.recognition} />
      <PricingSection data={sections.pricing} />
      <FaqSection data={sections.qa} />
      <CtaBanner />
    </>
  );
}
