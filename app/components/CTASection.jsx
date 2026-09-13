"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useContactModal } from "../context/ContactModalContext";
import MovingTextBg from "./MovingTextBg";

export default function CTASection() {
  const { openContactModal } = useContactModal();

  return (
    <MovingTextBg text="LET'S TALK" textColor="text-white" className="bg-black">
      <section className="relative w-full bg-transparent text-white py-10 sm:py-12 overflow-hidden border-t border-zinc-800">
        
        {/* Subtle radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10"
          >
            {/* Text Content */}
            <div className="space-y-1.5 text-center md:text-left flex-1">
              <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-white leading-tight">
                Have a project in mind?{" "}
                <span className="bg-indigo-900/50 text-indigo-300 px-2 pb-0.5 inline-block -mx-1 rounded-sm border border-indigo-500/20 whitespace-nowrap">
                  Let&apos;s build it.
                </span>
              </h2>

              <p className="text-zinc-400 text-xs sm:text-sm font-normal max-w-xl">
                Ready to build scalable web applications, autonomous AI agents, ERP systems, or custom software? Get in touch today.
              </p>
            </div>

            {/* Single Action Button */}
            <div className="shrink-0">
              <button
                type="button"
                onClick={openContactModal}
                className="group inline-flex items-center justify-center gap-2.5 px-6 py-3 bg-white hover:bg-zinc-100 text-zinc-900 font-semibold rounded-full text-sm transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg active:scale-95"
              >
                <span>Start your project</span>
                <div className="w-6 h-6 rounded-full bg-zinc-900/10 flex items-center justify-center group-hover:bg-zinc-900/20 transition-colors">
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </MovingTextBg>
  );
}
