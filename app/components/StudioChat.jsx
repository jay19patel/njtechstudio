"use client";

import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { AlertCircle, Bot, RotateCcw, X } from "lucide-react";

const FALLBACK_SUGGESTIONS = ["What services do you offer?", "Show me some of your projects", "I want to discuss a new project"];

// Compact Markdown for chat bubbles (the blog's Markdown component is sized for full articles).
const MD = {
  p: (props) => <p className="mb-2 last:mb-0" {...props} />,
  ul: (props) => <ul className="mb-2 last:mb-0 list-disc pl-4 space-y-1" {...props} />,
  ol: (props) => <ol className="mb-2 last:mb-0 list-decimal pl-4 space-y-1" {...props} />,
  h1: (props) => <p className="mb-1.5 font-black text-zinc-900" {...props} />,
  h2: (props) => <p className="mb-1.5 font-black text-zinc-900" {...props} />,
  h3: (props) => <p className="mb-1.5 font-bold text-zinc-900" {...props} />,
  strong: (props) => <strong className="font-bold text-zinc-900" {...props} />,
  a: ({ href, ...props }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline underline-offset-2 hover:text-indigo-700" {...props} />
  ),
  code: (props) => <code className="px-1 py-0.5 rounded bg-zinc-100 text-[11px] font-mono text-zinc-800" {...props} />,
  pre: (props) => <pre className="mb-2 p-2.5 rounded-xl bg-zinc-900 text-zinc-100 text-[11px] overflow-x-auto [&_code]:bg-transparent [&_code]:text-zinc-100" {...props} />,
  table: (props) => (
    <div className="mb-2 overflow-x-auto rounded-xl border border-zinc-200">
      <table className="w-full text-[11px]" {...props} />
    </div>
  ),
  th: (props) => <th className="px-2 py-1.5 text-left bg-zinc-50 font-bold text-zinc-700 border-b border-zinc-200" {...props} />,
  td: (props) => <td className="px-2 py-1.5 border-b border-zinc-100 align-top" {...props} />,
};

function TypingDots({ label }) {
  return (
    <div className="flex items-center gap-2 text-zinc-500" role="status">
      <span className="flex gap-1" aria-hidden="true">
        {[0, 150, 300].map((delay) => (
          <span key={delay} className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: `${delay}ms` }} />
        ))}
      </span>
      <span>{label ? `${label}…` : "Thinking…"}</span>
    </div>
  );
}

function Bubble({ message, activity }) {
  if (message.role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] px-3.5 py-2.5 rounded-2xl rounded-tr-md bg-indigo-600 text-white shadow-md whitespace-pre-wrap break-words">
          {message.text}
        </div>
      </div>
    );
  }
  if (message.error) {
    return (
      <div className="flex justify-start">
        <div className="max-w-[90%] px-3.5 py-2.5 rounded-2xl rounded-tl-md bg-red-50 border border-red-200 text-red-700 flex gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{message.error}</span>
        </div>
      </div>
    );
  }
  return (
    <div className="flex justify-start">
      <div className="max-w-[90%] px-3.5 py-2.5 rounded-2xl rounded-tl-md bg-zinc-50 border border-zinc-200/80 text-zinc-700 shadow-sm break-words">
        {message.pending && !message.text ? (
          <TypingDots label={activity} />
        ) : (
          <>
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={MD}>
              {message.text}
            </ReactMarkdown>
            {message.pending && activity && <div className="mt-2"><TypingDots label={activity} /></div>}
          </>
        )}
      </div>
    </div>
  );
}

export default function StudioChat({ chat, onClose }) {
  const { agent, messages, busy, activity, send, reset } = chat;
  const listRef = useRef(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, activity]);

  const suggestions = agent?.suggestions?.length ? agent.suggestions : FALLBACK_SUGGESTIONS;

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-md">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-black text-zinc-900 uppercase tracking-tight">{agent?.name || "Studio AI Assistant"}</h4>
            <p className="text-[11px] text-zinc-500 font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Online · replies in seconds
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          {messages.length > 0 && (
            <button
              type="button"
              onClick={reset}
              disabled={busy}
              title="Start a new chat"
              aria-label="Start a new chat"
              className="w-7 h-7 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 text-zinc-600 rounded-full flex items-center justify-center transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close assistant"
            className="w-7 h-7 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 text-zinc-600 rounded-full flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Conversation */}
      <div ref={listRef} className="max-h-[min(420px,50vh)] overflow-y-auto space-y-2.5 pr-1 text-xs leading-relaxed font-medium" aria-live="polite">
        {messages.length === 0 ? (
          <div className="px-3.5 py-3 rounded-2xl rounded-tl-md bg-zinc-50 border border-zinc-200/80 text-zinc-700 max-w-[90%]">
            👋 Hi! {agent?.description || "Ask me about our services, projects and articles, or start a project inquiry."}
          </div>
        ) : (
          messages.map((m, i) => <Bubble key={m.id} message={m} activity={i === messages.length - 1 ? activity : null} />)
        )}
      </div>

      {/* Starter prompts */}
      {messages.length === 0 && (
        <div className="flex flex-wrap gap-2 pt-1 border-t border-zinc-100">
          {suggestions.map((text) => (
            <button
              key={text}
              type="button"
              onClick={() => send(text)}
              className="px-3 py-1.5 bg-white hover:bg-zinc-50 border border-zinc-200/80 text-zinc-700 hover:text-zinc-900 rounded-xl text-[11px] font-bold transition-all cursor-pointer shadow-sm"
            >
              {text}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
