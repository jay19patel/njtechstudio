"use client";

import { useState, useEffect, useRef } from "react";
import { 
  Heart, MessageSquare, ExternalLink, RefreshCw, 
  CheckCircle2, Send, MoreHorizontal, Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Avatar from "boring-avatars";
import MovingTextBg from "../components/MovingTextBg";

const AVATAR_COLORS = ["#6366F1", "#8B5CF6", "#EC4899", "#F59E0B", "#10B981"];
const VISITOR_ID_KEY = "channel_visitor_id";

// Anonymous per-browser identity — avoids relying on users to type a real name/designation
const getOrCreateVisitorId = () => {
  let id = localStorage.getItem(VISITOR_ID_KEY);
  if (!id) {
    const random =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID().replace(/-/g, "").slice(0, 6)
        : Math.random().toString(36).slice(2, 8);
    id = `Guest-${random.toUpperCase()}`;
    localStorage.setItem(VISITOR_ID_KEY, id);
  }
  return id;
};

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
  const [visitorId, setVisitorId] = useState("");

  // Auto-scroll Refs
  const commentsContainerRefs = useRef({});
  const commentsEndRefs = useRef({});

  useEffect(() => {
    setVisitorId(getOrCreateVisitorId());
  }, []);

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

    if (!text.trim()) return;

    // Ensure comments section is open
    setExpandedComments((prev) => ({ ...prev, [postId]: true }));

    setComments((prev) => {
      const currentList = prev[postId] || [];
      const newComment = {
        id: `c_${Date.now()}`,
        author: visitorId,
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

    // Clear input
    setCommentInputs((prev) => ({ ...prev, [postId]: "" }));

    // Scroll to newest comment
    setTimeout(() => {
      const container = commentsContainerRefs.current[postId];
      if (container) {
        container.scrollTo({
          top: container.scrollHeight,
          behavior: "smooth",
        });
      }
      const endEl = commentsEndRefs.current[postId];
      if (endEl) {
        endEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }, 100);
  };

  const toggleComments = (postId) => {
    setExpandedComments((prev) => {
      const isOpening = !prev[postId];
      if (isOpening) {
        setTimeout(() => {
          const container = commentsContainerRefs.current[postId];
          if (container) {
            container.scrollTo({
              top: container.scrollHeight,
              behavior: "smooth",
            });
          }
          const endEl = commentsEndRefs.current[postId];
          if (endEl) {
            endEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
          }
        }, 200);
      }
      return {
        ...prev,
        [postId]: isOpening,
      };
    });
  };

  const toggleTextExpansion = (postId) => {
    setExpandedText((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
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
          <div className="bg-white border-2 border-zinc-900 p-6 mb-8 text-center shadow-md relative overflow-hidden group">
            {/* Design accents */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-indigo-900" />
            
            <div className="w-16 h-16 border-2 border-indigo-900 bg-zinc-950 flex items-center justify-center mx-auto mb-3 shadow-md">
              <span className="text-white font-black text-xl tracking-tighter" style={{ fontFamily: "'Jersey 10', sans-serif" }}>
                NJ
              </span>
            </div>
            
            <h1 className="text-2xl font-black text-slate-950 flex items-center justify-center gap-1.5 leading-tight">
              <span>NJ Tech Studio Channel</span>
              <CheckCircle2 className="w-5 h-5 text-blue-500 fill-blue-500 shrink-0" />
            </h1>
            
            <p className="text-xs text-indigo-900 font-mono font-bold uppercase tracking-widest mt-1 flex items-center justify-center gap-1">
              <span>// TECHNOLOGY & DESIGN STUDIO</span>
            </p>
            
            <p className="text-xs text-slate-600 mt-3 max-w-sm mx-auto leading-relaxed font-medium">
              Sharing our latest engineering updates, live workshops, open-source releases, and behind-the-scenes logs in real time.
            </p>
          </div>

          {/* Feed Content */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <RefreshCw className="w-6 h-6 text-indigo-800 animate-spin" />
              <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Loading updates...</p>
            </div>
          ) : visiblePosts.length === 0 ? (
            <div className="text-center py-20 bg-white border-2 border-zinc-300 shadow-sm">
              <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500 text-sm font-semibold">No announcements posted yet.</p>
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
                    className="bg-white border-2 border-zinc-200 hover:border-indigo-900 shadow-md transition-colors duration-300 flex flex-col"
                  >
                    {/* Header */}
                    <div className="p-4 flex items-center justify-between border-b border-slate-200 bg-white">
                      <div className="flex items-center gap-3">
                        {/* Custom Studio Avatar Ring */}
                        <div className="w-10 h-10 border border-indigo-900 bg-zinc-950 flex items-center justify-center shrink-0">
                          <span className="text-white font-black text-sm tracking-tighter" style={{ fontFamily: "'Jersey 10', sans-serif" }}>
                            NJ
                          </span>
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
                            <span className="px-2 py-0.5 bg-indigo-950 border border-indigo-800 text-white text-[9px] font-bold uppercase tracking-wider">
                              {post.category || "Update"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <button className="text-slate-400 hover:text-slate-600 p-1.5 hover:bg-slate-100 transition-colors">
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
                            className="font-bold text-indigo-800 hover:underline cursor-pointer focus:outline-none ml-1"
                          >
                            {isTextExpanded ? "show less" : "see more"}
                          </button>
                        )}
                      </p>
                    </div>

                    {/* Image block */}
                    {post.image && (
                      <div className="relative w-full max-h-[440px] bg-slate-100 border-y border-slate-200 flex items-center justify-center overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-auto max-h-[440px] object-cover"
                          loading="lazy"
                        />
                      </div>
                    )}

                    {/* Action Bar (Likes and Comments) */}
                    <div className="px-4 py-2.5 border-t border-slate-200 flex items-center justify-between bg-slate-50">
                      <div className="flex items-center gap-2">
                        {/* Like pop trigger */}
                        <motion.button
                          whileTap={{ scale: 1.1 }}
                          onClick={() => handleLike(post.id)}
                          className={`flex items-center gap-1.5 py-1.5 px-3 border border-gray-300 bg-white hover:border-indigo-900 transition-all font-bold text-xs cursor-pointer ${
                            postLikes.liked ? "text-rose-600 border-rose-400" : "text-slate-700"
                          }`}
                        >
                          <Heart className={`w-4 h-4 transition-colors ${postLikes.liked ? "fill-rose-600" : ""}`} />
                          <span>{postLikes.count}</span>
                        </motion.button>

                        <button
                          onClick={() => toggleComments(post.id)}
                          className="flex items-center gap-1.5 py-1.5 px-3 border border-gray-300 bg-white text-slate-700 hover:border-indigo-900 transition-all font-bold text-xs cursor-pointer"
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
                          className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white bg-indigo-900 border border-indigo-950 py-1.5 px-3.5 hover:bg-indigo-800 transition-all shrink-0 shadow-xs"
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
                          className="border-t border-slate-200 bg-slate-50 overflow-hidden"
                        >
                          <div className="p-4 sm:p-5 space-y-4">
                            
                            {/* Comments List */}
                            {postComments.length > 0 && (
                              <div
                                ref={(el) => (commentsContainerRefs.current[post.id] = el)}
                                className="space-y-3.5 max-h-64 overflow-y-auto pr-1 no-scrollbar scroll-smooth"
                              >
                                {postComments.map((cmt) => (
                                  <div key={cmt.id} className="flex gap-2.5 items-start">
                                    {/* Generated avatar */}
                                    <div className="shrink-0 border border-slate-300 overflow-hidden">
                                      <Avatar size={32} name={cmt.author} variant="beam" colors={AVATAR_COLORS} />
                                    </div>
                                    {/* comment bubble */}
                                    <div className="flex-1 bg-white border border-slate-200 p-3 text-xs">
                                      <div className="flex justify-between items-start mb-0.5">
                                        <div>
                                          <span className="font-extrabold text-slate-900 block leading-tight">
                                            {cmt.author}
                                          </span>
                                          {cmt.headline && (
                                            <span className="text-[10px] text-slate-500 block mt-0.5 leading-none font-medium">
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
                                <div ref={(el) => (commentsEndRefs.current[post.id] = el)} />
                              </div>
                            )}

                            {/* Add Comment Form */}
                            <form
                              onSubmit={(e) => handleAddComment(e, post.id)}
                              className="space-y-2 mt-2 pt-2 border-t border-slate-200"
                            >
                              <div className="flex items-center gap-1.5 px-0.5 text-[10px] text-slate-500 font-semibold">
                                <div className="shrink-0 border border-slate-300 overflow-hidden">
                                  <Avatar size={18} name={visitorId} variant="beam" colors={AVATAR_COLORS} />
                                </div>
                                <span>
                                  Commenting as <span className="text-slate-900 font-bold">{visitorId}</span>
                                </span>
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
                                  className="flex-1 px-3 py-2 bg-white border border-slate-300 text-xs outline-none focus:border-indigo-900 text-slate-900 font-medium"
                                />
                                <button
                                  type="submit"
                                  className="p-2.5 bg-indigo-900 hover:bg-indigo-800 text-white transition-colors border border-indigo-950 shrink-0 cursor-pointer shadow-xs"
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
              <div className="flex items-center gap-2 bg-white border border-gray-300 py-2 px-4 shadow-xs">
                <RefreshCw className="w-3.5 h-3.5 text-indigo-900 animate-spin" />
                <span className="text-slate-600 text-xs font-bold uppercase tracking-wider">Loading more updates...</span>
              </div>
            </div>
          )}

        </div>
      </MovingTextBg>
    </div>
  );
}
