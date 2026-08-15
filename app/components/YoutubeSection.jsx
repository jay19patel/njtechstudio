"use client";
import React, { useState, useEffect } from "react";
import MovingTextBg from "./MovingTextBg";
import { motion } from "framer-motion";

export default function YoutubeSection() {
  const [playingVideo, setPlayingVideo] = useState(null);
  const [cards, setCards] = useState([
    {
      videoId: "tiBeLLv5GJo",
      title: "Build an Analytics API using FastAPI + TimescaleDB",
      description:
        "A comprehensive guide on building a high-performance time-series analytics API using Python, FastAPI, and TimescaleDB.",
      badge: "FASTAPI & DB",
    },
    {
      videoId: "5Z9bHlZv16Q",
      title: "Finally Found an AI Agent Worth Using | Hermes Agent",
      description:
        "Step-by-step tutorial on setting up and self-hosting Hermes AI agent with Discord, GitHub, and browser automation integrations.",
      badge: "AI AGENTS",
    },
    {
      videoId: "6dvYioHX328",
      title: "Next.js E-Commerce App & Admin Panel UI Design",
      description:
        "Learn to design a modern e-commerce UI and administrative panel dashboard using Next.js and Tailwind CSS.",
      badge: "NEXT.JS & UI",
    },
  ]);

  useEffect(() => {
    fetch('/api/admin/data?type=youtube')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setCards(data);
        }
      })
      .catch(err => console.error('Error fetching youtube videos:', err));
  }, []);


  return (
    <div className="bg-black">
      <MovingTextBg text="CONTENT" textColor="text-white">
        <section className="pt-6 sm:pt-7 md:pt-8 pb-4 sm:pb-5 md:pb-6 px-4 bg-transparent">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative bg-transparent p-6 sm:p-8 md:p-12 lg:p-16 overflow-hidden"
          >
            {/* Subtle grid pattern overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000002_1px,transparent_1px),linear-gradient(to_bottom,#00000002_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

            <div className="relative z-10 text-center mb-8 sm:mb-10 md:mb-12 flex flex-col items-center">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-white text-xs sm:text-sm font-semibold tracking-wide uppercase backdrop-blur-md mb-3">
                Content & Tutorials
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight font-black text-white max-w-4xl mx-auto">
                Everything you need to build & scale tech products 🎬
              </h2>
            </div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {cards.map((card, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-zinc-900/50 backdrop-blur-md rounded-lg sm:rounded-xl overflow-hidden border border-zinc-800/80 hover:border-indigo-500/50 hover:shadow-indigo-500/10 hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="relative aspect-video bg-zinc-950">
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
                          src={`https://i.ytimg.com/vi/${card.videoId}/hqdefault.jpg`}
                          alt={card.title}
                          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                          loading="lazy"
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
                    <h3 className="text-base sm:text-[18px] font-semibold leading-[1.4] mb-2 sm:mb-3 text-white line-clamp-2 group-hover:text-indigo-200 transition-colors">
                      {card.title}
                    </h3>
                    <div className="text-white text-xs sm:text-[14px] leading-[1.6] line-clamp-2">
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
    </div>
  );
}
