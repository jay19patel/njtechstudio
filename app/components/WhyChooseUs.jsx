"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Wallet, Zap, BrainCircuit, ShieldCheck, Sparkles } from "lucide-react";
import MovingTextBg from "./MovingTextBg";
import AnimatedCounter from "./AnimatedCounter";

export default function WhyChooseUs() {
  return (
    <MovingTextBg text="WHY US" textColor="text-gray-400" className="bg-[#fcfcfd]">
      <section className="relative w-full bg-transparent text-zinc-900 py-16 sm:py-20 lg:py-28 overflow-hidden border-t border-zinc-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Heading Section */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 sm:mb-16 text-left"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>The NJTechStudio Advantage</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-zinc-900 leading-tight">
              Why people <span className="bg-indigo-100 text-indigo-950 px-2 pb-1 inline-block -mx-1">love working with us.</span>
            </h2>
            <p className="text-base sm:text-lg text-zinc-500 mt-3 max-w-2xl leading-relaxed">
              Smart execution, reliable delivery, budget-friendly engineering, and the joy of collaborating with developers who treat your product like their own.
            </p>
          </motion.div>

          {/* Bento Grid Layout - Box-Box Style with Impact Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Box 1: Budget-Friendly (1 Col) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="group relative flex flex-col justify-between bg-white border border-zinc-200/90 rounded-3xl p-7 sm:p-8 col-span-1 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.07)] hover:border-zinc-300 transition-[border-color,box-shadow] duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 bg-zinc-50 border border-zinc-200 rounded-2xl flex items-center justify-center text-zinc-600 group-hover:bg-indigo-50 group-hover:border-indigo-200 group-hover:text-indigo-600 transition-colors">
                    <Wallet className="w-5 h-5" />
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border bg-zinc-50 border-zinc-200 text-zinc-500 text-[10px] font-bold tracking-wider uppercase">
                    01 - Value
                  </span>
                </div>

                {/* Animated Stat Metric */}
                <div className="mb-4">
                  <div className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
                    <AnimatedCounter value={40} suffix="%" duration={1.5} />
                    <span className="text-xs font-semibold text-indigo-600 ml-2 uppercase tracking-wider">Less Cost</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight mt-1 group-hover:text-indigo-600 transition-colors">
                    Budget-Friendly
                  </h3>
                </div>

                <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                  Enterprise-grade software architecture without the massive agency overhead. No hidden fees or unnecessary bureaucracy — you pay for working code.
                </p>
              </div>

              <div className="flex items-center gap-2.5 pt-4 border-t border-zinc-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="text-xs font-semibold text-zinc-700">Maximum ROI for Startups</span>
              </div>
            </motion.div>

            {/* Box 2: Optimized Solutions & Speed (2 Cols) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -4 }}
              className="group relative flex flex-col justify-between bg-white border border-zinc-200/90 rounded-3xl p-7 sm:p-8 col-span-1 md:col-span-1 lg:col-span-2 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.07)] hover:border-zinc-300 transition-[border-color,box-shadow] duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 bg-zinc-50 border border-zinc-200 rounded-2xl flex items-center justify-center text-zinc-600 group-hover:bg-indigo-50 group-hover:border-indigo-200 group-hover:text-indigo-600 transition-colors">
                    <Zap className="w-5 h-5" />
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border bg-zinc-50 border-zinc-200 text-zinc-500 text-[10px] font-bold tracking-wider uppercase">
                    02 - Speed
                  </span>
                </div>

                {/* Animated Stat Metric */}
                <div className="mb-4">
                  <div className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
                    &lt; <AnimatedCounter value={50} suffix="ms" duration={1.5} />
                    <span className="text-xs font-semibold text-indigo-600 ml-2 uppercase tracking-wider">Fast APIs</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight mt-1 group-hover:text-indigo-600 transition-colors">
                    Optimized Performance & Architecture
                  </h3>
                </div>

                <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed mb-6 font-normal max-w-xl">
                  We don&apos;t just build — we optimize. Blazing-fast backend endpoints, responsive client bundles, automated query caching, and future-proof architectures built to scale gracefully.
                </p>
              </div>

              <div className="flex items-center gap-2.5 pt-4 border-t border-zinc-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="text-xs font-semibold text-zinc-700">Sub-50ms Hot Paths & Zero Regressions</span>
              </div>
            </motion.div>

            {/* Box 3: AI-Driven Approach (1 Col) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -4 }}
              className="group relative flex flex-col justify-between bg-zinc-950 border border-zinc-800 rounded-3xl p-7 sm:p-8 col-span-1 shadow-[0_8px_30px_rgb(0,0,0,0.1)] hover:border-zinc-700 transition-[border-color,box-shadow] duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center text-indigo-400 group-hover:bg-indigo-950/60 group-hover:border-indigo-500/40 transition-colors">
                    <BrainCircuit className="w-5 h-5" />
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border bg-zinc-900 border-zinc-800 text-zinc-400 text-[10px] font-bold tracking-wider uppercase">
                    03 - AI Flow
                  </span>
                </div>

                {/* Animated Stat Metric */}
                <div className="mb-4">
                  <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                    <AnimatedCounter value={10} suffix="x" duration={1.5} />
                    <span className="text-xs font-semibold text-indigo-400 ml-2 uppercase tracking-wider">Velocity</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1 group-hover:text-indigo-300 transition-colors">
                    AI-Driven Approach
                  </h3>
                </div>

                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                  From custom LLM workflows to semantic vector discovery and autonomous agent tools, we infuse modern AI to accelerate development and eliminate manual operational bottlenecks.
                </p>
              </div>

              <div className="flex items-center gap-2.5 pt-4 border-t border-zinc-800/80">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs font-semibold text-zinc-300">Modern GenAI & RAG Pipelines</span>
              </div>
            </motion.div>

            {/* Box 4: Reliable Delivery (2 Cols) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -4 }}
              className="group relative flex flex-col justify-between bg-white border border-zinc-200/90 rounded-3xl p-7 sm:p-8 col-span-1 md:col-span-1 lg:col-span-2 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.07)] hover:border-zinc-300 transition-[border-color,box-shadow] duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 bg-zinc-50 border border-zinc-200 rounded-2xl flex items-center justify-center text-zinc-600 group-hover:bg-indigo-50 group-hover:border-indigo-200 group-hover:text-indigo-600 transition-colors">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border bg-zinc-50 border-zinc-200 text-zinc-500 text-[10px] font-bold tracking-wider uppercase">
                    04 - Trust
                  </span>
                </div>

                {/* Animated Stat Metric */}
                <div className="mb-4">
                  <div className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
                    <AnimatedCounter value={100} suffix="%" duration={1.5} />
                    <span className="text-xs font-semibold text-emerald-600 ml-2 uppercase tracking-wider">Predictable</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight mt-1 group-hover:text-indigo-600 transition-colors">
                    Reliable Delivery & Peace of Mind
                  </h3>
                </div>

                <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed mb-6 font-normal max-w-xl">
                  Clear, prompt communication, transparent git commit histories, and predictable milestone deliveries. We take pride in craftsmanship so your team can focus on user acquisition.
                </p>
              </div>

              <div className="flex items-center gap-2.5 pt-4 border-t border-zinc-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="text-xs font-semibold text-zinc-700">Sprint Transparency & Daily Check-ins</span>
              </div>
            </motion.div>

          </div>

        </div>
      </section>
    </MovingTextBg>
  );
}
