"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Tag, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import MovingTextBg from "./MovingTextBg";

export default function ChannelRecentSection() {
  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(() => {
    fetch("/api/admin/data?type=channel")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          // Sort newest first and take top 2
          const sorted = [...data].sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          );
          setRecentPosts(sorted.slice(0, 2));
        }
      })
      .catch((err) => console.error("Error loading channel updates:", err));
  }, []);

  if (recentPosts.length === 0) return null;

  return (
    <MovingTextBg text="UPDATES" textColor="text-gray-400">
      <section className="pt-12 sm:pt-16 md:pt-20 pb-8 sm:pb-10 md:pb-12 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-3">
                Live Feed & <span className="text-indigo-600">Updates</span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl">
                Stay updated with the latest announcements, engineering blogs, workshop notices, and product launches straight from the studio.
              </p>
            </div>
            <div className="shrink-0">
              <Link
                href="/channel"
                className="inline-flex items-center px-5 py-2.5 rounded-full bg-indigo-150 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300 font-bold hover:bg-indigo-200 dark:hover:bg-indigo-900/60 transition-all text-sm group"
              >
                View Channel Feed
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Updates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {recentPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 hover:border-indigo-500/50 dark:hover:border-indigo-500/50 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Image container */}
                  {post.image ? (
                    <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-gray-100 dark:bg-zinc-950">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                  ) : (
                    // Text-only placeholder spacing/design accent
                    <div className="h-4 bg-gradient-to-r from-indigo-500 to-indigo-650" />
                  )}

                  {/* Card Body */}
                  <div className="p-6 sm:p-8 space-y-4">
                    <div className="flex flex-wrap items-center gap-3 text-xs">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 font-bold tracking-wide uppercase text-[10px]">
                        <Tag className="w-3 h-3" />
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1 text-gray-500 dark:text-zinc-400 font-medium">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(post.date).toLocaleDateString(undefined, {
                          dateStyle: "medium",
                        })}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-sm sm:text-base text-gray-600 dark:text-zinc-300 leading-relaxed whitespace-pre-line line-clamp-4">
                      {post.content}
                    </p>
                  </div>
                </div>

                {/* Card Footer Actions */}
                {post.link && (
                  <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-0">
                    <a
                      href={post.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                    >
                      <span>{post.linkText || "Learn More"}</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

        </div>
      </section>
    </MovingTextBg>
  );
}
