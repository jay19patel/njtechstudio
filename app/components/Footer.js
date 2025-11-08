"use client"

import Link from "next/link"
import Image from "next/image"
import { Facebook, Youtube, Instagram } from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white border-t border-gray-800 mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo - Left Side */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/Logo.png"
                alt="NJ Tech Studio Logo"
                width={150}
                height={40}
                className="h-10 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Copyright - Middle */}
          <div className="text-sm text-gray-400 text-center">
            © 2025 All rights reserved. @ Jay Patel
          </div>

          {/* Social Icons - Right Side */}
          <div className="flex items-center gap-4">
            <Link
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </Link>
            <Link
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="YouTube"
            >
              <Youtube className="w-5 h-5" />
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

