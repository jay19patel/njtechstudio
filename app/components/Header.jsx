"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useMotionValueEvent, MotionConfig } from "framer-motion";
import MovingTextBg from "./MovingTextBg";
import AudioPlayer from "./AudioPlayer";
import { Menu, X } from "lucide-react";
import { useContactModal } from "../context/ContactModalContext";

export default function Navbar() {
  const pathname = usePathname();
  const { openContactModal } = useContactModal();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredImage, setHoveredImage] = useState(null);
  const [isNavigating, setIsNavigating] = useState(false);

  const [hidden, setHidden] = useState(false);
  const router = useRouter();

  const handleLogoClick = async (e) => {
    e.preventDefault();
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setIsNavigating(true);

    // Wait for enter animation
    await new Promise(resolve => setTimeout(resolve, 800)); // Match transition duration

    router.push("/");

    // Wait for page load/route change then exit
    await new Promise(resolve => setTimeout(resolve, 500));
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



  // Hide Navbar completely on the admin panel. This must come after every
  // hook above so hook call order stays identical across renders.
  if (pathname && pathname.startsWith("/admin")) {
    return null;
  }

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const menuLinks = [
    { label: "Home", href: "/", num: "01", desc: "Return to Homepage" },
    { label: "About", href: "/about", num: "02", desc: "Studio & Founder Bio" },
    { label: "Projects", href: "/projects", num: "03", desc: "Crafted Solutions & Apps" },
    { label: "Channel", href: "/channel", num: "04", desc: "Tech Content & Videos" },
    { label: "Contact", href: "modal", num: "05", desc: "Start A Project Inquiry" },
  ];

  const socialLinks = [
    { name: "Instagram", href: "https://www.instagram.com/njtechstudio.in/" },
    { name: "YouTube", href: "https://www.youtube.com/@njtechstudio" },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/jayy19patel/" }
  ];

  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`fixed top-0 left-0 w-full z-[100] px-6 py-6 flex justify-between items-center pointer-events-none`}
      >

        {/* Unified Container for Mobile / Transparent Wrapper for Desktop */}
        <div className="w-full max-w-7xl mx-auto bg-black sm:bg-transparent border border-indigo-900 sm:border-none px-3 py-2 sm:px-0 sm:py-0 shadow-lg sm:shadow-none flex items-center justify-between pointer-events-auto sm:pointer-events-none">

          {/* Left: Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className={`flex items-center justify-center pointer-events-auto sm:bg-black sm:border sm:border-indigo-900 sm:px-4 sm:py-0 sm:shadow-lg`}
          >
            <Link href="/" onClick={handleLogoClick} className="flex items-center justify-center">
              <span className="font-normal tracking-tight sm:tracking-wide text-2xl sm:text-4xl md:text-5xl leading-[0.85] pt-1 pb-1" style={{ fontFamily: "'Jersey 10', sans-serif" }}>
                <span className="text-indigo-500">NJ</span><span className="text-white">TechStudio</span>
              </span>
            </Link>
          </motion.div>

          {/* Right: Actions Group */}
          <motion.div
            className="flex items-center gap-2 sm:gap-4 pointer-events-auto sm:bg-black sm:border sm:border-indigo-900 sm:px-4 sm:py-2 sm:shadow-lg"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            {/* Info Text & Audio */}
            <div className="flex items-center gap-4">
              {/* Info Text - Hidden on small screens */}
              <motion.div
                initial={{ opacity: 1, x: 0 }}
                animate={{ opacity: 1, x: 0 }}
                className="hidden lg:flex flex-col items-end text-xs font-medium text-white mr-4"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-indigo-500 animate-pulse"></span>
                  <span>Available 9 AM - 6 PM</span>
                </div>
                <div>Valsad, Gujarat, India</div>
              </motion.div>

              {/* Audio Player */}
              <div className={`mr-2 transition-all duration-300 opacity-100 translate-x-0`}>
                <AudioPlayer />
              </div>
            </div>


            {/* Unified Menu/Close Button */}
            <MotionConfig
              transition={{
                duration: 0.5,
                ease: "easeInOut",
              }}
            >
              <motion.button
                initial={false}
                animate={isMenuOpen ? "open" : "closed"}
                onClick={toggleMenu}
                whileTap={{ scale: 0.95 }}
                className="relative h-10 w-10 border border-zinc-700 bg-zinc-900 z-[110]"
                aria-label="Toggle menu"
              >
                <motion.span
                  variants={{
                    open: {
                      rotate: ["0deg", "0deg", "45deg"],
                      top: ["35%", "50%", "50%"],
                    },
                    closed: {
                      rotate: ["45deg", "0deg", "0deg"],
                      top: ["50%", "50%", "35%"],
                    },
                  }}
                  className="absolute h-[2px] w-6 bg-white"
                  style={{ y: "-50%", left: "50%", x: "-50%", top: "35%" }}
                />
                <motion.span
                  variants={{
                    open: {
                      rotate: ["0deg", "0deg", "-45deg"],
                    },
                    closed: {
                      rotate: ["-45deg", "0deg", "0deg"],
                    },
                  }}
                  className="absolute h-[2px] w-6 bg-white"
                  style={{ left: "50%", x: "-50%", top: "50%", y: "-50%" }}
                />
                <motion.span
                  variants={{
                    open: {
                      rotate: ["0deg", "0deg", "45deg"],
                      bottom: ["35%", "50%", "50%"],
                      left: "50%",
                    },
                    closed: {
                      rotate: ["45deg", "0deg", "0deg"],
                      bottom: ["50%", "50%", "35%"],
                      left: "calc(50% + 10px)",
                    },
                  }}
                  className="absolute h-[2px] w-4 bg-white"
                  style={{
                    x: "-50%",
                    y: "50%",
                    bottom: "35%",
                    left: "calc(50% + 10px)",
                  }}
                />
              </motion.button>
            </MotionConfig>
          </motion.div>
        </div>
      </motion.nav>

      {/* Fullscreen Menu Overlay */}
      < AnimatePresence >
        {isMenuOpen && (
          <motion.div
            initial={{ clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" }}
            animate={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
            exit={{ clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 bg-black z-[90] text-white"
          >
            {/* No separate close button here - the header button handles it */}

            <MovingTextBg text="MENU ">
              <div className="relative w-full h-full grid grid-cols-1 lg:grid-cols-12 gap-0">
                {/* Left Side - Studio Info Panel */}
                <div className="hidden lg:flex lg:col-span-5 flex-col justify-between p-12 xl:p-16 border-r border-zinc-800/80 bg-zinc-950/90 pt-44 lg:pt-48 xl:pt-52">
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

                  <div className="space-y-4 border-t border-zinc-800/80 pt-8 pb-12">
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
                <div className="lg:col-span-7 flex flex-col justify-between h-full pt-36 lg:pt-48 xl:pt-52 px-8 sm:px-12 lg:px-16 pb-12">
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
            className="fixed inset-0 bg-black z-[200] flex items-center justify-center"
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
