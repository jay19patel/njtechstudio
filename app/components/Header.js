"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Search } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

export default function Header() {
  const isMobile = useIsMobile()

  return (
    <header className="sticky top-0 z-50 w-full bg-black text-white border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-8">
          {/* Logo - Left Side */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/Logo.png"
                alt="NJ Tech Studio Logo"
                width={150}
                height={40}
                className="h-10 w-auto object-contain"
                priority
              />
            </Link>
          </div>

          {/* Navigation Menu - Center */}
          <div className="flex-1 flex justify-center">
            <NavigationMenu viewport={isMobile}>
              <NavigationMenuList className="gap-1">
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-white hover:bg-purple-900 hover:text-white data-[state=open]:bg-purple-900 data-[state=open]:text-white border-none focus:bg-purple-900 focus:text-white">
                    Home
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-gray-900 text-white border border-gray-800">
                    <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <a
                            className="flex h-full w-full flex-col justify-end rounded-md bg-gradient-to-b from-gray-800 to-gray-900 p-4 no-underline outline-none transition-all duration-200 select-none focus:shadow-md md:p-6 text-white"
                            href="/"
                          >
                            <div className="mb-2 text-lg font-medium sm:mt-4 text-white">
                              NJ Tech Studio
                            </div>
                            <p className="text-gray-300 text-sm leading-tight">
                              Welcome to NJ Tech Studio - Your trusted partner in digital innovation and technology solutions.
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <ListItem href="/" title="Introduction">
                        Re-usable components built using Radix UI and Tailwind CSS.
                      </ListItem>
                      <ListItem href="/" title="Our Mission">
                        Delivering cutting-edge technology solutions for your business needs.
                      </ListItem>
                      <ListItem href="/" title="Get Started">
                        Explore our services and discover how we can help you.
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                    <Link href="/" className="bg-transparent text-white hover:bg-purple-900 hover:text-white border-none focus:bg-purple-900 focus:text-white">
                      About Us
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-white hover:bg-purple-900 hover:text-white data-[state=open]:bg-purple-900 data-[state=open]:text-white border-none focus:bg-purple-900 focus:text-white">
                    Projects
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-gray-900 text-white border border-gray-800">
                    <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <a
                            className="flex h-full w-full flex-col justify-end rounded-md bg-gradient-to-b from-gray-800 to-gray-900 p-4 no-underline outline-none transition-all duration-200 select-none focus:shadow-md md:p-6 text-white"
                            href="/"
                          >
                            <div className="mb-2 text-lg font-medium sm:mt-4 text-white">
                              Our Projects
                            </div>
                            <p className="text-gray-300 text-sm leading-tight">
                              Explore our portfolio of innovative projects and solutions we've delivered to our clients.
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <ListItem href="/" title="Web Development">
                        Modern, responsive websites built with cutting-edge technologies.
                      </ListItem>
                      <ListItem href="/" title="Mobile Apps">
                        Native and cross-platform mobile applications for iOS and Android.
                      </ListItem>
                      <ListItem href="/" title="E-commerce Solutions">
                        Complete e-commerce platforms with payment integration and inventory management.
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Search and Content Us - Right Side */}
          <div className="flex items-center gap-6 flex-shrink-0">
            <button
              className="text-white hover:bg-purple-900 hover:text-white p-2 rounded-md transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <Link
              href="/"
              className="text-white hover:bg-purple-900 hover:text-white px-3 py-2 rounded-md transition-colors font-medium"
            >
              Content Us
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

function ListItem({ title, children, href, ...props }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-purple-900 hover:text-white focus:bg-purple-900 focus:text-white text-white"
        >
          <div className="text-sm font-medium leading-none text-white">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-gray-300">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}

