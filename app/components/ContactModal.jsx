"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, ArrowLeft, Check, Loader2, Sparkles } from "lucide-react";

export default function ContactModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    details: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen) return null;

  const handleNext = (e) => {
    e?.preventDefault();
    setErrorMsg("");

    if (step === 1) {
      if (!formData.name.trim()) {
        setErrorMsg("Please enter your name.");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!formData.contact.trim()) {
        setErrorMsg("Please enter your email or phone number.");
        return;
      }
      setStep(3);
    }
  };

  const handleBack = () => {
    setErrorMsg("");
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!formData.details.trim()) {
      setErrorMsg("Please describe your project or requirements.");
      return;
    }

    setIsSubmitting(true);

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.contact);
      data.append("subject", `New Project Inquiry from ${formData.name}`);
      data.append("message", formData.details);
      data.append("type", "Project Inquiry Modal");

      const response = await fetch("/api/send-email", {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        setErrorMsg("Failed to submit inquiry. Please try again.");
      }
    } catch (err) {
      console.error("Modal submission error:", err);
      setErrorMsg("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseAll = () => {
    setStep(1);
    setFormData({ name: "", contact: "", details: "" });
    setIsSuccess(false);
    setErrorMsg("");
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/75">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
          className="relative w-full max-w-md bg-zinc-950 border-2 border-indigo-900 text-white p-5 sm:p-6 shadow-2xl overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={handleCloseAll}
            className="absolute top-4 right-4 w-8 h-8 border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 hover:border-indigo-800 text-white flex items-center justify-center transition-colors cursor-pointer z-10"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Success State */}
          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-6 text-center space-y-4"
            >
              <div className="w-12 h-12 bg-indigo-900 border-2 border-indigo-500 text-white flex items-center justify-center mx-auto shadow-lg">
                <Check className="w-6 h-6 text-indigo-300" />
              </div>

              <div className="space-y-1.5">
                <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
                  INQUIRY RECEIVED!
                </h3>
                <p className="text-zinc-400 text-xs sm:text-sm max-w-xs mx-auto leading-relaxed font-medium">
                  Thank you, <span className="text-white font-bold">{formData.name}</span>! Jay Patel from NJ Tech Studio will review your project and get back to you shortly.
                </p>
              </div>

              <button
                onClick={handleCloseAll}
                className="w-full py-3 bg-indigo-900 hover:bg-indigo-800 border border-indigo-950 text-white font-bold uppercase tracking-wider text-xs shadow-xl transition-all cursor-pointer"
              >
                DONE
              </button>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {/* Step Header Badge */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="px-2.5 py-1 bg-zinc-900 border border-zinc-700 text-white text-[11px] font-mono font-bold uppercase tracking-widest shadow-md">
                  STEP {step} OF 3
                </span>

                {/* Saved Badges */}
                {step >= 2 && formData.name && (
                  <span className="px-2 py-0.5 bg-zinc-900 border border-zinc-700 text-zinc-300 text-[10px] font-mono font-semibold flex items-center gap-1">
                    <Check className="w-3 h-3 text-indigo-400" />
                    <span>NAME: {formData.name}</span>
                  </span>
                )}
                {step === 3 && formData.contact && (
                  <span className="px-2 py-0.5 bg-zinc-900 border border-zinc-700 text-zinc-300 text-[10px] font-mono font-semibold flex items-center gap-1">
                    <Check className="w-3 h-3 text-indigo-400" />
                    <span>CONTACT: {formData.contact}</span>
                  </span>
                )}
              </div>

              {/* Error Message */}
              {errorMsg && (
                <div className="px-3 py-1.5 bg-rose-950/80 border border-rose-800 text-rose-300 text-xs font-semibold">
                  {errorMsg}
                </div>
              )}

              {/* Step Content */}
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <div>
                      <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white leading-snug">
                        WHAT SHOULD WE CALL YOU?
                      </h2>
                      <p className="text-zinc-400 text-xs mt-1 font-medium">
                        First name or company name is plenty.
                      </p>
                    </div>

                    <form onSubmit={handleNext} className="space-y-4">
                      <div>
                        <input
                          type="text"
                          autoFocus
                          placeholder="Your name..."
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-zinc-900 border-2 border-zinc-800 focus:border-indigo-500 text-white text-sm sm:text-base p-3 outline-none font-semibold transition-colors placeholder:text-zinc-600"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 bg-indigo-900 hover:bg-indigo-800 border border-indigo-950 text-white font-bold uppercase tracking-wider text-xs shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2 group"
                      >
                        <span>NEXT</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </form>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <div>
                      <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white leading-snug">
                        HOW CAN WE REACH YOU?
                      </h2>
                      <p className="text-zinc-400 text-xs mt-1 font-medium">
                        Your email or phone number. We do not spam.
                      </p>
                    </div>

                    <form onSubmit={handleNext} className="space-y-4">
                      <div>
                        <input
                          type="text"
                          autoFocus
                          placeholder="Email address or phone number..."
                          value={formData.contact}
                          onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                          className="w-full bg-zinc-900 border-2 border-zinc-800 focus:border-indigo-500 text-white text-sm sm:text-base p-3 outline-none font-semibold transition-colors placeholder:text-zinc-600"
                        />
                      </div>

                      <div className="flex gap-2.5">
                        <button
                          type="button"
                          onClick={handleBack}
                          className="w-1/3 py-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white font-bold uppercase tracking-wider text-xs transition-all cursor-pointer flex items-center justify-center gap-1"
                        >
                          <ArrowLeft className="w-3.5 h-3.5" />
                          <span>BACK</span>
                        </button>
                        <button
                          type="submit"
                          className="w-2/3 py-3 bg-indigo-900 hover:bg-indigo-800 border border-indigo-950 text-white font-bold uppercase tracking-wider text-xs shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2 group"
                        >
                          <span>NEXT</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <div>
                      <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white leading-snug">
                        TELL US ABOUT YOUR PROJECT
                      </h2>
                      <p className="text-zinc-400 text-xs mt-1 font-medium">
                        In short — what you do, and what you are looking to build or automate.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <textarea
                          rows={3}
                          autoFocus
                          placeholder="Tell us about your project, timeline, or requirements..."
                          value={formData.details}
                          onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                          className="w-full bg-zinc-900 border-2 border-zinc-800 focus:border-indigo-500 text-white text-sm p-3 outline-none font-medium transition-colors placeholder:text-zinc-600 resize-none"
                        />
                      </div>

                      <div className="flex gap-2.5">
                        <button
                          type="button"
                          onClick={handleBack}
                          disabled={isSubmitting}
                          className="w-1/3 py-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white font-bold uppercase tracking-wider text-xs transition-all cursor-pointer flex items-center justify-center gap-1 disabled:opacity-50"
                        >
                          <ArrowLeft className="w-3.5 h-3.5" />
                          <span>BACK</span>
                        </button>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-2/3 py-3 bg-indigo-900 hover:bg-indigo-800 border border-indigo-950 text-white font-bold uppercase tracking-wider text-xs shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70"
                        >
                          {isSubmitting ? (
                            <>
                              <span>SENDING...</span>
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            </>
                          ) : (
                            <>
                              <span>SEND IT</span>
                              <ArrowRight className="w-3.5 h-3.5 text-white" />
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Progress Indicators */}
              <div className="flex items-center justify-center gap-2 pt-1 border-t border-zinc-900">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className={`h-1 transition-all duration-300 ${
                      step === s ? "w-6 bg-indigo-500" : s < step ? "w-2 bg-indigo-900" : "w-2 bg-zinc-800"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
