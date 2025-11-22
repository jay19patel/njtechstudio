import React from "react";
import MovingTextBg from "../components/MovingTextBg";
const projects = [
  {
    name: "AI-Powered Blogging Platform",
    techstack: ["Next.js", "FastAPI", "MongoDB", "LangChain", "LangGraph", "Redis", "JWT"],
    description: "Create AI-assisted blogs tailored to your style. Vector store powers semantic search, Redis caching = 35% faster loads. Login, write with AI, share, discover! 🚀",
    link: "https://github.com/yourusername/ai-blog-platform",
  },
  {
    name: "Multi-Microservices Trading Automation",
    techstack: ["Python", "Celery", "Redis Pub/Sub", "WebSocket", "Pandas", "NumPy"],
    description: "Event-driven trading platform with <250ms signal-to-trade execution. Strategy service explores live data, order manager executes, risk manager protects. 90% automation! 📈",
    link: "https://github.com/yourusername/trading-automation",
  },
  {
    name: "AI Talent Acquisition System",
    techstack: ["Python", "FastAPI", "OpenSearch", "Vector DB", "GenAI", "React", "GCP"],
    description: "Automate candidate screening with GenAI + vector search. Reduced manual screening time by ~50%. Smart matching, faster hiring! 💼",
    link: "#",
  },
  {
    name: "Custom ERP Solutions (Frappe/ERPNext)",
    techstack: ["Frappe", "ERPNext", "React", "Python", "PostgreSQL"],
    description: "Built full-stack ERP systems for SMBs. Automated workflows, quotations, task tracking, real-time dashboards. 30% speed boost guaranteed! ⚡",
    link: "#",
  },
  {
    name: "Healthcare Manufacturing Automation",
    techstack: ["C#", ".NET", "SQL Server", "Python", "FastAPI", "IoT"],
    description: "IoT-integrated automation for healthcare manufacturing. Streamlined documentation, reduced manual processing by 50%+. Efficiency unlocked! 🏥",
    link: "#",
  },
  {
    name: "Car Rental Management System",
    techstack: ["Frappe", "Python", "JavaScript", "Email Automation"],
    description: "Automated HR approvals, employee bookings, car provider coordination. Email loops + status tracking = fully automated rental workflow! 🚗",
    link: "#",
  },
];

export default function ProjectGrid() {
  return (
    <MovingTextBg text="PROJECTS" textColor="text-gray-400">
    <div className="p-10 pt-20"> {/* More top spacing */}
      {/* Heading Section */}
      <div className="mb-12 text-left">
        <h2 className="text-5xl font-extrabold text-gray-900 leading-tight">
          Stuff I've Built & Shipped
        </h2>
        <p className="text-lg text-gray-600 mt-2 max-w-xl">
          Real projects from AI-powered platforms to trading bots to ERP systems. If it scales and solves problems, it's here! 💻
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
