"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowRight, Video, Code2, Layers, Cpu, GraduationCap } from "lucide-react";
import MovingTextBg from "./MovingTextBg";
import { useContactModal } from "../context/ContactModalContext";

// Initial default 3 core services
const DEFAULT_SERVICES = [
  {
    id: 1,
    num: "01",
    label: "WEB + AI DEVELOPMENT",
    title: "WEB + AI DEVELOPMENT",
    description:
      "Building fast, scalable, and intelligent applications using Next.js, React, FastAPI, Django, and GenAI. Backend APIs, smart automation, vector search, and AI agents.",
    techStack: ["Next.js", "FastAPI", "React", "Python", "GenAI"],
    icon: Code2,
  },
  {
    id: 2,
    num: "02",
    label: "ERP & BUSINESS AUTOMATION",
    title: "ERP & BUSINESS AUTOMATION",
    description:
      "Automating operations with custom ERP systems built using Frappe / ERPNext + React. Inventory, HR, automated approvals, and real-time business finance dashboards.",
    techStack: ["Frappe / ERPNext", "React", "Python", "Workflows"],
    icon: Layers,
  },
  {
    id: 3,
    num: "03",
    label: "IOT & SMART AUTOMATION",
    title: "IOT & SMART AUTOMATION",
    description:
      "Designing IoT systems combining sensors, cloud services, and smart automation. Real-time telemetry monitoring, device status dashboards, and industry automation.",
    techStack: ["MQTT", "Raspberry Pi", "Arduino", "Sensors & Cloud"],
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
            techStack: DEFAULT_SERVICES[idx]?.techStack || ["Custom Tech"],
            icon: DEFAULT_SERVICES[idx]?.icon || Code2,
          }));
          setServices(merged);
        }
      })
      .catch((err) => console.error("Error fetching solutions:", err));
  }, []);

  return (
    <MovingTextBg text="WHAT WE DO" textColor="text-white" className="bg-black">
      <section className="relative w-full bg-transparent text-white py-16 sm:py-20 lg:py-24 overflow-hidden border-y border-zinc-900">
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Section Header */}
          <div className="text-left space-y-3 border-b border-zinc-900 pb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-zinc-900 border border-zinc-700 text-white text-xs font-mono font-bold uppercase tracking-widest shadow-md">
              <span className="w-2 h-2 bg-indigo-500 inline-block"></span>
              <span>// CORE CAPABILITIES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-none">
              WHAT WE <span className="text-indigo-500">BUILD & AUTOMATE</span>
            </h2>
            <p className="text-zinc-400 text-base sm:text-lg max-w-2xl font-medium">
              From full-stack web platforms and business ERPs to hardware IoT and student projects.
            </p>
          </div>

          {/* Static 3-Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((item, idx) => {
              const ServiceIcon = item.icon || Code2;
              return (
                <motion.div
                  key={item.id || idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="bg-zinc-950 border-2 border-zinc-800 hover:border-indigo-800 transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between space-y-6 group shadow-xl"
                >
                  {/* Top Bar: Number & Icon */}
                  <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
                    <span className="text-2xl font-black font-mono text-indigo-400">
                      {item.num || `0${idx + 1}`}.
                    </span>
                    <div className="w-10 h-10 border border-zinc-800 bg-zinc-900 group-hover:border-indigo-800 text-indigo-400 flex items-center justify-center transition-colors">
                      <ServiceIcon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-3 text-left">
                    <h3 className="text-xl sm:text-2xl font-black uppercase text-white leading-tight group-hover:text-indigo-300 transition-colors">
                      {item.title || item.label}
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>

                  {/* Action Button */}
                  <div className="pt-4 border-t border-zinc-900">
                    <button
                      type="button"
                      onClick={openContactModal}
                      className="w-full py-3.5 bg-zinc-900 hover:bg-indigo-900 border border-zinc-800 hover:border-indigo-950 text-white font-bold uppercase tracking-wider text-xs transition-all cursor-pointer flex items-center justify-center gap-2 group/btn"
                    >
                      <span>Inquire Service</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
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