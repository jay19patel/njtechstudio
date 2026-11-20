"use client";

import { useState, useEffect, useCallback } from "react";
import { RefreshCw, Clock, Mail, ShieldAlert } from "lucide-react";
import MovingTextBg from "./MovingTextBg";
import { API_BASE_URL } from "@/lib/api";

/**
 * MaintenanceGate:
 * Matches the clean, professional, light aesthetic of NJTechStudio (#fcfcfd, indigo accents, subtle borders).
 * Activates when:
 * 1. Admin turns maintenance_mode ON in backend CMS Settings.
 * 2. Backend engine is unreachable (automatic standby protection).
 */
export default function MaintenanceGate({ children, initialConfig = null }) {
  const [config, setConfig] = useState(initialConfig);
  const [isBackendDown, setIsBackendDown] = useState(false);
  const [checking, setChecking] = useState(false);

  const checkStatus = useCallback(async () => {
    setChecking(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/cms/site-config/`, {
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
    // Re-check periodically so site auto-restores when maintenance is turned off
    const interval = setInterval(checkStatus, 25000);
    return () => clearInterval(interval);
  }, [checkStatus]);

  const isMaintenanceActive = config?.maintenance_mode === true || isBackendDown;

  if (!isMaintenanceActive) {
    return <>{children}</>;
  }

  const title = config?.maintenance_mode
    ? config.maintenance_title || "System Under Scheduled Maintenance"
    : "System Standby & Maintenance";

  const message = config?.maintenance_mode
    ? config.maintenance_message ||
      "We are currently rolling out infrastructure upgrades and optimizing server performance. All public services and applications will resume shortly."
    : "Our backend systems are currently undergoing brief routine maintenance or database updates. Live services will be restored automatically.";

  const uptime = config?.maintenance_mode
    ? config.maintenance_estimated_uptime || "Estimated uptime: ~30 minutes"
    : "Automated recovery in progress";

  const contactEmail = config?.contact_email || "justjayy19@gmail.com";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#fcfcfd] text-zinc-900 overflow-y-auto selection:bg-indigo-100">
      <MovingTextBg text="MAINTENANCE" textColor="text-zinc-300/80" className="bg-[#fcfcfd]" isFixed={true}>
        <div className="min-h-screen w-full flex items-center justify-center px-4 sm:px-6 py-12 relative z-10">
          
          <div className="max-w-2xl w-full mx-auto bg-white border border-zinc-200/90 rounded-3xl p-8 sm:p-12 text-center shadow-[0_20px_70px_rgba(0,0,0,0.06)] relative overflow-hidden">
            
            {/* Top Studio Brand Identifier */}
            <div className="flex items-center justify-between border-b border-zinc-100 pb-6 mb-8">
              <div className="flex items-center gap-2 text-left">
                <div className="w-8 h-8 rounded-xl bg-zinc-900 text-white flex items-center justify-center font-bold text-xs tracking-tight">
                  NJ
                </div>
                <div>
                  <p className="text-sm font-bold text-zinc-900 leading-none">NJ Tech Studio</p>
                  <p className="text-[11px] text-zinc-500 font-mono mt-0.5">Engineering & AI Labs</p>
                </div>
              </div>

              {/* Status pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse"></span>
                <span>Routine Maintenance</span>
              </div>
            </div>

            {/* Central Icon */}
            <div className="relative w-16 h-16 mx-auto mb-6 flex items-center justify-center">
              <span className="absolute inset-0 rounded-2xl bg-indigo-500/10 animate-ping opacity-75" />
              <div className="relative w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-200/80 flex items-center justify-center text-indigo-600 shadow-sm">
                <ShieldAlert className="w-7 h-7" />
              </div>
            </div>

            {/* Heading & Paragraph */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-zinc-900 leading-tight mb-4">
              {title}
            </h1>
            <p className="text-zinc-600 text-sm sm:text-base leading-relaxed max-w-lg mx-auto mb-8">
              {message}
            </p>

            {/* Estimated Uptime Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-50 border border-zinc-200/80 text-xs font-mono text-zinc-700 mb-8 shadow-2xs">
              <Clock className="w-3.5 h-3.5 text-indigo-600" />
              <span>{uptime}</span>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 border-t border-zinc-100">
              <button
                type="button"
                onClick={checkStatus}
                disabled={checking}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-semibold bg-zinc-900 hover:bg-black text-white transition-all shadow-md active:scale-95 disabled:opacity-60 cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${checking ? "animate-spin" : ""}`} />
                <span>{checking ? "Checking Service Status..." : "Check Live Status"}</span>
              </button>

              <a
                href={`mailto:${contactEmail}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-semibold bg-zinc-100 hover:bg-zinc-200 text-zinc-800 transition-colors border border-zinc-200"
              >
                <Mail className="w-3.5 h-3.5 text-zinc-500" />
                <span>Contact Engineering</span>
              </a>
            </div>

            <p className="text-[11px] text-zinc-400 mt-8">
              Systems will resume normal operation automatically once updates complete.
            </p>

          </div>

        </div>
      </MovingTextBg>
    </div>
  );
}
