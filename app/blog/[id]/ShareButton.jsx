"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";

export default function ShareButton({ title }) {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title, url }).catch(() => {});
      return;
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button onClick={share} className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-600 border border-zinc-200 bg-white rounded-full py-2 px-4 hover:border-zinc-400 transition-colors cursor-pointer">
      {copied ? <Check className="w-4 h-4 text-green-600" /> : <Share2 className="w-4 h-4" />}
      {copied ? "Link copied" : "Share"}
    </button>
  );
}
