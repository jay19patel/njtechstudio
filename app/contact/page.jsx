"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useContactModal } from "../context/ContactModalContext";

export default function ContactRedirectPage() {
  const router = useRouter();
  const { openContactModal } = useContactModal();

  useEffect(() => {
    router.replace("/");
    setTimeout(() => {
      openContactModal();
    }, 100);
  }, [router, openContactModal]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center space-y-2">
        <p className="text-indigo-400 font-mono text-sm uppercase tracking-wider animate-pulse">
          Opening Project Inquiry...
        </p>
      </div>
    </div>
  );
}
