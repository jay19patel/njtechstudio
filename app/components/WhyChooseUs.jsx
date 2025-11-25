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
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="bg-white">
      <MovingTextBg text="WHY US" textColor="text-gray-400">
        <section className="team-section pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 bg-transparent relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Heading Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-8 sm:mb-10 text-left"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
                Why <span className="text-indigo-600">People Love Working With Us</span>
              </h2>
              <p className="text-base sm:text-lg text-gray-600 mt-4 max-w-xl">
                Smart execution, reliable delivery, budget-friendly solutions, and the joy of working with a team that actually understands your goals.
              </p>
            </motion.div>

            {/* Cards Grid — 4 cards, 2 rows of 2 */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
            >

              {/* Card 1 */}
              <motion.div variants={itemVariants} className="rounded-xl sm:rounded-2xl border border-gray-200 bg-linear-to-br from-gray-50 to-white shadow-sm hover:shadow-xl hover:border-indigo-400 transition-all duration-300 p-5 sm:p-6 md:p-8">
                <div className="flex justify-between items-center mb-4 sm:mb-6">
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-gray-900">Budget-Friendly</div>
                    <div className="text-gray-500 text-base sm:text-lg font-medium">High Value, Fair Pricing</div>
                  </div>
                  <img src="https://cdn-icons-png.flaticon.com/512/3135/3135682.png" className="w-12 h-12 sm:w-14 sm:h-14 object-contain" alt="Budget-Friendly" />
                </div>

                <p className="text-sm sm:text-base md:text-lg text-gray-700 italic mb-4 sm:mb-6">
                  "We keep quality high and costs practical. No over-engineering, no unnecessary complexity — just smart solutions that fit your budget and scale with your growth."
                </p>

                <div className="flex items-center gap-3 sm:gap-4 pt-4 border-t border-gray-100">
                  <div className="p-2 bg-indigo-50 rounded-full">
                    <CheckCircle2 className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <div className="text-sm sm:text-base font-bold text-indigo-900">Affordable Excellence</div>
                    <div className="text-xs sm:text-sm text-gray-500">Maximum ROI for your investment</div>
                  </div>
                </div>
              </motion.div>

              {/* Card 2 */}
              <motion.div variants={itemVariants} className="rounded-xl sm:rounded-2xl border border-indigo-300 bg-linear-to-br from-indigo-50 to-white shadow-sm hover:shadow-xl hover:border-indigo-500 transition-all duration-300 p-5 sm:p-6 md:p-8">
                <div className="flex justify-between items-center mb-4 sm:mb-6">
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-gray-900">Optimized Solutions</div>
                    <div className="text-gray-500 text-base sm:text-lg font-medium">Designed to Perform</div>
                  </div>
                  <img src="https://cdn-icons-png.flaticon.com/512/2920/2920349.png" className="w-12 h-12 sm:w-14 sm:h-14 object-contain" alt="Optimized Solutions" />
                </div>

                <p className="text-sm sm:text-base md:text-lg text-gray-700 italic mb-4 sm:mb-6">
                  "We don't just build — we optimize. Faster systems, cleaner UX, automated workflows, and future-proof architecture that supports long-term business growth."
                </p>

                <div className="flex items-center gap-3 sm:gap-4 pt-4 border-t border-indigo-100">
                  <div className="p-2 bg-indigo-50 rounded-full">
                    <CheckCircle2 className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <div className="text-sm sm:text-base font-bold text-indigo-900">Performance First</div>
                    <div className="text-xs sm:text-sm text-gray-500">Built for speed and scalability</div>
                  </div>
                </div>
              </motion.div>

              {/* Card 3 */}
              <motion.div variants={itemVariants} className="rounded-xl sm:rounded-2xl border border-indigo-300 bg-linear-to-br from-indigo-50 to-white shadow-sm hover:shadow-xl hover:border-indigo-500 transition-all duration-300 p-5 sm:p-6 md:p-8">
                <div className="flex justify-between items-center mb-4 sm:mb-6">
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-gray-900">AI-Driven Approach</div>
                    <div className="text-gray-500 text-base sm:text-lg font-medium">Smarter, Faster, Scalable</div>
                  </div>
                  <img src="https://cdn-icons-png.flaticon.com/512/4712/4712027.png" className="w-12 h-12 sm:w-14 sm:h-14 object-contain" alt="AI-Driven" />
                </div>

                <p className="text-sm sm:text-base md:text-lg text-gray-700 italic mb-4 sm:mb-6">
                  "From automations to custom LLM workflows, we integrate AI wherever it truly makes sense — improving speed, accuracy, and overall efficiency with measurable impact."
                </p>

                <div className="flex items-center gap-3 sm:gap-4 pt-4 border-t border-indigo-100">
                  <div className="p-2 bg-indigo-50 rounded-full">
                    <CheckCircle2 className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <div className="text-sm sm:text-base font-bold text-indigo-900">Future Ready</div>
                    <div className="text-xs sm:text-sm text-gray-500">Leveraging cutting-edge AI tech</div>
                  </div>
                </div>
              </motion.div>

              {/* Card 4 */}
              <motion.div variants={itemVariants} className="rounded-xl sm:rounded-2xl border border-gray-200 bg-linear-to-br from-gray-50 to-white shadow-sm hover:shadow-xl hover:border-indigo-400 transition-all duration-300 p-5 sm:p-6 md:p-8">
                <div className="flex justify-between items-center mb-4 sm:mb-6">
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-gray-900">Reliable Delivery</div>
                    <div className="text-gray-500 text-base sm:text-lg font-medium">On Time, Every Time</div>
                  </div>
                  <img src="https://cdn-icons-png.flaticon.com/512/3281/3281289.png" className="w-12 h-12 sm:w-14 sm:h-14 object-contain" alt="Reliable Delivery" />
                </div>

                <p className="text-sm sm:text-base md:text-lg text-gray-700 italic mb-4 sm:mb-6">
                  "Clear communication, transparent progress, and predictable delivery. We make development stress-free so your team can focus on what truly matters."
                </p>

                <div className="flex items-center gap-3 sm:gap-4 pt-4 border-t border-gray-100">
                  <div className="p-2 bg-indigo-50 rounded-full">
                    <CheckCircle2 className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <div className="text-sm sm:text-base font-bold text-indigo-900">Peace of Mind</div>
                    <div className="text-xs sm:text-sm text-gray-500">Consistent updates & support</div>
                  </div>
                </div>
              </motion.div>

            </motion.div>
          </div>
        </section>
      </MovingTextBg>
    </div>
  );
}
