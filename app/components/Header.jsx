"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="bg-black text-white sticky top-4 z-50 my-4 max-w-6xl mx-auto rounded-lg" style={{ fontFamily: 'var(--font-ibm-plex-sans-condensed), sans-serif' }}>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Logo - Left Side */}
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

          {/* Desktop Navigation - Center */}
          <div className="hidden lg:flex items-center justify-center flex-1 space-x-6 ml-8 lg:ml-12">
            <Link
              href="/"
              className={`text-white hover:text-gray-300 transition-colors font-medium text-sm ${
                pathname === "/" ? "text-gray-300" : ""
              }`}
            >
              Home
            </Link>
            
            <Link
              href="/about"
              className={`text-white hover:text-gray-300 transition-colors font-medium text-sm ${
                pathname?.startsWith("/about") ? "text-gray-300" : ""
              }`}
            >
              About Us
            </Link>

            <Link
              href="/solutions"
              className={`text-white hover:text-gray-300 transition-colors font-medium text-sm ${
                pathname?.startsWith("/solutions") ? "text-gray-300" : ""
              }`}
            >
              Solutions
            </Link>

            <Link
              href="/contact"
              className={`text-white hover:text-gray-300 transition-colors font-medium text-sm ${
                pathname?.startsWith("/contact") ? "text-gray-300" : ""
              }`}
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="shrink-0 flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-white"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-800">
            <div className="space-y-3">
              <Link
                href="/"
                className="block py-2 text-white hover:text-gray-300 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/about"
                className="block py-2 text-white hover:text-gray-300 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                href="/solutions"
                className="block py-2 text-white hover:text-gray-300 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Solutions
              </Link>
              <Link
                href="/contact"
                className="block py-2 text-white hover:text-gray-300 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Us
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
