"use client";
import { motion } from "framer-motion";
import { CheckCircle2, Wallet, Zap, BrainCircuit, ShieldCheck } from "lucide-react";
import MovingTextBg from "./MovingTextBg";

export default function WhyChooseUs() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="bg-white">
      <MovingTextBg text="WHY US" textColor="text-gray-400">
        <section className="team-section pt-12 sm:pt-16 md:pt-20 pb-8 sm:pb-10 md:pb-12 bg-transparent relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Heading Section */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
              className="mb-6 sm:mb-8 text-left"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
                Why <span className="text-indigo-800">People Love Working With Us</span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 mt-3 max-w-xl">
                Smart execution, reliable delivery, budget-friendly solutions, and the joy of working with a team that actually understands your goals.
              </p>
            </motion.div>

          {/* Mistral-Style Brutalist Grid Wrapper - Light Mode */}
          <div className="bg-gray-200 p-[1px] w-full mt-12 md:mt-20 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-gray-200 w-full auto-rows-[minmax(280px,auto)]">
              
              {/* 1. Empty Decorative Block (Col 1, Row 1) */}
              <div className="hidden lg:flex flex-col items-center justify-center bg-gray-50 relative overflow-hidden group">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#00000008_1px,transparent_1px)] bg-[size:16px_16px]"></div>
                <div className="w-16 h-16 border border-gray-200 rotate-45 group-hover:rotate-90 transition-transform duration-1000 ease-in-out relative z-10 bg-white"></div>
              </div>

              {/* 2. Wide Block 1 (Col 2 & 3, Row 1) -> Budget-Friendly */}
              <motion.div
                whileHover="hover"
                className="group relative flex flex-col justify-between bg-white hover:bg-gray-50 transition-colors duration-500 text-left col-span-1 md:col-span-2 lg:col-span-2 overflow-hidden p-6 sm:p-8"
              >
                <div className="absolute top-0 right-0 w-64 h-64 opacity-[0.02] group-hover:opacity-[0.05] transition-all duration-700 pointer-events-none -translate-y-1/4 translate-x-1/4">
                  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="50" cy="50" r="40" />
                    <circle cx="50" cy="50" r="30" />
                    <circle cx="50" cy="50" r="20" />
                  </svg>
                </div>
                
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-indigo-600 rounded-none flex items-center justify-center text-white shadow-md">
                    <Wallet className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest group-hover:text-gray-500 transition-colors">
                    01
                  </span>
                </div>

                <div className="mt-auto relative z-10">
                  <h3 className="font-medium text-gray-900 tracking-tight mb-2 flex items-center gap-2 group-hover:text-indigo-600 transition-colors text-3xl sm:text-4xl">
                    Budget-Friendly
                  </h3>
                  <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-md">
                    We keep quality high and costs practical. No over-engineering, no unnecessary complexity — just smart solutions.
                  </p>
                  
                  <div className="flex items-center gap-3 pt-6 mt-6 border-t border-gray-100">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                    <div>
                      <div className="text-xs font-bold text-gray-900">Affordable Excellence</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* 3. Tall Block (Col 4, Row 1 & 2) -> Optimized Solutions */}
              <motion.div
                whileHover="hover"
                className="group relative flex flex-col justify-between bg-white hover:bg-gray-50 transition-colors duration-500 text-left col-span-1 md:col-span-1 lg:col-span-1 lg:row-span-2 overflow-hidden p-6 sm:p-8"
              >
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-indigo-500/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                
                <div className="flex items-center gap-4 mb-8 relative z-10">
                  <div className="w-12 h-12 bg-indigo-600 rounded-none flex items-center justify-center text-white shadow-md">
                    <Zap className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                    02
                  </span>
                </div>

                <div className="mt-auto relative z-10">
                  <h3 className="font-medium text-gray-900 tracking-tight mb-2 text-2xl sm:text-3xl group-hover:text-indigo-600 transition-colors">
                    Optimized Solutions
                  </h3>
                  <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                    Faster systems, cleaner UX, automated workflows, and future-proof architecture.
                  </p>

                  <div className="flex items-center gap-3 pt-6 mt-6 border-t border-gray-100">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                    <div>
                      <div className="text-xs font-bold text-gray-900">Performance First</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* 4. Small Block (Col 1, Row 2) -> AI-Driven Approach */}
              <motion.div
                whileHover="hover"
                className="group relative flex flex-col justify-between bg-white hover:bg-gray-50 transition-colors duration-500 text-left col-span-1 md:col-span-1 lg:col-span-1 overflow-hidden p-6 sm:p-8"
              >
                <div className="absolute -left-10 -bottom-10 w-40 h-40 opacity-[0.02] group-hover:opacity-[0.06] transition-all duration-700 pointer-events-none group-hover:rotate-12">
                  <svg viewBox="0 0 24 24" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="3" y1="9" x2="21" y2="9"></line>
                    <line x1="9" y1="21" x2="9" y2="9"></line>
                  </svg>
                </div>
                
                <div className="flex items-center gap-4 mb-8 relative z-10">
                  <div className="w-12 h-12 bg-indigo-600 rounded-none flex items-center justify-center text-white shadow-md">
                    <BrainCircuit className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                    03
                  </span>
                </div>

                <div className="mt-auto relative z-10">
                  <h3 className="font-medium text-gray-900 tracking-tight mb-2 text-2xl sm:text-3xl group-hover:text-indigo-600 transition-colors">
                    AI-Driven
                  </h3>
                  <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                    Integrating AI wherever it truly makes sense — improving speed, accuracy, and overall efficiency.
                  </p>
                  
                  <div className="flex items-center gap-3 pt-6 mt-6 border-t border-gray-100">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                    <div>
                      <div className="text-xs font-bold text-gray-900">Future Ready</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* 5. Wide Block 2 (Col 2 & 3, Row 2) -> Reliable Delivery */}
              <motion.div
                whileHover="hover"
                className="group relative flex flex-col justify-between bg-white hover:bg-gray-50 transition-colors duration-500 text-left col-span-1 md:col-span-2 lg:col-span-2 overflow-hidden p-6 sm:p-8"
              >
                <div className="absolute right-0 bottom-0 p-4 opacity-[0.02] group-hover:opacity-[0.06] transition-all duration-700 pointer-events-none group-hover:-translate-x-4">
                  <svg width="120" height="120" viewBox="0 0 100 100">
                    <defs>
                      <pattern id="dots" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                        <circle fill="currentColor" cx="5" cy="5" r="1.5"></circle>
                      </pattern>
                    </defs>
                    <rect x="0" y="0" width="100%" height="100%" fill="url(#dots)"></rect>
                  </svg>
                </div>
                
                <div className="flex items-center gap-4 mb-8 relative z-10">
                  <div className="w-12 h-12 bg-indigo-600 rounded-none flex items-center justify-center text-white shadow-md">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest group-hover:text-gray-500 transition-colors">
                    04
                  </span>
                </div>

                <div className="mt-auto relative z-10">
                  <h3 className="font-medium text-gray-900 tracking-tight mb-2 flex items-center gap-2 group-hover:text-indigo-600 transition-colors text-3xl sm:text-4xl">
                    Reliable Delivery
                  </h3>
                  <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-md">
                    Clear communication, transparent progress, and predictable delivery. We make development stress-free.
                  </p>
                  
                  <div className="flex items-center gap-3 pt-6 mt-6 border-t border-gray-100">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                    <div>
                      <div className="text-xs font-bold text-gray-900">Peace of Mind</div>
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
          </div>
        </section>
      </MovingTextBg>
    </div>
  );
}
