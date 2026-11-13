"use client";

import { useState, useEffect } from "react";
import { Heart, MessageSquare, Send } from "lucide-react";
import { motion } from "framer-motion";
import Avatar from "boring-avatars";

const AVATAR_COLORS = ["#6366F1", "#8B5CF6", "#EC4899", "#F59E0B", "#10B981"];

const timeAgo = (date) => {
  const min = Math.floor((Date.now() - new Date(date)) / 60000);
  if (min < 1) return "Just now";
  if (min < 60) return `${min}m ago`;
  if (min < 1440) return `${Math.floor(min / 60)}h ago`;
  if (min < 10080) return `${Math.floor(min / 1440)}d ago`;
  return new Date(date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
};

export default function Engagement({ postId }) {
  const [data, setData] = useState(null);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/blog/${postId}`).then((r) => r.json()).then(setData).catch(() => {});
  }, [postId]);

  const send = async (payload) => {
    const res = await fetch(`/api/blog/${postId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || "Something went wrong");
    setData(json);
  };

  const toggleLike = () => {
    // optimistic: flip immediately, server response corrects it
    setData((d) => ({ ...d, liked: !d.liked, likes: d.likes + (d.liked ? -1 : 1) }));
    send({ action: "like" }).catch(() => fetch(`/api/blog/${postId}`).then((r) => r.json()).then(setData));
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!text.trim() || sending) return;
    setSending(true);
    setError("");
    try {
      await send({ action: "comment", text });
      setText("");
    } catch (err) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  };

  if (!data) return <div className="h-24 mt-12" />;

  return (
    <section className="mt-12 pt-8 border-t border-zinc-200" aria-label="Likes and comments">
      <div className="flex items-center gap-3">
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={toggleLike}
          aria-pressed={data.liked}
          className={`flex items-center gap-2 py-2.5 px-5 rounded-full font-medium text-sm border transition-colors cursor-pointer ${
            data.liked ? "bg-red-50 border-red-200 text-red-600" : "bg-white border-zinc-200 text-zinc-600 hover:border-zinc-400"
          }`}
        >
          <Heart className={`w-4 h-4 ${data.liked ? "fill-red-600" : ""}`} />
          {data.likes} {data.likes === 1 ? "like" : "likes"}
        </motion.button>
        <span className="flex items-center gap-2 py-2.5 px-5 rounded-full text-sm text-zinc-600 bg-white border border-zinc-200">
          <MessageSquare className="w-4 h-4" />
          {data.comments.length} {data.comments.length === 1 ? "comment" : "comments"}
        </span>
      </div>

      <h2 className="text-2xl font-bold tracking-tight mt-12 mb-6">Discussion</h2>

      <form onSubmit={submit} className="bg-white border border-zinc-200 rounded-2xl p-4 sm:p-5 mb-8">
        <div className="flex items-center gap-2 mb-3 text-xs text-zinc-500">
          <span className="rounded-full overflow-hidden border border-zinc-200">
            <Avatar size={22} name={data.me} variant="beam" colors={AVATAR_COLORS} />
          </span>
          Commenting as <span className="text-zinc-900 font-semibold">{data.me}</span>
        </div>
        <label htmlFor="comment" className="sr-only">Write a comment</label>
        <textarea
          id="comment"
          rows={3}
          maxLength={1000}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Share your thoughts or ask a question..."
          className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 resize-y"
        />
        <div className="flex items-center justify-between gap-3 mt-3">
          <p className="text-xs text-red-600" role="alert">{error}</p>
          <button
            type="submit"
            disabled={!text.trim() || sending}
            className="flex items-center gap-1.5 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-full transition-colors cursor-pointer"
          >
            <Send className="w-4 h-4" /> {sending ? "Posting..." : "Post comment"}
          </button>
        </div>
      </form>

      {data.comments.length === 0 ? (
        <p className="text-sm text-zinc-500 text-center py-6">No comments yet. Be the first to share your thoughts.</p>
      ) : (
        <ul className="space-y-4">
          {[...data.comments].reverse().map((c) => (
            <li key={c.id} className="flex gap-3 items-start">
              <span className="shrink-0 rounded-full overflow-hidden border border-zinc-200">
                <Avatar size={38} name={c.author} variant="beam" colors={AVATAR_COLORS} />
              </span>
              <div className="flex-1 min-w-0 bg-white border border-zinc-200 rounded-2xl px-4 py-3">
                <div className="flex items-center justify-between gap-2 text-sm">
                  <span className="font-semibold text-zinc-900">
                    {c.author}
                    {c.author === data.me && <span className="ml-2 text-[10px] font-bold uppercase tracking-wider text-indigo-600">You</span>}
                  </span>
                  <time dateTime={c.date} className="text-xs text-zinc-400 shrink-0">{timeAgo(c.date)}</time>
                </div>
                <p className="mt-1.5 text-sm text-zinc-700 leading-relaxed whitespace-pre-wrap break-words">{c.text}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
