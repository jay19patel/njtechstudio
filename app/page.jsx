import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import TechSkillSection from "./components/TechSkillSection";
import WhyChooseUs from "./components/WhyChooseUs";
import ProjectsSection from "./components/ProjectsSection";
import TestimonialsSection from "./components/TestimonialsSection";
import SolutionsSection from "./components/SolutionsSection";
import FAQSection from "./components/faqSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <TechSkillSection />
      <WhyChooseUs />
      <ProjectsSection />
      <TestimonialsSection />
      <FAQSection />
    </div>
  );
}
