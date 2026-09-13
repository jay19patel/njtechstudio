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
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-zinc-900/40 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
          className="relative w-full max-w-md bg-white border border-zinc-200 rounded-3xl p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={handleCloseAll}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-500 hover:text-zinc-900 flex items-center justify-center transition-colors cursor-pointer z-10"
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
              <div className="w-16 h-16 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mx-auto shadow-sm">
                <Check className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900">
                  Inquiry Received!
                </h3>
                <p className="text-zinc-500 text-sm max-w-xs mx-auto leading-relaxed">
                  Thank you, <span className="text-zinc-900 font-medium">{formData.name}</span>! Jay Patel from NJ Tech Studio will review your project and get back to you shortly.
                </p>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleCloseAll}
                  className="w-full py-3.5 bg-zinc-900 hover:bg-black text-white font-semibold rounded-full shadow-md transition-all cursor-pointer"
                >
                  Done
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {/* Step Header Badge */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 bg-zinc-100 border border-zinc-200 text-zinc-600 text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm">
                  Step {step} of 3
                </span>

                {/* Saved Badges */}
                {step >= 2 && formData.name && (
                  <span className="px-2.5 py-1 bg-indigo-50 border border-indigo-100 text-indigo-700 text-[10px] font-bold uppercase tracking-wider rounded-full flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    <span>{formData.name.split(' ')[0]}</span>
                  </span>
                )}
              </div>

              {/* Error Message */}
              <AnimatePresence>
                {errorMsg && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 py-2.5 bg-red-50 border border-red-100 text-red-600 text-xs font-medium rounded-xl">
                      {errorMsg}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Step Content */}
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    <div>
                      <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">
                        What should we call you?
                      </h2>
                      <p className="text-zinc-500 text-sm mt-1">
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
                          className="w-full bg-zinc-50 border border-zinc-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl text-zinc-900 text-sm sm:text-base p-4 outline-none font-medium transition-all placeholder:text-zinc-400"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-4 bg-zinc-900 hover:bg-black text-white font-semibold rounded-full shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 group"
                      >
                        <span>Next step</span>
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
                    className="space-y-6"
                  >
                    <div>
                      <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">
                        How can we reach you?
                      </h2>
                      <p className="text-zinc-500 text-sm mt-1">
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
                          className="w-full bg-zinc-50 border border-zinc-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl text-zinc-900 text-sm sm:text-base p-4 outline-none font-medium transition-all placeholder:text-zinc-400"
                        />
                      </div>

                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={handleBack}
                          className="w-16 h-[56px] flex-shrink-0 bg-zinc-100 hover:bg-zinc-200 text-zinc-600 rounded-full flex items-center justify-center transition-colors cursor-pointer"
                          aria-label="Back"
                        >
                          <ArrowLeft className="w-5 h-5" />
                        </button>
                        <button
                          type="submit"
                          className="flex-1 h-[56px] bg-zinc-900 hover:bg-black text-white font-semibold rounded-full shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 group"
                        >
                          <span>Next step</span>
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
                    className="space-y-6"
                  >
                    <div>
                      <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">
                        Tell us about your project
                      </h2>
                      <p className="text-zinc-500 text-sm mt-1">
                        In short — what you do, and what you are looking to build or automate.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <textarea
                          rows={4}
                          autoFocus
                          placeholder="Tell us about your project, timeline, or requirements..."
                          value={formData.details}
                          onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                          className="w-full bg-zinc-50 border border-zinc-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl text-zinc-900 text-sm p-4 outline-none font-medium transition-all placeholder:text-zinc-400 resize-none"
                        />
                      </div>

                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={handleBack}
                          disabled={isSubmitting}
                          className="w-16 h-[56px] flex-shrink-0 bg-zinc-100 hover:bg-zinc-200 text-zinc-600 rounded-full flex items-center justify-center transition-colors cursor-pointer disabled:opacity-50"
                          aria-label="Back"
                        >
                          <ArrowLeft className="w-5 h-5" />
                        </button>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="flex-1 h-[56px] bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70 group"
                        >
                          {isSubmitting ? (
                            <>
                              <span>Sending...</span>
                              <Loader2 className="w-4 h-4 animate-spin" />
                            </>
                          ) : (
                            <>
                              <span>Send Inquiry</span>
                              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Progress Indicators */}
              <div className="flex items-center justify-center gap-2 pt-2">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      step === s ? "w-8 bg-indigo-500" : s < step ? "w-3 bg-indigo-200" : "w-3 bg-zinc-200"
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
