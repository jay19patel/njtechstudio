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

// Anonymous per-browser identity
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
  const [visibleCount, setVisibleCount] = useState(3);
  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState({});
  const [expandedComments, setExpandedComments] = useState({});
  const [expandedText, setExpandedText] = useState({});
  const [commentInputs, setCommentInputs] = useState({});
  const [visitorId, setVisitorId] = useState("");

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
            const savedLike = localStorage.getItem(`channel_like_${post.id}`);
            const baseLikes = post.likesCount || Math.floor(Math.random() * 18) + 12;
            if (savedLike) {
              localLikes[post.id] = JSON.parse(savedLike);
            } else {
              localLikes[post.id] = { count: baseLikes, liked: false };
            }

            const savedComments = localStorage.getItem(`channel_comments_${post.id}`);
            if (savedComments) {
              localComments[post.id] = JSON.parse(savedComments);
            } else {
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

    setCommentInputs((prev) => ({ ...prev, [postId]: "" }));

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
    <div className="bg-[#fcfcfd] text-zinc-900 min-h-screen relative">
      <MovingTextBg text="UPDATES" textColor="text-gray-400" isFixed={true}>
        
        {/* Main Feed Container */}
        <div className="max-w-xl mx-auto pt-28 pb-20 px-4">
          
          {/* Channel Header Profile Summary */}
          <div className="bg-white border border-zinc-200 rounded-3xl p-8 mb-8 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-indigo-500" />
            
            <div className="w-20 h-20 rounded-full border border-zinc-200 bg-zinc-50 flex items-center justify-center mx-auto mb-4 shadow-sm">
              <span className="text-zinc-900 font-bold text-2xl tracking-tighter">
                NJ
              </span>
            </div>
            
            <h1 className="text-2xl font-bold text-zinc-900 flex items-center justify-center gap-2 leading-tight">
              <span>NJ Tech Studio</span>
              <CheckCircle2 className="w-5 h-5 text-indigo-500 fill-indigo-50" />
            </h1>
            
            <div className="mt-2">
              <span className="px-3 py-1 bg-zinc-100 border border-zinc-200 text-zinc-600 text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm inline-block">
                Technology & Design Studio
              </span>
            </div>
            
            <p className="text-sm text-zinc-500 mt-4 max-w-sm mx-auto leading-relaxed">
              Sharing our latest engineering updates, live workshops, open-source releases, and behind-the-scenes logs in real time.
            </p>
          </div>

          {/* Feed Content */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <RefreshCw className="w-6 h-6 text-indigo-500 animate-spin" />
              <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Loading updates...</p>
            </div>
          ) : visiblePosts.length === 0 ? (
            <div className="text-center py-20 bg-white border border-zinc-200 rounded-3xl shadow-sm">
              <MessageSquare className="w-12 h-12 text-zinc-300 mx-auto mb-3" />
              <p className="text-zinc-500 text-sm font-medium">No announcements posted yet.</p>
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
                    className="bg-white border border-zinc-200 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] transition-all duration-300 flex flex-col overflow-hidden"
                  >
                    {/* Header */}
                    <div className="p-5 flex items-center justify-between border-b border-zinc-100 bg-white">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-full border border-zinc-200 bg-zinc-50 flex items-center justify-center shrink-0">
                          <span className="text-zinc-900 font-bold text-sm tracking-tighter">
                            NJ
                          </span>
                        </div>
                        
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-semibold text-[15px] text-zinc-900 leading-none">
                              NJ Tech Studio
                            </span>
                            <CheckCircle2 className="w-4 h-4 text-indigo-500 fill-indigo-50 shrink-0" />
                          </div>
                          
                          <div className="flex items-center gap-1.5 mt-1.5 text-[11px] text-zinc-400 font-medium leading-none">
                            <span>{getRelativeTimeString(post.date)}</span>
                            <span>•</span>
                            <span className="text-zinc-500 uppercase tracking-widest font-semibold text-[9px]">
                              {post.category || "Update"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <button className="text-zinc-400 hover:text-zinc-600 w-8 h-8 rounded-full hover:bg-zinc-100 flex items-center justify-center transition-colors">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Content Text */}
                    <div className="px-6 pt-5 pb-4 space-y-3">
                      <h2 className="text-lg sm:text-xl font-semibold text-zinc-900 leading-snug tracking-tight">
                        {post.title}
                      </h2>
                      <p className="text-[14px] sm:text-[15px] text-zinc-600 leading-relaxed whitespace-pre-line">
                        {renderedContent}{" "}
                        {shouldTruncate && (
                          <button
                            onClick={() => toggleTextExpansion(post.id)}
                            className="font-medium text-indigo-600 hover:text-indigo-700 hover:underline cursor-pointer focus:outline-none ml-1"
                          >
                            {isTextExpanded ? "show less" : "see more"}
                          </button>
                        )}
                      </p>
                    </div>

                    {/* Image block */}
                    {post.image && (
                      <div className="relative w-full max-h-[440px] bg-zinc-50 border-y border-zinc-100 flex items-center justify-center overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-auto max-h-[440px] object-cover"
                          loading="lazy"
                        />
                      </div>
                    )}

                    {/* Action Bar (Likes and Comments) */}
                    <div className="px-5 py-3 border-t border-zinc-100 flex items-center justify-between bg-zinc-50/50">
                      <div className="flex items-center gap-3">
                        <motion.button
                          whileTap={{ scale: 1.05 }}
                          onClick={() => handleLike(post.id)}
                          className={`flex items-center gap-1.5 py-2 px-3 rounded-full transition-all font-medium text-sm cursor-pointer ${
                            postLikes.liked ? "bg-red-50 text-red-600" : "bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-100"
                          }`}
                        >
                          <Heart className={`w-4 h-4 transition-colors ${postLikes.liked ? "fill-red-600" : ""}`} />
                          <span>{postLikes.count}</span>
                        </motion.button>

                        <button
                          onClick={() => toggleComments(post.id)}
                          className="flex items-center gap-1.5 py-2 px-3 rounded-full bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-100 transition-all font-medium text-sm cursor-pointer"
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
                          className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-white bg-zinc-900 py-2 px-4 rounded-full hover:bg-black transition-all shrink-0 shadow-sm"
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
                          className="border-t border-zinc-100 bg-zinc-50 overflow-hidden"
                        >
                          <div className="p-5 space-y-5">
                            
                            {/* Comments List */}
                            {postComments.length > 0 && (
                              <div
                                ref={(el) => (commentsContainerRefs.current[post.id] = el)}
                                className="space-y-4 max-h-64 overflow-y-auto pr-2 no-scrollbar scroll-smooth"
                              >
                                {postComments.map((cmt) => (
                                  <div key={cmt.id} className="flex gap-3 items-start">
                                    <div className="shrink-0 rounded-full border border-zinc-200 overflow-hidden bg-white">
                                      <Avatar size={36} name={cmt.author} variant="beam" colors={AVATAR_COLORS} />
                                    </div>
                                    <div className="flex-1 bg-white border border-zinc-200 rounded-2xl p-3.5 shadow-sm text-sm">
                                      <div className="flex justify-between items-start mb-1">
                                        <div>
                                          <span className="font-semibold text-zinc-900 block leading-tight">
                                            {cmt.author}
                                          </span>
                                          {cmt.headline && (
                                            <span className="text-[11px] text-zinc-500 block mt-0.5 leading-none">
                                              {cmt.headline}
                                            </span>
                                          )}
                                        </div>
                                        <span className="text-[11px] text-zinc-400 shrink-0">
                                          {getRelativeTimeString(cmt.date)}
                                        </span>
                                      </div>
                                      <p className="text-zinc-600 leading-relaxed mt-2 whitespace-pre-wrap">
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
                              className="space-y-3 mt-2 pt-4 border-t border-zinc-200/60"
                            >
                              <div className="flex items-center gap-2 px-1 text-xs text-zinc-500">
                                <div className="shrink-0 rounded-full border border-zinc-200 overflow-hidden">
                                  <Avatar size={20} name={visitorId} variant="beam" colors={AVATAR_COLORS} />
                                </div>
                                <span>
                                  Commenting as <span className="text-zinc-900 font-semibold">{visitorId}</span>
                                </span>
                              </div>
                              <div className="flex gap-2 items-center relative">
                                <input
                                  type="text"
                                  placeholder="Write a comment..."
                                  value={commentInputs[post.id] || ""}
                                  required
                                  onChange={(e) => setCommentInputs({
                                    ...commentInputs,
                                    [post.id]: e.target.value
                                  })}
                                  className="flex-1 px-4 py-3 bg-white border border-zinc-200 rounded-full text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 text-zinc-900 transition-all pr-12 placeholder:text-zinc-400"
                                />
                                <button
                                  type="submit"
                                  className="absolute right-1.5 p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full transition-colors cursor-pointer shadow-sm"
                                >
                                  <Send className="w-4 h-4" />
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
              <div className="flex items-center gap-2 bg-white border border-zinc-200 py-2.5 px-5 rounded-full shadow-sm">
                <RefreshCw className="w-4 h-4 text-zinc-400 animate-spin" />
                <span className="text-zinc-600 text-xs font-semibold uppercase tracking-wider">Loading more...</span>
              </div>
            </div>
          )}

        </div>
      </MovingTextBg>
    </div>
  );
}
