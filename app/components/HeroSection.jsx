"use client";

import { useState, useEffect, useRef, useMemo } from "react";

// Mock API - Replace with your actual API
const api = {
  getProjects: async (query = null, offset = 0, limit = 10, filter = null) => {
    // Mock implementation - replace with actual API call
    return { projects: [] };
  },
  getStats: async () => {
    // Mock implementation - replace with actual API call
    return {
      total_clients: 0,
      total_projects: 0,
      satisfaction_rate: 0
    };
  }
};

export default function HeroSection() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      return;
    }
    
    setIsSubmitting(true);
    try {
      // Handle email submission here
      console.log("Email submitted:", email);
      // You can add your API call here
      setEmail("");
    } catch (error) {
      console.error("Error submitting email:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
    <section className="pt-0 lg:pt-8 lg:px-8 h-full overflow-visible">
      <div className="rounded-2xl py-10 overflow-visible m-5 lg:m-0 2xl:py-16 xl:py-8 lg:rounded-tl-2xl lg:rounded-bl-2xl relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 overflow-visible">
          <div className="grid grid-cols-1 gap-14 items-center lg:grid-cols-12 lg:gap-32 overflow-visible">
            <div className="w-full xl:col-span-5 lg:col-span-6 2xl:-mx-5 xl:-mx-0 overflow-visible">
              <div className="inline-flex items-center space-x-2.5 border border-gray-500/30 rounded-full bg-gray-500/10 p-1 text-sm text-gray-800">
                <div className="bg-white border border-gray-500/30 rounded-2xl px-3 py-1">
                  <p className="text-xs font-medium">#1</p>
                </div>
                <p className="pr-3 text-xs">IT & Web Development Agency</p>
              </div>

              <h1 className="py-8 text-center text-gray-900 font-extrabold text-4xl lg:text-5xl lg:text-left leading-tight" >
                Transform your business with{" "}
                <br className="hidden lg:block" />
                <span className="text-indigo-600">powerful web solutions</span>
              </h1>

              <p className="text-gray-500 text-lg text-center lg:text-left">
                We create modern, scalable websites and web applications tailored to your business needs. From design to deployment, we deliver excellence with smooth communication and fast delivery.
              </p>

              <div className="relative my-10">
                <form onSubmit={handleEmailSubmit}>
                  <div className="relative p-1.5 flex items-center gap-y-4 h-auto md:h-16 flex-col md:flex-row justify-between rounded-full md:shadow-[0px_15px_30px_-4px_rgba(16,24,40,0.03)] md:border md:bg-white transition-all duration-500 md:border-indigo-600 md:hover:border-indigo-200 md:focus-within:border-indigo-600">
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Just send me your email, I'll create content and send you a summary"
                      className="text-base rounded-full text-gray-900 flex-1 py-4 px-6 shadow-[0px_15px_30px_-4px_rgba(16,24,40,0.03)] md:shadow-none bg-white md:bg-transparent border border-indigo-600 md:border-0 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-0 md:focus:ring-0 md:w-fit w-full"
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-indigo-600 rounded-full py-3 px-7 text-base font-semibold text-white hover:bg-indigo-700 cursor-pointer transition-all duration-500 md:w-fit w-full text-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Sending..." : "Send Summary"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
            
            <div className="w-full lg:col-span-6 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-2xl">
                {/* Floating elements */}
                <div className="absolute -top-6 -left-6 w-20 h-20 bg-indigo-400/20 rounded-full blur-2xl animate-pulse"></div>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-purple-400/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
                
                {/* Main Card */}
                <div className="relative rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-1 shadow-2xl">
                  <div className="bg-white rounded-3xl p-8 shadow-inner">
                    {/* Browser Header */}
                    <div className="flex items-center gap-2.5 mb-6 pb-4 border-b border-gray-200">
                      <div className="w-3.5 h-3.5 rounded-full bg-red-500 shadow-sm"></div>
                      <div className="w-3.5 h-3.5 rounded-full bg-yellow-500 shadow-sm"></div>
                      <div className="w-3.5 h-3.5 rounded-full bg-green-500 shadow-sm"></div>
                      <div className="flex-1 ml-4 bg-gray-100 rounded-lg px-4 py-1.5">
                        <p className="text-xs text-gray-400">njtechstudio.com/contact</p>
                      </div>
                    </div>
                    
                    {/* Chat-like generator */}
                    <div className="flex flex-col gap-4">
                      {/* Messages */}
                      <div ref={messagesRef} className="bg-gray-50 rounded-xl p-4 border-2 border-indigo-100 h-[280px] overflow-y-auto flex flex-col gap-3">
                        {displayedMessages.map((m, idx) => {
                          // Determine what to display
                          let displayText = m.displayedContent;
                          const isTypingThisMessage = idx === currentTypingIndex && m.isTyping;
                          if (isTypingThisMessage) {
                            displayText = typingProgress;
                          }

                          return (
                            <div key={idx} className={m.align === "right" ? "flex justify-end" : "flex justify-start"}>
                              <div className={
                                m.align === "right"
                                  ? "max-w-[85%] bg-indigo-600 text-white rounded-2xl rounded-br-sm px-3 py-2 text-sm"
                                  : "max-w-[85%] bg-white text-gray-800 border border-gray-200 rounded-2xl rounded-bl-sm px-3 py-2 text-sm"
                              }>
                                {m.pending ? (
                                  <span className="inline-flex items-center gap-1">
                                    Designing
                                    <span className="inline-flex gap-1">
                                      <span className="w-1 h-1 bg-current rounded-full animate-bounce [animation-delay:-0.2s]"></span>
                                      <span className="w-1 h-1 bg-current rounded-full animate-bounce"></span>
                                      <span className="w-1 h-1 bg-current rounded-full animate-bounce [animation-delay:0.2s]"></span>
                                    </span>
                                  </span>
                                ) : (
                                  <span>
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
                      {/* No input — pure simulation */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trusted Clients Marquee */}
      <style>{`
        .marquee-inner {
          animation: marqueeScroll 20s linear infinite;
        }
        @keyframes marqueeScroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
      <div className="mt-4 lg:mt-6 pb-4 lg:pb-6 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div 
          className="overflow-hidden w-full relative select-none"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)'
          }}
        >
          <div className="flex marquee-inner will-change-transform items-center">
            {[
              { name: "Framer", logo: "https://saasly.prebuiltui.com/assets/companies-logo/framer.svg" },
              { name: "Huawei", logo: "https://saasly.prebuiltui.com/assets/companies-logo/huawei.svg" },
              { name: "Instagram", logo: "https://saasly.prebuiltui.com/assets/companies-logo/instagram.svg" },
              { name: "Microsoft", logo: "https://saasly.prebuiltui.com/assets/companies-logo/microsoft.svg" },
              { name: "Walmart", logo: "https://saasly.prebuiltui.com/assets/companies-logo/walmart.svg" },
              { name: "Framer", logo: "https://saasly.prebuiltui.com/assets/companies-logo/framer.svg" },
              { name: "Huawei", logo: "https://saasly.prebuiltui.com/assets/companies-logo/huawei.svg" },
              { name: "Instagram", logo: "https://saasly.prebuiltui.com/assets/companies-logo/instagram.svg" },
              { name: "Microsoft", logo: "https://saasly.prebuiltui.com/assets/companies-logo/microsoft.svg" },
              { name: "Walmart", logo: "https://saasly.prebuiltui.com/assets/companies-logo/walmart.svg" }
            ].map((company, index) => (
              <img 
                key={index} 
                className="mx-4 lg:mx-6 h-6 lg:h-8 object-contain opacity-60 hover:opacity-100 transition-opacity flex-shrink-0" 
                src={company.logo} 
                alt={company.name} 
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
