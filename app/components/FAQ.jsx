"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const defaultFAQs = [
  {
    id: 1,
    question: "What services does NJ Tech Studio offer?",
    answer: "NJ Tech Studio offers comprehensive digital solutions including web development, mobile app development, e-commerce solutions, and custom software development tailored to your business needs."
  },
  {
    id: 2,
    question: "How long does it take to complete a project?",
    answer: "Project timelines vary based on complexity and requirements. Typically, a standard website takes 2-4 weeks, while custom applications may take 6-12 weeks. We'll provide a detailed timeline during our initial consultation."
  },
  {
    id: 3,
    question: "Do you provide ongoing support after project completion?",
    answer: "Yes, we offer comprehensive maintenance and support packages to ensure your digital solutions continue to perform optimally. This includes updates, bug fixes, and technical support."
  },
  {
    id: 4,
    question: "What technologies do you work with?",
    answer: "We work with modern technologies including React, Next.js, Node.js, Python, and various cloud platforms. Our team stays updated with the latest industry standards and best practices."
  },
  {
    id: 5,
    question: "Can you help with existing projects?",
    answer: "Absolutely! We can help improve, maintain, or scale your existing projects. Our team can analyze your current setup and provide recommendations for optimization and enhancement."
  }
];

export default function FAQ() {
  const [openItem, setOpenItem] = useState(null);
  const [faqItems] = useState(defaultFAQs);

  const toggleItem = (id) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <section className="py-24 bg-white/50">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-sm text-gray-500 font-medium mb-4 block">
            FAQ
          </span>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Everything you need to know about NJ Tech Studio
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No FAQs available at the moment.</p>
            </div>
          ) : (
            faqItems.map((item) => (
            <div
              key={item.id}
              className={`rounded-lg border bg-white px-6 py-1 transition-all duration-200 ${
                openItem === item.id
                  ? "border-purple-600 ring-2 ring-purple-600/20"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              {/* Trigger */}
              <button
                onClick={() => toggleItem(item.id)}
                className="flex w-full items-center justify-between py-4 text-left focus:outline-none"
              >
                <span className="text-[15px] leading-6 font-semibold text-gray-900">
                  {item.question || item.title}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 transition-transform duration-200 flex-shrink-0 ml-4 ${
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
                <p className="text-gray-600 leading-relaxed">{item.answer || item.content}</p>
              </div>
            </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center p-8 bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl border border-purple-100">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Still have questions?
          </h3>
          <p className="text-gray-600 mb-4">
            Can't find the answer you're looking for? Please chat with our friendly team.
          </p>
          <a
            href="mailto:support@njtechstudio.com"
            className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
          >
            Contact Support
          </a>
        </div>
      </div>
    </section>
  );
}
