"use client";
import React from "react";
import MovingTextBg from "./MovingTextBg";
import { motion } from "framer-motion";

export default function YoutubeSection() {
  const [playingVideo, setPlayingVideo] = React.useState(null);

  const cards = [
    {
      videoId: "yNUXc9sTcvg",
      title: "Building AI Apps with LangChain & FastAPI",
      description:
        "Learn how I built an AI-powered blogging platform with vector search and Redis caching. Full tutorial from zero to production!",
      badge: "AI TUTORIAL",
    },
    {
      videoId: "SqcY0GlETPk",
      title: "Frappe/ERPNext: Custom ERP in 30 Minutes",
      description:
        "Speed-run building a custom ERP system with automated workflows and real-time dashboards. Perfect for SMBs!",
      badge: "ERP MASTERY",
    },
    {
      videoId: "bMknfKXIFA8",
      title: "My Startup Journey: From Code to Company",
      description:
        "Behind the scenes of building NJTechStudio — the wins, fails, and everything in between. Real talk from a developer turned founder.",
      badge: "STARTUP STORY",
    },
  ];

  return (
    <MovingTextBg text="CONTENT" textColor="text-gray-400">
      <section className="pt-6 sm:pt-7 md:pt-8 pb-4 sm:pb-5 md:pb-6 px-4 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-black rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 shadow-xl border border-gray-800"
          >
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight font-bold text-white mb-2">
                Code. Create. Teach.
              </h2>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight font-bold text-white">
                Everything you need to build & scale tech products. 🎬
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {cards.map((card, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-800 rounded-lg sm:rounded-xl overflow-hidden border border-gray-700 hover:border-indigo-500 hover:shadow-indigo-500/40 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="relative aspect-video bg-gray-900">
                    {playingVideo === card.videoId ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${card.videoId}?autoplay=1`}
                        title={card.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full"
                      />
                    ) : (
                      <div
                        className="relative w-full h-full cursor-pointer group"
                        onClick={() => setPlayingVideo(card.videoId)}
                      >
                        <img
                          src={`https://img.youtube.com/vi/${card.videoId}/maxresdefault.jpg`}
                          alt={card.title}
                          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                          loading="lazy"
                          onError={(e) => {
                            e.target.src = `https://img.youtube.com/vi/${card.videoId}/hqdefault.jpg`;
                          }}
                        />

                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/90 group-hover:bg-white rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-all duration-300">
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
                          <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 bg-indigo-600 text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded text-[10px] sm:text-xs font-bold shadow-md z-10">
                            {card.badge}
                          </div>
                        )}
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
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </MovingTextBg>
  );
}
