import HeroSection from "@/components/sections/HeroSection";
import StatsBar from "@/components/sections/StatsBar";
import StrategicWindowSection from "@/components/sections/StrategicWindowSection";
import TerritorySection from "@/components/sections/TerritorySection";
import BrandAuthoritySection from "@/components/sections/BrandAuthoritySection";
import PricingSection from "@/components/sections/PricingSection";
import FaqSection from "@/components/sections/FaqSection";
import CtaBanner from "@/components/sections/CtaBanner";

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <StrategicWindowSection />
      <TerritorySection />
      <BrandAuthoritySection />
      <PricingSection />
      <FaqSection />
      <CtaBanner />
    </>
  );
}
