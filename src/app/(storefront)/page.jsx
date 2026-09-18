import HeroSection from "@/components/sections/landing/HeroSection.jsx";
import CategorySection from "@/components/sections/landing/CategorySection.jsx";
import TrustSection from "@/components/sections/landing/TrustSection.jsx";
import TrendingSection from "@/components/sections/landing/TrendingSection.jsx";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <CategorySection />
      <TrendingSection />
      <TrustSection/>
    </>
  );
};

export default HomePage;
