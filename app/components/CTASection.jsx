"use client";

import { ArrowUpRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import MovingTextBg from "./MovingTextBg";
import { useContactModal } from "../context/ContactModalContext";

export default function CTASection() {
  const { openContactModal } = useContactModal();

  return (
    <MovingTextBg text="LET'S TALK" textColor="text-white" className="bg-black" rows={2}>
      <section className="relative w-full bg-transparent text-white py-14 sm:py-16 lg:py-20 border-y border-zinc-800/80 overflow-hidden group">
        {/* Subtle Edge-to-Edge Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000002_1px,transparent_1px),linear-gradient(to_bottom,#00000002_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

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
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-zinc-900 border border-zinc-700 text-white text-xs font-mono font-bold uppercase tracking-widest shadow-md">
                <span className="w-2 h-2 bg-indigo-500 inline-block"></span>
                <span>{"// START A PROJECT"}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[1.05]">
                Have a Project in Mind?{" "}
                <span className="text-white">
                  Let&apos;s Work Together.
                </span>
              </h2>

              <p className="text-zinc-400 text-sm sm:text-base md:text-lg font-normal max-w-xl leading-relaxed">
                Ready to build custom web applications, AI integration, ERP systems, or tailored software? Get in touch with us.
              </p>
            </div>

            {/* Right Column Button */}
            <div className="shrink-0 w-full md:w-auto pt-2 md:pt-0">
              <button
                type="button"
                onClick={openContactModal}
                className="group inline-flex items-center justify-center gap-3 w-full md:w-auto px-8 py-4 sm:px-10 sm:py-5 bg-indigo-900 hover:bg-indigo-800 border border-indigo-950 text-white font-bold uppercase tracking-wider text-sm sm:text-base transition-all duration-300 cursor-pointer shadow-xl"
              >
                <span>Start Project Inquiry</span>
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </MovingTextBg>
  );
}
