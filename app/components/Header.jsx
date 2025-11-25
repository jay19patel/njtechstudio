"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import MovingTextBg from "./MovingTextBg";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredImage, setHoveredImage] = useState(null);
  const pathname = usePathname();

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
      label: "Tech Skills",
      href: "/tech-skills",
      image: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?auto=format&fit=crop&w=900&q=60"
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
      {/* Navbar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-4 left-0 right-0 z-[100] px-4"
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
          className="bg-black text-white max-w-80 mx-auto rounded-lg px-4 sm:px-6 lg:px-8 shadow-lg backdrop-blur-sm"
        >
          <div className="flex items-center justify-between h-12">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
              className="shrink-0"
            >
              <Link href="/" className="flex items-center">
                <Image
                  src="/Logo.png"
                  alt="NJ Tech Studio"
                  width={100}
                  height={28}
                  className="h-6 w-auto object-contain"
                  priority
                />
              </Link>
            </motion.div>

            {/* Menu Button with Icon */}
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
                className="relative h-10 w-10 rounded-full"
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
          </div>
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
            className="fixed inset-0 bg-black z-[90]"
            style={{ transformStyle: "preserve-3d" }}
          >
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
                  {/* Main Navigation Links */}
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
                          className={`block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold transition-colors duration-500 tracking-tighter leading-[1.1] group relative ${pathname === link.href ? 'text-white' : 'text-indigo-400/60 hover:text-white'
                            }`}
                        >
                          <span className={`inline-block group-hover:translate-x-3 transition-transform duration-500 ${pathname === link.href ? 'translate-x-3' : ''
                            }`}>
                            {link.label}
                          </span>
                          <span className={`absolute bottom-2 left-0 h-[3px] bg-white transition-all duration-700 ease-out ${pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                            }`}></span>
                        </Link>
                      </motion.div>
                    ))}
                  </div>

                  {/* Social Links - Bottom of right side */}
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
                            className="inline-block text-indigo-200/50 hover:text-white text-sm transition-colors duration-300 relative group"
                          >
                            {social.name}
                            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-300"></span>
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
