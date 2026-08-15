"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MovingTextBg from "./MovingTextBg";

const AUTOPLAY_DELAY = 3500;

const containerVariants = {
  enter: {},
  center: {},
  exit: {},
};

const textVariants = {
  enter: (direction) => ({ opacity: 0, y: 30, x: direction > 0 ? 50 : -50 }),
  center: { opacity: 1, y: 0, x: 0, transition: { duration: 0.45, ease: "easeOut" } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.25, ease: "easeIn" } },
};

export default function HorizontalScrollSection() {
  const [sections, setSections] = useState([
    {
      id: 1,
      label: "CONTENT & YOUTUBE CREATION",
      title: "CREATIVE TECH CONTENT THAT TEACHES & ENTERTAINS",
      description:
        "I create fun, engaging and value-packed content around programming, startups, software development and real-world tech journeys. With a joyful delivery style, I turn complex tech topics into simple, enjoyable and relatable experiences through YouTube, reels and storytelling.",
    },
    {
      id: 2,
      label: "WEB + AI DEVELOPMENT",
      title: "MODERN WEB APPS SUPERCHARGED WITH AI",
      description:
        "I build fast, scalable and intelligent applications using Next.js, React, FastAPI, Django and GenAI tools. From backend APIs to smart automation, vector search, AI agents and real-time dashboards — your digital product becomes faster, smarter and future-ready.",
    },
    {
      id: 3,
      label: "ERP & BUSINESS AUTOMATION",
      title: "CUSTOM ERP FOR SMALL & MEDIUM BUSINESSES",
      description:
        "Automate your business with tailored ERP systems built using Frappe/ERPNext + React. From inventory and HR to approvals and finance dashboards — I deliver fast, clean and efficient workflows that boost productivity and reduce manual work.",
    },
    {
      id: 4,
      label: "IOT & SMART AUTOMATION",
      title: "CONNECT DEVICES WITH REAL-WORLD SOFTWARE",
      description:
        "I design IoT-enabled systems that combine sensors, cloud services and smart automation. From real-time monitoring to device dashboards and industry automation — I bridge hardware, software and AI to bring ideas to life.",
    },
    {
      id: 5,
      label: "SCHOOL & COLLEGE PROJECTS",
      title: "HIGH-SCORING MODERN STUDENT PROJECTS",
      description:
        "Helping students build impactful, presentation-ready academic projects using Web Development, Python, AI, ML, automation and IoT. Clean code, proper documentation and impressive UI — perfect for final-year submissions and demos.",
    }
  ]);

  useEffect(() => {
    fetch('/api/admin/data?type=solutions')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setSections(data);
        }
      })
      .catch(err => console.error('Error fetching solutions:', err));
  }, []);

  const [[current, direction], setSlide] = useState([0, 0]);
  const [isPaused, setIsPaused] = useState(false);

  const paginate = (newDirection) => {
    setSlide(([prev]) => {
      const next = (prev + newDirection + sections.length) % sections.length;
      return [next, newDirection];
    });
  };

  const goTo = (index) => {
    setSlide(([prev]) => [index, index > prev ? 1 : -1]);
  };

  const handleDragEnd = (_, info) => {
    const swipeThreshold = 60;
    if (info.offset.x < -swipeThreshold) {
      paginate(1);
    } else if (info.offset.x > swipeThreshold) {
      paginate(-1);
    }
  };

  useEffect(() => {
    if (isPaused || sections.length <= 1) return;
    const timer = setInterval(() => paginate(1), AUTOPLAY_DELAY);
    return () => clearInterval(timer);
  }, [current, isPaused, sections.length]);

  return (
    <section className="relative bg-black py-16 sm:py-20 md:py-24">
      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={sections[current].id}
            variants={containerVariants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragStart={() => setIsPaused(true)}
            onDragEnd={(e, info) => {
              handleDragEnd(e, info);
              setIsPaused(false);
            }}
          >
            <SectionCard section={sections[current]} direction={direction} />
          </motion.div>
        </AnimatePresence>

        {/* Prev / Next arrows */}
        <button
          type="button"
          onClick={() => paginate(-1)}
          aria-label="Previous service"
          className="hidden sm:flex absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 items-center justify-center w-12 h-12 rounded-full border border-white/20 bg-black/60 text-white hover:bg-white/20 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          type="button"
          onClick={() => paginate(1)}
          aria-label="Next service"
          className="hidden sm:flex absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 items-center justify-center w-12 h-12 rounded-full border border-white/20 bg-black/60 text-white hover:bg-white/20 transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Dots navigation */}
      <div className="flex items-center justify-center gap-2 mt-8 sm:mt-10">
        {sections.map((section, index) => (
          <button
            key={section.id}
            type="button"
            onClick={() => goTo(index)}
            aria-label={`Go to ${section.label}`}
            className={`h-2.5 rounded-full transition-all ${
              index === current ? "w-10 bg-indigo-500" : "w-2.5 bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

const SectionCard = ({ section, direction }) => {
  return (
    <div className="w-full flex items-center justify-center px-4 sm:px-8 md:px-12 lg:px-20">
      <div className="w-full max-w-5xl">
        <MovingTextBg text="WHAT I CAN DO" textColor="text-gray-100">
          <motion.div
            custom={direction}
            variants={textVariants}
            className="w-full space-y-6 sm:space-y-8 text-center py-8 sm:py-12"
          >
            <div className="inline-block px-5 py-2 border border-white/30 rounded-full bg-white/5 backdrop-blur-sm">
              <span className="text-white text-xs sm:text-sm font-bold tracking-widest uppercase">
                {section.label}
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight uppercase">
              {section.title}
            </h2>

            <p className="text-base sm:text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto font-normal">
              {section.description}
            </p>
          </motion.div>
        </MovingTextBg>
      </div>
    </div>
  );
};