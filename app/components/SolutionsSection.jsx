"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowRight, Video, Code2, Layers, Cpu, GraduationCap, Sparkles } from "lucide-react";
import MovingTextBg from "./MovingTextBg";
import { useContactModal } from "../context/ContactModalContext";

// Initial default 3 core services
const DEFAULT_SERVICES = [
  {
    id: 1,
    num: "01",
    label: "WEB + AI DEVELOPMENT",
    title: "Web + AI Development",
    description: "Building fast, scalable, and intelligent applications using Next.js, React, FastAPI, Django, and GenAI.",
    icon: Code2,
  },
  {
    id: 2,
    num: "02",
    label: "ERP & BUSINESS AUTOMATION",
    title: "ERP & Automation",
    description: "Automating operations with custom ERP systems. Inventory, HR, workflows, and real-time dashboards.",
    icon: Layers,
  },
  {
    id: 3,
    num: "03",
    label: "IOT & SMART AUTOMATION",
    title: "IoT Systems",
    description: "Designing IoT systems combining sensors, cloud services, and smart industry automation.",
    icon: Cpu,
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
          const sliced = data.slice(0, 3);
          const merged = sliced.map((item, idx) => ({
            ...item,
            num: `0${idx + 1}`,
            title: item.title || item.label,
            icon: DEFAULT_SERVICES[idx]?.icon || Code2,
          }));
          setServices(merged);
        }
      })
      .catch((err) => console.error("Error fetching solutions:", err));
  }, []);

  // Card Content Component to match Mistral styling
  const CardContent = ({ service, isLarge }) => {
    const Icon = service.icon || Code2;
    return (
      <div className="flex flex-col h-full justify-between p-6 sm:p-8">
        {/* Top Left Icon */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 flex items-center justify-center bg-indigo-600 text-white shadow-md">
            <Icon className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest group-hover:text-zinc-400 transition-colors">
            {service.num}
          </span>
        </div>

        {/* Bottom Left Text */}
        <div className="mt-16 sm:mt-24 lg:mt-32 relative z-10">
          <h3 className={`font-medium text-white tracking-tight mb-2 flex items-center gap-2 group-hover:text-indigo-300 transition-colors ${isLarge ? 'text-3xl sm:text-4xl lg:text-5xl' : 'text-2xl sm:text-3xl'}`}>
            {service.title}
            <ArrowRight className="w-5 h-5 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
          </h3>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-md group-hover:text-zinc-300 transition-colors">
            {service.description}
          </p>
        </div>
      </div>
    );
  };

  return (
    <MovingTextBg text="WHAT WE DO" textColor="text-white" className="bg-[#050505]">
      <section className="relative w-full bg-[#050505] py-20 lg:py-32 overflow-hidden border-y border-zinc-900">
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Section Header */}
          <div className="text-left space-y-4">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-white leading-tight">
              Core Capabilities
            </h2>
          </div>

          {/* Mistral-Style Grid Wrapper for 1px shared borders */}
          <div className="bg-zinc-800/80 p-[1px] w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-[1px] bg-zinc-800/80 w-full">
              
              {/* Row 1, Col 1: Empty Decorative Block */}
              <div className="hidden lg:flex flex-col items-center justify-center bg-[#0a0a0a] min-h-[200px] relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="w-16 h-16 border border-zinc-800 rotate-45 group-hover:rotate-90 transition-transform duration-1000 ease-in-out"></div>
              </div>

              {/* Row 1 & 2, Col 2 & 3: Web + AI (Large Block) */}
              <motion.button
                onClick={openContactModal}
                whileHover="hover"
                className="group relative flex flex-col justify-between bg-[#0a0a0a] hover:bg-[#111111] transition-colors duration-500 text-left col-span-1 md:col-span-2 lg:col-span-2 row-span-2 min-h-[300px] lg:min-h-[400px] overflow-hidden"
              >
                {/* Decorative subtle background graphic */}
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-30 group-hover:rotate-12 transition-all duration-700 pointer-events-none">
                  <div className="w-32 h-32 border-2 border-zinc-500 rotate-45"></div>
                </div>
                <CardContent service={services[0]} isLarge={true} />
              </motion.button>

              {/* Row 1 & 2, Col 4: ERP & Automation (Tall Block) */}
              <motion.button
                onClick={openContactModal}
                whileHover="hover"
                className="group relative flex flex-col justify-between bg-[#0a0a0a] hover:bg-[#111111] transition-colors duration-500 text-left col-span-1 md:col-span-1 lg:col-span-1 row-span-2 min-h-[300px] lg:min-h-[400px]"
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-indigo-500/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                <CardContent service={services[1]} isLarge={false} />
              </motion.button>

              {/* Row 2, Col 1: IoT & Smart Automation (Small Block) */}
              <motion.button
                onClick={openContactModal}
                whileHover="hover"
                className="group relative flex flex-col justify-between bg-[#0a0a0a] hover:bg-[#111111] transition-colors duration-500 text-left col-span-1 md:col-span-1 lg:col-span-1 min-h-[200px]"
              >
                <CardContent service={services[2]} isLarge={false} />
              </motion.button>

            </div>
          </div>
          
        </div>
      </section>
    </MovingTextBg>
  );
}