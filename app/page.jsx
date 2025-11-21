import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import TechSkillSection from "./components/TechSkillSection";
import WhyChooseUs from "./components/WhyChooseUs";
import SolutionsSection from "./components/SolutionsSection";
import FAQSection from "./components/faqSection";
import YoutubeSection from "./components/YoutubeSection"

export default function Home() {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <SolutionsSection/>
      <TechSkillSection />
      <WhyChooseUs />
      <YoutubeSection/>
      <FAQSection />
    </div>
  );
}
