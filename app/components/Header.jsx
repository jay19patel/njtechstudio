"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredImage, setHoveredImage] = useState(null);
  const pathname = usePathname();

  const overlayRef = useRef(null);
  const heroRef = useRef(null);
  const heroImageRef = useRef(null);
  const heroTextRef = useRef(null);
  const linksRef = useRef([]);
  const socialsRef = useRef([]);
  const followUsTextRef = useRef(null);
  const previewRef = useRef(null);
  const footerLinksRef = useRef([]);

  useEffect(() => {
    const loadGSAP = async () => {
      const gsap = (await import("gsap")).default;

      if (isMenuOpen) {
        // ========== MENU OPEN - TILT ANIMATION ==========

        // Hero section - scale down and tilt back
        gsap.to(heroRef.current, {
          scale: 0.85,
          rotationX: 8,
          y: 20,
          borderRadius: "24px",
          duration: 1.2,
          ease: "power3.inOut",
          transformPerspective: 1500,
          transformOrigin: "center center"
        });

        gsap.to(heroImageRef.current, {
          scale: 1.15,
          duration: 1.2,
          ease: "power3.inOut"
        });

        gsap.to(heroTextRef.current, {
          opacity: 0,
          y: 80,
          duration: 0.7,
          ease: "power2.in"
        });

        // Overlay - slide UP from BOTTOM with 3D rotation tilt
        gsap.fromTo(
          overlayRef.current,
          {
            clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
            rotationX: -10,
            transformOrigin: "bottom center",
            transformPerspective: 2000
          },
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            rotationX: 0,
            duration: 1.3,
            ease: "power4.inOut"
          }
        );

        // Links - flip in
        gsap.fromTo(
          linksRef.current.filter(Boolean),
          {
            opacity: 0,
            y: 100,
            rotateX: -90
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1,
            stagger: 0.12,
            delay: 0.5,
            ease: "power3.out",
            transformPerspective: 1000
          }
        );

        // Follow Us text
        gsap.fromTo(
          followUsTextRef.current,
          {
            opacity: 0,
            y: 20
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.9,
            ease: "power2.out"
          }
        );

        // Social links
        gsap.fromTo(
          socialsRef.current.filter(Boolean),
          {
            opacity: 0,
            x: -40
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.08,
            delay: 1,
            ease: "power2.out"
          }
        );

        // Preview image
        if (previewRef.current) {
          gsap.fromTo(
            previewRef.current,
            {
              opacity: 0,
              scale: 0.8,
              rotateY: -15
            },
            {
              opacity: 1,
              scale: 1,
              rotateY: 0,
              duration: 1.2,
              delay: 0.6,
              ease: "power3.out",
              transformPerspective: 1000
            }
          );
        }

        // Footer links
        gsap.fromTo(
          footerLinksRef.current.filter(Boolean),
          {
            opacity: 0,
            y: 30
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            delay: 1.1,
            ease: "power2.out"
          }
        );

      } else {
        // ========== MENU CLOSE - REVERSE TILT ANIMATION ==========

        // Links out
        gsap.to(linksRef.current.filter(Boolean), {
          opacity: 0,
          y: -80,
          rotateX: 90,
          duration: 0.5,
          stagger: 0.05,
          ease: "power2.in"
        });

        gsap.to(followUsTextRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.4,
          ease: "power2.in"
        });

        gsap.to(socialsRef.current.filter(Boolean), {
          opacity: 0,
          x: -40,
          duration: 0.4,
          ease: "power2.in"
        });

        gsap.to(footerLinksRef.current.filter(Boolean), {
          opacity: 0,
          y: 30,
          duration: 0.4,
          ease: "power2.in"
        });

        if (previewRef.current) {
          gsap.to(previewRef.current, {
            opacity: 0,
            scale: 0.8,
            rotateY: 15,
            duration: 0.5,
            ease: "power2.in"
          });
        }

        // Overlay - slide DOWN to BOTTOM with 3D rotation tilt
        gsap.to(overlayRef.current, {
          clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
          rotationX: -10,
          transformOrigin: "bottom center",
          duration: 1.1,
          delay: 0.4,
          ease: "power4.inOut"
        });

        // Hero section - return to normal
        gsap.to(heroRef.current, {
          scale: 1,
          rotationX: 0,
          y: 0,
          borderRadius: "0px",
          duration: 1.1,
          delay: 0.3,
          ease: "power3.inOut"
        });

        gsap.to(heroImageRef.current, {
          scale: 1,
          duration: 1.1,
          delay: 0.3,
          ease: "power3.inOut"
        });

        gsap.to(heroTextRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.7,
          ease: "power2.out"
        });
      }
    };

    loadGSAP();
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const menuLinks = [
    {
      label: "Home",
      href: "/",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=60"
    },
    {
      label: "Solutions",
      href: "/solutions",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=60"
    },
    {
      label: "Tech Skills",
      href: "/tech-skills",
      image: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?auto=format&fit=crop&w=900&q=60"
    },
    {
      label: "FAQ",
      href: "/faq",
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
      <nav className="fixed top-4 left-0 right-0 z-[100] px-4">
        <div className="bg-black text-white max-w-80 mx-auto rounded-lg px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            {/* Logo */}
            <div className="shrink-0">
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
            </div>

            {/* Menu Button with Icon */}
            <button
              onClick={toggleMenu}
              className="relative w-8 h-8 text-white cursor-pointer group z-[110] flex items-center justify-center"
              aria-label="Toggle menu"
            >
              {/* Hamburger Icon */}
              <div
                className={`absolute transition-all duration-500 ease-out ${
                  isMenuOpen
                    ? "opacity-0 rotate-90 scale-75"
                    : "opacity-100 rotate-0 scale-100"
                }`}
              >
                <div className="w-6 h-5 flex flex-col justify-between">
                  <span className="w-full h-[2px] bg-white"></span>
                  <span className="w-full h-[2px] bg-white"></span>
                  <span className="w-full h-[2px] bg-white"></span>
                </div>
              </div>

              {/* Cross Icon */}
              <div
                className={`absolute w-6 h-6 transition-all duration-500 ease-out ${
                  isMenuOpen
                    ? "opacity-100 rotate-0 scale-100"
                    : "opacity-0 rotate-90 scale-75"
                }`}
              >
                <span className="absolute top-1/2 left-0 w-full h-[2px] bg-white rotate-45 transform origin-center"></span>
                <span className="absolute top-1/2 left-0 w-full h-[2px] bg-white -rotate-45 transform origin-center"></span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Fullscreen Menu Overlay */}
      <div
        ref={overlayRef}
        className={`fixed inset-0 bg-black z-[90] ${
          isMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        style={{
          clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
          transformStyle: "preserve-3d"
        }}
      >
        <div className="relative w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-0">

          {/* Left Side - Preview Image */}
          <div className="hidden lg:flex items-center justify-center p-12 xl:p-16 border-r border-white/10">
            <div
              ref={previewRef}
              className="relative w-full max-w-sm aspect-[3/4] rounded-xl overflow-hidden shadow-2xl"
              style={{ perspective: "1000px" }}
            >
              <Image
                src={hoveredImage || menuLinks[0].image}
                alt="Preview"
                fill
                className="object-cover transition-opacity duration-500"
                key={hoveredImage || menuLinks[0].image}
              />
            </div>
          </div>

          {/* Right Side - Menu Content */}
          <div className="flex flex-col h-full">
            {/* Main Navigation Links */}
            <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 lg:px-16 py-16 gap-2 lg:gap-3">
              {menuLinks.map((link, index) => (
                <div
                  key={link.label}
                  ref={el => linksRef.current[index] = el}
                  className="overflow-hidden"
                  style={{ perspective: "1000px" }}
                >
                  <Link
                    href={link.href}
                    onClick={toggleMenu}
                    onMouseEnter={() => setHoveredImage(link.image)}
                    onMouseLeave={() => setHoveredImage(null)}
                    className={`block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold transition-colors duration-500 tracking-tighter leading-[1.1] group relative ${
                      pathname === link.href ? 'text-white' : 'text-purple-400/60 hover:text-white'
                    }`}
                  >
                    <span className={`inline-block group-hover:translate-x-3 transition-transform duration-500 ${
                      pathname === link.href ? 'translate-x-3' : ''
                    }`}>
                      {link.label}
                    </span>
                    <span className={`absolute bottom-2 left-0 h-[3px] bg-white transition-all duration-700 ease-out ${
                      pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}></span>
                  </Link>
                </div>
              ))}
            </div>

            {/* Social Links - Bottom of right side */}
            <div className="px-8 sm:px-12 lg:px-16 pb-24 lg:pb-32">
              <p ref={followUsTextRef} className="text-white/40 text-xs uppercase tracking-widest mb-4">Follow Us</p>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {socialLinks.map((social, index) => (
                  <div
                    key={social.name}
                    ref={el => socialsRef.current[index] = el}
                  >
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-purple-200/50 hover:text-white text-sm transition-colors duration-300 relative group"
                    >
                      {social.name}
                      <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-300"></span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
