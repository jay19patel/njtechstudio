"use client";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
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

          {/* Bento Box Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 md:mt-20 relative">
            {[
              {
                title: "Budget-Friendly",
                subtitle: "High Value, Fair Pricing",
                icon: "/icons/flaticon/budget-friendly.png",
                text: "We keep quality high and costs practical. No over-engineering, no unnecessary complexity — just smart solutions that fit your budget and scale with your growth.",
                badgeTitle: "Affordable Excellence",
                badgeDesc: "Maximum ROI for your investment",
                theme: "light",
                span: "md:col-span-1 lg:col-span-2 row-span-1"
              },
              {
                title: "Optimized Solutions",
                subtitle: "Designed to Perform",
                icon: "/icons/flaticon/optimized-solutions.png",
                text: "Faster systems, cleaner UX, automated workflows, and future-proof architecture.",
                badgeTitle: "Performance First",
                badgeDesc: "Built for speed",
                theme: "indigo",
                span: "col-span-1 row-span-1"
              },
              {
                title: "AI-Driven Approach",
                subtitle: "Smarter, Faster, Scalable",
                icon: "/icons/flaticon/ai-driven.png",
                text: "Integrating AI wherever it truly makes sense — improving speed, accuracy, and overall efficiency.",
                badgeTitle: "Future Ready",
                badgeDesc: "Cutting-edge AI tech",
                theme: "indigo",
                span: "col-span-1 row-span-1"
              },
              {
                title: "Reliable Delivery",
                subtitle: "On Time, Every Time",
                icon: "/icons/flaticon/reliable-delivery.png",
                text: "Clear communication, transparent progress, and predictable delivery. We make development stress-free so your team can focus on what truly matters.",
                badgeTitle: "Peace of Mind",
                badgeDesc: "Consistent updates & support",
                theme: "light",
                span: "md:col-span-1 lg:col-span-2 row-span-1"
              }
            ].map((item, idx) => {
              const isIndigo = item.theme === "indigo";
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ 
                    duration: 0.5,
                    ease: "easeOut",
                    delay: idx * 0.1 
                  }}
                  className={`
                    relative overflow-hidden group flex flex-col justify-between
                    rounded-[2rem] p-6 sm:p-8 transition-colors duration-300 border
                    ${item.span}
                    ${isIndigo 
                      ? 'bg-zinc-950 border-zinc-800 hover:border-zinc-600 hover:bg-zinc-900' 
                      : 'bg-white border-gray-200 hover:border-gray-400'}
                  `}
                >
                  {/* Top Content */}
                  <div className="relative z-10 flex flex-col h-full justify-between gap-6">
                    <div>
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${isIndigo ? 'bg-zinc-900 border border-zinc-700' : 'bg-gray-100 border border-gray-200'}`}>
                          <img 
                            src={item.icon} 
                            className="w-8 h-8 object-contain drop-shadow-sm" 
                            alt={item.title} 
                          />
                        </div>
                      </div>
                      <h3 className={`text-xl sm:text-2xl font-black leading-tight mb-2 ${isIndigo ? 'text-white' : 'text-gray-900'}`}>
                        {item.title}
                      </h3>
                      <p className={`text-sm font-medium ${isIndigo ? 'text-zinc-400' : 'text-gray-500'}`}>
                        {item.subtitle}
                      </p>
                    </div>

                    <p className={`text-sm sm:text-base italic leading-relaxed font-medium mt-2 ${isIndigo ? 'text-zinc-300' : 'text-gray-600'}`}>
                      &quot;{item.text}&quot;
                    </p>

                    <div className={`flex items-center gap-3 pt-4 border-t mt-auto ${isIndigo ? 'border-zinc-800' : 'border-gray-200'}`}>
                      <div className={`p-2 rounded-lg border shadow-sm ${isIndigo ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-gray-200'}`}>
                        <CheckCircle2 className={`w-5 h-5 ${isIndigo ? 'text-indigo-500' : 'text-indigo-600'}`} />
                      </div>
                      <div>
                        <div className={`text-sm font-bold ${isIndigo ? 'text-white' : 'text-gray-900'}`}>
                          {item.badgeTitle}
                        </div>
                        <div className={`text-xs font-medium ${isIndigo ? 'text-zinc-400' : 'text-gray-500'}`}>
                          {item.badgeDesc}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          </div>
        </section>
      </MovingTextBg>
    </div>
  );
}
