import HeroSection from "./components/HeroSection";
import SolutionsSection from "./components/SolutionsSection";
import WhyChooseUs from "./components/WhyChooseUs";
import LatestProjects from "./components/LatestProjects";
import FAQSection from "./components/faqSection";
import YoutubeSection from "./components/YoutubeSection";
import TestimonialSection from "./components/TestimonialSection";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <SolutionsSection />
      <WhyChooseUs />
      <LatestProjects />
      <YoutubeSection />
      <TestimonialSection />
      <FAQSection />
    </div>
  );
}
