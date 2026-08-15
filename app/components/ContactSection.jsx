"use client";

import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import MovingTextBg from "./MovingTextBg";

export default function ContactSection() {
  return (
    <MovingTextBg text="LET'S TALK" textColor="text-gray-400">
      <section className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            {/* Pill Label */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-600 text-xs sm:text-sm font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Get In Touch</span>
            </div>

            {/* Section Title */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
              Have a Project in Mind?{" "}
              <span className="text-indigo-600">Let&apos;s Work Together.</span>
            </h2>

            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Whether you need custom web applications, AI integration, ERP systems, or tailored software — we&apos;re ready to help bring your ideas to life.
            </p>
          </motion.div>

          {/* Action Button */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center justify-center pt-2"
          >
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-black hover:bg-indigo-600 text-white font-bold rounded-full uppercase tracking-wider text-sm sm:text-base transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-indigo-600/30"
            >
              <span>Go to Contact Page</span>
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </MovingTextBg>
  );
}
