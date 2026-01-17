"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import MovingTextBg from "./MovingTextBg";
import AudioPlayer from "./AudioPlayer";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredImage, setHoveredImage] = useState(null);

  const [hidden, setHidden] = useState(false);
  const pathname = usePathname();

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
        className={`fixed top-0 left-0 w-full z-[100] px-6 py-6 flex justify-between items-center text-white mix-blend-difference pointer-events-none`}
      >

        {/* Left: Logo (Pointer Events Auto to catch clicks) */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="pointer-events-auto"
        >
          <Link href="/" className="flex items-center">
            <Image
              src="/Logo.png"
              alt="NJ Tech Studio"
              width={120}
              height={32}
              className="h-8 w-auto object-contain invert"
              priority
            />
          </Link>
        </motion.div>

        {/* Right: Actions Group */}
        <motion.div
          className="flex items-center gap-4 pointer-events-auto"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          {/* Info Text & Audio - Hidden when Menu is Open to avoid clutter/overlap */}
          <div className="flex items-center gap-4">
            {/* Info Text - Hidden when Menu is Open */}
            <AnimatePresence>
              {!isMenuOpen && (
                <motion.div
                  initial={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="hidden lg:flex flex-col items-end text-xs font-medium opacity-80 mr-4"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
                    <span>Available 9 AM - 6 PM</span>
                  </div>
                  <div>Valsad, Gujarat, India</div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Audio Player - Persisted in DOM but hidden when menu is open */}
            <div className={`mr-2 transition-all duration-300 ${isMenuOpen ? 'opacity-0 pointer-events-none translate-x-10' : 'opacity-100 translate-x-0'}`}>
              <AudioPlayer />
            </div>
          </div>


          {/* Unified Menu/Close Button */}
          <motion.button
            onClick={toggleMenu}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`w-12 h-12 flex items-center justify-center transition-all duration-300 rounded-sm z-[110] relative ${isMenuOpen ? 'bg-white text-purple-600 hover:bg-gray-100' : 'bg-purple-600 hover:bg-purple-700 text-white'}`}
          >
            <motion.div
              key={isMenuOpen ? "close" : "menu"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.div>
          </motion.button>
        </motion.div>
      </motion.nav>

      {/* Fullscreen Menu Overlay */}
      <AnimatePresence>
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
        )}
      </AnimatePresence>
    </>
  );
}
