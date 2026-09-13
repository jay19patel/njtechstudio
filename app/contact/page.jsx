"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useContactModal } from "../context/ContactModalContext";
import { Loader2 } from "lucide-react";

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
      <div className="text-center space-y-4 flex flex-col items-center">
        <Loader2 className="w-6 h-6 text-indigo-500 animate-spin" />
        <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest animate-pulse">
          Opening Project Inquiry...
        </p>
      </div>
    </div>
  );
}
