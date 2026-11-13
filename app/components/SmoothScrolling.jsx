"use client";

import { ReactLenis } from 'lenis/react';
import { usePathname } from 'next/navigation';

export default function SmoothScrolling({ children }) {
  // Admin is a form-heavy tool: native scrolling keeps textareas, modals and inner scroll areas working
  if (usePathname()?.startsWith('/admin')) return children;

  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.5, smoothTouch: true }}>
      {children}
    </ReactLenis>
  );
}
