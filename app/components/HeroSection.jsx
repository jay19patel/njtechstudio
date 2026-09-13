"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import MovingTextBg from "./MovingTextBg";
import { useContactModal } from "../context/ContactModalContext";

const DURATION = 0.25;
const STAGGER = 0.025;

const FlipLink = ({ children }) => {
  return (
    <motion.div
      initial="initial"
      whileHover="hovered"
      className="relative inline-block overflow-hidden cursor-pointer select-none"
      style={{ lineHeight: 1.15 }}
    >
      <div>
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: { y: 0 },
              hovered: { y: "-100%" }
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i
            }}
            className="inline-block whitespace-pre"
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </div>
      <div className="absolute inset-0">
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: { y: "100%" },
              hovered: { y: 0 }
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i
            }}
            className="inline-block text-indigo-600"
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

export default function HeroSection() {
  const { openContactModal } = useContactModal();

  const [displayedMessages, setDisplayedMessages] = useState([]);
  const [currentTypingIndex, setCurrentTypingIndex] = useState(-1);
  const [typingProgress, setTypingProgress] = useState("");
  const messagesRef = useRef(null);

  // Scripted client conversation
  const scriptedConversation = useMemo(() => ([
    { role: "user", content: "Hey Jay, heard you build modern Python-based applications? Need help with a custom automation tool." },
    { role: "assistant", content: "Absolutely! I specialize in Python + JavaScript development—FastAPI, Django, React, Next.js and autonomous AI systems. What would you like to automate?" },
    { role: "user", content: "We need automated data ingestion, AI-driven analysis, and a clean dashboard for our team." },
    { role: "assistant", content: "Perfect! I'll build you a fast, scalable solution with clean APIs, smart agent workflows, and an ultra-responsive UI." },
    { role: "assistant", content: "Processing your architecture...", pending: true },
    { role: "assistant", content: "Done! Your automation system is live—faster workflows, centralized telemetry, and seamless integrations. 🚀" },
    { role: "user", content: "This is fantastic! Clean UI, rapid delivery, and runs smoothly under load. Highly recommend!" }
  ]), []);

  // Auto-scroll inside chat
  useEffect(() => {
    const el = messagesRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [displayedMessages, currentTypingIndex, typingProgress]);

  // Typing animation control
  useEffect(() => {
    let isCancelled = false;

    const typeMessage = (fullText, role, pending = false) =>
      new Promise((resolve) => {
        const align = role === "user" ? "right" : "left";

        setDisplayedMessages((prev) => {
          const next = [
            ...prev,
            { role, align, content: fullText, displayedContent: "", isTyping: true, pending }
          ];
          setCurrentTypingIndex(next.length - 1);
          setTypingProgress("");
          return next;
        });

        if (pending) {
          setTimeout(() => {
            if (isCancelled) return;
            setDisplayedMessages((prev) => {
              const lastIndex = prev.length - 1;
              return prev.map((m, idx) =>
                idx === lastIndex
                  ? { ...m, isTyping: false, displayedContent: fullText, pending: false }
                  : m
              );
            });
            setCurrentTypingIndex(-1);
            setTypingProgress("");
            resolve();
          }, 1800);
          return;
        }

        let i = 0;
        const speed = 18;

        const interval = setInterval(() => {
          if (isCancelled) {
            clearInterval(interval);
            return;
          }
          i++;
          const partial = fullText.slice(0, i);
          setTypingProgress(partial);

          if (i >= fullText.length) {
            clearInterval(interval);
            setDisplayedMessages((prev) => {
              const lastIndex = prev.length - 1;
              return prev.map((m, idx) =>
                idx === lastIndex
                  ? { ...m, isTyping: false, displayedContent: fullText }
                  : m
              );
            });
            setCurrentTypingIndex(-1);
            setTypingProgress("");
            resolve();
          }
        }, speed);
      });

    const runScript = async () => {
      for (const msg of scriptedConversation) {
        if (isCancelled) break;
        await typeMessage(msg.content, msg.role, msg.pending);
        await new Promise((r) => setTimeout(r, 900));
      }
    };

    runScript();

    return () => {
      isCancelled = true;
    };
  }, [scriptedConversation]);

  return (
    <MovingTextBg text="NJ TECH STUDIO" textColor="text-gray-400" className="bg-[#fcfcfd]">
      <section className="relative w-full bg-transparent text-zinc-900 pt-28 sm:pt-32 pb-16 lg:pb-24 overflow-hidden border-b border-zinc-100">
        
        {/* Subtle radial ambient light */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-50/60 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Main Hero Split Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-6 text-center lg:text-left space-y-6">
              
              {/* Interactive Sticker Hover Pill Badge */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-4 w-fit mx-auto lg:mx-0 rounded-full bg-zinc-900 shadow-sm"
              >
                <button
                  type="button"
                  onClick={openContactModal}
                  className="flex origin-top-left items-center justify-start rounded-full border border-zinc-900 bg-white p-1 text-xs sm:text-sm transition-transform duration-200 hover:-rotate-2 cursor-pointer shadow-xs group"
                >
                  <span className="rounded-full bg-indigo-600 px-3 py-1 font-semibold text-white shadow-2xs">
                    Ready to innovate?
                  </span>
                  <span className="ml-2.5 mr-2 inline-block font-semibold text-zinc-900">
                    Let&apos;s connect
                  </span>
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 inline-block text-zinc-700 hidden sm:block group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                    height="1.1em"
                    width="1.1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </button>
              </motion.div>

              {/* FlipLink Interactive Heading */}
              <div className="py-2">
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-zinc-900 font-extrabold text-[9vw] sm:text-[7vw] md:text-[5.5vw] lg:text-[4.2rem] leading-[1.08] tracking-tight flex flex-col gap-0 sm:gap-1"
                >
                  <FlipLink>Code That</FlipLink>
                  <FlipLink>Creates Magic</FlipLink>
                  <FlipLink>And Turns Ideas</FlipLink>
                  <FlipLink>Into Reality</FlipLink>
                </motion.div>
              </div>

              {/* Tagline / Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.35 }}
                className="text-zinc-600 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal"
              >
                We build intelligent web applications, AI automation agents, and scalable backend platforms tailored for ambitious startups and businesses.
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.45 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
              >
                <button
                  onClick={openContactModal}
                  className="w-full sm:w-auto px-7 py-3.5 bg-zinc-900 hover:bg-black text-white rounded-full text-sm font-semibold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer group"
                >
                  <span>Start your project</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
                <Link
                  href="/projects"
                  className="w-full sm:w-auto px-7 py-3.5 bg-white hover:bg-zinc-50 border border-zinc-200 text-zinc-800 rounded-full text-sm font-semibold transition-all shadow-xs text-center"
                >
                  Explore our work
                </Link>
              </motion.div>
            </div>

            {/* Right Interactive Chat UI */}
            <div className="lg:col-span-6 flex justify-center lg:justify-end w-full">
              <div className="relative w-full max-w-xl">
                
                {/* Subtle ambient blur behind chat card */}
                <div className="absolute -top-6 -left-6 w-36 h-36 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

                {/* Chat Container */}
                <div className="relative rounded-3xl border border-zinc-200/80 bg-white/95 backdrop-blur-md shadow-[0_12px_45px_rgb(0,0,0,0.06)] overflow-hidden">
                  
                  {/* Window Bar */}
                  <div className="flex items-center gap-2 px-5 py-3.5 border-b border-zinc-100 bg-zinc-50/70">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-rose-400"></div>
                      <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                      <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                    </div>
                    <div className="flex-1 ml-3 bg-white rounded-lg px-3 py-1 border border-zinc-200/60 shadow-2xs">
                      <p className="text-[11px] text-zinc-500 font-medium font-mono truncate">
                        🔒 njtechstudio.in/chat
                      </p>
                    </div>
                    <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                      Live
                    </span>
                  </div>

                  {/* Chat Messages Log */}
                  <div className="p-4 sm:p-5">
                    <div
                      ref={messagesRef}
                      className="bg-zinc-50/60 rounded-2xl p-4 border border-zinc-100 h-[260px] sm:h-[300px] overflow-y-auto flex flex-col gap-3 custom-scrollbar"
                    >
                      {displayedMessages.map((m, idx) => {
                        let displayText = m.displayedContent;
                        const isTypingThisMessage = idx === currentTypingIndex && m.isTyping;
                        if (isTypingThisMessage) {
                          displayText = typingProgress;
                        }

                        return (
                          <div
                            key={idx}
                            className={`flex ${m.align === "right" ? "justify-end" : "justify-start"} animate-fadeIn`}
                          >
                            <div
                              className={
                                m.align === "right"
                                  ? "max-w-[85%] bg-zinc-900 text-white rounded-2xl rounded-tr-xs px-4 py-2.5 text-xs sm:text-[13px] shadow-sm leading-relaxed"
                                  : "max-w-[85%] bg-white text-zinc-800 border border-zinc-200/80 rounded-2xl rounded-tl-xs px-4 py-2.5 text-xs sm:text-[13px] shadow-2xs leading-relaxed"
                              }
                            >
                              {m.pending ? (
                                <span className="inline-flex items-center gap-2 text-indigo-600 font-medium text-xs">
                                  <span>{displayText || m.content}</span>
                                  <span className="inline-flex gap-1">
                                    <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: "-0.3s" }}></span>
                                    <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: "-0.15s" }}></span>
                                    <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce"></span>
                                  </span>
                                </span>
                              ) : (
                                <span>
                                  {displayText}
                                  {isTypingThisMessage && displayText.length < m.content.length && (
                                    <span className="inline-block w-0.5 h-3.5 bg-indigo-500 ml-1 animate-pulse"></span>
                                  )}
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Chat Footer indicator */}
                  <div className="px-5 py-2.5 border-t border-zinc-100 bg-white flex items-center justify-between text-[11px] text-zinc-400">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-indigo-500" /> Powered by NJTechStudio Engine
                    </span>
                    <span className="font-mono text-zinc-400">FastAPI + Next.js</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e4e4e7;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.25s ease-out;
        }
      `}</style>
    </MovingTextBg>
  );
}
