"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";

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
              initial: {
                y: 0,
              },
              hovered: {
                y: "-100%",
              },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
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
              initial: {
                y: "100%",
              },
              hovered: {
                y: 0,
              },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
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

  // Website development conversation flow
  const scriptedConversation = useMemo(() => ([
    { role: "user", content: "Hey Jay, can you help me to create website?" },
    { role: "assistant", content: "Sure! I'd be happy to help you create a website. What kind of design do you need? And what functionality are you looking for?" },
    { role: "user", content: "I need a modern e-commerce website with payment integration." },
    { role: "assistant", content: "Perfect! I'll create a modern, responsive e-commerce site with secure payment gateway, product catalog, and admin dashboard." },
    { role: "assistant", content: "Designing your website...", pending: true },
    { role: "assistant", content: "Great! Your website is ready. Modern design with mobile responsiveness, secure checkout, and full admin panel. Project delivered!" },
    { role: "user", content: "Thank you! Your services are quite good. The communication was smooth and the project was delivered quickly." },
  ]), []);

  // Auto-scroll to latest message
  useEffect(() => {
    const el = messagesRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [displayedMessages, currentTypingIndex, typingProgress]);

  // Auto-play the scripted conversation one-by-one (deterministic, no polling)
  useEffect(() => {
    let isCancelled = false;

    const typeMessage = (fullText, role, pending = false) => new Promise((resolve) => {
      const align = role === "user" ? "right" : "left";

      // Add message in typing state at the end
      setDisplayedMessages(prev => {
        const next = [...prev, { role, align, content: fullText, displayedContent: "", isTyping: true, pending }];
        setCurrentTypingIndex(next.length - 1);
        setTypingProgress("");
        return next;
      });

      // If pending, show loading animation for 2 seconds
      if (pending) {
        setTimeout(() => {
          setDisplayedMessages(prev => {
            const lastIndex = prev.length - 1;
            return prev.map((m, idx) => idx === lastIndex ? { ...m, isTyping: false, displayedContent: fullText, pending: false } : m)
          });
          setCurrentTypingIndex(-1);
          setTypingProgress("");
          resolve();
        }, 2000);
        return;
      }

      // Drive typing with a local interval independent of render cycles
      let i = 0;
      const speed = 20; // ms per char
      const tick = () => {
        if (isCancelled) return resolve();
        i += 1;
        const slice = fullText.slice(0, i);
        setTypingProgress(slice);
        if (i >= fullText.length) {
          // Commit final state
          setDisplayedMessages(prev => {
            const lastIndex = prev.length - 1;
            return prev.map((m, idx) => idx === lastIndex ? { ...m, isTyping: false, displayedContent: fullText, pending: false } : m)
          });
          setCurrentTypingIndex(-1);
          setTypingProgress("");
          return resolve();
        }
        setTimeout(tick, speed);
      };
      setTimeout(tick, speed);
    });

    const play = async () => {
      // Reset
      setDisplayedMessages([]);
      setCurrentTypingIndex(-1);
      setTypingProgress("");

      for (let i = 0; i < scriptedConversation.length; i++) {
        if (isCancelled) break;
        const msg = scriptedConversation[i];
        await typeMessage(msg.content, msg.role, msg.pending);
        await new Promise(r => setTimeout(r, 350));
      }
    };

    const start = setTimeout(() => play(), 350);
    return () => { isCancelled = true; clearTimeout(start); };
  }, [scriptedConversation]);

  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      <div className="w-full h-full flex items-center justify-center relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 overflow-visible">
          <div className="grid grid-cols-1 gap-14 items-center lg:grid-cols-12 lg:gap-32 overflow-visible">
            <div className="w-full xl:col-span-5 lg:col-span-6 2xl:-mx-5 xl:-mx-0 overflow-visible">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-4 w-fit rounded-full bg-zinc-600"
              >
                <a
                  href="#"
                  className="flex origin-top-left items-center rounded-full border border-zinc-900 bg-white p-0.5 text-sm transition-transform hover:-rotate-2"
                >
                  <span className="rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-3 py-0.5 font-medium text-white">
                    HEY!
                  </span>
                  <span className="ml-2 mr-1 inline-block font-medium text-gray-900">
                    Development & Content Creation Studio
                  </span>
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 inline-block text-gray-700"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </a>
              </motion.div>

              <div className="py-8 text-center lg:text-left">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-gray-900 font-extrabold text-4xl lg:text-5xl xl:text-6xl leading-tight flex flex-col gap-2"
                >
                  <FlipLink>Transform your</FlipLink>
                  <FlipLink>business with</FlipLink>
                  <FlipLink>powerful web</FlipLink>
                  <FlipLink>solutions</FlipLink>
                </motion.div>
              </div>
            </div>
            
            <div className="w-full lg:col-span-6 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-2xl">
                {/* Animated floating orbs */}
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-gradient-to-br from-indigo-400 to-purple-500 opacity-20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-br from-purple-400 to-pink-500 opacity-20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
                <div className="absolute top-1/2 left-0 w-24 h-24 bg-gradient-to-br from-pink-400 to-indigo-500 opacity-15 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>

                {/* Main Card with enhanced design */}
                <div className="relative rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-[2px] shadow-2xl overflow-hidden">
                  {/* Animated gradient border */}
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-75 animate-pulse"></div>

                  <div className="relative bg-white rounded-3xl p-6 sm:p-8 shadow-inner">
                    {/* Enhanced Browser Header */}
                    <div className="flex items-center gap-2.5 mb-6 pb-4 border-b border-gray-200">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500 shadow-sm hover:scale-110 transition-transform cursor-pointer"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-sm hover:scale-110 transition-transform cursor-pointer"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500 shadow-sm hover:scale-110 transition-transform cursor-pointer"></div>
                      </div>
                      <div className="flex-1 ml-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg px-4 py-2 border border-gray-200">
                        <p className="text-xs text-gray-500 font-medium">🔒 njtechstudio.com/chat</p>
                      </div>
                    </div>

                    {/* Enhanced Chat Interface */}
                    <div className="flex flex-col gap-4">
                      {/* Messages Container */}
                      <div ref={messagesRef} className="bg-gradient-to-br from-gray-50 to-indigo-50/30 rounded-2xl p-4 border border-indigo-100/50 h-[280px] overflow-y-auto flex flex-col gap-3 custom-scrollbar">
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
                                  ? "max-w-[85%] bg-gradient-to-br from-indigo-600 to-indigo-700 text-white rounded-2xl rounded-br-md px-4 py-2.5 text-sm shadow-lg shadow-indigo-500/30 transform hover:scale-[1.02] transition-transform"
                                  : "max-w-[85%] bg-white text-gray-800 border border-gray-200 rounded-2xl rounded-bl-md px-4 py-2.5 text-sm shadow-md hover:shadow-lg transition-shadow"
                              }>
                                {m.pending ? (
                                  <span className="inline-flex items-center gap-2">
                                    <span className="text-sm font-medium">Designing your website</span>
                                    <span className="inline-flex gap-1">
                                      <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" style={{animationDelay: '-0.3s'}}></span>
                                      <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" style={{animationDelay: '-0.15s'}}></span>
                                      <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce"></span>
                                    </span>
                                  </span>
                                ) : (
                                  <span className="leading-relaxed">
                                    {displayText}
                                    {isTypingThisMessage && displayText.length < m.content.length && (
                                      <span className="inline-block w-0.5 h-4 bg-current ml-1 animate-pulse"></span>
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
  );
}
