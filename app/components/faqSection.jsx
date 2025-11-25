"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import MovingTextBg from "./MovingTextBg";
import { motion } from "framer-motion";

const FAQSection = () => {
    const [openItem, setOpenItem] = useState(null);

    // Manual FAQ data with 3 questions
    const faqItems = [
        {
            id: 1,
            question: "What kind of projects do you take on?",
            answer: "I specialize in AI-powered apps (GenAI, LangChain, vector search), full-stack ERP systems (Frappe/ERPNext + React), scalable web apps (Next.js, FastAPI, Django), and custom automation solutions. If it involves Python, JavaScript, AI/ML, or cloud deployment (GCP), I'm your guy! From MVPs to production-ready systems — I ship fast and scale hard. 🚀",
        },
        {
            id: 2,
            question: "How fast can you deliver?",
            answer: "Speed depends on scope! Simple automation or MVP? 1-2 weeks. Full ERP system or AI platform? 4-8 weeks. Trading bot or microservices architecture? 6-12 weeks. I work in sprints, keep you updated daily, and prioritize shipping working code over endless planning. Let's talk specifics and I'll give you a real timeline!",
        },
        {
            id: 3,
            question: "Do you offer support after the project is done?",
            answer: "Absolutely! I provide post-launch support including bug fixes, performance optimization, feature additions, and system maintenance. Whether it's fixing issues, scaling infrastructure, or adding new functionality — I'm here for the long haul. Flexible support packages available based on your needs!",
        },
        {
            id: 4,
            question: "Can you help with AI/ML integration?",
            answer: "100%! I've built AI-powered talent acquisition systems, blogging platforms with LangChain/LangGraph, vector search with OpenSearch, and semantic discovery engines. From prompt engineering to model fine-tuning to production deployment — I handle the entire AI pipeline. Let's make your app smarter! 🤖",
        },
        {
            id: 5,
            question: "What's your tech stack?",
            answer: "Backend: Python (Django, Flask, FastAPI, Frappe), Node.js. Frontend: React, Next.js, JavaScript. Databases: PostgreSQL, MongoDB, Redis, SQLite. AI/ML: LangChain, LangGraph, OpenSearch, Vector DBs. Cloud: GCP, Docker, CI/CD. Architecture: Microservices, Event-Driven (RabbitMQ, Celery, Redis Pub/Sub). If it's modern and scalable, I use it!",
        },
    ];

    const toggleItem = (id) => {
        setOpenItem(openItem === id ? null : id);
    };

    return (
        <MovingTextBg text="FAQs" textColor="text-gray-400">
            <section className="relative pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-12 md:pb-16 lg:pb-20 overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                    {/* Dotted Pattern */}
                    <div className="absolute bottom-20 right-20 w-28 h-28 opacity-10 hidden md:block">
                        <svg width="100%" height="100%" className="text-indigo-600">
                            <circle cx="8" cy="8" r="1.5" fill="currentColor" />
                            <circle cx="24" cy="8" r="1.5" fill="currentColor" />
                            <circle cx="40" cy="8" r="1.5" fill="currentColor" />
                            <circle cx="8" cy="24" r="1.5" fill="currentColor" />
                            <circle cx="24" cy="24" r="1.5" fill="currentColor" />
                            <circle cx="40" cy="24" r="1.5" fill="currentColor" />
                            <circle cx="8" cy="40" r="1.5" fill="currentColor" />
                            <circle cx="24" cy="40" r="1.5" fill="currentColor" />
                            <circle cx="40" cy="40" r="1.5" fill="currentColor" />
                        </svg>
                    </div>
                    {/* Circles */}
                    <div className="absolute top-10 left-10 w-24 h-24 sm:w-36 sm:h-36 bg-indigo-100 rounded-full opacity-15 blur-3xl"></div>
                    <div className="absolute bottom-10 right-10 w-20 h-20 sm:w-28 sm:h-28 bg-indigo-100 rounded-full opacity-15 blur-2xl"></div>
                    {/* Squares */}
                    <div className="absolute top-1/3 left-1/4 w-10 h-10 sm:w-14 sm:h-14 border-2 border-indigo-200 opacity-15 rotate-45 hidden sm:block"></div>
                    <div className="absolute bottom-1/3 right-1/4 w-8 h-8 sm:w-10 sm:h-10 border-2 border-indigo-200 opacity-20 rotate-12 hidden sm:block"></div>
                </div>

                <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col md:flex-row items-center md:items-start justify-center gap-6 sm:gap-8 lg:gap-12"
                    >
                        {/* Image on Left */}
                        <div className="w-full md:w-auto flex justify-center">
                            <img
                                className="max-w-xs sm:max-w-sm w-full rounded-lg sm:rounded-xl h-[400px] sm:h-[500px] md:h-[600px] shadow-lg object-cover object-center"
                                src="https://images.unsplash.com/photo-1555212697-194d092e3b8f?q=80&w=830&h=844&auto=format&fit=crop"
                                alt="FAQ illustration"
                            />
                        </div>

                        {/* FAQ Content on Right */}
                        <div className="flex-1 w-full">
                            <div className="mb-6 sm:mb-8 text-center md:text-left">
                                <p className="text-indigo-600 text-xs sm:text-sm font-medium mb-2">FAQ's</p>
                                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4">
                                    Got Questions? I Got Answers!
                                </h1>
                            </div>

                            {/* Accordion */}
                            <div className="space-y-2 sm:space-y-3">
                                {faqItems.map((item) => (
                                    <div
                                        key={item.id}
                                        className={`rounded-lg border bg-white px-4 sm:px-6 py-1 transition-all duration-200 ${openItem === item.id
                                            ? "border-indigo-600 ring-2 ring-indigo-600/20"
                                            : "border-gray-200 hover:border-gray-300"
                                            }`}
                                    >
                                        {/* Trigger */}
                                        <button
                                            onClick={() => toggleItem(item.id)}
                                            className="flex w-full items-center justify-between py-3 sm:py-4 text-left focus:outline-none"
                                        >
                                            <span className="text-sm sm:text-[15px] leading-5 sm:leading-6 font-semibold text-gray-900 pr-3 sm:pr-4">
                                                {item.question}
                                            </span>
                                            <ChevronDown
                                                className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-500 transition-transform duration-200 shrink-0 ${openItem === item.id ? "rotate-180" : ""
                                                    }`}
                                            />
                                        </button>

                                        {/* Content */}
                                        <div
                                            className={`overflow-hidden transition-all duration-200 ${openItem === item.id ? "max-h-96 pb-3 sm:pb-4" : "max-h-0"
                                                }`}
                                        >
                                            <p className="text-gray-600 leading-relaxed text-xs sm:text-sm">
                                                {item.answer}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </MovingTextBg>
    );
};

export default FAQSection;