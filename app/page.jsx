import HeroSection from "./components/HeroSection";
import CodingFeaturesSection from "./components/CodingFeaturesSection";
import ProjectsSection from "./components/ProjectsSection";
import WhyChooseUs from "./components/WhyChooseUs";
import FAQSection from "./components/faqSection";
import YoutubeSection from "./components/YoutubeSection";
import TestimonialSection from "./components/TestimonialSection";

export default function Home() {
  return (
    <div className="bg-[#fcfcfd]">
      <HeroSection />
      <CodingFeaturesSection />
      <ProjectsSection />
      <WhyChooseUs />
      <YoutubeSection />
      <TestimonialSection />
      <FAQSection />
    </div>
  );
}
