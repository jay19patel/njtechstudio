"use client";

import { useLayoutEffect, useRef, useState, useEffect } from "react";

// Constant scroll speed (px/sec) so short and long strings move at the same smooth rate
const SPEED_PX_PER_SEC = 85;
const MIN_DURATION = 30;
const MAX_DURATION = 95;

export default function MovingTextBg({
  children,
  text = "NJ TECH STUDIO",
  textColor = "text-zinc-300",
  isFixed = false,
  className = "",
  rows = "auto"
}) {
  // Repeat text enough times for a continuous loop
  const repeatedText = Array(8).fill(text).join("   ");

  const measureRef = useRef(null);
  const containerRef = useRef(null);
  const [dynamicRowCount, setDynamicRowCount] = useState(3);

  // Dynamic row calculation based on container height
  useEffect(() => {
    if (rows !== "auto") return;

    const el = containerRef.current;
    if (!el) return;

    const updateRows = () => {
      const height = el.offsetHeight || el.clientHeight;
      if (!height) return;

      const isMobile = window.innerWidth < 640;
      const isTablet = window.innerWidth >= 640 && window.innerWidth < 1024;
      const targetRowHeight = isMobile ? 110 : isTablet ? 135 : 155;

      // Calculate how many rows comfortably and evenly distribute across the full page height
      const count = Math.max(2, Math.min(50, Math.round(height / targetRowHeight)));
      setDynamicRowCount(count);
    };

    updateRows();

    const resizeObserver = new ResizeObserver(() => {
      updateRows();
    });
    resizeObserver.observe(el);

    return () => resizeObserver.disconnect();
  }, [rows]);

  // Dynamic scroll duration calculation based on text pixel width
  useLayoutEffect(() => {
    const measureEl = measureRef.current;
    const containerEl = containerRef.current;
    if (!measureEl || !containerEl) return;

    const recalculate = () => {
      const width = measureEl.offsetWidth;
      if (!width) return;
      const next = Math.min(MAX_DURATION, Math.max(MIN_DURATION, width / SPEED_PX_PER_SEC));
      containerEl.style.setProperty("--scroll-duration", `${next}s`);
    };

    recalculate();

    const resizeObserver = new ResizeObserver(recalculate);
    resizeObserver.observe(measureEl);
    return () => resizeObserver.disconnect();
  }, [repeatedText]);

  const effectiveRows = rows === "auto" ? dynamicRowCount : Number(rows) || 3;
  const rowStyle = { animationDuration: "var(--scroll-duration, 65s)" };

  return (
    <div ref={containerRef} className={`moving-text-bg relative ${className}`}>
      <div
        className="moving-text-container"
        aria-hidden="true"
        style={
          isFixed
            ? {
                position: "fixed",
                inset: 0,
                height: "100vh",
                zIndex: 0,
                pointerEvents: "none",
              }
            : {
                position: "absolute",
                inset: 0,
                height: "100%",
                zIndex: 0,
                pointerEvents: "none",
              }
        }
      >
        {Array.from({ length: effectiveRows }).map((_, idx) => (
          <div
            key={idx}
            ref={idx === 0 ? measureRef : null}
            className={`moving-text-row ${textColor}`}
            style={rowStyle}
          >
            <span>{repeatedText}</span>
            <span>{repeatedText}</span>
          </div>
        ))}
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
