"use client";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import MovingTextBg from "../components/MovingTextBg";
import { ArrowUpRight, Upload } from "lucide-react";

export default function JoinUsPage() {
    return (
        <div className="bg-background text-foreground min-h-screen">
            <MovingTextBg text="COLLABORATE " textColor="text-gray-400">
                {/* Hero Section */}
                <section className="relative w-full pt-32 lg:pt-40 pb-12 lg:pb-20 px-4 md:px-8 lg:px-16">
                    <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6 lg:space-y-8">
                        <h1 className="text-[10vw] sm:text-[8vw] md:text-[7vw] lg:text-[6vw] font-black leading-[0.8] tracking-tighter uppercase text-foreground mix-blend-difference">
                            <span className="block text-indigo-500 text-[5vw] sm:text-[3.5vw] md:text-[2.5vw] tracking-widest font-bold mb-2 lg:mb-4 italic">Not Just A Job</span>
                            A Journey Creates
                        </h1>

                        <div className="max-w-2xl mx-auto">
                            <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
                                We don't hire "employees". We build squads of passionate creators to tackle real-world challenges.
                                Bring your skills, and let's craft something ambitious together. No boss-worker hierarchy — just pure
                                collaboration and growth.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Form Section */}
                <section className="relative w-full py-12 lg:py-20 px-4 md:px-8 lg:px-16 ">
                    <div className="max-w-4xl mx-auto relative z-10">
                        <div className="text-center mb-10 lg:mb-14 space-y-3">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight">Let's Team Up</h2>
                            <p className="text-base sm:text-lg lg:text-xl text-zinc-500">Share your details and let's start a conversation.</p>
                        </div>

                        <form className="space-y-8 lg:space-y-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
                                <InputGroup label="What's your name?" placeholder="John Doe" type="text" />
                                <InputGroup label="Your Mobile Number" placeholder="+91 98765 43210" type="tel" />
                            </div>

                            <InputGroup label="Email Address" placeholder="john@example.com" type="email" />

                            <div className="space-y-4">
                                <label className="text-xs lg:text-sm font-bold uppercase tracking-widest text-zinc-400">Tell us about yourself & skills</label>
                                <textarea
                                    rows={4}
                                    className="w-full bg-transparent border-b-2 border-zinc-200 text-lg sm:text-2xl md:text-3xl lg:text-3xl font-medium placeholder:text-zinc-200 focus:outline-none focus:border-indigo-500 transition-colors py-3 lg:py-4 resize-none"
                                    placeholder="I'm a reacting wizard..."
                                />
                            </div>

                            <div className="space-y-4">
                                <label className="text-xs lg:text-sm font-bold uppercase tracking-widest text-zinc-400">Show off your work (Resume/Portfolio)</label>
                                <div className="relative group cursor-pointer border-2 border-dashed border-zinc-300 rounded-xl p-8 lg:p-10 flex flex-col items-center justify-center gap-4 hover:border-indigo-500 hover:bg-indigo-50 transition-all">
                                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
                                    <div className="bg-zinc-100 p-3 lg:p-4 rounded-full group-hover:bg-white transition-colors shadow-sm">
                                        <Upload className="w-6 h-6 lg:w-8 lg:h-8 text-zinc-400 group-hover:text-indigo-500 transition-colors" />
                                    </div>
                                    <span className="text-sm lg:text-base text-zinc-500 font-medium group-hover:text-indigo-600 transition-colors text-center">Click to upload or drag and drop</span>
                                </div>
                            </div>

                            <div className="pt-8 flex justify-center">
                                <button className="group relative inline-flex items-center justify-center px-8 py-5 lg:px-10 lg:py-5 bg-black text-white rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 w-full md:w-auto">
                                    <span className="relative z-10 flex items-center gap-4 font-bold uppercase tracking-wider text-sm lg:text-lg">
                                        Send Proposal <ArrowUpRight className="w-5 h-5 lg:w-6 lg:h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </span>
                                </button>
                            </div>
                        </form>
                    </div>
                </section>
            </MovingTextBg>
        </div>
    );
}

function InputGroup({ label, placeholder, type }) {
    return (
        <div className="space-y-4">
            <label className="text-sm font-bold uppercase tracking-widest text-zinc-400">{label}</label>
            <input
                type={type}
                className="w-full bg-transparent border-b-2 border-zinc-200 text-3xl md:text-4xl font-medium placeholder:text-zinc-200 focus:outline-none focus:border-indigo-500 transition-colors py-4"
                placeholder={placeholder}
            />
        </div>
    )
}
