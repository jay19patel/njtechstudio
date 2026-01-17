"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import MovingTextBg from "./MovingTextBg";

export default function JoinTeamSection() {
    return (
        <MovingTextBg text="JOIN TEAM " textColor="text-gray-100/10">
            <section className="relative w-full py-32 lg:py-48 px-4 bg-transparent text-foreground overflow-hidden flex flex-col items-center justify-center text-center">

                {/* Top Tagline */}
                <AnimatedText
                    text="THE NJ TECH ATMOSPHERE"
                    className="text-purple-500 font-bold tracking-widest text-sm md:text-base uppercase mb-8 md:mb-12 italic"
                />

                {/* Main Title Area */}
                <div className="relative w-full max-w-7xl mx-auto flex flex-col items-center justify-center mb-16">

                    {/* Sticker - Absolute positioned on desktop, relative on mobile */}
                    <motion.div
                        initial={{ rotate: -15, scale: 0, opacity: 0 }}
                        whileInView={{ rotate: -15, scale: 1, opacity: 1 }}
                        transition={{ type: "spring", bounce: 0.5, delay: 0.5 }}
                        viewport={{ once: true }}
                        className="hidden md:block absolute left-[10%] lg:left-[15%] top-1/2 -translate-y-1/2 z-20"
                    >
                        <div className="bg-white border-2 border-black p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -rotate-12">
                            <div className="flex flex-col items-center leading-none font-black text-black text-xl">
                                <span>I</span>
                                <span className="text-purple-600 text-3xl">♥</span>
                                <span>TECH</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Massive Title */}
                    <h2 className="relative z-10 text-[18vw] leading-[0.8] font-black tracking-tighter uppercase text-foreground select-none mix-blend-difference">
                        <AnimatedCharText text="CREATIVES" />
                    </h2>

                </div>

                {/* CTA Button */}
                <div className="relative z-20 mb-32">
                    <Link href="/join-us" className="group relative inline-flex items-center justify-center px-8 py-4 bg-purple-600 text-white hover:bg-purple-700 transition-colors rounded-sm overflow-hidden">
                        <span className="relative z-10 flex items-center gap-3 font-black uppercase tracking-wider text-lg md:text-xl">
                            Discover The Team <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
                        </span>
                    </Link>
                </div>

                {/* Footer Text */}
                <div className="flex flex-col items-center gap-6 opacity-40 hover:opacity-100 transition-opacity duration-500">
                    <div className="flex flex-wrap justify-center gap-3 md:gap-6 text-xs md:text-sm font-bold uppercase tracking-widest text-muted-foreground">
                        {["[ Internship ]", "[ Freelance ]", "[ Full-time ]", "[ Contract ]"].map((tag, i) => (
                            <span key={i} className="hover:text-foreground transition-colors cursor-default">{tag}</span>
                        ))}
                    </div>

                    <div className="text-center space-y-2">
                        <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-foreground/80">
                            Want to join us?
                        </h3>
                        <p className="text-xs md:text-sm font-medium text-muted-foreground">
                            We'd love to discuss it over a cookie!
                        </p>
                    </div>
                </div>

            </section>
        </MovingTextBg>
    );
}

// Reveal Animation for Lines
function AnimatedText({ text, className, delay = 0 }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });

    return (
        <div ref={ref} className={`overflow-hidden ${className}`}>
            <motion.div
                initial={{ y: "100%" }}
                animate={isInView ? { y: 0 } : { y: "100%" }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay }}
            >
                {text}
            </motion.div>
        </div>
    )
}

// Reveal Animation for Characters
function AnimatedCharText({ text }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });

    return (
        <span ref={ref} className="inline-block overflow-hidden">
            {text.split("").map((char, index) => (
                <motion.span
                    key={index}
                    className="inline-block"
                    initial={{ y: "110%" }}
                    animate={isInView ? { y: 0 } : { y: "110%" }}
                    transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1], delay: index * 0.03 }}
                >
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
        </span>
    )
}
