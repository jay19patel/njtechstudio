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

export default function SkillsSection() {
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
            <div className="flex flex-wrap justify-center gap-3 pt-4">
              {getCurrentData().map((item, index) => (
                <span 
                  key={index}
                  className="px-5 py-2.5 bg-purple-50 border border-purple-300 rounded-md text-base font-medium text-gray-700"
                >
                  {item}
                </span>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-4 pt-8">
          <Link
            href="/signup"
            className="inline-flex items-center justify-center bg-black text-white px-8 py-4 rounded-md hover:bg-gray-800 transition-colors font-semibold"
          >
            Try for free →
          </Link>
          <Link
            href="/infrastructure"
            className="inline-flex items-center justify-center border-2 border-black text-black px-8 py-4 rounded-md hover:bg-black hover:text-white transition-colors font-semibold"
          >
            More about infrastructure
          </Link>
        </div>

        {/* Performance Chart Placeholder */}
        <div className="mt-16 bg-white/80 backdrop-blur-sm rounded-2xl p-12 border border-gray-200">
          <div className="relative h-64 flex items-end justify-center gap-2">
            {/* Simple bar chart representation */}
            <div className="w-full max-w-4xl flex items-end justify-around h-full">
              {[40, 60, 45, 70, 55, 80, 65, 75, 85, 70, 90, 95].map((height, i) => (
                <div
                  key={i}
                  className="flex-1 bg-gradient-to-t from-orange-500 to-orange-400 rounded-t-lg opacity-80 hover:opacity-100 transition-opacity"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
            {/* Performance Score Badge */}
            <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 bg-white rounded-full w-24 h-24 flex items-center justify-center shadow-lg border-4 border-green-500">
              <span className="text-3xl font-bold">99</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

