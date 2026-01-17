"use client";
import { motion, useTransform, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import MovingTextBg from "./MovingTextBg";
const sectionsData = [
  {
    id: 1,
    label: "CONTENT & YOUTUBE CREATION",
    title: "CREATIVE TECH CONTENT THAT TEACHES & ENTERTAINS",
    description:
      "I create fun, engaging and value-packed content around programming, startups, software development and real-world tech journeys. With a joyful delivery style, I turn complex tech topics into simple, enjoyable and relatable experiences through YouTube, reels and storytelling.",
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800",
    layout: "left",
  },
  {
    id: 2,
    label: "WEB + AI DEVELOPMENT",
    title: "MODERN WEB APPS SUPERCHARGED WITH AI",
    description:
      "I build fast, scalable and intelligent applications using Next.js, React, FastAPI, Django and GenAI tools. From backend APIs to smart automation, vector search, AI agents and real-time dashboards — your digital product becomes faster, smarter and future-ready.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
    layout: "right",
  },
  {
    id: 3,
    label: "ERP & BUSINESS AUTOMATION",
    title: "CUSTOM ERP FOR SMALL & MEDIUM BUSINESSES",
    description:
      "Automate your business with tailored ERP systems built using Frappe/ERPNext + React. From inventory and HR to approvals and finance dashboards — I deliver fast, clean and efficient workflows that boost productivity and reduce manual work.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
    layout: "left",
  },
  {
    id: 4,
    label: "IOT & SMART AUTOMATION",
    title: "CONNECT DEVICES WITH REAL-WORLD SOFTWARE",
    description:
      "I design IoT-enabled systems that combine sensors, cloud services and smart automation. From real-time monitoring to device dashboards and industry automation — I bridge hardware, software and AI to bring ideas to life.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800",
    layout: "right",
  },
  {
    id: 5,
    label: "SCHOOL & COLLEGE PROJECTS",
    title: "HIGH-SCORING MODERN STUDENT PROJECTS",
    description:
      "Helping students build impactful, presentation-ready academic projects using Web Development, Python, AI, ML, automation and IoT. Clean code, proper documentation and impressive UI — perfect for final-year submissions and demos.",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800",
    layout: "left",
  }
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

    <div className="min-w-full h-full flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-8 sm:py-12 md:py-16">
      <div className="w-full max-w-7xl">
        <MovingTextBg text="WHAT I CAN DO" textColor="text-gray-100">
          <div className={`flex flex-col ${isLeftLayout ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-6 sm:gap-8 md:gap-10 lg:gap-16 items-center`}>
            {/* Text Content */}
            <div className="w-full lg:w-1/2 space-y-4 sm:space-y-6 text-center lg:text-left">
              <div className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 border border-white/30 rounded-full">
                <span className="text-white text-xs sm:text-sm font-medium tracking-wider">
                  {section.label}
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight px-2 sm:px-0">
                {section.title}
              </h2>

              <p className="text-base sm:text-lg md:text-xl text-gray-400 leading-relaxed px-2 sm:px-0">
                {section.description}
              </p>
            </div>

            {/* Image Content */}
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={section.image}
                  alt={section.title}
                  className="w-full h-[280px] sm:h-[350px] md:h-[400px] lg:h-[500px] xl:h-[600px] object-cover"
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