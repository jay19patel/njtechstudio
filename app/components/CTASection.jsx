"use client";

import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import MovingTextBg from "./MovingTextBg";

export default function CTASection() {
  return (
    <MovingTextBg text="LET'S TALK" textColor="text-gray-400">
      <section className="relative w-full bg-gradient-to-r from-zinc-950 via-indigo-950 to-zinc-950 text-white py-14 sm:py-16 lg:py-20 border-y border-zinc-800/80 overflow-hidden group">
        {/* Ambient Full Width Glow Effects */}
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-500/15 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-purple-500/15 blur-[130px] rounded-full pointer-events-none" />

        {/* Subtle Edge-to-Edge Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

        {/* Full-width content wrapper */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 lg:gap-12"
          >
            {/* Left Column Text */}
            <div className="space-y-3 text-left max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs sm:text-sm font-semibold tracking-wide uppercase backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>Start A Project</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[1.05]">
                Have a Project in Mind?{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-indigo-200">
                  Let&apos;s Work Together.
                </span>
              </h2>

              <p className="text-zinc-400 text-sm sm:text-base md:text-lg font-normal max-w-xl leading-relaxed">
                Ready to build custom web applications, AI integration, ERP systems, or tailored software? Get in touch with us.
              </p>
            </div>

            {/* Right Column Button */}
            <div className="shrink-0 w-full md:w-auto pt-2 md:pt-0">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-3 w-full md:w-auto px-8 py-4 sm:px-10 sm:py-5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-full uppercase tracking-wider text-sm sm:text-base transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-xl shadow-indigo-600/40 hover:shadow-indigo-500/60 cursor-pointer"
              >
                <span>Go to Contact Page</span>
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </MovingTextBg>
  );
}
