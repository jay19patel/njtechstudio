import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import TechSkillSection from "./components/TechSkillSection";
import WhyChooseUs from "./components/WhyChooseUs";
import LatestProjects from "./components/LatestProjects";
import SolutionsSection from "./components/SolutionsSection";
import FAQSection from "./components/faqSection";
import YoutubeSection from "./components/YoutubeSection";
import TestimonialSection from "./components/TestimonialSection";
import JoinTeamSection from "./components/JoinTeamSection";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <SolutionsSection />
      <TechSkillSection />
      <WhyChooseUs />
      <LatestProjects />
      <YoutubeSection />
      <TestimonialSection />
      <JoinTeamSection />
      <FAQSection />
    </div>
  );
}
