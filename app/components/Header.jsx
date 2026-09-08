"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useMotionValueEvent, MotionConfig } from "framer-motion";
import MovingTextBg from "./MovingTextBg";
import AudioPlayer from "./AudioPlayer";
import { Menu, X, MessageSquare, Bot, Send, Sparkles, Globe, ChevronUp, Layers } from "lucide-react";
import { useContactModal } from "../context/ContactModalContext";

export default function Navbar() {
  const pathname = usePathname();
  const { openContactModal } = useContactModal();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: "assistant",
      text: "👋 Hi! Thanks for visiting NJTechStudio. Ask me anything about custom Web+AI development, ERP automation, or start your project inquiry!",
    },
  ]);
  const [isNavigating, setIsNavigating] = useState(false);
  const chatEndRef = useRef(null);

  const [hidden, setHidden] = useState(false);
  const router = useRouter();

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isChatOpen) {
      scrollToBottom();
    }
  }, [chatMessages, isChatOpen]);

  const handleLogoClick = async (e) => {
    e?.preventDefault();
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setIsNavigating(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    router.push("/");
    setIsNavigating(false);
  };

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150 && !isMenuOpen) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const getPageName = (path) => {
    if (!path || path === "/") return "Home";
    if (path.startsWith("/about")) return "About";
    if (path.startsWith("/projects")) return "Projects";
    if (path.startsWith("/channel")) return "Channel";
    return "Studio";
  };

  const handleChatSubmit = (e) => {
    e.preventDefault();
    const text = chatInput.trim();
    if (!text) return;

    const userMsg = { id: Date.now(), sender: "user", text };
    const botMsg = {
      id: Date.now() + 1,
      sender: "assistant",
      text: `Thanks for your query: "${text}"! 🚀 Jay Patel from NJ Tech Studio will review your message. Click 'Start A Project' below to share your project details directly!`,
    };

    setChatMessages((prev) => [...prev, userMsg, botMsg]);
    setChatInput("");
    if (!isChatOpen) setIsChatOpen(true);
  };

  const handleQuickPill = (label) => {
    const userMsg = { id: Date.now(), sender: "user", text: `Tell me about ${label}` };
    const botMsg = {
      id: Date.now() + 1,
      sender: "assistant",
      text: `Thanks for inquiring about ${label}! 🚀 Click 'Start A Project' below to submit your project requirements directly.`,
    };
    setChatMessages((prev) => [...prev, userMsg, botMsg]);
    if (!isChatOpen) setIsChatOpen(true);
  };

  // Hide Navbar completely on the admin panel
  if (pathname && pathname.startsWith("/admin")) {
    return null;
  }

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const menuLinks = [
    { label: "Home", href: "/", num: "01", desc: "Return to Homepage" },
    { label: "About", href: "/about", num: "02", desc: "Studio & Founder Bio" },
    { label: "Projects", href: "/projects", num: "03", desc: "Crafted Solutions & Apps" },
    { label: "Channel", href: "/channel", num: "04", desc: "Tech Content & Videos" },
  ];

  const socialLinks = [
    { name: "Instagram", href: "https://www.instagram.com/njtechstudio.in/" },
    { name: "YouTube", href: "https://www.youtube.com/@njtechstudio" },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/jayy19patel/" },
  ];

  return (
    <>
      {/* Top Left Logo Only */}
      <motion.nav
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-0 left-0 w-full z-[100] px-4 sm:px-8 py-6 flex justify-between items-center pointer-events-none"
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="flex items-center justify-center pointer-events-auto bg-black border border-indigo-900 px-4 py-1 rounded-xl shadow-xl"
        >
          <Link href="/" onClick={handleLogoClick} className="flex items-center justify-center">
            <span
              className="font-normal tracking-tight sm:tracking-wide text-2xl sm:text-4xl md:text-5xl leading-[0.85] pt-1 pb-1"
              style={{ fontFamily: "'Jersey 10', sans-serif" }}
            >
              <span className="text-indigo-500">NJ</span>
              <span className="text-white">TechStudio</span>
            </span>
          </Link>
        </motion.div>
      </motion.nav>

      {/* Floating Bottom Dock Container (WHITE THEME) */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[110] w-[95%] max-w-[840px] flex flex-col gap-2.5 pointer-events-auto"
      >
        {/* Top Popover: Studio AI Assistant Card (White Theme) */}
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              className="bg-white border-2 border-zinc-200 text-zinc-900 rounded-2xl p-4 shadow-[0_20px_60px_rgba(0,0,0,0.18)] space-y-3.5 relative overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-md">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-zinc-900 uppercase tracking-tight">
                      Studio AI Assistant
                    </h4>
                    <p className="text-[11px] text-zinc-500 font-semibold">
                      Real-time project & deal intelligence
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsChatOpen(false)}
                  className="w-7 h-7 bg-zinc-100 hover:bg-zinc-200 border border-zinc-300 text-zinc-600 rounded-full flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Close assistant"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable Chat History Log */}
              <div className="max-h-56 overflow-y-auto space-y-2.5 pr-1 scrollbar-thin">
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`p-3 rounded-2xl text-xs font-semibold leading-relaxed max-w-[88%] ${
                        msg.sender === "user"
                          ? "bg-indigo-600 text-white rounded-tr-none shadow-md"
                          : "bg-zinc-100 text-zinc-900 border border-zinc-200 rounded-tl-none shadow-sm"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>

              {/* Quick Action Suggestion Pills */}
              <div className="flex flex-wrap gap-2 pt-1 border-t border-zinc-100">
                <button
                  type="button"
                  onClick={() => handleQuickPill("Web & AI Dev")}
                  className="px-3 py-1.5 bg-zinc-100 hover:bg-black border border-zinc-300 hover:border-black text-zinc-800 hover:text-white rounded-xl text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <span>📊 Web & AI Dev</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickPill("ERP Systems")}
                  className="px-3 py-1.5 bg-zinc-100 hover:bg-black border border-zinc-300 hover:border-black text-zinc-800 hover:text-white rounded-xl text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <span>👥 ERP Systems</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Bottom Card: Single Line Horizontal Dock (WHITE THEME) */}
        <div className="bg-white/95 backdrop-blur-md border-2 border-zinc-200 rounded-full p-2 sm:p-2.5 shadow-[0_20px_60px_rgba(0,0,0,0.18)] flex items-center gap-2 sm:gap-2.5 w-full">
          {/* Left Pill: Logo */}
          <button
            type="button"
            onClick={handleLogoClick}
            className="px-3 sm:px-3.5 py-1.5 sm:py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-[11px] sm:text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 shadow-md shrink-0"
          >
            <Layers className="w-3.5 h-3.5 text-indigo-200" />
            <span className="hidden sm:inline">NJTechStudio</span>
            <span className="sm:hidden">NJ</span>
          </button>

          {/* AI Assistant Input Field (Flexible middle space) */}
          <form onSubmit={handleChatSubmit} className="relative flex items-center flex-1 min-w-[120px]">
            <div className="absolute left-3 text-indigo-600 pointer-events-none flex items-center">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <input
              type="text"
              placeholder="Ask AI Assistant or start inquiry..."
              value={chatInput}
              onFocus={() => setIsChatOpen(true)}
              onChange={(e) => {
                setChatInput(e.target.value);
                if (!isChatOpen) setIsChatOpen(true);
              }}
              className="w-full bg-zinc-100 border border-zinc-200 focus:border-indigo-600 text-zinc-900 text-xs sm:text-sm pl-8 sm:pl-9 pr-9 sm:pr-10 py-1.5 sm:py-2 rounded-full outline-none font-semibold transition-colors placeholder:text-zinc-500 shadow-inner"
            />
            <button
              type="submit"
              className="absolute right-1 w-7 h-7 sm:w-8 sm:h-8 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full flex items-center justify-center shadow-md transition-transform active:scale-95 cursor-pointer"
              aria-label="Send query"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Audio Player, Home & Menu Toggle Controls (Right Group) */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <AudioPlayer />

            {/* Home / Current Page Dropdown Pill & Menu Toggle Group */}
            <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-full p-0.5 shadow-md">
              <button
                type="button"
                onClick={toggleMenu}
                className="px-3 sm:px-3.5 py-1.5 text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 hover:text-indigo-300"
              >
                <Globe className="w-3.5 h-3.5 text-indigo-400" />
                <span>{getPageName(pathname)}</span>
                <ChevronUp className={`w-3.5 h-3.5 transition-transform duration-300 ${isMenuOpen ? "rotate-180" : ""}`} />
              </button>

              <span className="w-[1px] h-4 bg-zinc-700/80 my-auto" />

              <button
                type="button"
                onClick={toggleMenu}
                className="w-7 h-7 sm:w-8 sm:h-8 hover:bg-zinc-800 text-white rounded-full flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Toggle Menu"
              >
                {isMenuOpen ? <X className="w-4 h-4 text-indigo-400" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Fullscreen Menu Overlay */}
      < AnimatePresence >
        {isMenuOpen && (
          <motion.div
            initial={{ clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" }}
            animate={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
            exit={{ clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            className="fixed top-0 left-0 w-screen h-[100dvh] bg-black z-[90] text-white overflow-y-auto"
          >
            {/* No separate close button here - the header button handles it */}

            <MovingTextBg text="MENU ">
              <div className="relative w-full h-full grid grid-cols-1 lg:grid-cols-12 gap-0">
                {/* Left Side - Studio Info Panel */}
                <div className="hidden lg:flex lg:col-span-5 flex-col justify-between p-12 xl:p-16 border-r border-zinc-800/80 bg-zinc-950/90 pt-44 lg:pt-48 xl:pt-52 pb-28 xl:pb-32">
                  <div className="space-y-6">
                    <div className="inline-block px-3 py-1 bg-zinc-900 border border-zinc-700 text-white text-xs font-bold uppercase tracking-widest font-mono shadow-md">
                      // STUDIO PHILOSOPHY
                    </div>
                    
                    <h3 className="text-3xl xl:text-4xl font-black text-white leading-tight">
                      Code with clarity, <br />
                      build with purpose, <br />
                      deliver with joy.
                    </h3>

                    <p className="text-zinc-400 text-sm leading-relaxed max-w-md">
                      We design and develop smart, scalable digital solutions for individuals, startups and growing businesses.
                    </p>
                  </div>

                  <div className="space-y-4 border-t border-zinc-800/80 pt-8">
                    <div className="flex items-center justify-between text-xs text-zinc-400">
                      <span className="uppercase tracking-widest font-mono text-zinc-500">Founder</span>
                      <span className="text-white font-bold">Jay Patel</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-zinc-400">
                      <span className="uppercase tracking-widest font-mono text-zinc-500">Location</span>
                      <span className="text-zinc-200 font-medium">Valsad, Gujarat, India</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-zinc-400">
                      <span className="uppercase tracking-widest font-mono text-zinc-500">Status</span>
                      <span className="text-indigo-400 font-bold flex items-center gap-2">
                        <span className="w-2 h-2 bg-indigo-400 animate-pulse"></span> Open for Projects
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Side - Menu Content */}
                <div className="lg:col-span-7 flex flex-col justify-between h-full pt-36 lg:pt-48 xl:pt-52 px-8 sm:px-12 lg:px-16 pb-28 md:pb-32">
                  <div className="flex-1 flex flex-col justify-center space-y-3 lg:space-y-4 my-auto">
                    {menuLinks.map((link, index) => (
                      <motion.div
                        key={link.label}
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 40 }}
                        transition={{
                          duration: 0.5,
                          delay: 0.2 + index * 0.08,
                          ease: [0.76, 0, 0.24, 1]
                        }}
                      >
                        {link.href === "modal" ? (
                          <button
                            type="button"
                            onClick={() => {
                              toggleMenu();
                              openContactModal();
                            }}
                            className="group flex items-center gap-4 text-4xl sm:text-5xl lg:text-6xl font-black transition-all duration-300 tracking-tight py-2 border-b border-zinc-900/60 text-zinc-500 hover:text-white hover:border-zinc-700 w-full text-left cursor-pointer"
                          >
                            <span className="text-xs sm:text-sm font-mono text-indigo-400 font-bold">
                              {link.num}
                            </span>
                            <span className="inline-block group-hover:translate-x-3 transition-transform duration-300">
                              {link.label}
                            </span>
                            <span className="hidden sm:inline-block text-xs font-mono text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity ml-auto">
                              — {link.desc}
                            </span>
                          </button>
                        ) : (
                          <Link
                            href={link.href}
                            onClick={toggleMenu}
                            className={`group flex items-center gap-4 text-4xl sm:text-5xl lg:text-6xl font-black transition-all duration-300 tracking-tight py-2 border-b border-zinc-900/60 ${
                              pathname === link.href ? 'text-white border-indigo-900' : 'text-zinc-500 hover:text-white hover:border-zinc-700'
                            }`}
                          >
                            <span className="text-xs sm:text-sm font-mono text-indigo-400 font-bold">
                              {link.num}
                            </span>
                            <span className="inline-block group-hover:translate-x-3 transition-transform duration-300">
                              {link.label}
                            </span>
                            <span className="hidden sm:inline-block text-xs font-mono text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity ml-auto">
                              — {link.desc}
                            </span>
                          </Link>
                        )}
                      </motion.div>
                    ))}
                  </div>

                  {/* Social Links */}
                  <div className="pt-8 border-t border-zinc-900">
                    <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-3">
                      Follow Us & Admin
                    </p>
                    <div className="flex flex-wrap gap-x-6 gap-y-2">
                      {socialLinks.map((social) => (
                        <a
                          key={social.name}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-zinc-400 hover:text-white text-xs sm:text-sm font-medium transition-colors"
                        >
                          {social.name}
                        </a>
                      ))}
                      <Link
                        href="/admin"
                        onClick={toggleMenu}
                        className="text-zinc-400 hover:text-white text-xs sm:text-sm font-medium transition-colors"
                      >
                        Admin
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </MovingTextBg>
          </motion.div>
        )
        }
      </AnimatePresence>

      {/* Page Transition Overlay */}
      <AnimatePresence>
        {isNavigating && (
          <motion.div
            initial={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" }}
            animate={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
            exit={{ clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed top-0 left-0 w-screen h-[100dvh] bg-black z-[200] flex items-center justify-center overflow-hidden"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-white text-4xl md:text-6xl font-normal tracking-wider"
              style={{ fontFamily: "'Jersey 10', sans-serif" }}
            >
              NJTechStudio
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
