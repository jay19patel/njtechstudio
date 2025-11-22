// Updated WhyChooseUs Component (new layout: left-aligned title, subtitle, 4 cards in 2 rows)
"use client";
export default function WhyChooseUs() {
  return (
    <section className="team-section pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading Section */}
        <div className="mb-8 sm:mb-10 text-left">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Real Results, Real Impact
          </h2>
          <p className="text-base sm:text-lg text-gray-600 mt-2 max-w-xl">
            Here's what happens when you ship smart, scalable solutions that actually work.
          </p>
        </div>

        {/* Cards Grid — 4 cards, 2 rows of 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">

          {/* Card 1 */}
          <div className="rounded-xl sm:rounded-2xl border border-gray-200 bg-linear-to-br from-gray-50 to-white shadow-sm hover:shadow-xl hover:border-purple-400 transition-all duration-300 p-5 sm:p-6 md:p-8">
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-gray-900">~50%</div>
                <div className="text-gray-500 text-base sm:text-lg font-medium">Faster Screening</div>
              </div>
              <img src="https://cdn-icons-png.flaticon.com/512/2103/2103633.png" className="w-12 h-12 sm:w-14 sm:h-14" />
            </div>

            <p className="text-sm sm:text-base md:text-lg text-gray-700 italic mb-4 sm:mb-6">
              "Built AI-powered talent acquisition automation with GenAI and vector search (OpenSearch). Manual screening time reduced by ~50%, candidates matched smarter, HR team finally happy!"
            </p>

            <div className="flex items-center gap-3 sm:gap-4">
              <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" className="w-12 h-12 sm:w-14 sm:h-14 rounded-full" />
              <div>
                <div className="text-xs sm:text-sm font-semibold text-gray-900">Sayaji Infotech Client</div>
                <div className="text-xs sm:text-sm text-gray-500">HR Manager</div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="rounded-xl sm:rounded-2xl border border-purple-300 bg-linear-to-br from-purple-50 to-white shadow-sm hover:shadow-xl hover:border-purple-500 transition-all duration-300 p-5 sm:p-6 md:p-8">
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-gray-900">~30%</div>
                <div className="text-gray-500 text-base sm:text-lg font-medium">Speed Boost</div>
              </div>
              <img src="https://cdn-icons-png.flaticon.com/512/3281/3281307.png" className="w-12 h-12 sm:w-14 sm:h-14" />
            </div>

            <p className="text-sm sm:text-base md:text-lg text-gray-700 italic mb-4 sm:mb-6">
              "Created full-stack ERP solutions with Frappe/ERPNext and React. One-click access to key data, automated quotations, task tracking — management and working speed increased by ~30%!"
            </p>

            <div className="flex items-center gap-3 sm:gap-4">
              <img src="https://cdn-icons-png.flaticon.com/512/3135/3135789.png" className="w-12 h-12 sm:w-14 sm:h-14 rounded-full" />
              <div>
                <div className="text-xs sm:text-sm font-semibold text-gray-900">SMB Owner</div>
                <div className="text-xs sm:text-sm text-gray-500">Operations Director</div>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="rounded-xl sm:rounded-2xl border border-purple-300 bg-linear-to-br from-purple-50 to-white shadow-sm hover:shadow-xl hover:border-purple-500 transition-all duration-300 p-5 sm:p-6 md:p-8">
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-gray-900">&lt;250ms</div>
                <div className="text-gray-500 text-base sm:text-lg font-medium">Execution Speed</div>
              </div>
              <img src="https://cdn-icons-png.flaticon.com/512/3468/3468377.png" className="w-12 h-12 sm:w-14 sm:h-14" />
            </div>

            <p className="text-sm sm:text-base md:text-lg text-gray-700 italic mb-4 sm:mb-6">
              "Engineered a multi-microservices trading platform with event-driven architecture. Sub-250ms signal-to-trade execution, automated strategies, real-time risk management — 90% less manual work!"
            </p>

            <div className="flex items-center gap-3 sm:gap-4">
              <img src="https://cdn-icons-png.flaticon.com/512/3135/3135823.png" className="w-12 h-12 sm:w-14 sm:h-14 rounded-full" />
              <div>
                <div className="text-xs sm:text-sm font-semibold text-gray-900">Personal Project</div>
                <div className="text-xs sm:text-sm text-gray-500">Trading Automation Platform</div>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="rounded-xl sm:rounded-2xl border border-gray-200 bg-linear-to-br from-gray-50 to-white shadow-sm hover:shadow-xl hover:border-purple-400 transition-all duration-300 p-5 sm:p-6 md:p-8">
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-gray-900">~50%</div>
                <div className="text-gray-500 text-base sm:text-lg font-medium">Time Saved</div>
              </div>
              <img src="https://cdn-icons-png.flaticon.com/512/2920/2920235.png" className="w-12 h-12 sm:w-14 sm:h-14" />
            </div>

            <p className="text-sm sm:text-base md:text-lg text-gray-700 italic mb-4 sm:mb-6">
              "Built healthcare manufacturing automation with C# + IoT integration. Streamlined documentation workflows, reduced manual processing by over 50%. Healthcare meets automation — game changer!"
            </p>

            <div className="flex items-center gap-3 sm:gap-4">
              <img src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png" className="w-12 h-12 sm:w-14 sm:h-14 rounded-full" />
              <div>
                <div className="text-xs sm:text-sm font-semibold text-gray-900">Meril Life Client</div>
                <div className="text-xs sm:text-sm text-gray-500">Manufacturing Lead</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
