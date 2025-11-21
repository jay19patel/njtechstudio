"use client";
import React from "react";

export default function YoutubeSection() {
  const cards = [
    {
      videoId: "CZFlHnakLNQ",
      title: "Top outreach triggers to qualify leads",
      description:
        "Get real examples from 12,000+ outbound campaigns to speed up your sales cycle.",
      badge: "300+ MEETINGS BOOKED",
    },
    {
      videoId: "lLrHxOka8Ns",
      title: "Step-by-step guide to avoiding spam",
      description:
        "The 11-step method to keep your deliverability high and emails out of the spam folder.",
      badge: "DELIVERABILITY GUIDE",
    },
    {
      videoId: "Or2Vkcz14iI",
      title: "The new way of sales calling in 2025",
      description:
        "4-step cold calling playbook successful sales teams use for +270% conversion rate.",
      badge: "3X MEETINGS",
    },
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-[1400px] mx-auto">
        <div className="bg-black rounded-3xl p-8 md:p-12 lg:p-16 shadow-xl border border-gray-800">
          <div className="text-center mb-12">
            <h2 className="text-[34px] md:text-[42px] lg:text-[48px] leading-[1.2] font-bold text-white mb-2">
              We did the learning.
            </h2>
            <h2 className="text-[34px] md:text-[42px] lg:text-[48px] leading-[1.2] font-bold text-white">
              Here's everything you need to hit sales quotas.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500 hover:shadow-purple-500/40 hover:shadow-lg transition-all duration-300 group"
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
                    <div className="w-16 h-16 bg-white bg-opacity-90 group-hover:bg-opacity-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg">
                      <svg
                        className="w-8 h-8 text-red-600 ml-1"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>

                  {/* Badge */}
                  {card.badge && (
                    <div className="absolute bottom-4 left-4 bg-purple-600 text-white px-3 py-1 rounded text-xs font-bold shadow-md">
                      {card.badge}
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <h3 className="text-[18px] font-semibold leading-[1.4] mb-3 text-white">
                    {card.title}
                  </h3>
                  <div className="text-gray-300 text-[14px] leading-[1.6]">
                    {card.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
