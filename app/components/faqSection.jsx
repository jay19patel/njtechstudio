"use client";

import { useState, useEffect } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import MovingTextBg from "./MovingTextBg";

const DEFAULT_FAQS = [
  {
    id: 1,
    question: "What kind of projects do you take on?",
    answer:
      "We specialize in AI-powered applications (GenAI, LangChain, vector search), full-stack ERP systems (Frappe / ERPNext + React), scalable web apps (Next.js, FastAPI, Django), and custom automation tools. From early MVPs to high-availability production systems, we engineer solutions designed to scale reliably.",
  },
  {
    id: 2,
    question: "How fast can you deliver?",
    answer:
      "Speed depends on project scope! A focused automation tool or prototype typically takes 1-2 weeks. A custom web platform or AI pipeline is typically 3-6 weeks. Full ERP systems or complex microservice platforms range 6-10 weeks. We work in rapid weekly sprints with transparent daily git progress.",
  },
  {
    id: 3,
    question: "Do you offer post-launch support and maintenance?",
    answer:
      "Absolutely! We provide comprehensive post-launch support including proactive bug fixes, server performance tuning, feature additions, and security patches. Whether you need ongoing retainer maintenance or on-demand support, we're here for the long haul.",
  },
  {
    id: 4,
    question: "Can you help integrate AI and LLMs into our existing software?",
    answer:
      "100%! We've integrated autonomous AI agents, semantic vector search (OpenSearch/Qdrant), document extraction (RAG), and tailored LLM workflows into existing codebases. From prompt architecture to fine-tuning and latency optimization, we handle the entire AI lifecycle.",
  },
  {
    id: 5,
    question: "What is your primary technology stack?",
    answer:
      "Backend: Python (FastAPI, Django, Flask, Frappe), Node.js. Frontend: Next.js, React, TypeScript, TailwindCSS. Databases: PostgreSQL, Redis, MongoDB. AI/ML: LangChain, LangGraph, Vector DBs, OpenAI APIs. Cloud & DevOps: Docker, GCP, Vercel, CI/CD pipelines.",
  },
];

export default function FAQSection() {
  // All items closed by default
  const [openItem, setOpenItem] = useState(null);
  const [faqItems, setFaqItems] = useState(DEFAULT_FAQS);

  useEffect(() => {
    fetch("/api/admin/data?type=faqs")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setFaqItems((prev) => {
            if (JSON.stringify(prev) === JSON.stringify(data)) return prev;
            return data;
          });
        }
      })
      .catch((err) => console.error("Error fetching FAQs:", err));
  }, []);

  const toggleItem = (id) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <MovingTextBg text="FAQS" textColor="text-gray-400" className="bg-[#fcfcfd]">
      <section className="relative w-full bg-transparent text-zinc-900 py-16 sm:py-20 lg:py-28 overflow-hidden border-t border-zinc-100">
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col lg:flex-row items-stretch justify-between gap-8 lg:gap-12"
          >
            {/* Dynamic Full-Height Image on Left: automatically scales with accordion */}
            <div className="w-full lg:w-5/12 flex flex-col">
              <div className="relative w-full h-full min-h-[380px] lg:min-h-[500px] rounded-3xl overflow-hidden bg-white border border-zinc-200/90 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300">
                <Image
                  src="/character.png"
                  alt="NJ Tech Studio Character"
                  fill
                  className="object-cover object-[center_20%] transition-all duration-300"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent flex items-end p-6 z-10">
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl px-4 py-2.5 border border-zinc-200/80 shadow-xs w-full">
                    <p className="text-xs font-semibold text-zinc-900">Always here to answer your questions</p>
                    <p className="text-[10px] text-zinc-500">NJTechStudio Engineering Support</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Accordion Content on Right */}
            <div className="w-full lg:w-7/12 flex flex-col justify-between">
              <div className="mb-6 text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold mb-3">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Frequently Asked Questions</span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-zinc-900 mb-3">
                  Got Questions? <span className="bg-indigo-100 text-indigo-950 px-2 pb-1 inline-block -mx-1">I Got Answers!</span>
                </h2>
                <p className="text-zinc-500 text-sm sm:text-base leading-relaxed">
                  Everything you need to know about our development process, tech stack, and delivery timelines.
                </p>
              </div>

              {/* Accordion List */}
              <div className="space-y-3 flex-1">
                {faqItems.map((item) => {
                  const isOpen = openItem === item.id;
                  return (
                    <div
                      key={item.id}
                      className={`rounded-2xl border transition-all duration-200 overflow-hidden bg-white ${
                        isOpen
                          ? "border-indigo-300 ring-2 ring-indigo-500/10 shadow-xs"
                          : "border-zinc-200 hover:border-zinc-300 shadow-2xs"
                      }`}
                    >
                      {/* Trigger Button */}
                      <button
                        type="button"
                        onClick={() => toggleItem(item.id)}
                        className="flex w-full items-center justify-between px-5 sm:px-6 py-4.5 text-left focus:outline-none cursor-pointer"
                      >
                        <span className="text-[15px] sm:text-base font-semibold text-zinc-900 pr-4">
                          {item.question}
                        </span>
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors shrink-0 ${
                            isOpen
                              ? "bg-indigo-600 text-white"
                              : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200"
                          }`}
                        >
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        </div>
                      </button>

                      {/* Expandable Answer */}
                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                        }`}
                      >
                        <p className="text-zinc-600 leading-relaxed text-sm sm:text-[15px] px-5 sm:px-6 pb-5 pt-1">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </motion.div>

        </div>
      </section>
    </MovingTextBg>
  );
}