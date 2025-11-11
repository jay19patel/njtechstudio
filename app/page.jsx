import HeroSection from "./components/HeroSection";
import TrustedClients from "./components/TrustedClients";
import TechSkillSection from "./components/TechSkillSection";
import SolutionsSection from "./components/SolutionsSection";
import AboutSection from "./components/AboutSection";
import FAQSection from "./components/faqSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <TrustedClients />
      <TechSkillSection />
      <SolutionsSection />
      <FAQSection />
    </div>
  );
}
