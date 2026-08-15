"use client";

import { useLayoutEffect, useRef } from "react";

// Constant scroll speed (px/sec) so short strings ("404") and long strings
// ("WHAT I CAN DO") move across the screen at the same visual rate, instead
// of all sharing one fixed animation-duration regardless of rendered width.
const SPEED_PX_PER_SEC = 90;
const MIN_DURATION = 25;
const MAX_DURATION = 90;

export default function MovingTextBg({ children, text = "YOUR TEXT HERE", textColor = "text-slate-300", isFixed = false, className = "", rows = 4 }) {
  // Reduced to 10 repetitions to optimize DOM nodes count and layout load
  const repeatedText = Array(10).fill(text).join(" ");

  const measureRef = useRef(null);
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const measureEl = measureRef.current;
    const containerEl = containerRef.current;
    if (!measureEl || !containerEl) return;

    const recalculate = () => {
      const width = measureEl.offsetWidth;
      if (!width) return;
      const next = Math.min(MAX_DURATION, Math.max(MIN_DURATION, width / SPEED_PX_PER_SEC));
      containerEl.style.setProperty('--scroll-duration', `${next}s`);
    };

    recalculate();

    const resizeObserver = new ResizeObserver(recalculate);
    resizeObserver.observe(measureEl);
    return () => resizeObserver.disconnect();
  }, [repeatedText]);

  const rowStyle = { animationDuration: 'var(--scroll-duration, 60s)' };

  return (
    <div ref={containerRef} className={`moving-text-bg ${className}`}>
      <div className="moving-text-container" aria-hidden="true" style={isFixed ? { position: 'fixed', top: '50%', transform: 'translateY(-50%)', height: '100vh', zIndex: 0 } : {}}>
        {Array.from({ length: rows }).map((_, idx) => (
          <div
            key={idx}
            ref={idx === 0 ? measureRef : null}
            className={`moving-text-row ${textColor}`}
            style={rowStyle}
          >
            {repeatedText} {repeatedText}
          </div>
        ))}
      </div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

