import HeroSection from "./components/HeroSection";
import CodingFeaturesSection from "./components/CodingFeaturesSection";
import ProjectsSection from "./components/ProjectsSection";
import WhyChooseUs from "./components/WhyChooseUs";
import FAQSection from "./components/faqSection";
import YoutubeSection from "./components/YoutubeSection";
import TestimonialSection from "./components/TestimonialSection";
import { getSiteConfig } from "@/lib/api";

export async function generateMetadata() {
  const config = (await getSiteConfig()) || {};
  const siteName = config.brand_name || "NJTechStudio";
  const title = config.meta_title || "NJTechStudio | AI Automation & Custom Web Studio";
  const description =
    config.meta_description ||
    "High-performance Next.js web applications, Python/Django microservices, AI integrations, and automated workflows.";

  return {
    title: {
      absolute: title,
    },
    description,
    keywords: [
      "NJTechStudio",
      "Full-Stack Web Development",
      "AI Automation Studio",
      "Next.js Development",
      "Python Django FastAPI",
      "Custom Software Development India",
      "Jay Patel Developer",
    ],
    alternates: {
      canonical: "https://njtechstudio.in",
    },
    openGraph: {
      title,
      description,
      url: "https://njtechstudio.in",
      siteName,
      type: "website",
      images: [{ url: "/icon.png" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/icon.png"],
    },
  };
}

export default async function Home() {
  const config = (await getSiteConfig()) || {};

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://njtechstudio.in/#website",
        "url": "https://njtechstudio.in",
        "name": config.brand_name || "NJTechStudio",
        "description": config.meta_description,
        "inLanguage": "en-US",
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://njtechstudio.in/#service",
        "name": config.brand_name || "NJTechStudio",
        "url": "https://njtechstudio.in",
        "logo": "https://njtechstudio.in/icon.png",
        "image": "https://njtechstudio.in/photo.png",
        "description": config.bio || "Custom Web + AI Automation Studio",
        "email": config.contact_email || "justjayy19@gmail.com",
        "telephone": config.phone_number || "+91 98765 43210",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": config.location || "Gujarat, India",
          "addressCountry": "IN",
        },
        "sameAs": [
          config.github_url || "https://github.com/jay19patel",
          config.linkedin_url || "https://www.linkedin.com/in/jay-patel-843818169/",
          config.youtube_url || "https://www.youtube.com/@njtechstudio",
          config.twitter_url || "https://x.com/jaypatel_dev",
        ],
      },
    ],
  };

  return (
    <div className="bg-[#fcfcfd]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
