"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Check, Copy } from "lucide-react";

function CodeBlock({ language, code }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="not-prose my-8 rounded-2xl overflow-hidden border border-zinc-800 bg-[#1e1e1e] shadow-sm">
      <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800 text-xs text-zinc-400">
        <span className="font-mono uppercase tracking-wider">{language || "code"}</span>
        <button type="button" onClick={copy} className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
          {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <SyntaxHighlighter
        language={language || "text"}
        style={vscDarkPlus}
        customStyle={{ margin: 0, padding: "1.25rem", background: "#1e1e1e", fontSize: "13.5px", lineHeight: "1.7" }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}

// youtube.com/watch?v=ID, youtu.be/ID, youtube.com/shorts/ID, youtube.com/embed/ID
const YOUTUBE = /^https?:\/\/(?:www\.|m\.)?(?:youtube\.com\/(?:watch\?(?:.*&)?v=|(shorts|embed)\/)|youtu\.be\/)([\w-]{11})/;

function YouTube({ id, short, title }) {
  return (
    <div className={`not-prose my-10 ${short ? "max-w-[340px] mx-auto" : ""}`}>
      <div className={`relative overflow-hidden rounded-2xl border border-zinc-200 bg-black shadow-sm ${short ? "aspect-[9/16]" : "aspect-video"}`}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}`}
          title={title || "YouTube video"}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
    </div>
  );
}

const components = {
  h2: (p) => <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 mt-14 mb-4 scroll-mt-28" {...p} />,
  h3: (p) => <h3 className="text-xl font-bold tracking-tight text-zinc-900 mt-10 mb-3" {...p} />,
  // an image alone in a paragraph renders a <figure>, which can't sit inside <p>
  p: ({ node, children }) => {
    // a YouTube link alone on its line becomes an embedded player
    const only = node.children.length === 1 && node.children[0];
    const yt = only?.tagName === "a" && YOUTUBE.exec(only.properties.href);
    if (yt) return <YouTube id={yt[2]} short={yt[1] === "shorts"} title={only.children[0]?.value} />;
    return node.children.some((c) => c.tagName === "img") ? <>{children}</> : <p className="my-5">{children}</p>;
  },
  a: (p) => <a className="text-indigo-600 font-medium underline underline-offset-4 decoration-indigo-200 hover:decoration-indigo-600" target={p.href?.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" {...p} />,
  ul: (p) => <ul className="my-5 pl-6 list-disc space-y-2 marker:text-indigo-500" {...p} />,
  ol: (p) => <ol className="my-5 pl-6 list-decimal space-y-2 marker:text-indigo-500 marker:font-semibold" {...p} />,
  strong: (p) => <strong className="font-semibold text-zinc-900" {...p} />,
  blockquote: (p) => <blockquote className="my-8 border-l-4 border-indigo-500 bg-indigo-50/60 rounded-r-2xl px-6 py-1 text-zinc-700 italic" {...p} />,
  hr: () => <hr className="my-12 border-zinc-200" />,
  img: ({ src, alt }) => (
    <figure className="my-10">
      <img src={src} alt={alt || ""} loading="lazy" className="w-full rounded-2xl border border-zinc-200" />
      {alt && <figcaption className="mt-3 text-center text-sm text-zinc-500">{alt}</figcaption>}
    </figure>
  ),
  table: (p) => (
    <div className="my-8 overflow-x-auto rounded-2xl border border-zinc-200 bg-white">
      <table className="w-full text-sm text-left" {...p} />
    </div>
  ),
  th: (p) => <th className="px-4 py-3 bg-zinc-50 font-semibold text-zinc-900 border-b border-zinc-200" {...p} />,
  td: (p) => <td className="px-4 py-3 border-b border-zinc-100" {...p} />,
  pre: ({ children }) => children,
  code: ({ className, children }) => {
    const match = /language-(\w+)/.exec(className || "");
    const code = String(children).replace(/\n$/, "");
    if (match || code.includes("\n")) return <CodeBlock language={match?.[1]} code={code} />;
    return <code className="px-1.5 py-0.5 rounded-md bg-zinc-100 border border-zinc-200 text-[0.9em] font-mono text-pink-600">{children}</code>;
  },
};

export default function Markdown({ children }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {children}
    </ReactMarkdown>
  );
}
