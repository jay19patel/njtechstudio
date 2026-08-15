"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MovingTextBg from "./MovingTextBg";

const AUTOPLAY_DELAY = 3500;

const textVariants = {
  enter: (direction) => ({
    opacity: 0,
    x: direction > 0 ? 100 : -100,
    filter: "blur(4px)",
  }),
  center: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1], // easeOutQuart
    },
  },
  exit: (direction) => ({
    opacity: 0,
    x: direction > 0 ? -100 : 100,
    filter: "blur(4px)",
    transition: {
      duration: 0.4,
      ease: [0.7, 0, 0.84, 0], // easeInQuart
    },
  }),
};

export default function HorizontalScrollSection() {
  const [sections, setSections] = useState([
    {
      id: 1,
      label: "Content & YouTube Creation",
      title: "Creative Tech Content That Teaches & Entertains",
      description:
        "I create fun, engaging and value-packed content around programming, startups, software development and real-world tech journeys. With a joyful delivery style, I turn complex tech topics into simple, enjoyable and relatable experiences through YouTube, reels and storytelling.",
    },
    {
      id: 2,
      label: "Web & AI Development",
      title: "Modern Web Apps Supercharged with AI",
      description:
        "I build fast, scalable and intelligent applications using Next.js, React, FastAPI, Django and GenAI tools. From backend APIs to smart automation, vector search, AI agents and real-time dashboards — your digital product becomes faster, smarter and future-ready.",
    },
    {
      id: 3,
      label: "ERP & Business Automation",
      title: "Custom ERP for Small & Medium Businesses",
      description:
        "Automate your business with tailored ERP systems built using Frappe/ERPNext + React. From inventory and HR to approvals and finance dashboards — I deliver fast, clean and efficient workflows that boost productivity and reduce manual work.",
    },
    {
      id: 4,
      label: "IoT & Smart Automation",
      title: "Connect Devices with Real-World Software",
      description:
        "I design IoT-enabled systems that combine sensors, cloud services and smart automation. From real-time monitoring to device dashboards and industry automation — I bridge hardware, software and AI to bring ideas to life.",
    },
    {
      id: 5,
      label: "Academic Projects",
      title: "High-Scoring Modern Student Projects",
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
    <MovingTextBg text="WHAT I CAN DO" textColor="text-white" className="bg-black">
      <section className="relative w-full bg-transparent text-white py-16 sm:py-20 md:py-24 overflow-hidden border-y border-zinc-900/60">
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000002_1px,transparent_1px),linear-gradient(to_bottom,#00000002_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Stable drag container - handles swipes smoothly without unmounting */}
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragStart={() => setIsPaused(true)}
            onDragEnd={(e, info) => {
              handleDragEnd(e, info);
              setIsPaused(false);
            }}
            className="w-full cursor-grab active:cursor-grabbing"
          >
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={sections[current].id}
                custom={direction}
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full"
              >
                <SectionCard section={sections[current]} />
              </motion.div>
            </AnimatePresence>
          </motion.div>

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
                index === current ? "w-10 bg-indigo-500" : "w-2.5 bg-zinc-600/30 hover:bg-zinc-500/50"
              }`}
            />
          ))}
        </div>
      </section>
    </MovingTextBg>
  );
}

const SectionCard = ({ section }) => {
  return (
    <div className="w-full flex items-center justify-center px-4 sm:px-8 md:px-12 lg:px-20 select-none">
      <div className="w-full max-w-5xl">
        <div className="w-full space-y-6 sm:space-y-8 text-center py-8 sm:py-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs sm:text-sm font-semibold tracking-wide uppercase backdrop-blur-md mb-3">
            {section.label}
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight font-black text-white max-w-4xl mx-auto">
            {section.title}
          </h2>

          <p className="text-base sm:text-xl md:text-2xl text-white leading-relaxed max-w-3xl mx-auto font-normal">
            {section.description}
          </p>
        </div>
      </div>
    </div>
  );
};