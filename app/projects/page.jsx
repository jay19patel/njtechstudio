import React from "react";
import MovingTextBg from "../components/MovingTextBg";
const projects = [
  {
    name: "AI Sales Assistant",
    techstack: ["Next.js", "React", "Tailwind", "Node.js", "PostgreSQL"],
    description: "Automates outreach and improves lead conversions using AI.",
    link: "https://example.com/ai-sales-assistant",
  },
  {
    name: "Portfolio Analyzer",
    techstack: ["Python", "FastAPI", "React", "Pandas", "Docker"],
    description: "Tool that analyzes investment portfolios with real‑time metrics.",
    link: "https://example.com/portfolio-analyzer",
  },
  {
    name: "SaaS Metrics Dashboard",
    techstack: ["Vue", "Supabase", "Tailwind", "D3.js", "Vercel"],
    description: "Beautiful dashboard showing growth metrics for SaaS companies.",
    link: "https://example.com/saas-dashboard",
  },
  {
    name: "Team Collaboration Hub",
    techstack: ["React", "Firebase", "Zustand", "Node.js", "Express"],
    description: "Centralized platform to enhance team collaboration and productivity.",
    link: "https://example.com/collab-hub",
  },
  {
    name: "Market Research Engine",
    techstack: ["Next.js", "Redis", "OpenAI API", "Tailwind", "MySQL"],
    description: "AI‑powered engine that summarizes market reports instantly.",
    link: "https://example.com/market-research",
  },
];

export default function ProjectGrid() {
  return (
    <MovingTextBg text="PROJECTS" textColor="text-gray-400">
    <div className="p-10 pt-20"> {/* More top spacing */}
      {/* Heading Section */}
      <div className="mb-12 text-left">
        <h2 className="text-5xl font-extrabold text-gray-900 leading-tight">
          Featured Projects
        </h2>
        <p className="text-lg text-gray-600 mt-2 max-w-xl">
          A curated selection of powerful projects built using modern technologies.
        </p>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> {/* Better spacing */}
        {projects.map((proj, index) => (
          <div
            key={index}
            className="border rounded-2xl p-6 shadow-sm bg-white hover:shadow-lg transition-all duration-200"
          >
            <h2 className="text-xl font-bold mb-2">{proj.name}</h2>
            <p className="text-sm text-gray-600 mb-4 line-clamp-2">{proj.description}</p>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 mb-4">
              {proj.techstack.slice(0, 5).map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-700"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Link Button */}
            <a
              href={proj.link}
              target="_blank"
              className="inline-block px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
            >
              View Project
            </a>
          </div>
        ))}
      </div>
    </div>
    </MovingTextBg>
  );
}
