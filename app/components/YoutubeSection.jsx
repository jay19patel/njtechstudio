"use client";
import React from "react";
import MovingTextBg from "./MovingTextBg";

export default function YoutubeSection() {
  const cards = [
    {
      videoId: "dQw4w9WgXcQ",
      title: "Building AI Apps with LangChain & FastAPI",
      description:
        "Learn how I built an AI-powered blogging platform with vector search and Redis caching. Full tutorial from zero to production!",
      badge: "AI TUTORIAL",
    },
    {
      videoId: "dQw4w9WgXcQ",
      title: "Frappe/ERPNext: Custom ERP in 30 Minutes",
      description:
        "Speed-run building a custom ERP system with automated workflows and real-time dashboards. Perfect for SMBs!",
      badge: "ERP MASTERY",
    },
    {
      videoId: "dQw4w9WgXcQ",
      title: "My Startup Journey: From Code to Company",
      description:
        "Behind the scenes of building NJTechStudio — the wins, fails, and everything in between. Real talk from a developer turned founder.",
      badge: "STARTUP STORY",
    },
  ];

  return (
    <MovingTextBg text="CONTENT" textColor="text-gray-400">
    <section className="pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-12 md:pb-16 px-4 bg-white">
      <div className="max-w-[1400px] mx-auto">
        <div className="bg-black rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 shadow-xl border border-gray-800">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-[42px] lg:text-[48px] leading-[1.2] font-bold text-white mb-2">
              Code. Create. Teach.
            </h2>
            <h2 className="text-2xl sm:text-3xl md:text-[42px] lg:text-[48px] leading-[1.2] font-bold text-white">
              Everything you need to build & scale tech products. 🎬
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {cards.map((card, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-lg sm:rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500 hover:shadow-purple-500/40 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="relative cursor-pointer">
                  <img
                    src={`https://img.youtube.com/vi/${card.videoId}/maxresdefault.jpg`}
                    alt={card.title}
                    className="w-full h-auto aspect-video object-cover"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = `https://img.youtube.com/vi/${card.videoId}/hqdefault.jpg`;
                    }}
                  />

                  {/* Hover Play Button */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white bg-opacity-90 group-hover:bg-opacity-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg">
                      <svg
                        className="w-6 h-6 sm:w-8 sm:h-8 text-red-600 ml-1"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>

                  {/* Badge */}
                  {card.badge && (
                    <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 bg-purple-600 text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded text-[10px] sm:text-xs font-bold shadow-md">
                      {card.badge}
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-4 sm:p-6">
                  <h3 className="text-base sm:text-[18px] font-semibold leading-[1.4] mb-2 sm:mb-3 text-white">
                    {card.title}
                  </h3>
                  <div className="text-gray-300 text-xs sm:text-[14px] leading-[1.6]">
                    {card.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
    </MovingTextBg>
  );
}
