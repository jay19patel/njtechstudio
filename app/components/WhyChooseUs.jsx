"use client";
export default function WhyChooseUs() {
  return (
    <section className="team-section pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading Section */}
        <div className="mb-8 sm:mb-10 text-left">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Why People Love Working With Us
          </h2>
          <p className="text-base sm:text-lg text-gray-600 mt-2 max-w-xl">
            Smart execution, reliable delivery, budget-friendly solutions, and the joy of working with a team that actually understands your goals.
          </p>
        </div>

        {/* Cards Grid — 4 cards, 2 rows of 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">

          {/* Card 1 */}
          <div className="rounded-xl sm:rounded-2xl border border-gray-200 bg-linear-to-br from-gray-50 to-white shadow-sm hover:shadow-xl hover:border-purple-400 transition-all duration-300 p-5 sm:p-6 md:p-8">
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-gray-900">Budget-Friendly</div>
                <div className="text-gray-500 text-base sm:text-lg font-medium">High Value, Fair Pricing</div>
              </div>
              <img src="https://cdn-icons-png.flaticon.com/512/2103/2103633.png" className="w-12 h-12 sm:w-14 sm:h-14" />
            </div>

            <p className="text-sm sm:text-base md:text-lg text-gray-700 italic mb-4 sm:mb-6">
              "We keep quality high and costs practical. No over-engineering, no unnecessary complexity — just smart solutions that fit your budget and scale with your growth."
            </p>

            <div className="flex items-center gap-3 sm:gap-4">
              <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" className="w-12 h-12 sm:w-14 sm:h-14 rounded-full" />
              <div>
                <div className="text-xs sm:text-sm font-semibold text-gray-900">Satisfied Client</div>
                <div className="text-xs sm:text-sm text-gray-500">Startup Founder</div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="rounded-xl sm:rounded-2xl border border-purple-300 bg-linear-to-br from-purple-50 to-white shadow-sm hover:shadow-xl hover:border-purple-500 transition-all duration-300 p-5 sm:p-6 md:p-8">
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-gray-900">Optimized Solutions</div>
                <div className="text-gray-500 text-base sm:text-lg font-medium">Designed to Perform</div>
              </div>
              <img src="https://cdn-icons-png.flaticon.com/512/3281/3281307.png" className="w-12 h-12 sm:w-14 sm:h-14" />
            </div>

            <p className="text-sm sm:text-base md:text-lg text-gray-700 italic mb-4 sm:mb-6">
              "We don’t just build — we optimize. Faster systems, cleaner UX, automated workflows, and future-proof architecture that supports long-term business growth."
            </p>

            <div className="flex items-center gap-3 sm:gap-4">
              <img src="https://cdn-icons-png.flaticon.com/512/3135/3135789.png" className="w-12 h-12 sm:w-14 sm:h-14 rounded-full" />
              <div>
                <div className="text-xs sm:text-sm font-semibold text-gray-900">Business Owner</div>
                <div className="text-xs sm:text-sm text-gray-500">Operations Head</div>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="rounded-xl sm:rounded-2xl border border-purple-300 bg-linear-to-br from-purple-50 to-white shadow-sm hover:shadow-xl hover:border-purple-500 transition-all duration-300 p-5 sm:p-6 md:p-8">
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-gray-900">AI-Driven Approach</div>
                <div className="text-gray-500 text-base sm:text-lg font-medium">Smarter, Faster, Scalable</div>
              </div>
              <img src="https://cdn-icons-png.flaticon.com/512/3468/3468377.png" className="w-12 h-12 sm:w-14 sm:h-14" />
            </div>

            <p className="text-sm sm:text-base md:text-lg text-gray-700 italic mb-4 sm:mb-6">
              "From automations to custom LLM workflows, we integrate AI wherever it truly makes sense — improving speed, accuracy, and overall efficiency with measurable impact."
            </p>

            <div className="flex items-center gap-3 sm:gap-4">
              <img src="https://cdn-icons-png.flaticon.com/512/3135/3135823.png" className="w-12 h-12 sm:w-14 sm:h-14 rounded-full" />
              <div>
                <div className="text-xs sm:text-sm font-semibold text-gray-900">Tech Client</div>
                <div className="text-xs sm:text-sm text-gray-500">AI Automation Project</div>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="rounded-xl sm:rounded-2xl border border-gray-200 bg-linear-to-br from-gray-50 to-white shadow-sm hover:shadow-xl hover:border-purple-400 transition-all duration-300 p-5 sm:p-6 md:p-8">
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-gray-900">Reliable Delivery</div>
                <div className="text-gray-500 text-base sm:text-lg font-medium">On Time, Every Time</div>
              </div>
              <img src="https://cdn-icons-png.flaticon.com/512/2920/2920235.png" className="w-12 h-12 sm:w-14 sm:h-14" />
            </div>

            <p className="text-sm sm:text-base md:text-lg text-gray-700 italic mb-4 sm:mb-6">
              "Clear communication, transparent progress, and predictable delivery. We make development stress-free so your team can focus on what truly matters."
            </p>

            <div className="flex items-center gap-3 sm:gap-4">
              <img src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png" className="w-12 h-12 sm:w-14 sm:h-14 rounded-full" />
              <div>
                <div className="text-xs sm:text-sm font-semibold text-gray-900">Enterprise Client</div>
                <div className="text-xs sm:text-sm text-gray-500">Project Manager</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
