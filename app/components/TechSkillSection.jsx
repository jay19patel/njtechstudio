"use client";

import Link from "next/link";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";

// Data arrays for each tab
const backendData = [
  "Node.js",
  "Python",
  "Java",
  "PHP",
  "Ruby on Rails",
  "Express.js",
  "Django",
  "Spring Boot",
  "Laravel",
  "FastAPI",
  "NestJS",
  "GraphQL"
];

const frontendData = [
  "React",
  "Next.js",
  "Vue.js",
  "Angular",
  "TypeScript",
  "Tailwind CSS",
  "JavaScript",
  "HTML5",
  "CSS3",
  "SASS",
  "Redux",
  "Material UI"
];

const databaseData = [
  "PostgreSQL",
  "MySQL",
  "MongoDB",
  "Redis",
  "Firebase",
  "Supabase",
  "SQLite",
  "Cassandra",
  "Elasticsearch",
  "DynamoDB",
  "MariaDB",
  "Prisma"
];

const otherToolsData = [
  "Docker",
  "Kubernetes",
  "AWS",
  "Git",
  "CI/CD",
  "Jenkins",
  "GitHub Actions",
  "Vercel",
  "Netlify",
  "Jira",
  "Figma",
  "Postman"
];

export default function TechSkillSection() {
  const [activeTab, setActiveTab] = useState("backend");

  const getCurrentData = () => {
    switch (activeTab) {
      case "backend":
        return backendData;
      case "frontend":
        return frontendData;
      case "database":
        return databaseData;
      case "other-tools":
        return otherToolsData;
      default:
        return backendData;
    }
  };

  const getSubtitle = () => {
    switch (activeTab) {
      case "backend":
        return "Robust server-side solutions for scalable applications.";
      case "frontend":
        return "Modern user interfaces that engage and convert.";
      case "database":
        return "Reliable data management for your business needs.";
      case "other-tools":
        return "Essential tools and services for seamless development.";
      default:
        return "We handle the surges, you focus on growth.";
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center">
        {/* Tabs */}
        <Tabs defaultValue="backend" className="w-full" onValueChange={setActiveTab}>
          <div className="flex justify-center mb-4">
            <TabsList className="inline-flex items-center gap-0 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-gray-200 p-1">
            <TabsTrigger 
              value="backend"
              className="px-6 py-2 rounded-full text-gray-600 hover:text-black font-medium transition-colors data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700 data-[state=active]:border data-[state=active]:border-purple-300"
            >
              Backend
            </TabsTrigger>
            <TabsTrigger 
              value="frontend"
              className="px-6 py-2 rounded-full text-gray-600 hover:text-black font-medium transition-colors data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700 data-[state=active]:border data-[state=active]:border-purple-300"
            >
              Frontend
            </TabsTrigger>
            <TabsTrigger 
              value="database"
              className="px-6 py-2 rounded-full text-gray-600 hover:text-black font-medium transition-colors data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700 data-[state=active]:border data-[state=active]:border-purple-300"
            >
              Database
            </TabsTrigger>
            <TabsTrigger 
              value="other-tools"
              className="px-6 py-2 rounded-full text-gray-600 hover:text-black font-medium transition-colors data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700 data-[state=active]:border data-[state=active]:border-purple-300"
            >
              Other Tools
            </TabsTrigger>
            </TabsList>
          </div>

          {/* Heading */}
          <div className="space-y-2 pt-4">
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold">
              Our Skills & Expertise
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600">
              {getSubtitle()}
            </p>
          </div>

          {/* Feature Pills */}
          <TabsContent value={activeTab} className="mt-0">
            <div className="flex flex-wrap justify-center gap-3 pt-4" style={{ fontFamily: 'var(--font-ibm-plex-sans-condensed), sans-serif' }}>
              {getCurrentData().map((item, index) => (
                <span 
                  key={index}
                  className="px-5 py-1.5 bg-purple-50 border border-purple-300 rounded-md text-base font-medium text-gray-700"
                >
                  {item}
                </span>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}


