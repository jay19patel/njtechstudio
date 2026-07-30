"use client";

import { useLayoutEffect, useRef, useState } from "react";

// Constant scroll speed (px/sec) so short strings ("404") and long strings
// ("WHAT I CAN DO") move across the screen at the same visual rate, instead
// of all sharing one fixed animation-duration regardless of rendered width.
const SPEED_PX_PER_SEC = 90;
const MIN_DURATION = 25;
const MAX_DURATION = 90;

export default function MovingTextBg({ children, text = "YOUR TEXT HERE", textColor = "text-slate-300", isFixed = false }) {
  const repeatedText = Array(20).fill(text).join(" ");

  const measureRef = useRef(null);
  const [duration, setDuration] = useState(MAX_DURATION);

  useLayoutEffect(() => {
    const measureEl = measureRef.current;
    if (!measureEl) return;

    const recalculate = () => {
      const width = measureEl.offsetWidth;
      if (!width) return;
      const next = Math.min(MAX_DURATION, Math.max(MIN_DURATION, width / SPEED_PX_PER_SEC));
      setDuration(next);
    };

    recalculate();

    const resizeObserver = new ResizeObserver(recalculate);
    resizeObserver.observe(measureEl);
    return () => resizeObserver.disconnect();
  }, [repeatedText]);

  const rowStyle = { animationDuration: `${duration}s` };

  return (
    <div className="moving-text-bg">
      <div className="moving-text-container" aria-hidden="true" style={isFixed ? { position: 'fixed', top: '50%', transform: 'translateY(-50%)', height: '100vh', zIndex: 0 } : {}}>
        <div ref={measureRef} className={`moving-text-row ${textColor}`} style={rowStyle}>
          {repeatedText} {repeatedText}
        </div>
        <div className={`moving-text-row ${textColor}`} style={rowStyle}>
          {repeatedText} {repeatedText}
        </div>
        <div className={`moving-text-row ${textColor}`} style={rowStyle}>
          {repeatedText} {repeatedText}
        </div>
        <div className={`moving-text-row ${textColor}`} style={rowStyle}>
          {repeatedText} {repeatedText}
        </div>
      </div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
