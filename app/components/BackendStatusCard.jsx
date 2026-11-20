"use client";

import { useState } from "react";
import { WifiOff, RefreshCw, Server, AlertCircle } from "lucide-react";

/**
 * High-tech, interactive live status card displayed when backend service
 * is offline or unreachable. Allows user to retry live connection.
 */
export default function BackendStatusCard({
  title = "Content Temporarily Unavailable",
  resourceName = "live content",
  onRetry,
  className = "",
  theme = "dark",
}) {
  const [retrying, setRetrying] = useState(false);

  const handleRetry = async () => {
    if (!onRetry || retrying) return;
    setRetrying(true);
    try {
      await onRetry();
    } finally {
      setTimeout(() => setRetrying(false), 500);
    }
  };

  const isDark = theme === "dark";

  return (
    <div
      className={`relative w-full max-w-xl mx-auto rounded-2xl p-6 sm:p-8 text-center border transition-all ${
        isDark
          ? "bg-zinc-950/80 border-zinc-800 text-zinc-100 shadow-xl shadow-black/40"
          : "bg-white/90 border-zinc-200 text-zinc-900 shadow-lg shadow-zinc-200/50"
      } ${className}`}
    >
      {/* Pulsing Signal Icon */}
      <div className="relative w-14 h-14 mx-auto mb-4 flex items-center justify-center">
        <span
          className={`absolute inset-0 rounded-full animate-ping opacity-30 ${
            isDark ? "bg-amber-500/40" : "bg-amber-500/30"
          }`}
        />
        <div
          className={`relative w-12 h-12 rounded-xl flex items-center justify-center border text-amber-500 ${
            isDark
              ? "bg-zinc-900 border-zinc-800"
              : "bg-amber-50 border-amber-200"
          }`}
        >
          <WifiOff className="w-5 h-5" />
        </div>
      </div>

      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-amber-500/10 text-amber-500 border border-amber-500/20 mb-3">
        <Server className="w-3 h-3" />
        <span>Feed Temporarily Unavailable</span>
      </div>

      <h3 className="text-base sm:text-lg font-bold tracking-tight">
        {title}
      </h3>
      <p className={`text-xs sm:text-sm mt-1.5 max-w-md mx-auto leading-relaxed ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
        Unable to load <strong className={isDark ? "text-zinc-200" : "text-zinc-900"}>{resourceName}</strong> at the moment. Our systems are synchronizing live updates.
      </p>

      {onRetry && (
        <div className="mt-5 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={handleRetry}
            disabled={retrying}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-md shadow-indigo-600/30 active:scale-95 disabled:opacity-60 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${retrying ? "animate-spin" : ""}`} />
            <span>{retrying ? "Checking..." : "Retry Connection"}</span>
          </button>
        </div>
      )}
    </div>
  );
}
