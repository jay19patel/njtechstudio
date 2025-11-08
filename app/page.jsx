import HeroSection from "./components/HeroSection";
import TechSkillSection from "./components/TechSkillSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <TechSkillSection />
    </div>
  );
}
