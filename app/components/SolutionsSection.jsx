"use client";
import { motion, useTransform, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import MovingTextBg from "./MovingTextBg";
const sectionsData = [
  { 
    id: 1,
    label: "FOR ACCOUNTANTS",
    title: "CLOSE THE BOOKS WITHOUT OVERTIME",
    description: "Serve your clients with max efficiency. Review transactions, reconcile cashflows, record adjustments, and generate reports",
    image: "https://images.unsplash.com/photo-1554224311-beee460c201f?w=800",
    layout: "left" // text on left, image on right
  },
  { 
    id: 2,
    label: "FOR BUSINESSES",
    title: "STREAMLINE YOUR FINANCIAL OPERATIONS",
    description: "Manage your business finances with ease. Track expenses, monitor cash flow, and make data-driven decisions with real-time insights",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
    layout: "right" // image on left, text on right
  },
  { 
    id: 3,
    label: "FOR STARTUPS",
    title: "GROW FASTER WITH SMART AUTOMATION",
    description: "Focus on what matters most. Automate bookkeeping, payroll, and compliance so you can spend time building your business",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800",
    layout: "left" // text on left, image on right
  },
];

export default function HorizontalScrollSection() {
  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const xRaw = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${(sectionsData.length - 1) * 100}%`]
  );

  const x = useSpring(xRaw, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section
      ref={targetRef}
      className="relative bg-black"
      style={{ height: `${100 + (sectionsData.length - 1) * 100}vh` }}
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div
          style={{ x }}
          className="flex w-full h-full"
        >
          {sectionsData.map((section) => (
            <SectionCard key={section.id} section={section} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

const SectionCard = ({ section }) => {
  const isLeftLayout = section.layout === "left";

  return (
    
    <div className="min-w-full h-full flex items-center justify-center px-8 md:px-16 lg:px-24">
      <div className="w-full max-w-7xl">
        <MovingTextBg text="WHAT I CAN DO" textColor="text-gray-100">
          <div className={`flex flex-col ${isLeftLayout ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-16 items-center`}>
            {/* Text Content */}
            <div className="w-full lg:w-1/2 space-y-6">
              <div className="inline-block px-4 py-2 border border-white/30 rounded-full">
                <span className="text-white text-sm font-medium tracking-wider">
                  {section.label}
                </span>
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                {section.title}
              </h2>
              
              <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
                {section.description}
              </p>
            </div>

            {/* Image Content */}
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={section.image}
                  alt={section.title}
                  className="w-full h-[400px] md:h-[500px] lg:h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-liner-to-t from-black/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </MovingTextBg>
      </div>
    </div>
  );
};