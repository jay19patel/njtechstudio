"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";
import toolsData from "../data/tools.json";

export default function TechSkillSection() {
  const [activeTab, setActiveTab] = useState("backend");

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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 ">
      <div className="text-center">
        {/* Heading */}
        <div className="space-y-2 mb-8">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900">
            Our Skills & <span className="text-indigo-600">Expertise</span>
          </h2>
          <p className="text-lg lg:text-xl text-gray-500 pt-2 max-w-2xl mx-auto">
            {getSubtitle()}
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="backend" className="w-full" onValueChange={setActiveTab}>
          <div className="flex justify-center mb-8 overflow-x-auto">
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
          <TabsContent value="backend" className="mt-8">
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
          <TabsContent value="frontend" className="mt-8">
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
          <TabsContent value="database" className="mt-8">
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
          <TabsContent value="other-tools" className="mt-8">
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
    </section>
  );
}


