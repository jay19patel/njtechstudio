"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  ExternalLink,
} from "lucide-react";
import MovingTextBg from "./MovingTextBg";
import defaultProjects from "../../public/projects.json";

// Real brand icons mapping from public/icons/devicon and public/icons/flaticon
const TECH_ICON_MAP = {
  python: "/icons/devicon/python.svg",
  django: "/icons/devicon/django.svg",
  "django rest": "/icons/devicon/django.svg",
  "django rest framework": "/icons/devicon/django.svg",
  fastapi: "/icons/devicon/fastapi.svg",
  docker: "/icons/devicon/docker.svg",
  nginx: "/icons/devicon/nginx.svg",
  "next.js": "/icons/devicon/nextjs.svg",
  nextjs: "/icons/devicon/nextjs.svg",
  react: "/icons/devicon/react.svg",
  redux: "/icons/devicon/react.svg",
  "redux toolkit": "/icons/devicon/react.svg",
  postgresql: "/icons/devicon/postgresql.svg",
  postgres: "/icons/devicon/postgresql.svg",
  redis: "/icons/devicon/redis.svg",
  sqlite: "/icons/devicon/sqlite.svg",
  mongodb: "/icons/devicon/mongodb.svg",
  celery: "/icons/flaticon/celery.png",
  gcp: "/icons/devicon/googlecloud.svg",
  frappe: "/icons/flaticon/frappe.png",
  "tailwind css": "/icons/devicon/tailwindcss.svg",
  tailwindcss: "/icons/devicon/tailwindcss.svg",
  flask: "/icons/devicon/flask.svg",
  pandas: "/icons/devicon/python.svg",
  numpy: "/icons/devicon/python.svg",
  "delta exchange": "/icons/flaticon/ai-driven.png",
  "vector embeddings": "/icons/flaticon/ai-driven.png",
  "ai search": "/icons/flaticon/ai-driven.png",
  "jinja templating": "/icons/devicon/html5.svg",
  "material ui": "/icons/devicon/react.svg",
  "shadcn ui": "/icons/devicon/tailwindcss.svg",
};

export default function ProjectsSection() {
  const [projects, setProjects] = useState(defaultProjects);

  useEffect(() => {
    fetch("/api/admin/data?type=projects")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProjects((prev) => {
            if (JSON.stringify(prev) === JSON.stringify(data)) return prev;
            return data;
          });
        }
      })
      .catch((err) => console.error("Error fetching projects:", err));
  }, []);

  return (
    <MovingTextBg text="PROJECTS" textColor="text-white" className="bg-black">
      <section className="relative w-full bg-transparent text-white py-16 sm:py-20 lg:py-28 overflow-hidden border-y border-zinc-800">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
            <div className="text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/80 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></span>
                <span>Featured Systems & Case Studies</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white leading-tight">
                What we <span className="bg-indigo-900/50 text-indigo-300 px-2 pb-0.5 inline-block -mx-1 rounded-sm border border-indigo-500/20">build & automate.</span>
              </h2>
              <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mt-3 leading-relaxed">
                From smart algorithmic crypto trading bots to AI vector search platforms and custom SaaS management tools. Code with brains, delivered with joy.
              </p>
            </div>

            <div className="flex-shrink-0">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-zinc-200 text-zinc-950 text-xs sm:text-sm font-semibold transition-all border border-zinc-200 shadow-md group"
              >
                <span>View All Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Authentic Asymmetric Bento Grid: No awkward blank spaces, perfectly balanced cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {projects.map((item, idx) => {
              const total = projects.length;
              const projectNumber = String(idx + 1).padStart(2, "0");
              const technologies = item.technologies || item.tech || [];

              // Determine bento column span
              let spanClass = "col-span-1";
              let isPanoramic = false;

              if (total === 3) {
                if (idx === 0) spanClass = "col-span-1 md:col-span-2 lg:col-span-2";
                else if (idx === 1) spanClass = "col-span-1 md:col-span-2 lg:col-span-1";
                else if (idx === 2) {
                  spanClass = "col-span-1 md:col-span-2 lg:col-span-3";
                  isPanoramic = true;
                }
              } else {
                const mod = idx % 4;
                if (mod === 0) spanClass = "col-span-1 md:col-span-2 lg:col-span-2";
                else if (mod === 1) spanClass = "col-span-1 md:col-span-1 lg:col-span-1";
                else if (mod === 2) spanClass = "col-span-1 md:col-span-1 lg:col-span-1";
                else if (mod === 3) spanClass = "col-span-1 md:col-span-2 lg:col-span-2";
              }

              // Visual theme: Alternating dark and light contrast
              const isLight = idx === 1;

              // --- PANORAMIC 3-COLUMN BENTO CARD ---
              if (isPanoramic) {
                return (
                  <motion.div
                    key={item.id || item.slug || idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                    whileHover={{ y: -4 }}
                    className={`${spanClass} group relative rounded-3xl p-7 sm:p-10 transition-[border-color,box-shadow,background-color] duration-300 overflow-hidden bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 border border-zinc-800/90 text-white shadow-[0_12px_40px_rgb(0,0,0,0.45)] hover:border-zinc-700`}
                  >
                    <Link href={`/projects/${item.slug}`} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full">
                      {/* Left Column: Info & Story */}
                      <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-5 relative z-10">
                        <div>
                          {/* Category & Status */}
                          <div className="flex items-center justify-between mb-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono font-bold tracking-wide bg-zinc-900 border-zinc-800 text-zinc-300">
                              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                              <span>{projectNumber} • {item.category || "Enterprise SaaS"}</span>
                            </div>

                            {item.status && (
                              <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-md border bg-indigo-950/60 border-indigo-800/60 text-indigo-300">
                                {item.status}
                              </span>
                            )}
                          </div>

                          {/* Title & Description */}
                          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-3 text-white group-hover:text-indigo-300 transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-5 font-normal">
                            {item.description}
                          </p>

                          {/* Tech Stack Badges */}
                          {technologies.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mb-6">
                              {technologies.slice(0, 6).map((t) => {
                                const iconSrc = TECH_ICON_MAP[t.toLowerCase()];
                                return (
                                  <span
                                    key={t}
                                    className="text-[11px] font-mono px-2.5 py-1 rounded-lg border inline-flex items-center gap-1.5 bg-zinc-900/90 border-zinc-800/90 text-zinc-200"
                                  >
                                    {iconSrc && (
                                      <img src={iconSrc} alt="" className="w-3.5 h-3.5 object-contain shrink-0" />
                                    )}
                                    <span>{t}</span>
                                  </span>
                                );
                              })}
                            </div>
                          )}
                        </div>

                        {/* Bottom CTA */}
                        <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                          <span className="text-xs font-semibold inline-flex items-center gap-1.5 text-zinc-300 group-hover:text-indigo-300 transition-colors">
                            Explore Full Architecture & Case Study
                          </span>
                          <div className="w-9 h-9 rounded-full flex items-center justify-center bg-white text-zinc-900 group-hover:bg-indigo-400 group-hover:text-black transition-all duration-300 group-hover:translate-x-1">
                            <ArrowUpRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>

                      {/* Right Column: Full Panoramic Browser Mockup */}
                      <div className="lg:col-span-7 relative z-10">
                        {item.image && (
                          <div className="relative rounded-2xl overflow-hidden border border-zinc-800/90 bg-zinc-900/90 shadow-xl">
                            {/* Browser Mockup Top Bar */}
                            <div className="px-4 py-2 border-b border-zinc-800/80 bg-zinc-950/80 text-zinc-400 flex items-center justify-between text-[11px]">
                              <div className="flex items-center gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block"></span>
                                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block"></span>
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block"></span>
                              </div>
                              <div className="px-2.5 py-0.5 rounded-md font-mono text-[10px] bg-zinc-900 text-zinc-400 border border-zinc-800/60 truncate max-w-[200px]">
                                {item.slug ? `/${item.slug}` : item.title}
                              </div>
                              <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                            </div>

                            {/* Image Container */}
                            <div className="relative w-full h-64 sm:h-72 lg:h-[320px] overflow-hidden bg-black/5">
                              <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                              />
                              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px] bg-black/30">
                                <span className="px-4 py-1.5 rounded-full bg-white/95 text-zinc-900 text-xs font-semibold shadow-md flex items-center gap-1.5">
                                  <span>View Case Study</span>
                                  <ArrowUpRight className="w-3.5 h-3.5" />
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </Link>
                  </motion.div>
                );
              }

              // --- STANDARD / 2-COLUMN BENTO CARD ---
              return (
                <motion.div
                  key={item.id || item.slug || idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  whileHover={{ y: -4 }}
                  className={`
                    ${spanClass} group relative flex flex-col justify-between rounded-3xl p-6 sm:p-7 
                    transition-[border-color,box-shadow,background-color] duration-300 overflow-hidden
                    ${
                      isLight
                        ? "bg-white border border-zinc-200/90 text-zinc-900 shadow-[0_4px_25px_rgb(0,0,0,0.18)] hover:border-zinc-300 hover:shadow-[0_12px_40px_rgb(0,0,0,0.25)]"
                        : "bg-zinc-950 border border-zinc-800/90 text-white shadow-[0_8px_30px_rgb(0,0,0,0.35)] hover:border-zinc-700 hover:bg-zinc-900/90"
                    }
                  `}
                >
                  <Link href={`/projects/${item.slug}`} className="flex flex-col justify-between h-full">
                    <div>
                      {/* Top Row: Pill Badge, Category, and Status Indicator */}
                      <div className="flex items-center justify-between mb-5 relative z-10">
                        <div
                          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono font-bold tracking-wide ${
                            isLight
                              ? "bg-zinc-100 border-zinc-200 text-zinc-700"
                              : "bg-zinc-900 border-zinc-800 text-zinc-300"
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${isLight ? "bg-indigo-600" : "bg-indigo-400"}`}></span>
                          <span>
                            {projectNumber} • {item.category || "Production System"}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          {item.status && (
                            <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md border ${
                              isLight 
                                ? "bg-indigo-50 border-indigo-200 text-indigo-700" 
                                : "bg-indigo-950/60 border-indigo-800/60 text-indigo-300"
                            }`}>
                              {item.status}
                            </span>
                          )}
                          <div
                            className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all duration-300 ${
                              isLight
                                ? "bg-zinc-50 border-zinc-200 text-zinc-700 group-hover:bg-indigo-50 group-hover:border-indigo-200 group-hover:text-indigo-600"
                                : "bg-zinc-900 border-zinc-800 text-zinc-400 group-hover:bg-indigo-950/60 group-hover:border-indigo-500/40 group-hover:text-indigo-400"
                            }`}
                          >
                            <Code2 className="w-4 h-4" />
                          </div>
                        </div>
                      </div>

                      {/* Title & Description */}
                      <div className="relative z-10 mb-4">
                        <h3
                          className={`text-xl sm:text-2xl font-bold tracking-tight mb-2 transition-colors ${
                            isLight
                              ? "text-zinc-900 group-hover:text-indigo-600"
                              : "text-white group-hover:text-indigo-300"
                          }`}
                        >
                          {item.title}
                        </h3>
                        <p
                          className={`text-xs sm:text-sm leading-relaxed font-normal line-clamp-2 ${
                            isLight ? "text-zinc-600" : "text-zinc-400"
                          }`}
                        >
                          {item.description}
                        </p>
                      </div>

                      {/* Tech Stack Pills with Official Brand Devicons */}
                      {technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-5 relative z-10">
                          {technologies.slice(0, 5).map((t) => {
                            const iconSrc = TECH_ICON_MAP[t.toLowerCase()];
                            return (
                              <span
                                key={t}
                                className={`text-[11px] font-mono px-2.5 py-1 rounded-lg border inline-flex items-center gap-1.5 ${
                                  isLight
                                    ? "bg-zinc-100/90 border-zinc-200/90 text-zinc-800"
                                    : "bg-zinc-900/90 border-zinc-800/90 text-zinc-200"
                                }`}
                              >
                                {iconSrc && (
                                  <img src={iconSrc} alt="" className="w-3.5 h-3.5 object-contain shrink-0" />
                                )}
                                <span>{t}</span>
                              </span>
                            );
                          })}
                          {technologies.length > 5 && (
                            <span
                              className={`text-[10px] font-mono px-2 py-1 rounded-lg border ${
                                isLight
                                  ? "bg-zinc-100 border-zinc-200 text-zinc-500"
                                  : "bg-zinc-900 border-zinc-800 text-zinc-400"
                              }`}
                            >
                              +{technologies.length - 5}
                            </span>
                          )}
                        </div>
                      )}

                      {/* High-Fidelity Browser Window Mockup Preview (Proportionally Fills the Card) */}
                      {item.image && (
                        <div className={`relative mb-5 rounded-2xl overflow-hidden border shadow-xs ${
                          isLight ? "border-zinc-200/90 bg-zinc-50" : "border-zinc-800/90 bg-zinc-900/90"
                        }`}>
                          {/* Browser Window Header Mockup */}
                          <div className={`px-3 py-1.5 border-b flex items-center justify-between text-[11px] ${
                            isLight ? "bg-zinc-100/80 border-zinc-200/80 text-zinc-500" : "bg-zinc-950/80 border-zinc-800/80 text-zinc-400"
                          }`}>
                            <div className="flex items-center gap-1.5">
                              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block"></span>
                              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block"></span>
                              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block"></span>
                            </div>
                            <div className={`px-2 py-0.5 rounded-md font-mono text-[10px] truncate max-w-[160px] ${
                              isLight ? "bg-white text-zinc-600 border border-zinc-200/60" : "bg-zinc-900 text-zinc-400 border border-zinc-800/60"
                            }`}>
                              {item.slug ? `/${item.slug}` : item.title}
                            </div>
                            <ExternalLink className="w-3 h-3 opacity-60" />
                          </div>

                          {/* Full Image Container */}
                          <div className="relative w-full h-56 sm:h-64 md:h-72 overflow-hidden bg-black/5">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                            />
                            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px] ${
                              isLight ? "bg-indigo-950/20" : "bg-black/30"
                            }`}>
                              <span className="px-3 py-1 rounded-full bg-white/95 text-zinc-900 text-xs font-semibold shadow-md flex items-center gap-1.5">
                                <span>View Case Study</span>
                                <ArrowUpRight className="w-3.5 h-3.5" />
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Bottom Action Row */}
                    <div
                      className={`pt-4 border-t flex items-center justify-between relative z-10 mt-auto ${
                        isLight ? "border-zinc-100" : "border-zinc-800/80"
                      }`}
                    >
                      <span
                        className={`text-xs font-semibold inline-flex items-center gap-1.5 transition-colors ${
                          isLight
                            ? "text-zinc-700 group-hover:text-indigo-600"
                            : "text-zinc-300 group-hover:text-indigo-300"
                        }`}
                      >
                        Explore Case Study
                      </span>

                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 group-hover:translate-x-1 ${
                          isLight
                            ? "bg-zinc-900 text-white group-hover:bg-indigo-600"
                            : "bg-white text-zinc-900 group-hover:bg-indigo-400 group-hover:text-black"
                        }`}
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>
    </MovingTextBg>
  );
}
