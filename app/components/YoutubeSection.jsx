"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import initialVideos from "../data/youtube.json";
import MovingTextBg from "./MovingTextBg";

export default function YoutubeSection() {
  const [playingVideo, setPlayingVideo] = useState(null);
  const [cards, setCards] = useState(initialVideos);

  useEffect(() => {
    fetch('/api/admin/data?type=youtube')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setCards(prev => {
            if (JSON.stringify(prev) === JSON.stringify(data)) return prev;
            return data;
          });
        }
      })
      .catch(err => console.error('Error fetching youtube videos:', err));
  }, []);

  return (
    <MovingTextBg text="CONTENT" textColor="text-gray-400" className="bg-[#fcfcfd]">
      <section className="relative w-full bg-transparent text-zinc-900 pt-20 pb-24 overflow-hidden border-t border-zinc-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-14 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-zinc-900 mb-4">
              Everything you need to <span className="bg-indigo-100 text-indigo-950 px-2 pb-1 inline-block -mx-2">build & scale.</span>
            </h2>
            <p className="text-zinc-500 text-lg max-w-2xl mx-auto">
              Learn from our experience. Tutorials, deep-dives, and guides on engineering robust products.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card, index) => (
              <motion.div
                key={card.videoId || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-white border border-zinc-200 rounded-3xl p-4 transition-[border-color,box-shadow] duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] group flex flex-col"
              >
                <div className="relative aspect-video bg-zinc-100 rounded-2xl overflow-hidden border border-zinc-100 mb-4">
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
                      className="relative w-full h-full cursor-pointer group/video"
                      onClick={() => setPlayingVideo(card.videoId)}
                    >
                      <img
                        src={`https://i.ytimg.com/vi/${card.videoId}/hqdefault.jpg`}
                        alt={card.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover/video:scale-105"
                        loading="lazy"
                      />

                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/5 group-hover/video:bg-black/20 transition-colors">
                        <div className="w-14 h-14 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg transform group-hover/video:scale-110 transition-all duration-300">
                          <svg
                            className="w-6 h-6 text-indigo-600 ml-1"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>

                      {/* Badge */}
                      {card.badge && (
                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm border border-zinc-200 text-zinc-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm">
                          {card.badge}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="px-2 pb-2 flex-1 flex flex-col">
                  <h3 className="text-[17px] font-semibold tracking-tight leading-snug mb-2 text-zinc-900 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                    {card.title}
                  </h3>
                  <div className="text-zinc-500 text-sm leading-relaxed line-clamp-2 mt-auto">
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
