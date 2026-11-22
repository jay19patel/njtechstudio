"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import MovingTextBg from "./MovingTextBg";
import BackendStatusCard from "./BackendStatusCard";
import { getFaqs } from "@/lib/api";

export default function FAQSection({ initialFaqs }) {
  const [openItem, setOpenItem] = useState(null);
  const [faqItems, setFaqItems] = useState(initialFaqs || []);
  const [loading, setLoading] = useState(!initialFaqs);
  const [isError, setIsError] = useState(false);

  const loadFaqs = useCallback(async (force = false) => {
    if (!force && initialFaqs && initialFaqs.length > 0) return;
    setLoading(true);
    setIsError(false);
    try {
      const data = await getFaqs({ forceReload: force });
      if (Array.isArray(data) && data.length > 0) {
        setFaqItems(data);
        setIsError(false);
      } else {
        setFaqItems([]);
        setIsError(true);
      }
    } catch (err) {
      console.error("Error fetching FAQs:", err);
      setFaqItems([]);
      setIsError(true);
    } finally {
      setLoading(false);
    }
  }, [initialFaqs]);

  useEffect(() => {
    if (!initialFaqs || initialFaqs.length === 0) {
      loadFaqs();
    }
  }, [initialFaqs, loadFaqs]);

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
            {/* Dynamic Full-Height Image on Left */}
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
                {loading ? (
                  <div className="space-y-3 animate-pulse">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="h-16 bg-white border border-zinc-200 rounded-2xl flex items-center px-6 justify-between">
                        <div className="h-4 bg-zinc-200 rounded w-3/4" />
                        <div className="w-8 h-8 rounded-full bg-zinc-100" />
                      </div>
                    ))}
                  </div>
                ) : isError || faqItems.length === 0 ? (
                  <BackendStatusCard
                    title="FAQs Unavailable"
                    resourceName="FAQ entries"
                    onRetry={loadFaqs}
                    theme="light"
                  />
                ) : (
                  faqItems.map((item) => {
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
                        {isOpen && (
                          <div className="px-5 sm:px-6 pb-5 pt-1 text-sm sm:text-base text-zinc-600 leading-relaxed border-t border-zinc-100">
                            {item.answer}
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </MovingTextBg>
  );
}
