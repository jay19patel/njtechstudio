import HeroSection from "./components/HeroSection";
import TechSkillSection from "./components/TechSkillSection";
import SolutionsSection from "./components/SolutionsSection";
import FAQSection from "./components/faqSection";
import CTASection from "./components/CTASection";
import AboutSection from "./components/AboutSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <SolutionsSection />
      <TechSkillSection />
      <AboutSection />
      <CTASection />
      <FAQSection />
    </div>
  );
}
