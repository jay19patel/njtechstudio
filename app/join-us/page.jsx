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
                <section className="relative w-full pt-48 pb-24 px-4 md:px-12 lg:px-24">
                    <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
                        <h1 className="text-[12vw] sm:text-[10vw] md:text-[8vw] font-black leading-[0.8] tracking-tighter uppercase text-foreground mix-blend-difference">
                            <span className="block text-purple-500 text-[6vw] sm:text-[4vw] md:text-[3vw] tracking-widest font-bold mb-4 italic">Not Just A Job</span>
                            A Journey Creates
                        </h1>

                        <div className="max-w-2xl mx-auto">
                            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                                We don't hire "employees". We build squads of passionate creators to tackle real-world challenges.
                                Bring your skills, and let's craft something ambitious together. No boss-worker hierarchy — just pure
                                collaboration and growth.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Form Section */}
                <section className="relative w-full py-24 px-4 md:px-12 lg:px-24 ">
                    <div className="max-w-4xl mx-auto relative z-10">
                        <div className="text-center mb-16 space-y-4">
                            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tight">Let's Team Up</h2>
                            <p className="text-xl text-zinc-500">Share your details and let's start a conversation.</p>
                        </div>

                        <form className="space-y-12">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <InputGroup label="What's your name?" placeholder="John Doe" type="text" />
                                <InputGroup label="Your Mobile Number" placeholder="+91 98765 43210" type="tel" />
                            </div>

                            <InputGroup label="Email Address" placeholder="john@example.com" type="email" />

                            <div className="space-y-4">
                                <label className="text-sm font-bold uppercase tracking-widest text-zinc-400">Tell us about yourself & skills</label>
                                <textarea
                                    rows={4}
                                    className="w-full bg-transparent border-b-2 border-zinc-200 text-3xl md:text-4xl font-medium placeholder:text-zinc-200 focus:outline-none focus:border-purple-500 transition-colors py-4 resize-none"
                                    placeholder="I'm a reacting wizard..."
                                />
                            </div>

                            <div className="space-y-4">
                                <label className="text-sm font-bold uppercase tracking-widest text-zinc-400">Show off your work (Resume/Portfolio)</label>
                                <div className="relative group cursor-pointer border-2 border-dashed border-zinc-300 rounded-xl p-12 flex flex-col items-center justify-center gap-4 hover:border-purple-500 hover:bg-purple-50 transition-all">
                                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
                                    <div className="bg-zinc-100 p-4 rounded-full group-hover:bg-white transition-colors shadow-sm">
                                        <Upload className="w-8 h-8 text-zinc-400 group-hover:text-purple-500 transition-colors" />
                                    </div>
                                    <span className="text-zinc-500 font-medium group-hover:text-purple-600 transition-colors">Click to upload or drag and drop</span>
                                </div>
                            </div>

                            <div className="pt-8 flex justify-center">
                                <button className="group relative inline-flex items-center justify-center px-12 py-6 bg-black text-white rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95">
                                    <span className="relative z-10 flex items-center gap-4 font-bold uppercase tracking-wider text-xl">
                                        Send Proposal <ArrowUpRight className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
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
                className="w-full bg-transparent border-b-2 border-zinc-200 text-3xl md:text-4xl font-medium placeholder:text-zinc-200 focus:outline-none focus:border-purple-500 transition-colors py-4"
                placeholder={placeholder}
            />
        </div>
    )
}
