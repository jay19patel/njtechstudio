"use client";
import AboutSection from "../components/AboutSection";
import TechSkillSection from "../components/TechSkillSection";
import MovingTextBg from "../components/MovingTextBg";

export default function AboutPage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <MovingTextBg text="ABOUT US " textColor="text-gray-400">
        {/* Edgy Left-Aligned Hero Title Section */}
        <section className="relative w-full pt-32 lg:pt-40 pb-6 lg:pb-10 px-4 sm:px-8 lg:px-16">
          <div className="relative z-10 max-w-7xl mx-auto text-left space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-zinc-900 border border-zinc-700 text-white text-xs font-mono font-bold uppercase tracking-widest shadow-md">
            // 01 . ABOUT US
          </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tighter uppercase text-gray-900">
              ABOUT THE <br />
              <span className="text-indigo-800">STUDIO & FOUNDER</span>
            </h1>

            <div className="max-w-2xl text-left pt-2 border-l-2 border-indigo-900 pl-4 sm:pl-6">
              <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed font-medium">
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
