"use client";

import AboutSection from "../components/AboutSection";
import TechSkillSection from "../components/TechSkillSection";
import MovingTextBg from "../components/MovingTextBg";

export default function AboutPage() {
  return (
    <div className="bg-[#fcfcfd] text-zinc-900 min-h-screen">
      <MovingTextBg text="ABOUT US" textColor="text-zinc-400">
        {/* Left-Aligned Hero Title Section */}
        <section className="relative w-full pt-32 lg:pt-40 pb-8 lg:pb-12 px-4 sm:px-8 lg:px-16 border-b border-zinc-200/80">
          <div className="relative z-10 max-w-7xl mx-auto text-left space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold rounded-full shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
              <span>01 - About Us</span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.1] tracking-tight text-zinc-900 max-w-4xl">
              About the <br />
              <span className="bg-indigo-100 text-indigo-950 px-2 pb-1 inline-block -mx-2 mt-2 rounded-sm border border-indigo-200/60">
                Studio & Founder
              </span>
            </h1>

            <div className="max-w-2xl text-left pt-4">
              <p className="text-base sm:text-lg md:text-xl text-zinc-500 leading-relaxed">
                Driven by engineering excellence, built with clarity, and crafted for long-term digital impact.
              </p>
            </div>
          </div>
        </section>

        <AboutSection />
      </MovingTextBg>
      <TechSkillSection />
    </div>
  );
}
