"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Send } from "lucide-react";
import { useEffect } from "react";
import { useTransition } from "../context/TransitionContext";

export default function SuccessModal({ isOpen, onClose, redirectUrl = "/", autoCloseTime = 3000 }) {
  const { navigate } = useTransition();

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
        navigate(redirectUrl);
      }, autoCloseTime);

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose, navigate, redirectUrl, autoCloseTime]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 md:p-12 text-center max-w-md w-full shadow-2xl relative overflow-hidden"
          >
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl" />

            <div className="relative z-10 flex flex-col items-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-20 h-20 md:w-24 md:h-24 bg-green-500/10 rounded-full flex items-center justify-center mb-6 ring-1 ring-green-500/40"
              >
                <Send className="w-10 h-10 md:w-12 md:h-12 text-green-500 ml-1" />
              </motion.div>

              <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-2">
                Message Sent!
              </h3>

              <p className="text-zinc-400 text-base md:text-lg mb-8 leading-relaxed">
                Thanks for reaching out. We'll get back to you shortly.
              </p>

              <div className="flex items-center gap-2 text-sm font-medium text-zinc-500 bg-zinc-800/50 px-4 py-2 rounded-full">
                <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                Redirecting to home...
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
