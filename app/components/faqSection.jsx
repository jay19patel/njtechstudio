"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQSection = () => {
    const [openItem, setOpenItem] = useState(null);

    // Manual FAQ data with 3 questions
    const faqItems = [
        {
            id: 1,
            question: "What services do you offer?",
            answer: "We offer comprehensive web development services including custom website design, e-commerce solutions, web applications, mobile-responsive design, and ongoing maintenance and support. Our team specializes in modern technologies like React, Next.js, and Node.js.",
        },
        {
            id: 2,
            question: "How long does it take to complete a project?",
            answer: "Project timelines vary depending on the scope and complexity. A simple website typically takes 2-4 weeks, while more complex web applications can take 6-12 weeks. We provide detailed timelines during our initial consultation and keep you updated throughout the development process.",
        },
        {
            id: 3,
            question: "Do you provide ongoing support after project completion?",
            answer: "Yes, we offer comprehensive post-launch support including bug fixes, security updates, content updates, and feature enhancements. We have flexible support packages to meet your ongoing needs and ensure your website continues to perform optimally.",
        },
    ];

    const toggleItem = (id) => {
        setOpenItem(openItem === id ? null : id);
    };

    return (
        <section className="py-12 lg:py-20 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-start justify-center gap-8 lg:gap-12">
                    {/* Image on Left */}
                    <div className="w-full md:w-auto">
                        <img
                            className="max-w-sm w-full rounded-xl h-auto shadow-lg"
                            src="https://images.unsplash.com/photo-1555212697-194d092e3b8f?q=80&w=830&h=844&auto=format&fit=crop"
                            alt="FAQ illustration"
                        />
                    </div>

                    {/* FAQ Content on Right */}
                    <div className="flex-1 w-full">
                        <div className="mb-8">
                            <p className="text-indigo-600 text-sm font-medium mb-2">FAQ's</p>
                            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
                                Looking for answer?
                            </h1>
                        </div>

                        {/* Accordion */}
                        <div className="space-y-3">
                            {faqItems.map((item) => (
                                <div
                                    key={item.id}
                                    className={`rounded-lg border bg-white px-6 py-1 transition-all duration-200 ${
                                        openItem === item.id
                                            ? "border-indigo-600 ring-2 ring-indigo-600/20"
                                            : "border-gray-200 hover:border-gray-300"
                                    }`}
                                >
                                    {/* Trigger */}
                                    <button
                                        onClick={() => toggleItem(item.id)}
                                        className="flex w-full items-center justify-between py-4 text-left focus:outline-none"
                                    >
                                        <span className="text-[15px] leading-6 font-semibold text-gray-900 pr-4">
                                            {item.question}
                                        </span>
                                        <ChevronDown
                                            className={`w-5 h-5 text-gray-500 transition-transform duration-200 shrink-0 ${
                                                openItem === item.id ? "rotate-180" : ""
                                            }`}
                                        />
                                    </button>

                                    {/* Content */}
                                    <div
                                        className={`overflow-hidden transition-all duration-200 ${
                                            openItem === item.id ? "max-h-96 pb-4" : "max-h-0"
                                        }`}
                                    >
                                        <p className="text-gray-600 leading-relaxed text-sm">
                                            {item.answer}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQSection;