"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useMotionValueEvent, MotionConfig } from "framer-motion";
import MovingTextBg from "./MovingTextBg";
import AudioPlayer from "./AudioPlayer";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredImage, setHoveredImage] = useState(null);
  const [isNavigating, setIsNavigating] = useState(false);

  const [hidden, setHidden] = useState(false);
  const pathname = usePathname();
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



  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const menuLinks = [
    {
      label: "Home",
      href: "/",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=60"
    },
    {
      label: "Projects",
      href: "/projects",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=60"
    },
    {
      label: "Join Us",
      href: "/join-us",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=60"
    },
    {
      label: "Contact",
      href: "/contact",
      image: "https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=900&q=60"
    },
  ];

  const socialLinks = [
    { name: "Behance", href: "https://behance.net" },
    { name: "Instagram", href: "https://instagram.com" },
    { name: "LinkedIn", href: "https://linkedin.com" },
    { name: "Twitter", href: "https://twitter.com" }
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

        {/* Left: Logo (Pointer Events Auto to catch clicks) */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: isMenuOpen ? 0 : 1, x: isMenuOpen ? -100 : 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={`pointer-events-auto bg-black border border-indigo-500/50 rounded-md px-2 py-0 shadow-lg flex items-center justify-center ${isMenuOpen ? 'pointer-events-none' : ''}`}
        >
          <Link href="/" onClick={handleLogoClick} className="flex items-center justify-center">
            <span className="font-normal tracking-wide text-5xl leading-[0.85] pt-1 pb-1" style={{ fontFamily: "'Jersey 10', sans-serif" }}>
              <span className="text-indigo-500">NJ</span><span className="text-white">TechStudio</span>
            </span>
          </Link>
        </motion.div>

        {/* Right: Actions Group */}
        <motion.div
          className="flex items-center gap-4 pointer-events-auto bg-black border border-indigo-500/50 rounded-md px-4 py-2 shadow-lg"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          {/* Info Text & Audio - Hidden when Menu is Open to avoid clutter/overlap */}
          <div className="flex items-center gap-4">
            {/* Info Text - Hidden when Menu is Open */}
            {/* Info Text - Always Visible */}
            <motion.div
              initial={{ opacity: 1, x: 0 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden lg:flex flex-col items-end text-xs font-medium text-white mr-4"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                <span>Available 9 AM - 6 PM</span>
              </div>
              <div>Valsad, Gujarat, India</div>
            </motion.div>

            {/* Audio Player - Persisted in DOM but hidden when menu is open */}
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
              className="relative h-10 w-10 rounded-full z-[110]"
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
              <div className="relative w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Left Side - Preview Image */}
                <div className="hidden lg:flex items-center justify-center p-12 xl:p-16 border-r border-white/10">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    exit={{ opacity: 0, scale: 0.8, rotateY: 15 }}
                    transition={{ duration: 1, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
                    className="relative w-full max-w-sm aspect-[3/4] rounded-xl overflow-hidden shadow-2xl"
                    style={{ perspective: "1000px" }}
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={hoveredImage || menuLinks[0].image}
                        initial={{ opacity: 0, scale: 1.1, rotateY: 10 }}
                        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                        exit={{ opacity: 0, scale: 0.9, rotateY: -10 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="relative w-full h-full"
                      >
                        <Image
                          src={hoveredImage || menuLinks[0].image}
                          alt="Preview"
                          fill
                          className="object-cover"
                        />
                      </motion.div>
                    </AnimatePresence>
                  </motion.div>
                </div>

                {/* Right Side - Menu Content */}
                <div className="flex flex-col h-full">
                  <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 lg:px-16 py-16 gap-2 lg:gap-3">
                    {menuLinks.map((link, index) => (
                      <motion.div
                        key={link.label}
                        initial={{ opacity: 0, y: 100, rotateX: -90 }}
                        animate={{ opacity: 1, y: 0, rotateX: 0 }}
                        exit={{ opacity: 0, y: -80, rotateX: 90 }}
                        transition={{
                          duration: 0.8,
                          delay: 0.4 + index * 0.1,
                          ease: [0.76, 0, 0.24, 1]
                        }}
                        className="overflow-hidden"
                        style={{ perspective: "1000px" }}
                      >
                        <Link
                          href={link.href}
                          onClick={toggleMenu}
                          onMouseEnter={() => setHoveredImage(link.image)}
                          onMouseLeave={() => setHoveredImage(null)}
                          className={`block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold transition-colors duration-500 tracking-tighter leading-[1.1] group relative ${pathname === link.href ? 'text-white' : 'text-zinc-600 hover:text-white'}`}
                        >
                          <span className="inline-block group-hover:translate-x-3 transition-transform duration-500">
                            {link.label}
                          </span>
                        </Link>
                      </motion.div>
                    ))}
                  </div>

                  {/* Social Links */}
                  <div className="px-8 sm:px-12 lg:px-16 pb-24 lg:pb-32">
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                      className="text-white/40 text-xs uppercase tracking-widest mb-4"
                    >
                      Follow Us
                    </motion.p>
                    <div className="flex flex-wrap gap-x-6 gap-y-2">
                      {socialLinks.map((social, index) => (
                        <motion.div
                          key={social.name}
                          initial={{ opacity: 0, x: -40 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -40 }}
                          transition={{
                            duration: 0.6,
                            delay: 0.9 + index * 0.08,
                            ease: [0.76, 0, 0.24, 1]
                          }}
                        >
                          <a
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block text-zinc-400 hover:text-white text-sm transition-colors duration-300 relative group"
                          >
                            {social.name}
                          </a>
                        </motion.div>
                      ))}
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
