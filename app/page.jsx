import HeroSection from "./components/HeroSection";
import TrustedClients from "./components/TrustedClients";
import TechSkillSection from "./components/TechSkillSection";
import FAQSection from "./components/faqSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <TrustedClients />
      <TechSkillSection />
      <FAQSection />
    </div>
  );
}
