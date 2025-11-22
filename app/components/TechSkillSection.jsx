"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";
import toolsData from "../data/tools.json";
import MovingTextBg from "./MovingTextBg";
export default function TechSkillSection() {
  const [activeTab, setActiveTab] = useState("backend");

  const getContent = () => {
    switch (activeTab) {
      case "backend":
        return {
          title: "Backend Development",
          quote: "Backend is the heart of any application, powering the core functionality that users never see but always rely on. We build secure, scalable, and high-performance systems that handle millions of requests while maintaining optimal performance.",
          subtitle: "Robust server-side solutions for scalable applications."
        };
      case "frontend":
        return {
          title: "Frontend Development",
          quote: "Frontend is the face of your application - the first impression that matters. We create beautiful, responsive, and intuitive interfaces using cutting-edge technologies, ensuring your application looks great and provides seamless interactions across all devices.",
          subtitle: "Modern user interfaces that engage and convert."
        };
      case "database":
        return {
          title: "Database Solutions",
          quote: "Database is the foundation of data storage and management. We implement robust solutions that handle complex queries, maintain data integrity, and support high-volume transactions, ensuring reliable data management and seamless scalability.",
          subtitle: "Reliable data management for your business needs."
        };
      case "other-tools":
        return {
          title: "Development Tools",
          quote: "We leverage a comprehensive suite of tools and services that streamline development, enhance productivity, and ensure quality. From version control and CI/CD pipelines to cloud services, these utilities form the backbone of modern software development.",
          subtitle: "Essential tools and services for seamless development."
        };
      default:
        return {
          title: "Technology Stack",
          quote: "Our comprehensive technology stack ensures your applications are built with the best tools and practices.",
          subtitle: "We handle the surges, you focus on growth."
        };
    }
  };

  return (
    <MovingTextBg text="TECHSTACK" textColor="text-gray-400">
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 overflow-hidden ">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {/* Dotted Pattern */}
        <div className="absolute top-20 right-10 w-24 h-24 opacity-10">
          <svg width="100%" height="100%" className="text-indigo-600">
            <circle cx="8" cy="8" r="1.5" fill="currentColor" />
            <circle cx="24" cy="8" r="1.5" fill="currentColor" />
            <circle cx="40" cy="8" r="1.5" fill="currentColor" />
            <circle cx="8" cy="24" r="1.5" fill="currentColor" />
            <circle cx="24" cy="24" r="1.5" fill="currentColor" />
            <circle cx="40" cy="24" r="1.5" fill="currentColor" />
            <circle cx="8" cy="40" r="1.5" fill="currentColor" />
            <circle cx="24" cy="40" r="1.5" fill="currentColor" />
            <circle cx="40" cy="40" r="1.5" fill="currentColor" />
          </svg>
        </div>
        {/* Circles */}
        <div className="absolute bottom-20 left-10 w-32 h-32 bg-indigo-100 rounded-full opacity-20 blur-2xl"></div>
        <div className="absolute top-1/2 right-20 w-20 h-20 bg-purple-100 rounded-full opacity-15 blur-xl"></div>
        {/* Squares */}
        <div className="absolute top-10 left-1/4 w-12 h-12 border-2 border-indigo-200 opacity-20 rotate-45"></div>
        <div className="absolute bottom-10 right-1/4 w-8 h-8 border-2 border-purple-200 opacity-20 rotate-12"></div>
      </div>

      {/* Centered Heading */}
      <div className="relative text-center mb-12">
        <div className="space-y-2">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900">
            Our Skills & <span className="text-indigo-600">Expertise</span>
          </h2>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Left Side - Tabs and Skills */}
        <div className="w-full flex flex-col items-center">
          <Tabs defaultValue="backend" className="w-full" onValueChange={setActiveTab}>
            <div className="mb-6 flex justify-center overflow-x-auto w-full">
              <TabsList className="inline-flex items-center gap-0 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-gray-200 p-1 flex-wrap lg:flex-nowrap">
                <TabsTrigger 
                  value="backend"
                  className="px-4 lg:px-6 py-2 rounded-full text-gray-600 hover:text-black font-medium transition-colors text-sm lg:text-base data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-700 data-[state=active]:border data-[state=active]:border-indigo-300 whitespace-nowrap"
                >
                  Backend
                </TabsTrigger>
                <TabsTrigger 
                  value="frontend"
                  className="px-4 lg:px-6 py-2 rounded-full text-gray-600 hover:text-black font-medium transition-colors text-sm lg:text-base data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-700 data-[state=active]:border data-[state=active]:border-indigo-300 whitespace-nowrap"
                >
                  Frontend
                </TabsTrigger>
                <TabsTrigger 
                  value="database"
                  className="px-4 lg:px-6 py-2 rounded-full text-gray-600 hover:text-black font-medium transition-colors text-sm lg:text-base data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-700 data-[state=active]:border data-[state=active]:border-indigo-300 whitespace-nowrap"
                >
                  Database
                </TabsTrigger>
                <TabsTrigger 
                  value="other-tools"
                  className="px-4 lg:px-6 py-2 rounded-full text-gray-600 hover:text-black font-medium transition-colors text-sm lg:text-base data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-700 data-[state=active]:border data-[state=active]:border-indigo-300 whitespace-nowrap"
                >
                  Other Tools
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Skills with Icons */}
            <TabsContent value="backend" className="mt-0">
              <div className="flex flex-wrap justify-center gap-3">
                {toolsData["backend"].map((tool, index) => (
                  <span 
                    key={index}
                    className="flex items-center gap-2.5 bg-gray-200/50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-4 py-2 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    {tool.icon && (
                      <img src={tool.icon} alt={tool.name} className="w-5 h-5 object-contain" />
                    )}
                    {tool.name}
                  </span>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="frontend" className="mt-0">
              <div className="flex flex-wrap justify-center gap-3">
                {toolsData["frontend"].map((tool, index) => (
                  <span 
                    key={index}
                    className="flex items-center gap-2.5 bg-gray-200/50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-4 py-2 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    {tool.icon && (
                      <img src={tool.icon} alt={tool.name} className="w-5 h-5 object-contain" />
                    )}
                    {tool.name}
                  </span>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="database" className="mt-0">
              <div className="flex flex-wrap justify-center gap-3">
                {toolsData["database"].map((tool, index) => (
                  <span 
                    key={index}
                    className="flex items-center gap-2.5 bg-gray-200/50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-4 py-2 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    {tool.icon && (
                      <img src={tool.icon} alt={tool.name} className="w-5 h-5 object-contain" />
                    )}
                    {tool.name}
                  </span>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="other-tools" className="mt-0">
              <div className="flex flex-wrap justify-center gap-3">
                {toolsData["other-tools"].map((tool, index) => (
                  <span 
                    key={index}
                    className="flex items-center gap-2.5 bg-gray-200/50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-4 py-2 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    {tool.icon && (
                      <img src={tool.icon} alt={tool.name} className="w-5 h-5 object-contain" />
                    )}
                    {tool.name}
                  </span>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

{/* Right Side - Content Description (Updated Styling) */}
      <div className="w-full lg:sticky lg:top-8">
        <div className="max-w-md mx-auto">
          <div className="relative overflow-hidden bg-linear-to-b from-black via-gray-900 to-gray-800 rounded-xl shadow-2xl p-8 text-white">
            {/* Subtle Purple Glow Layer */}
            

            {/* Soft Skew Highlight */}
            <div className="absolute top-0 left-0 w-full h-full bg-gray-200/5 transform -skew-x-12"></div>

            <div className="relative z-10">
              <svg className="w-12 h-12 mb-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>

              <h3 className="text-xl font-semibold mb-3 text-gray-100">
                {getContent().title}
              </h3>

              <p className="text-lg font-medium mb-4 leading-relaxed text-gray-300">
                "{getContent().quote}"
              </p>

              <div className="flex items-center pt-4 border-t border-gray-500/30">
                <div className="flex-1">
                  <h4 className="font-semibold text-white">Expert Solutions</h4>
                  <p className="text-gray-400 text-sm">{getContent().subtitle}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      </div>
    </section>
    </MovingTextBg>
  );
}


