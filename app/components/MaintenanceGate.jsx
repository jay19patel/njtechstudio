"use client";

import { useState, useEffect, useCallback } from "react";
import { Wrench, RefreshCw, ShieldAlert, ExternalLink, Clock } from "lucide-react";

/**
 * MaintenanceGate protects all pages:
 * 1. When backend CMS Settings have `maintenance_mode = True`.
 * 2. When backend is completely offline/unreachable (automatic maintenance mode).
 */
export default function MaintenanceGate({ children, initialConfig = null }) {
  const [config, setConfig] = useState(initialConfig);
  const [isBackendDown, setIsBackendDown] = useState(false);
  const [checking, setChecking] = useState(false);

  const checkStatus = useCallback(async () => {
    setChecking(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/cms/site-config/", {
        cache: "no-store",
      });
      if (!res.ok) {
        setIsBackendDown(true);
      } else {
        const data = await res.json();
        setConfig(data);
        setIsBackendDown(false);
      }
    } catch {
      setIsBackendDown(true);
    } finally {
      setTimeout(() => setChecking(false), 500);
    }
  }, []);

  useEffect(() => {
    checkStatus();
    // Poll every 30 seconds so when admin turns maintenance off, site auto-resumes
    const interval = setInterval(checkStatus, 30000);
    return () => clearInterval(interval);
  }, [checkStatus]);

  const isMaintenanceActive = config?.maintenance_mode === true || isBackendDown;

  if (!isMaintenanceActive) {
    return <>{children}</>;
  }

  const title = config?.maintenance_mode
    ? config.maintenance_title || "Website Under Scheduled Maintenance"
    : "System Standby & Maintenance Mode";

  const message = config?.maintenance_mode
    ? config.maintenance_message ||
      "We are upgrading our core engines and deploying production enhancements. All services will resume shortly."
    : "The backend API engine is currently offline or undergoing upgrades. Our automated monitors are restoring live services.";

  const uptime = config?.maintenance_mode
    ? config.maintenance_estimated_uptime || "Estimated uptime: ~30 minutes"
    : "Standby Mode · Auto-recovery in progress";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950 text-white px-4 sm:px-6 select-none overflow-y-auto">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(245,158,11,0.12),transparent_65%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="relative max-w-xl w-full mx-auto my-auto text-center py-12 px-6 sm:px-10 rounded-3xl bg-zinc-900/90 border border-amber-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-xl">
        {/* Pulsing Maintenance Icon */}
        <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center">
          <span className="absolute inset-0 rounded-full bg-amber-500/20 animate-ping opacity-75" />
          <div className="relative w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-lg shadow-amber-500/20">
            <Wrench className="w-8 h-8 animate-pulse" />
          </div>
        </div>

        {/* Status Badges */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-semibold uppercase tracking-wider mb-4">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>
            {config?.maintenance_mode ? "Maintenance Mode Active" : "Backend Standby Mode"}
          </span>
        </div>

        {/* Title & Message */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-3">
          {title}
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-md mx-auto mb-6">
          {message}
        </p>

        {/* Estimated Uptime Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-950/80 border border-zinc-800 text-xs font-mono text-zinc-300 mb-8">
          <Clock className="w-4 h-4 text-amber-400" />
          <span>{uptime}</span>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-6 border-t border-zinc-800/80">
          <button
            type="button"
            onClick={checkStatus}
            disabled={checking}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-black font-mono transition-all shadow-lg shadow-amber-500/25 active:scale-95 disabled:opacity-60 cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${checking ? "animate-spin" : ""}`} />
            <span>{checking ? "Checking System..." : "Check Live Status"}</span>
          </button>

          <a
            href="http://localhost:8000/cms/settings/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors border border-zinc-700"
          >
            <span>CMS Admin Settings</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
