"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";
import toolsData from "../data/tools.json";
import MovingTextBg from "./MovingTextBg";
import { motion } from "framer-motion";
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
          <div className="absolute top-1/2 right-20 w-20 h-20 bg-indigo-100 rounded-full opacity-15 blur-xl"></div>
          {/* Squares */}
          <div className="absolute top-10 left-1/4 w-12 h-12 border-2 border-indigo-200 opacity-20 rotate-45"></div>
          <div className="absolute bottom-10 right-1/4 w-8 h-8 border-2 border-indigo-200 opacity-20 rotate-12"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Right Aligned Heading */}
          <div className="relative mb-12 flex justify-end">
            <div className="space-y-2 text-right">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900">
                Our Skills & <span className="text-indigo-800">Expertise</span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl ml-auto">
                Powered by expertise, driven by innovation. We master the tools that turn ambitious ideas into real-world solutions, delivering speed, scalability, and success.
              </p>
            </div>
          </div>

          {/* Bento Box Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 md:mt-16">
            {[
              {
                id: "backend",
                title: "Backend Development",
                quote: "Backend is the heart of any application, powering the core functionality that users never see but always rely on. We build secure, scalable, and high-performance systems that handle millions of requests while maintaining optimal performance.",
                subtitle: "Robust server-side solutions for scalable applications.",
                theme: "indigo"
              },
              {
                id: "frontend",
                title: "Frontend Development",
                quote: "Frontend is the face of your application - the first impression that matters. We create beautiful, responsive, and intuitive interfaces.",
                subtitle: "Modern user interfaces that engage and convert.",
                theme: "black"
              },
              {
                id: "database",
                title: "Database Solutions",
                quote: "Database is the foundation of data storage and management. We implement robust solutions that handle complex queries.",
                subtitle: "Reliable data management for your business needs.",
                theme: "indigo"
              },
              {
                id: "other-tools",
                title: "Development Tools",
                quote: "We leverage a comprehensive suite of tools and services that streamline development, enhance productivity, and ensure quality.",
                subtitle: "Essential tools and services for seamless development.",
                theme: "black"
              }
            ].map((section, idx) => {
              const isIndigo = section.theme === "indigo";
              let spanClass = "col-span-1";
              if (idx === 0) spanClass = "md:col-span-2 lg:col-span-2"; // Backend box
              else if (idx === 1) spanClass = "col-span-1"; // Frontend box
              else if (idx === 2) spanClass = "col-span-1"; // Database box
              else if (idx === 3) spanClass = "md:col-span-2 lg:col-span-2"; // Tools box

              return (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ 
                    duration: 0.5,
                    ease: "easeOut",
                    delay: idx * 0.1 
                  }}
                  className={`
                    relative overflow-hidden group flex flex-col justify-between
                    rounded-[2rem] border bg-zinc-950 border-zinc-800 transition-colors duration-300 ease-out p-6 sm:p-8 hover:border-zinc-600 hover:bg-zinc-900/80
                    ${spanClass}
                  `}
                >
                  {/* Content Container */}
                  <div className="relative z-10 flex flex-col h-full justify-between">
                    <div>
                      <svg className={`w-10 h-10 mb-4 text-indigo-500`} fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>

                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-black mb-4 text-white uppercase tracking-tight group-hover:text-indigo-400 transition-colors">
                        {section.title}
                      </h3>

                      <p className={`text-sm sm:text-base font-medium mb-6 leading-relaxed text-zinc-400 group-hover:text-zinc-300 transition-colors`}>
                        &quot;{section.quote}&quot;
                      </p>
                    </div>

                    <div className="mt-auto">
                      <div className="flex flex-wrap gap-2 pt-6 border-t border-zinc-800">
                        {toolsData[section.id]?.map((tool, index) => (
                          <span
                            key={index}
                            className={`
                              flex items-center gap-2 border px-3 py-1.5 rounded-lg text-xs font-bold transition-colors bg-zinc-900 border-zinc-700 text-zinc-300 group-hover:border-indigo-500/50 group-hover:bg-indigo-950/50 group-hover:text-white
                            `}
                          >
                            {tool.icon && (
                              <img 
                                src={tool.icon} 
                                alt="" 
                                className="w-4 h-4 object-contain" 
                                onError={(e) => { e.target.style.display = 'none'; }}
                              />
                            )}
                            <span>{tool.name}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>
    </MovingTextBg>
  );
}
