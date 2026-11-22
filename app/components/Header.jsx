"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import AudioPlayer from "./AudioPlayer";
import { Menu, X, Send, Sparkles, Globe, ChevronUp, Layers } from "lucide-react";
import { useContactModal } from "../context/ContactModalContext";
import { useStudioChat } from "@/hooks/use-studio-chat";
import StudioChat from "./StudioChat";

export default function Navbar() {
  const pathname = usePathname();
  const { openContactModal } = useContactModal();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const chat = useStudioChat();
  const [isNavigating, setIsNavigating] = useState(false);

  const [hidden, setHidden] = useState(false);
  const router = useRouter();

  const { load: loadChat } = chat;
  useEffect(() => {
    if (!isChatOpen) return;
    loadChat();
    const onKey = (e) => e.key === "Escape" && setIsChatOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isChatOpen, loadChat]);

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
    if (path.startsWith("/blog")) return "Blog";
    return "Studio";
  };

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!chatInput.trim() || chat.busy) return;
    chat.send(chatInput);
    setChatInput("");
    setIsChatOpen(true);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const menuLinks = [
    { label: "Home", href: "/", num: "01", desc: "Return to Homepage" },
    { label: "About", href: "/about", num: "02", desc: "Studio & Founder Bio" },
    { label: "Projects", href: "/projects", num: "03", desc: "Crafted Solutions & Apps" },
    { label: "Blog", href: "/blog", num: "04", desc: "Articles & Studio Notes" },
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
          className="flex items-center justify-center pointer-events-auto bg-white border border-zinc-200 px-4 py-1 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
        >
          <Link href="/" onClick={handleLogoClick} className="flex items-center justify-center">
            <span
              className="font-normal tracking-tight sm:tracking-wide text-2xl sm:text-4xl md:text-5xl leading-[0.85] pt-1 pb-1"
              style={{ fontFamily: "'Jersey 10', sans-serif" }}
            >
              <span className="text-indigo-600">NJ</span>
              <span className="text-zinc-900">TechStudio</span>
            </span>
          </Link>
        </motion.div>
      </motion.nav>

      {/* Floating Bottom Dock Container (WHITE THEME - RESPONSIVE) */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-[110] w-[92%] sm:w-[95%] max-w-[840px] flex flex-col gap-2.5 pointer-events-auto"
      >
        {/* Top Popover: Studio AI Assistant Card (White Theme) */}
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              className="bg-white/95 backdrop-blur-xl border border-zinc-200/80 text-zinc-900 rounded-3xl p-4 shadow-[0_12px_40px_rgba(0,0,0,0.08)] space-y-3.5 relative overflow-hidden"
            >
              <StudioChat chat={chat} onClose={() => setIsChatOpen(false)} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Bottom Card: Modern Minimalist Dock */}
        <div className="bg-white/90 backdrop-blur-xl border border-zinc-200/80 rounded-[1.5rem] sm:rounded-full p-2 shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex flex-wrap sm:flex-nowrap items-center gap-2 w-full transition-all duration-300">
          
          {/* Logo (Order 1 on mobile, Order 1 on desktop) */}
          <button
            type="button"
            onClick={handleLogoClick}
            className="order-1 shrink-0 px-3 sm:px-4 py-1.5 sm:py-2 bg-zinc-900 hover:bg-black text-white rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
          >
            <Layers className="w-3.5 h-3.5 text-zinc-300" />
            <span className="hidden sm:inline">NJTechStudio</span>
            <span className="sm:hidden">NJTech</span>
          </button>

          {/* Audio Player, Home & Menu Toggle Controls (Order 2 on mobile, Order 3 on desktop) */}
          <div className="order-2 sm:order-3 ml-auto sm:ml-0 flex items-center gap-1.5 sm:gap-2 shrink-0">
            <AudioPlayer />

            {/* Menu Toggle Group */}
            <div className="flex items-center bg-zinc-50 border border-zinc-200/80 rounded-full p-0.5 shadow-sm">
              <button
                type="button"
                onClick={toggleMenu}
                className="px-3 py-1.5 text-zinc-700 hover:text-zinc-900 text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Globe className="w-3.5 h-3.5 text-indigo-500" />
                <span>{getPageName(pathname)}</span>
                <ChevronUp className={`w-3.5 h-3.5 transition-transform duration-300 ${isMenuOpen ? "rotate-180" : ""}`} />
              </button>

              <span className="w-[1px] h-4 bg-zinc-200 my-auto" />

              <button
                type="button"
                onClick={toggleMenu}
                className="w-7 h-7 sm:w-8 sm:h-8 bg-white hover:bg-zinc-50 border border-zinc-200/80 text-zinc-900 rounded-full flex items-center justify-center shadow-sm transition-colors cursor-pointer"
                aria-label="Toggle Menu"
              >
                {isMenuOpen ? <X className="w-4 h-4 text-indigo-600" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* AI Assistant Input Field (Order 3 on mobile, Order 2 on desktop) */}
          <form onSubmit={handleChatSubmit} className="order-3 sm:order-2 w-full sm:flex-1 relative flex items-center mt-1 sm:mt-0 min-w-[150px]">
            <div className="absolute left-3 text-indigo-500 pointer-events-none flex items-center">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <input
              type="text"
              placeholder={chat.busy ? "Assistant is replying…" : "Ask AI Assistant or start inquiry..."}
              maxLength={2000}
              aria-label="Message the AI assistant"
              value={chatInput}
              onFocus={() => setIsChatOpen(true)}
              onChange={(e) => {
                setChatInput(e.target.value);
                if (!isChatOpen) setIsChatOpen(true);
              }}
              className="w-full bg-zinc-50 hover:bg-zinc-100/50 border border-zinc-200/80 focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 text-zinc-900 text-xs sm:text-sm pl-8 sm:pl-9 pr-9 sm:pr-10 py-2 sm:py-2.5 rounded-full outline-none font-semibold transition-all placeholder:text-zinc-400 shadow-inner"
            />
            <button
              type="submit"
              disabled={chat.busy || !chatInput.trim()}
              className="disabled:opacity-50 disabled:cursor-not-allowed absolute right-1 w-7 h-7 sm:w-8 sm:h-8 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full flex items-center justify-center shadow-md transition-transform active:scale-95 cursor-pointer"
              aria-label="Send query"
            >
              <Send className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>
          </form>

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
            className="fixed top-0 left-0 w-screen h-[100dvh] bg-[#fcfcfd] z-[90] text-zinc-900 overflow-y-auto"
          >
            {/* No separate close button here - the header button handles it */}

            <div className="relative w-full h-full grid grid-cols-1 lg:grid-cols-12 gap-0">
              {/* Left Side - Studio Info Panel */}
              <div className="hidden lg:flex lg:col-span-5 flex-col justify-between p-12 xl:p-16 border-r border-zinc-200 bg-white pt-44 lg:pt-48 xl:pt-52 pb-28 xl:pb-32 shadow-[0_8px_30px_rgb(0,0,0,0.02)] z-10">
                <div className="space-y-6">
                  <div className="inline-block px-3 py-1 bg-zinc-50 border border-zinc-200 text-zinc-500 text-xs font-bold uppercase tracking-widest font-mono shadow-sm">
                    {"// STUDIO PHILOSOPHY"}
                  </div>
                  
                  <h3 className="text-3xl xl:text-4xl font-black text-zinc-900 leading-tight">
                    Code with clarity, <br />
                    build with purpose, <br />
                    deliver with joy.
                  </h3>

                  <p className="text-zinc-500 text-sm leading-relaxed max-w-md">
                    We design and develop smart, scalable digital solutions for individuals, startups and growing businesses.
                  </p>
                </div>

                <div className="space-y-4 border-t border-zinc-200 pt-8">
                  <div className="flex items-center justify-between text-xs text-zinc-500">
                    <span className="uppercase tracking-widest font-mono">Founder</span>
                    <span className="text-zinc-900 font-bold">Jay Patel</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-zinc-500">
                    <span className="uppercase tracking-widest font-mono">Location</span>
                    <span className="text-zinc-900 font-medium">Valsad, Gujarat, India</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-zinc-500">
                    <span className="uppercase tracking-widest font-mono">Status</span>
                    <span className="text-indigo-600 font-bold flex items-center gap-2">
                      <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span> Open for Projects
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Side - Menu Content */}
              <div className="lg:col-span-7 flex flex-col justify-between h-full pt-36 lg:pt-48 xl:pt-52 px-8 sm:px-12 lg:px-16 pb-28 md:pb-32 bg-[#fcfcfd]">
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
                          className="group flex items-center gap-4 text-4xl sm:text-5xl lg:text-6xl font-black transition-all duration-300 tracking-tight py-2 border-b border-zinc-200 text-zinc-400 hover:text-zinc-900 hover:border-zinc-400 w-full text-left cursor-pointer"
                        >
                          <span className="text-xs sm:text-sm font-mono text-indigo-500 font-bold">
                            {link.num}
                          </span>
                          <span className="inline-block group-hover:translate-x-3 transition-transform duration-300">
                            {link.label}
                          </span>
                          <span className="hidden sm:inline-block text-xs font-mono text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity ml-auto">
                            — {link.desc}
                          </span>
                        </button>
                      ) : (
                        <Link
                          href={link.href}
                          onClick={toggleMenu}
                          className={`group flex items-center gap-4 text-4xl sm:text-5xl lg:text-6xl font-black transition-all duration-300 tracking-tight py-2 border-b border-zinc-200 ${
                            pathname === link.href ? 'text-zinc-900 border-indigo-200' : 'text-zinc-400 hover:text-zinc-900 hover:border-zinc-400'
                          }`}
                        >
                          <span className="text-xs sm:text-sm font-mono text-indigo-500 font-bold">
                            {link.num}
                          </span>
                          <span className="inline-block group-hover:translate-x-3 transition-transform duration-300">
                            {link.label}
                          </span>
                          <span className="hidden sm:inline-block text-xs font-mono text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity ml-auto">
                            — {link.desc}
                          </span>
                        </Link>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Social Links */}
                <div className="pt-8 border-t border-zinc-200">
                  <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest mb-3">
                    Follow Us & Admin
                  </p>
                  <div className="flex flex-wrap gap-x-6 gap-y-2">
                    {socialLinks.map((social) => (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-500 hover:text-zinc-900 text-xs sm:text-sm font-medium transition-colors"
                      >
                        {social.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
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
