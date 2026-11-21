import { getAboutContent, getSiteConfig } from "@/lib/api";
import AboutPageClient from "./AboutPageClient";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const [aboutData, siteConfig] = await Promise.all([
    getAboutContent(),
    getSiteConfig(),
  ]);

  const profile = aboutData?.profile || {};
  const brand = siteConfig?.brand_name || "NJTechStudio";
  const title = `About ${profile.founder_name || "Jay Patel"} & Studio | ${brand}`;
  const description = profile.hero_subtitle || profile.intro_text || "Driven by engineering excellence, built with clarity, and crafted for long-term digital impact.";

  return {
    title,
    description,
    keywords: [
      "About NJTechStudio",
      "Jay Patel Software Developer",
      "Full-Stack Engineer",
      "AI Automation Studio",
      "Next.js Django Developer",
      "Python Developer Gujarat",
      "Custom Software Development",
    ],
    alternates: {
      canonical: "https://njtechstudio.in/about",
    },
    openGraph: {
      title,
      description,
      url: "https://njtechstudio.in/about",
      siteName: brand,
      type: "profile",
      images: [
        {
          url: profile.founder_avatar || "/photo.png",
          width: 800,
          height: 800,
          alt: profile.founder_name || "Jay Patel",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [profile.founder_avatar || "/photo.png"],
    },
  };
}

export default async function AboutPage() {
  const [aboutData, siteConfig] = await Promise.all([
    getAboutContent(),
    getSiteConfig(),
  ]);

  const profile = aboutData?.profile || {};

  // JSON-LD Structured Data for Googlebot & SEO Crawlers
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://njtechstudio.in/#organization",
        "name": siteConfig?.brand_name || "NJTechStudio",
        "url": "https://njtechstudio.in",
        "logo": "https://njtechstudio.in/icon.png",
        "description": siteConfig?.meta_description || "Custom Web + AI Automation Studio",
        "founder": {
          "@type": "Person",
          "name": profile.founder_name || "Jay Patel",
          "jobTitle": profile.founder_role || "Founder & Lead Engineer",
          "image": "https://njtechstudio.in/photo.png",
          "sameAs": [
            siteConfig?.github_url || "https://github.com/jay19patel",
            siteConfig?.linkedin_url || "https://www.linkedin.com/in/jay-patel-843818169/",
            siteConfig?.youtube_url || "https://www.youtube.com/@njtechstudio",
            siteConfig?.twitter_url || "https://x.com/jaypatel_dev",
          ],
        },
      },
      {
        "@type": "Person",
        "@id": "https://njtechstudio.in/about#person",
        "name": profile.founder_name || "Jay Patel",
        "jobTitle": profile.founder_role || "Founder & Lead Engineer",
        "worksFor": {
          "@id": "https://njtechstudio.in/#organization",
        },
        "description": profile.founder_bio,
        "image": "https://njtechstudio.in/photo.png",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutPageClient initialData={aboutData} />
    </>
  );
}
