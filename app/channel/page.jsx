"use client";

import { useState, useEffect } from "react";
import { 
  Heart, MessageSquare, ExternalLink, RefreshCw, 
  CheckCircle2, Send, MoreHorizontal, User, Sparkles 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import MovingTextBg from "../components/MovingTextBg";

export default function ChannelPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Infinite Scroll Count
  const [visibleCount, setVisibleCount] = useState(3);
  
  // Social States
  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState({});
  
  // UI states
  const [expandedComments, setExpandedComments] = useState({});
  const [expandedText, setExpandedText] = useState({});
  const [commentInputs, setCommentInputs] = useState({});
  const [headlineInputs, setHeadlineInputs] = useState({});
  const [authorInputs, setAuthorInputs] = useState({});

  useEffect(() => {
    fetch("/api/admin/data?type=channel")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const sorted = [...data].sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          );
          setPosts(sorted);

          const localLikes = {};
          const localComments = {};

          sorted.forEach((post) => {
            // Load Likes
            const savedLike = localStorage.getItem(`channel_like_${post.id}`);
            const baseLikes = post.likesCount || Math.floor(Math.random() * 18) + 12;
            if (savedLike) {
              localLikes[post.id] = JSON.parse(savedLike);
            } else {
              localLikes[post.id] = { count: baseLikes, liked: false };
            }

            // Load Comments
            const savedComments = localStorage.getItem(`channel_comments_${post.id}`);
            if (savedComments) {
              localComments[post.id] = JSON.parse(savedComments);
            } else {
              // Prepopulate with realistic LinkedIn-style professional comments
              localComments[post.id] = [
                {
                  id: "c1",
                  author: "Jay Patel",
                  headline: "Founder, NJ Tech Studio",
                  text: "Welcome to our live channel! We will be using this space to share real-time project updates, beta releases, and our team's engineering insights.",
                  date: new Date(new Date(post.date).getTime() + 20 * 60000).toISOString(),
                },
                {
                  id: "c2",
                  author: "Karan Shah",
                  headline: "Senior Frontend Architect",
                  text: "The performance and fluid transitions here are top-tier. Looking forward to sharing our upcoming tech stacks!",
                  date: new Date(new Date(post.date).getTime() + 95 * 60000).toISOString(),
                }
              ];
            }
          });

          setLikes(localLikes);
          setComments(localComments);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading channel updates:", err);
        setLoading(false);
      });
  }, []);

  // Infinite Scroll Trigger
  useEffect(() => {
    if (loading || visibleCount >= posts.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => {
            setVisibleCount((prev) => Math.min(prev + 3, posts.length));
          }, 350);
        }
      },
      { threshold: 0.1, rootMargin: "120px" }
    );

    const triggerEl = document.getElementById("infinite-scroll-trigger");
    if (triggerEl) observer.observe(triggerEl);

    return () => {
      if (triggerEl) observer.unobserve(triggerEl);
    };
  }, [loading, visibleCount, posts.length]);

  const handleLike = (postId) => {
    setLikes((prev) => {
      const current = prev[postId] || { count: 0, liked: false };
      const updated = {
        liked: !current.liked,
        count: current.liked ? current.count - 1 : current.count + 1,
      };
      localStorage.setItem(`channel_like_${postId}`, JSON.stringify(updated));
      return {
        ...prev,
        [postId]: updated,
      };
    });
  };

  const handleAddComment = (e, postId) => {
    e.preventDefault();
    const text = commentInputs[postId] || "";
    const author = authorInputs[postId] || "";
    const headline = headlineInputs[postId] || "";
    
    if (!text.trim()) return;

    const authorName = author.trim() || "Anonymous Contributor";
    const authorHeadline = headline.trim() || "Tech Enthusiast";

    setComments((prev) => {
      const currentList = prev[postId] || [];
      const newComment = {
        id: `c_${Date.now()}`,
        author: authorName,
        headline: authorHeadline,
        text: text.trim(),
        date: new Date().toISOString(),
      };
      const updatedList = [...currentList, newComment];
      localStorage.setItem(`channel_comments_${postId}`, JSON.stringify(updatedList));
      return {
        ...prev,
        [postId]: updatedList,
      };
    });

    // Clear inputs
    setCommentInputs((prev) => ({ ...prev, [postId]: "" }));
    setAuthorInputs((prev) => ({ ...prev, [postId]: "" }));
    setHeadlineInputs((prev) => ({ ...prev, [postId]: "" }));
  };

  const toggleComments = (postId) => {
    setExpandedComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const toggleTextExpansion = (postId) => {
    setExpandedText((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  // Helper to extract initials
  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  // Helper for human-readable relative time
  const getRelativeTimeString = (dateStr) => {
    try {
      const postDate = new Date(dateStr);
      const now = new Date();
      const diffMs = now - postDate;
      const diffSec = Math.floor(diffMs / 1000);
      const diffMin = Math.floor(diffSec / 60);
      const diffHrs = Math.floor(diffMin / 60);
      const diffDays = Math.floor(diffHrs / 24);

      if (diffSec < 60) return "Just now";
      if (diffMin < 60) return `${diffMin}m ago`;
      if (diffHrs < 24) return `${diffHrs}h ago`;
      if (diffDays === 1) return "Yesterday";
      if (diffDays < 7) return `${diffDays}d ago`;

      return postDate.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
      });
    } catch {
      return "";
    }
  };

  const visiblePosts = posts.slice(0, visibleCount);

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen relative">
      <MovingTextBg text="NJTECHSTUDIO" textColor="text-gray-400" isFixed={true}>
        
        {/* Main Feed Container */}
        <div className="max-w-xl mx-auto pt-28 pb-20 px-4">
          
          {/* Channel Header Profile Summary */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-8 text-center shadow-xs relative overflow-hidden group">
            {/* Design accents */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-500 via-indigo-650 to-purple-650" />
            
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-650 to-purple-650 p-[3px] mx-auto mb-3 shadow-md">
              <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                <span className="text-indigo-650 font-black text-lg tracking-tighter" style={{ fontFamily: "'Jersey 10', sans-serif" }}>
                  NJ
                </span>
              </div>
            </div>
            
            <h1 className="text-2xl font-black text-slate-950 flex items-center justify-center gap-1.5 leading-tight">
              <span>NJ Tech Studio Channel</span>
              <CheckCircle2 className="w-5 h-5 text-blue-500 fill-blue-500 shrink-0" />
            </h1>
            
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1 flex items-center justify-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Technology & Design Studio</span>
            </p>
            
            <p className="text-xs text-slate-500 mt-3 max-w-sm mx-auto leading-relaxed">
              Sharing our latest engineering updates, live workshops, open-source releases, and behind-the-scenes logs in real time.
            </p>
          </div>

          {/* Feed Content */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <RefreshCw className="w-6 h-6 text-indigo-650 animate-spin" />
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Loading updates...</p>
            </div>
          ) : visiblePosts.length === 0 ? (
            <div className="text-center py-20 bg-white border border-slate-200 rounded-2xl shadow-xs">
              <MessageSquare className="w-12 h-12 text-slate-200 mx-auto mb-3" />
              <p className="text-slate-400 text-sm font-semibold">No announcements posted yet.</p>
            </div>
          ) : (
            <div className="space-y-6">
              
              {visiblePosts.map((post) => {
                const postLikes = likes[post.id] || { count: 0, liked: false };
                const postComments = comments[post.id] || [];
                const isTextExpanded = expandedText[post.id] || false;
                const isCommentExpanded = expandedComments[post.id] || false;

                const shouldTruncate = post.content.length > 280;
                const renderedContent = shouldTruncate && !isTextExpanded 
                  ? post.content.slice(0, 280) + "..." 
                  : post.content;

                return (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden flex flex-col hover:shadow-md transition-shadow duration-300"
                  >
                    {/* Header */}
                    <div className="p-4 flex items-center justify-between border-b border-slate-100 bg-white">
                      <div className="flex items-center gap-3">
                        {/* Custom Studio Avatar Ring */}
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-650 p-[2px] shadow-sm shrink-0">
                          <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                            <span className="text-indigo-650 font-black text-xs tracking-tighter" style={{ fontFamily: "'Jersey 10', sans-serif" }}>
                              NJ
                            </span>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-extrabold text-[14px] sm:text-base text-slate-900 leading-none">
                              NJ Tech Studio
                            </span>
                            <CheckCircle2 className="w-4 h-4 text-blue-500 fill-blue-500 shrink-0" />
                            <span className="text-[10px] text-slate-400">• Author</span>
                          </div>
                          
                          <div className="flex items-center gap-1.5 mt-1 text-[11px] text-slate-400 font-semibold leading-none">
                            <span>{getRelativeTimeString(post.date)}</span>
                            <span>•</span>
                            <span className="px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded text-[9px] font-bold uppercase tracking-wider">
                              {post.category || "Update"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <button className="text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-50 transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Content Text */}
                    <div className="px-5 pt-4 pb-3 space-y-2">
                      <h2 className="text-base sm:text-lg font-bold text-slate-950 leading-snug">
                        {post.title}
                      </h2>
                      <p className="text-[13px] sm:text-[14px] text-slate-700 leading-relaxed whitespace-pre-line">
                        {renderedContent}{" "}
                        {shouldTruncate && (
                          <button
                            onClick={() => toggleTextExpansion(post.id)}
                            className="font-bold text-indigo-650 hover:underline cursor-pointer focus:outline-none ml-1"
                          >
                            {isTextExpanded ? "show less" : "see more"}
                          </button>
                        )}
                      </p>
                    </div>

                    {/* Image block */}
                    {post.image && (
                      <div className="relative w-full max-h-[440px] bg-slate-100 border-y border-slate-100 flex items-center justify-center overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-auto max-h-[440px] object-cover hover:scale-[1.01] transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                    )}

                    {/* Action Bar (Likes and Comments) */}
                    <div className="px-4 py-2 border-t border-slate-100 flex items-center justify-between bg-slate-50/40">
                      <div className="flex items-center gap-2">
                        {/* Like pop trigger */}
                        <motion.button
                          whileTap={{ scale: 1.2 }}
                          onClick={() => handleLike(post.id)}
                          className={`flex items-center gap-1.5 py-1.5 px-3 rounded-lg hover:bg-slate-100/80 transition-all font-bold text-xs cursor-pointer ${
                            postLikes.liked ? "text-rose-600" : "text-slate-500 hover:text-slate-800"
                          }`}
                        >
                          <Heart className={`w-4 h-4 transition-colors ${postLikes.liked ? "fill-rose-600" : ""}`} />
                          <span>{postLikes.count}</span>
                        </motion.button>

                        <button
                          onClick={() => toggleComments(post.id)}
                          className="flex items-center gap-1.5 py-1.5 px-3 rounded-lg hover:bg-slate-100/80 text-slate-500 hover:text-slate-800 transition-all font-bold text-xs cursor-pointer"
                        >
                          <MessageSquare className="w-4 h-4" />
                          <span>{postComments.length}</span>
                        </button>
                      </div>

                      {/* Call to action */}
                      {post.link && (
                        <a
                          href={post.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-xs font-bold text-indigo-650 hover:text-indigo-800 py-1.5 px-3 rounded-lg hover:bg-indigo-50/70 transition-all shrink-0"
                        >
                          <span>{post.linkText || "Explore"}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>

                    {/* Expandable Comments Drawer */}
                    <AnimatePresence>
                      {isCommentExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="border-t border-slate-100 bg-slate-50/50 overflow-hidden"
                        >
                          <div className="p-4 sm:p-5 space-y-4">
                            
                            {/* Comments List */}
                            {postComments.length > 0 && (
                              <div className="space-y-3.5 max-h-64 overflow-y-auto pr-1 no-scrollbar">
                                {postComments.map((cmt) => (
                                  <div key={cmt.id} className="flex gap-2.5 items-start">
                                    {/* User circle initials */}
                                    <div className="w-8 h-8 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center shrink-0 text-[10px] font-bold text-slate-600">
                                      {getInitials(cmt.author)}
                                    </div>
                                    {/* comment bubble */}
                                    <div className="flex-1 bg-white border border-slate-200/80 p-3 rounded-2xl text-xs">
                                      <div className="flex justify-between items-start mb-0.5">
                                        <div>
                                          <span className="font-extrabold text-slate-900 block leading-tight">
                                            {cmt.author}
                                          </span>
                                          {cmt.headline && (
                                            <span className="text-[10px] text-slate-400 block mt-0.5 leading-none font-medium">
                                              {cmt.headline}
                                            </span>
                                          )}
                                        </div>
                                        <span className="text-[10px] text-slate-400 shrink-0">
                                          {getRelativeTimeString(cmt.date)}
                                        </span>
                                      </div>
                                      <p className="text-slate-700 leading-relaxed mt-1.5 whitespace-pre-wrap">
                                        {cmt.text}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Add Comment Form */}
                            <form 
                              onSubmit={(e) => handleAddComment(e, post.id)}
                              className="space-y-2 mt-2 pt-2 border-t border-slate-200/60"
                            >
                              <div className="grid grid-cols-2 gap-2">
                                <input
                                  type="text"
                                  placeholder="Your Name"
                                  value={authorInputs[post.id] || ""}
                                  onChange={(e) => setAuthorInputs({
                                    ...authorInputs,
                                    [post.id]: e.target.value
                                  })}
                                  className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-slate-800 font-medium"
                                  required
                                />
                                <input
                                  type="text"
                                  placeholder="Your Headline (e.g. Developer)"
                                  value={headlineInputs[post.id] || ""}
                                  onChange={(e) => setHeadlineInputs({
                                    ...headlineInputs,
                                    [post.id]: e.target.value
                                  })}
                                  className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-slate-800 font-medium"
                                />
                              </div>
                              <div className="flex gap-2 items-center">
                                <input
                                  type="text"
                                  placeholder="Write a comment..."
                                  value={commentInputs[post.id] || ""}
                                  required
                                  onChange={(e) => setCommentInputs({
                                    ...commentInputs,
                                    [post.id]: e.target.value
                                  })}
                                  className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-slate-800"
                                />
                                <button
                                  type="submit"
                                  className="p-2.5 bg-indigo-650 hover:bg-indigo-600 text-white rounded-lg transition-all shrink-0 cursor-pointer shadow-sm hover:shadow-indigo-650/20"
                                >
                                  <Send className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </form>

                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.article>
                );
              })}

            </div>
          )}

          {/* Loader for Infinite Scroll */}
          {!loading && visibleCount < posts.length && (
            <div id="infinite-scroll-trigger" className="flex items-center justify-center py-8">
              <div className="flex items-center gap-2 bg-white border border-slate-250 py-2 px-4 rounded-full shadow-xxs">
                <RefreshCw className="w-3.5 h-3.5 text-indigo-600 animate-spin" />
                <span className="text-slate-500 text-xs font-semibold">Loading more updates...</span>
              </div>
            </div>
          )}

        </div>
      </MovingTextBg>
    </div>
  );
}
