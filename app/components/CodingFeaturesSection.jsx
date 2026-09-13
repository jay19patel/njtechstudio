"use client";

import { motion } from "framer-motion";
import {
  Check,
  Database,
  Server,
  Cpu,
  Sparkles,
  Rocket,
  GitBranch,
  ShieldCheck,
  Cloud,
  Boxes,
  Network,
  Search,
  HardDrive,
  Layers,
  Zap,
} from "lucide-react";
import MovingTextBg from "./MovingTextBg";

const GcpLogo = ({ className = "w-4 h-4" }) => (
  <img src="/icons/devicon/googlecloud.svg" alt="Google Cloud" className={`${className} object-contain shrink-0`} />
);

const DockerLogo = ({ className = "w-4 h-4" }) => (
  <img src="/icons/devicon/docker.svg" alt="Docker" className={`${className} object-contain shrink-0`} />
);

const NginxLogo = ({ className = "w-4 h-4" }) => (
  <img src="/icons/devicon/nginx.svg" alt="Nginx" className={`${className} object-contain shrink-0`} />
);

const DjangoLogo = ({ className = "w-4 h-4" }) => (
  <img src="/icons/devicon/django.svg" alt="Django" className={`${className} object-contain shrink-0`} />
);

const FastApiLogo = ({ className = "w-4 h-4" }) => (
  <img src="/icons/devicon/fastapi.svg" alt="FastAPI" className={`${className} object-contain shrink-0`} />
);

const NextJsLogo = ({ className = "w-4 h-4" }) => (
  <img src="/icons/devicon/nextjs.svg" alt="Next.js" className={`${className} object-contain shrink-0`} />
);

const RedisLogo = ({ className = "w-4 h-4" }) => (
  <img src="/icons/devicon/redis.svg" alt="Redis" className={`${className} object-contain shrink-0`} />
);

const SqliteLogo = ({ className = "w-4 h-4" }) => (
  <img src="/icons/devicon/sqlite.svg" alt="SQLite" className={`${className} object-contain shrink-0`} />
);

const JinaLogo = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <circle cx="6" cy="12" r="3" fill="#0099FF"/>
    <circle cx="18" cy="6" r="3" fill="#6366F1"/>
    <circle cx="18" cy="18" r="3" fill="#06B6D4"/>
    <path d="M6 12h6m0 0l6-6m-6 6l6 6" stroke="#0099FF" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);

const VectorDbLogo = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2"/>
    <polyline points="2 17 12 22 22 17"/>
    <polyline points="2 12 12 17 22 12"/>
  </svg>
);

const WORKFLOW_STEPS = [
  {
    step: "01",
    title: "Blueprint & System Architecture",
    tag: "Discovery & Design",
    desc: "We transform your raw startup concept into a robust technical blueprint. We design normalized schemas, clean REST/gRPC API contracts, and choose the optimal tech stack (Next.js, Python, FastAPI).",
    icon: GitBranch,
  },
  {
    step: "02",
    title: "AI-Accelerated Development",
    tag: "High Velocity Build",
    desc: "We build rapidly with modular code and autonomous AI agent workflows. Intelligent data ingestion, vector search, and clean, responsive interfaces that turn early prototypes into production-grade systems.",
    icon: Sparkles,
  },
  {
    step: "03",
    title: "Automated QA & Hardening",
    tag: "Zero Regressions",
    desc: "Every commit runs through automated test suites, bundle analyzers, and latency audits. We optimize database queries to guarantee sub-50ms API response times before anything goes live.",
    icon: ShieldCheck,
  },
  {
    step: "04",
    title: "Production Scale & Deployment",
    tag: "Multi-Zone Launch",
    desc: "We deploy containerized microservices across cloud infrastructure (GCP/Vercel) with CI/CD automation, monitoring, and automated failover for continuous 99.9% uptime.",
    icon: Rocket,
  },
];

export default function CodingFeaturesSection() {
  return (
    <MovingTextBg text="WORKFLOW" textColor="text-gray-400" className="bg-[#fcfcfd]">
      <section className="relative w-full bg-transparent text-zinc-900 py-16 sm:py-20 lg:py-28 overflow-hidden border-t border-zinc-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Top Header */}
          <div className="mb-14 sm:mb-16 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Startup & AI Execution Flow</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-zinc-900 mb-4">
              From startup idea to scale. <span className="bg-indigo-100 text-indigo-950 px-2 pb-1 inline-block -mx-1">How we build.</span>
            </h2>
            <p className="text-base sm:text-lg text-zinc-500 max-w-2xl leading-relaxed">
              We guide founders and tech teams through every stage of the product journey. Structured architecture, rapid iteration sprints, and AI-driven automation built for scale.
            </p>
          </div>

          {/* 4-Step Execution Flow Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {WORKFLOW_STEPS.map((step, idx) => {
              const StepIcon = step.icon;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-7 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-zinc-300 transition-[border-color,box-shadow] duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-100/80">
                        {step.step}
                      </span>
                      <div className="w-9 h-9 rounded-xl bg-zinc-50 border border-zinc-200 flex items-center justify-center text-zinc-600 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-colors">
                        <StepIcon className="w-4 h-4" />
                      </div>
                    </div>

                    <div className="mb-2">
                      <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
                        {step.tag}
                      </span>
                      <h3 className="text-lg font-semibold text-zinc-900 tracking-tight mt-1 group-hover:text-indigo-600 transition-colors">
                        {step.title}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed mt-3">
                      {step.desc}
                    </p>
                  </div>

                  <div className="pt-5 mt-5 border-t border-zinc-100 flex items-center text-xs font-medium text-zinc-400 group-hover:text-indigo-600 transition-colors">
                    <span>Phase {step.step} Milestone</span>
                    <span className="ml-auto text-indigo-500">→</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Interactive Flow Architecture & CI/CD Pipeline Mockups */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Feature: Modern Startup Architecture */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6 bg-white border border-zinc-200/80 rounded-3xl p-7 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.03)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">System Design</span>
                </div>
                <h4 className="text-2xl font-semibold tracking-tight text-zinc-900 mb-2">
                  Architected for extreme throughput.
                </h4>
                <p className="text-zinc-500 text-sm leading-relaxed mb-6">
                  Containerized microservices with Docker & Nginx, high-velocity Next.js & Jina AI frontend, Django & FastAPI backend, and SQLite, Redis, and Vector DBs hosted on GCP.
                </p>
              </div>

              {/* Visual Architecture Diagram */}
              <div className="w-full flex flex-col gap-2.5 py-4 bg-zinc-50/70 rounded-2xl border border-zinc-200/60 p-4 sm:p-5">
                
                {/* 1. Ingress & Infrastructure Layer: GCP + Docker + Nginx */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 bg-white border border-zinc-200/90 rounded-xl p-3 shadow-xs">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-lg bg-blue-50/80 border border-blue-100 flex items-center justify-center shrink-0 shadow-2xs">
                      <GcpLogo className="w-5 h-5" />
                    </span>
                    <div>
                      <div className="text-xs font-bold text-zinc-900 flex items-center gap-1.5">
                        Google Cloud (GCP)
                        <span className="text-[9px] font-mono font-bold bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded border border-blue-200">Cloud Run</span>
                      </div>
                      <div className="text-[10px] text-zinc-400">Host Infrastructure</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-sky-50 border border-sky-200 text-[11px] font-semibold text-sky-900 shadow-2xs">
                      <DockerLogo className="w-4 h-4" />
                      Docker
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-[11px] font-semibold text-emerald-900 shadow-2xs">
                      <NginxLogo className="w-4 h-4" />
                      Nginx
                    </span>
                  </div>
                </div>

                {/* Connecting Line */}
                <div className="flex justify-center -my-1">
                  <div className="w-0.5 h-3 bg-zinc-300"></div>
                </div>

                {/* 2. Middle Layer: Frontend (Next.js + Jina AI) & Backend (Django + FastAPI) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {/* Frontend */}
                  <div className="bg-indigo-50/70 border border-indigo-200/80 rounded-xl p-3 shadow-2xs flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 font-mono">Frontend & Neural Search</span>
                      <NextJsLogo className="w-4 h-4 text-zinc-900" />
                    </div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="px-2 py-1 bg-white border border-indigo-200 text-indigo-950 rounded-lg text-xs font-bold shadow-xs inline-flex items-center gap-1.5">
                        <NextJsLogo className="w-3.5 h-3.5 text-black" />
                        Next.js
                      </span>
                      <span className="px-2 py-1 bg-white border border-indigo-200 text-indigo-900 rounded-lg text-xs font-semibold shadow-xs inline-flex items-center gap-1.5">
                        <JinaLogo className="w-3.5 h-3.5" />
                        Jina AI
                      </span>
                    </div>
                  </div>

                  {/* Backend */}
                  <div className="bg-purple-50/70 border border-purple-200/80 rounded-xl p-3 shadow-2xs flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 font-mono">Backend Microservices</span>
                      <DjangoLogo className="w-4 h-4" />
                    </div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="px-2 py-1 bg-white border border-purple-200 text-emerald-950 rounded-lg text-xs font-bold shadow-xs inline-flex items-center gap-1.5">
                        <DjangoLogo className="w-3.5 h-3.5" />
                        Django
                      </span>
                      <span className="px-2 py-1 bg-white border border-purple-200 text-teal-950 rounded-lg text-xs font-bold shadow-xs inline-flex items-center gap-1.5">
                        <FastApiLogo className="w-3.5 h-3.5" />
                        FastAPI
                      </span>
                    </div>
                  </div>
                </div>

                {/* Connecting Line */}
                <div className="flex justify-center -my-1">
                  <div className="w-0.5 h-3 bg-zinc-300"></div>
                </div>

                {/* 3. Data & Storage Layer: SQLite, Redis, Vector Database */}
                <div className="bg-white border border-zinc-200/90 rounded-xl p-3 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
                      <Database className="w-4 h-4" />
                    </span>
                    <div>
                      <div className="text-xs font-bold text-zinc-900">Database & Cache</div>
                      <div className="text-[10px] text-zinc-400">Multi-Engine Storage</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="px-2 py-1 bg-zinc-100 border border-zinc-200 text-zinc-800 rounded-lg text-[11px] font-semibold inline-flex items-center gap-1.5 shadow-2xs">
                      <SqliteLogo className="w-3.5 h-3.5" />
                      SQLite
                    </span>
                    <span className="px-2 py-1 bg-red-50 border border-red-200 text-red-800 rounded-lg text-[11px] font-semibold inline-flex items-center gap-1.5 shadow-2xs">
                      <RedisLogo className="w-3.5 h-3.5" />
                      Redis
                    </span>
                    <span className="px-2 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-[11px] font-semibold inline-flex items-center gap-1.5 shadow-2xs">
                      <VectorDbLogo className="w-3.5 h-3.5" />
                      Vector DB
                    </span>
                  </div>
                </div>

              </div>
            </motion.div>

            {/* Right Feature: Automated CI/CD & Quality Checks */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-6 bg-white border border-zinc-200/80 rounded-3xl p-7 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.03)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Quality Assurance</span>
                </div>
                <h4 className="text-2xl font-semibold tracking-tight text-zinc-900 mb-2">
                  Proven reliability before launch.
                </h4>
                <p className="text-zinc-500 text-sm leading-relaxed mb-6">
                  Automated validation loops test Docker container builds, Nginx routing, Django ORM schemas, FastAPI latency, and Vector DB retrieval with every git commit.
                </p>
              </div>

              {/* Minimalist Pipeline Status Mockup */}
              <div className="w-full bg-zinc-50 border border-zinc-200/80 rounded-2xl overflow-hidden shadow-2xs">
                <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200 bg-white">
                  <div className="flex items-center gap-2 text-xs font-semibold text-zinc-800">
                    <span className="w-5 h-5 bg-indigo-50 text-indigo-700 font-mono flex items-center justify-center rounded border border-indigo-200">
                      CI
                    </span>
                    <span>Deployment Pipeline</span>
                  </div>
                  <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-full border border-emerald-200">
                    Passed (99.9%)
                  </span>
                </div>

                <div className="flex flex-col text-xs text-zinc-600">
                  <div className="flex items-center justify-between px-4 py-2.5 border-b border-zinc-100 bg-white/50">
                    <span className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <DockerLogo className="w-3.5 h-3.5 shrink-0" />
                      <NginxLogo className="w-3.5 h-3.5 shrink-0" />
                      <span>Docker Build & Nginx Config Validation</span>
                    </span>
                    <span className="text-zinc-400 font-mono text-[11px]">2.4s</span>
                  </div>
                  <div className="flex items-center justify-between px-4 py-2.5 border-b border-zinc-100 bg-white/50">
                    <span className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <NextJsLogo className="w-3.5 h-3.5 shrink-0 text-zinc-900" />
                      <JinaLogo className="w-3.5 h-3.5 shrink-0" />
                      <span>Next.js 15 Build & Jina AI Embeddings Audit</span>
                    </span>
                    <span className="text-zinc-400 font-mono text-[11px]">4.1s</span>
                  </div>
                  <div className="flex items-center justify-between px-4 py-2.5 border-b border-zinc-100 bg-white/50">
                    <span className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <DjangoLogo className="w-3.5 h-3.5 shrink-0" />
                      <FastApiLogo className="w-3.5 h-3.5 shrink-0" />
                      <span>Django ORM & FastAPI API Test Suite</span>
                    </span>
                    <span className="text-zinc-400 font-mono text-[11px]">3.2s</span>
                  </div>
                  <div className="flex items-center justify-between px-4 py-2.5 border-b border-zinc-100 bg-white/50">
                    <span className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <SqliteLogo className="w-3.5 h-3.5 shrink-0" />
                      <RedisLogo className="w-3.5 h-3.5 shrink-0" />
                      <VectorDbLogo className="w-3.5 h-3.5 shrink-0" />
                      <span>SQLite Schema, Redis & Vector DB Retrieval</span>
                    </span>
                    <span className="text-zinc-400 font-mono text-[11px]">2.8s</span>
                  </div>
                  <div className="flex items-center justify-between px-4 py-2.5 bg-indigo-50/40 relative">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-600"></div>
                    <span className="flex items-center gap-2 text-indigo-950 font-medium">
                      <span className="w-3 h-3 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin shrink-0"></span>
                      <GcpLogo className="w-3.5 h-3.5 shrink-0" />
                      <span>GCP Cloud Run Deploy & Multi-Region Health Check</span>
                    </span>
                    <span className="text-indigo-600 font-mono text-[11px] font-bold">Live</span>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>

        </div>
      </section>
    </MovingTextBg>
  );
}
