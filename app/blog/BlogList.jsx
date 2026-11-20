"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Search, FileText } from "lucide-react";
import { motion } from "framer-motion";
import MovingTextBg from "../components/MovingTextBg";
import BackendStatusCard from "../components/BackendStatusCard";
import { readingTime, formatDate, plainText } from "./posts-format";

function Meta({ post }) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500">
      <span className="px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 font-semibold uppercase tracking-wider text-[10px]">
        {post.category || "Update"}
      </span>
      <span>{formatDate(post.date)}</span>
      <span aria-hidden>·</span>
      <span>{readingTime(post.content)} min read</span>
    </div>
  );
}

function Cover({ post, className }) {
  return post.image ? (
    <img src={post.image} alt="" loading="lazy" className={`w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ${className}`} />
  ) : (
    <div className={`w-full h-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center ${className}`}>
      <FileText className="w-10 h-10 text-white/70" />
    </div>
  );
}

export default function BlogList({ posts = [], isOffline = false }) {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");

  const categories = ["All", ...new Set(posts.map((p) => p.category || "Update"))];
  const q = query.trim().toLowerCase();
  const filtered = posts.filter(
    (p) =>
      (category === "All" || (p.category || "Update") === category) &&
      (!q || `${p.title} ${p.content}`.toLowerCase().includes(q))
  );
  const showFeatured = category === "All" && !q && filtered.length > 0;
  const [featured, ...rest] = showFeatured ? filtered : [null, ...filtered];

  return (
    <div className="bg-[#fcfcfd] text-zinc-900 min-h-screen">
      <MovingTextBg text="BLOG" textColor="text-gray-400" isFixed={true}>
        <div className="max-w-6xl mx-auto pt-28 pb-24 px-4 sm:px-6">
          {/* Header */}
          <header className="max-w-2xl mb-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600 mb-3">NJ Tech Studio Blog</p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05]">
              Notes from the <span className="text-indigo-600">studio</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-zinc-600 leading-relaxed">
              Engineering write-ups, product launches and what we learn while building for our clients.
            </p>
          </header>

          {isOffline ? (
            <div className="py-12">
              <BackendStatusCard
                title="Blog Articles Offline"
                resourceName="blog posts feed"
                theme="light"
              />
            </div>
          ) : (
            <>
              {/* Filters */}
              {posts.length > 0 && (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
                  <div className="flex flex-wrap gap-2">
                    {categories.map((c) => (
                      <button
                        key={c}
                        onClick={() => setCategory(c)}
                        className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors cursor-pointer ${
                          category === c ? "bg-zinc-900 text-white border-zinc-900" : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-400"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                  <label className="relative sm:w-64">
                    <span className="sr-only">Search articles</span>
                    <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="search"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search articles..."
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-zinc-200 rounded-full text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"
                    />
                  </label>
                </div>
              )}

              {filtered.length === 0 ? (
                <div className="text-center py-20 bg-white border border-zinc-200 rounded-3xl">
                  <FileText className="w-12 h-12 text-zinc-300 mx-auto mb-3" />
                  <p className="text-zinc-500 text-sm font-medium">{posts.length ? "No articles match your search." : "No articles published yet."}</p>
                </div>
              ) : (
                <>
                  {/* Featured */}
                  {featured && (
                    <Link href={`/blog/${featured.id}`} className="group grid md:grid-cols-2 gap-6 md:gap-10 items-center bg-white border border-zinc-200 rounded-3xl p-4 sm:p-5 mb-12 hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] transition-shadow">
                      <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-zinc-100">
                        <Cover post={featured} />
                      </div>
                      <div className="space-y-4 p-2 md:pr-6">
                        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400">Latest article</p>
                        <Meta post={featured} />
                        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight group-hover:text-indigo-600 transition-colors">{featured.title}</h2>
                        <p className="text-zinc-600 leading-relaxed line-clamp-3">{plainText(featured.content)}</p>
                        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600">
                          Read article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </Link>
                  )}

                  {/* Grid */}
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {rest.map((post, i) => (
                      <motion.div key={post.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: Math.min(i, 6) * 0.05 }}>
                        <Link href={`/blog/${post.id}`} className="group h-full flex flex-col bg-white border border-zinc-200 rounded-3xl overflow-hidden hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] transition-shadow">
                          <div className="aspect-[16/10] overflow-hidden bg-zinc-100">
                            <Cover post={post} />
                          </div>
                          <div className="flex-1 flex flex-col p-5 sm:p-6 space-y-3">
                            <Meta post={post} />
                            <h3 className="text-lg font-bold leading-snug tracking-tight group-hover:text-indigo-600 transition-colors">{post.title}</h3>
                            <p className="text-sm text-zinc-600 leading-relaxed line-clamp-3 flex-1">{plainText(post.content)}</p>
                            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 pt-1">
                              Read more <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </MovingTextBg>
    </div>
  );
}
