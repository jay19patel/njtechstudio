import { getProjects, getSiteConfig } from "@/lib/api";
import ProjectsPageClient from "./ProjectsPageClient";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const siteConfig = (await getSiteConfig()) || {};
  const brand = siteConfig.brand_name || "NJTechStudio";
  const title = `Projects & Case Studies | ${brand}`;
  const description =
    "Explore our production portfolio: high-frequency trading bots, AI lead automations, modern Next.js web applications, and Frappe ERP solutions.";

  return {
    title,
    description,
    keywords: [
      "Software Development Portfolio",
      "Next.js Projects",
      "Python Django Case Studies",
      "FastAPI Projects",
      "AI Automation Studio",
      "NJTechStudio Portfolio",
    ],
    alternates: {
      canonical: "https://njtechstudio.in/projects",
    },
    openGraph: {
      title,
      description,
      url: "https://njtechstudio.in/projects",
      siteName: brand,
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

export default async function ProjectsPage() {
  const [projects, siteConfig] = await Promise.all([
    getProjects(),
    getSiteConfig(),
  ]);

  const projectList = Array.isArray(projects) ? projects : [];

  // Schema.org ItemList JSON-LD structured data for Googlebot
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "NJTechStudio Production Portfolio & Projects",
    "description": "Curated selection of production software engineering case studies",
    "numberOfItems": projectList.length,
    "itemListElement": projectList.map((project, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "SoftwareApplication",
        "name": project.title,
        "description": project.description,
        "applicationCategory": project.category,
        "url": `https://njtechstudio.in/projects/${project.slug}`,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectsPageClient initialProjects={projectList} />
    </>
  );
}
