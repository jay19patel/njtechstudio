"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import MovingTextBg from "./MovingTextBg";

const DURATION = 0.25;
const STAGGER = 0.025;

const FlipLink = ({ children }) => {
  return (
    <motion.div
      initial="initial"
      whileHover="hovered"
      className="relative inline-block overflow-hidden cursor-pointer select-none"
      style={{ lineHeight: 1.2 }}
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
            className="inline-block"
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
  const [displayedMessages, setDisplayedMessages] = useState([]);
  const [currentTypingIndex, setCurrentTypingIndex] = useState(-1);
  const [typingProgress, setTypingProgress] = useState("");
  const messagesRef = useRef(null);

  // Updated scripted conversation (text only)
  const scriptedConversation = useMemo(() => ([
    { role: "user", content: "Hey Jay, heard you build modern Python-based applications? Need help with a custom automation tool." },
    { role: "assistant", content: "Absolutely! I specialize in Python + JavaScript development—FastAPI, Django, React, Next.js and automation systems. What would you like to automate?" },
    { role: "user", content: "We need data scraping, processing, and a clean dashboard to visualize everything." },
    { role: "assistant", content: "Perfect! I'll build you a fast, scalable solution with smart automation, clean APIs, and an interactive dashboard. Smooth performance guaranteed!" },
    { role: "assistant", content: "Processing your tool...", pending: true },
    { role: "assistant", content: "Done! Your automation system is live—faster workflows, centralized dashboards, and seamless integrations. Let’s take it even further! 🚀" },
    { role: "user", content: "This is fantastic! Clean UI, quick delivery, and the automation works perfectly. Highly recommend!" }
  ]), []);

  // Auto-scroll
  useEffect(() => {
    const el = messagesRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [displayedMessages, currentTypingIndex, typingProgress]);

  // Typing animation control
  useEffect(() => {
    let isCancelled = false;
    const timeouts = [];

    const safeTimeout = (fn, delay) => {
      const id = setTimeout(() => {
        if (!isCancelled) fn();
      }, delay);
      timeouts.push(id);
      return id;
    };

    const typeMessage = (fullText, role, pending = false) =>
      new Promise((resolve) => {
        const align = role === "user" ? "right" : "left";

        if (isCancelled) return resolve();

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
          safeTimeout(() => {
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
          }, 2000);
          return;
        }

        let i = 0;
        const speed = 20;

        const tick = () => {
          if (isCancelled) return resolve();
          i += 1;
          const slice = fullText.slice(0, i);
          setTypingProgress(slice);

          if (i >= fullText.length) {
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
            return resolve();
          }

          safeTimeout(tick, speed);
        };

        safeTimeout(tick, speed);
      });

    const play = async () => {
      if (isCancelled) return;
      setDisplayedMessages([]);
      setCurrentTypingIndex(-1);
      setTypingProgress("");

      for (let i = 0; i < scriptedConversation.length; i++) {
        if (isCancelled) break;
        const msg = scriptedConversation[i];
        await typeMessage(msg.content, msg.role, msg.pending);
        await new Promise((r) => safeTimeout(r, 350));
      }
    };

    const start = safeTimeout(() => play(), 350);

    return () => {
      isCancelled = true;
      timeouts.forEach((id) => clearTimeout(id));
    };
  }, [scriptedConversation]);

  return (
    <MovingTextBg text="NJTECHSTUDIO" textColor="text-gray-400">
      <section className="relative w-full min-h-screen overflow-hidden flex items-center justify-center pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20">
        <div className="w-full h-full flex items-center justify-center relative">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 overflow-visible">
            <div className="grid grid-cols-1 gap-8 sm:gap-10 md:gap-14 items-center lg:grid-cols-12 lg:gap-32 overflow-visible">
              <div className="w-full xl:col-span-5 lg:col-span-6 2xl:-mx-5 xl:-mx-0 overflow-visible">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="mb-4 w-fit mx-auto lg:mx-0 bg-zinc-900"
                >
                  <a
                    href="#"
                    className="flex origin-top-left items-center justify-start border border-zinc-900 bg-white p-0.5 text-xs sm:text-sm transition-transform hover:-rotate-1"
                  >
                    <span className="bg-indigo-800 px-2 sm:px-3 py-0.5 font-medium text-white">
                      Hey I’m NJ!
                    </span>
                    <span className="ml-2 mr-1 inline-block font-medium text-gray-900">
                      Software Developer with Creativity at its Peak 🎥✨
                    </span>
                    <svg
                      stroke="currentColor"
                      fill="none"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 inline-block text-gray-700 hidden sm:block"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </a>
                </motion.div>

                <div className="py-4 sm:py-6 md:py-8 text-center lg:text-left">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-gray-900 font-extrabold text-[8vw] sm:text-[7vw] md:text-[6vw] lg:text-[5vw] leading-tight tracking-tighter flex flex-col gap-0 sm:gap-1"
                  >
                    <FlipLink>Code That</FlipLink>
                    <FlipLink>Creates Magic</FlipLink>
                    <FlipLink>And Turns Ideas</FlipLink>
                    <FlipLink>Into Reality</FlipLink>

                  </motion.div>
                </div>
              </div>

              {/* RIGHT SIDE CHAT UI */}
              <div className="w-full lg:col-span-6 flex justify-center lg:justify-end mt-8 lg:mt-0">
                <div className="relative w-full max-w-2xl px-4 sm:px-0">
                  <div className="relative border-2 border-indigo-900 bg-white p-4 sm:p-6 md:p-8 shadow-2xl">
                    <div className="flex items-center gap-2 sm:gap-2.5 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-200">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <div className="w-3 h-3 bg-red-500 hover:scale-110 transition-transform cursor-pointer"></div>
                        <div className="w-3 h-3 bg-yellow-500 hover:scale-110 transition-transform cursor-pointer"></div>
                        <div className="w-3 h-3 bg-green-500 hover:scale-110 transition-transform cursor-pointer"></div>
                      </div>
                      <div className="flex-1 ml-2 sm:ml-4 bg-gray-50 px-2 sm:px-4 py-1.5 sm:py-2 border border-gray-200">
                        <p className="text-[10px] sm:text-xs text-gray-600 font-medium truncate">🔒 njtechstudio.com/chat</p>
                      </div>
                    </div>

                    {/* Chat Messages */}
                    <div className="flex flex-col gap-3 sm:gap-4">
                      <div ref={messagesRef} className="bg-gray-50 p-3 sm:p-4 border border-zinc-200 h-[240px] sm:h-[280px] overflow-y-auto flex flex-col gap-2 sm:gap-3 custom-scrollbar">
                        {displayedMessages.map((m, idx) => {
                          let displayText = m.displayedContent;
                          const isTypingThisMessage = idx === currentTypingIndex && m.isTyping;
                          if (isTypingThisMessage) {
                            displayText = typingProgress;
                          }

                          return (
                            <div key={idx} className={`flex ${m.align === "right" ? "justify-end" : "justify-start"} animate-slideIn`}>
                              <div className={
                                m.align === "right"
                                  ? "max-w-[85%] bg-indigo-900 text-white border border-indigo-950 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm shadow-md"
                                  : "max-w-[85%] bg-white text-gray-900 border border-gray-300 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm shadow-sm"
                              }>
                                {m.pending ? (
                                  <span className="inline-flex items-center gap-2">
                                    <span className="text-xs sm:text-sm font-medium">Processing your request</span>
                                    <span className="inline-flex gap-1">
                                      <span className="w-1.5 h-1.5 bg-current animate-bounce" style={{ animationDelay: '-0.3s' }}></span>
                                      <span className="w-1.5 h-1.5 bg-current animate-bounce" style={{ animationDelay: '-0.15s' }}></span>
                                      <span className="w-1.5 h-1.5 bg-current animate-bounce"></span>
                                    </span>
                                  </span>
                                ) : (
                                  <span className="leading-relaxed">
                                    {displayText}
                                    {isTypingThisMessage && displayText.length < m.content.length && (
                                      <span className="inline-block w-0.5 h-3 sm:h-4 bg-current ml-1 animate-pulse"></span>
                                    )}
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <style jsx>{`
              .custom-scrollbar::-webkit-scrollbar {
                width: 6px;
              }
              .custom-scrollbar::-webkit-scrollbar-track {
                background: transparent;
              }
              .custom-scrollbar::-webkit-scrollbar-thumb {
                background: #c7d2fe;
                border-radius: 10px;
              }
              .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                background: #a5b4fc;
              }
              @keyframes slideIn {
                from {
                  opacity: 0;
                  transform: translateY(10px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
              .animate-slideIn {
                animation: slideIn 0.3s ease-out;
              }
            `}</style>
            </div>
          </div>
        </div>
      </section>
    </MovingTextBg>
  );
}
