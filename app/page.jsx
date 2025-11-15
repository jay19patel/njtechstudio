import HeroSection from "./components/HeroSection";
import TechSkillSection from "./components/TechSkillSection";
import SolutionsSection from "./components/SolutionsSection";
import FAQSection from "./components/faqSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <SolutionsSection />
      <TechSkillSection />
      <FAQSection />
    </div>
  );
}
