"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowRight, Video, Code2, Layers, Cpu, GraduationCap, Sparkles } from "lucide-react";
import MovingTextBg from "./MovingTextBg";
import { useContactModal } from "../context/ContactModalContext";

// Initial default 4 core services
const DEFAULT_SERVICES = [
  {
    id: 1,
    num: "01",
    label: "WEB + AI DEVELOPMENT",
    title: "WEB + AI",
    description:
      "Building fast, scalable, and intelligent applications using Next.js, React, FastAPI, Django, and GenAI. Backend APIs and AI agents.",
    techStack: ["Next.js", "FastAPI", "React", "Python", "GenAI"],
    icon: Code2,
  },
  {
    id: 2,
    num: "02",
    label: "ERP & AUTOMATION",
    title: "ERP SYSTEMS",
    description:
      "Automating operations with custom ERP systems built using Frappe / ERPNext. Inventory, HR, and real-time business finance dashboards.",
    techStack: ["Frappe / ERPNext", "React", "Python", "Workflows"],
    icon: Layers,
  },
  {
    id: 3,
    num: "03",
    label: "IOT & SMART TECH",
    title: "IOT & SMART AUTOMATION",
    description:
      "Designing IoT systems combining sensors, cloud services, and automation. Real-time telemetry monitoring and industry automation.",
    techStack: ["MQTT", "Raspberry Pi", "Arduino", "Sensors & Cloud"],
    icon: Cpu,
  },
  {
    id: 4,
    num: "04",
    label: "CUSTOM AI AGENTS",
    title: "AUTONOMOUS AI",
    description:
      "Deploying intelligent, autonomous AI agents for customer support, lead generation, and dynamic workflow automation.",
    techStack: ["OpenAI", "LangChain", "Vector DBs", "RAG"],
    icon: Sparkles,
  },
];

export default function SolutionsSection() {
  const { openContactModal } = useContactModal();
  const [services, setServices] = useState(DEFAULT_SERVICES);

  useEffect(() => {
    fetch("/api/admin/data?type=solutions")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const sliced = data.slice(0, 4); // Fetch 4 items instead of 3
          const merged = sliced.map((item, idx) => ({
            ...item,
            num: `0${idx + 1}`,
            title: item.title || item.label,
            techStack: DEFAULT_SERVICES[idx]?.techStack || ["Custom Tech"],
            icon: DEFAULT_SERVICES[idx]?.icon || Code2,
          }));
          // If the API doesn't return 4 items, fill the rest with default services
          while (merged.length < 4) {
            merged.push(DEFAULT_SERVICES[merged.length]);
          }
          setServices(merged);
        }
      })
      .catch((err) => console.error("Error fetching solutions:", err));
  }, []);

  return (
    <MovingTextBg text="WHAT WE DO" textColor="text-white" className="bg-black">
      <section className="relative w-full bg-transparent text-white py-12 sm:py-16 lg:py-20 overflow-hidden border-y border-zinc-900">
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Section Header */}
          <div className="text-left space-y-3 border-b border-zinc-900 pb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-zinc-900 border border-zinc-700 text-white text-xs font-mono font-bold uppercase tracking-widest shadow-md">
              <span className="w-2 h-2 bg-indigo-500 inline-block"></span>
              <span>{"// CORE CAPABILITIES"}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white leading-none">
              WHAT WE <span className="text-indigo-500">BUILD & AUTOMATE</span>
            </h2>
          </div>

          {/* Bento Box Grid - Modern Asymmetric */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10 md:mt-16 md:auto-rows-[minmax(300px,auto)]">
            {services.map((item, idx) => {
              const ServiceIcon = item.icon || Code2;
              
              // Modern Asymmetrical Bento Grid Logic
              let spanClass = "";
              let isLight = false;

              if (idx === 0) {
                spanClass = "md:col-span-2 md:row-span-1";
                isLight = false;
              } else if (idx === 1) {
                spanClass = "md:col-span-1 md:row-span-2";
                isLight = true;
              } else if (idx === 2) {
                spanClass = "md:col-span-1 md:row-span-1";
                isLight = true;
              } else if (idx === 3) {
                spanClass = "md:col-span-1 md:row-span-1";
                isLight = false;
              }

              return (
                <motion.div
                  key={item.id || idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ 
                    duration: 0.5,
                    ease: "easeOut",
                    delay: idx * 0.1 
                  }}
                  className={`
                    relative group flex flex-col justify-between
                    rounded-[2rem] border transition-colors duration-300 ease-out overflow-hidden
                    ${spanClass}
                    ${isLight 
                      ? 'bg-white border-gray-200 hover:border-gray-400' 
                      : 'bg-zinc-950 border-zinc-800 hover:border-zinc-600 hover:bg-zinc-900/80'}
                  `}
                >
                  <div className="relative p-6 sm:p-8 z-10 flex flex-col h-full">
                    {/* Background Graphic */}
                    <div className={`absolute pointer-events-none opacity-[0.03] group-hover:opacity-10 group-hover:scale-110 transition-all duration-700 ease-out ${idx === 1 ? 'bottom-0 right-0 p-8 translate-y-1/4 translate-x-1/4' : 'right-0 top-0 p-6'}`}>
                      <ServiceIcon className={`${idx === 1 ? 'w-64 h-64' : 'w-32 h-32'} ${isLight ? 'text-gray-900' : 'text-white'}`} strokeWidth={idx === 1 ? 0.5 : 1} />
                    </div>

                    {/* Top Section: Tag and Icon */}
                    <div className="flex items-center justify-between mb-8 relative z-20">
                      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono font-bold tracking-wide ${isLight ? 'bg-gray-100 border-gray-200 text-gray-600' : 'bg-zinc-900 border-zinc-700 text-zinc-300'}`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
                        {item.num || `0${idx + 1}`} - {item.label || "SERVICE"}
                      </div>
                      
                      <div className={`relative w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 shadow-xl ${isLight ? 'bg-gray-50 border-gray-200 text-gray-500 group-hover:text-indigo-600 group-hover:border-indigo-500/50 group-hover:bg-indigo-50' : 'bg-zinc-900 border-zinc-800 text-zinc-400 group-hover:text-indigo-400 group-hover:border-indigo-500/50 group-hover:bg-indigo-950/30'}`}>
                        <motion.div
                          animate={{ y: [-2, 2, -2] }}
                          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        >
                          <ServiceIcon className="w-5 h-5 relative z-10" />
                        </motion.div>
                        <span className="absolute inset-0 rounded-full border border-indigo-500 opacity-0 group-hover:animate-ping transition-opacity duration-300 group-hover:opacity-20 pointer-events-none"></span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col justify-center relative z-20 mt-4 mb-10">
                      <h3 className={`font-black leading-tight mb-3 transition-colors ${isLight ? 'text-gray-900 group-hover:text-indigo-600 text-2xl sm:text-3xl' : 'text-white group-hover:text-zinc-200 text-2xl sm:text-3xl'}`}>
                        {item.title || item.label}
                      </h3>
                      
                      <p className={`leading-relaxed font-medium ${isLight ? 'text-gray-500' : 'text-zinc-400'} text-sm sm:text-base`}>
                        {item.description}
                      </p>
                    </div>

                    {/* Bottom Action */}
                    <div className="mt-auto relative z-20">
                      <button
                        type="button"
                        onClick={openContactModal}
                        className={`inline-flex items-center gap-3 text-sm font-bold tracking-wide group/btn ${isLight ? 'text-gray-900' : 'text-white'}`}
                      >
                        <span className={`transition-colors ${isLight ? 'group-hover/btn:text-indigo-600' : 'group-hover/btn:text-zinc-300'}`}>Explore Solution</span>
                        <div className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 shadow-md ${isLight ? 'bg-indigo-50 border-indigo-100 group-hover/btn:bg-indigo-600 group-hover/btn:scale-105' : 'bg-zinc-100 border-zinc-300 group-hover/btn:bg-white group-hover/btn:scale-105'}`}>
                          <ArrowRight className={`w-4 h-4 transition-transform group-hover/btn:translate-x-1 ${isLight ? 'text-indigo-600 group-hover/btn:text-white' : 'text-zinc-900'}`} />
                        </div>
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </MovingTextBg>
  );
}